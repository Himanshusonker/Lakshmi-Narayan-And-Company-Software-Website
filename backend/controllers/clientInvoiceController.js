const ClientInvoice = require("../models/clientInvoiceModel");
const ClientCompany = require("../models/clientCompanyModel");
const ClientProject = require("../models/clientProjectModel");

const crypto = require("crypto");
const Razorpay = require("razorpay");
const PDFDocument = require("pdfkit");
const path = require("path");
const signatureImage = path.join(__dirname, "../assets/signature.jpeg");
const regularFont = path.join(__dirname, "../fonts/NotoSans-Regular.ttf");
const boldFont = path.join(__dirname, "../fonts/NotoSans-Bold.ttf");
const setRegularFont = () => {
    doc.font(regularFont);
};
const setBoldFont = () => {
    doc.font(boldFont);
};

// ======================================================
// RAZORPAY
// ======================================================

const razorpay=new Razorpay({key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET});

// ======================================================
// HELPER
// ======================================================

const populateInvoice=(query)=>{

    return query.populate("company", "companyName contactPerson email phone").populate("project", "projectName projectType status");
};


// ======================================================
// GET ALL INVOICES - ADMIN
// ======================================================

const getAllInvoices=async(req, res)=>{

    try {

        const invoices=await populateInvoice(ClientInvoice.find({isActive: true})).sort({createdAt: -1});

        return res.status(200).json({success: true, count: invoices.length, invoices});

    } catch (error) {

        console.error("Get All Invoices Error:", error);

        return res.status(500).json({success: false, message: "Failed to fetch invoices"});
    }
};


// ======================================================
// GET SINGLE INVOICE - ADMIN
// ======================================================

const getInvoiceById=async(req, res)=>{

    try {

        const invoice=await populateInvoice(ClientInvoice.findOne({_id: req.params.id, isActive: true}));

        if (!invoice) {

            return res.status(404).json({success: false, message: "Invoice not found"});
        }

        return res.status(200).json({success: true, invoice});

    } catch (error) {

        console.error("Get Invoice Error:", error);

        return res.status(500).json({success: false, message: "Failed to fetch invoice"});
    }
};


// ======================================================
// CREATE INVOICE
// ======================================================

const createInvoice= async(req, res)=>{

    try {

        // const {company, project, invoiceNumber, title, description, items, taxPercentage, discount, issueDate, dueDate, notes}=req.body;
        const {company, project, invoiceNumber, title, description, clientAddress, clientState, clientStateCode, gstType, items, taxPercentage, invoiceType, sellerGSTIN, buyerGSTIN, placeOfSupply, reverseCharge, hsnSac, cgstPercentage, sgstPercentage, igstPercentage, issueDate, dueDate, notes, status}=req.body;

        if (!company || !invoiceNumber || !title || !dueDate || !clientAddress) {

            return res.status(400).json({success: false, message:"Company, invoice number, title, client address and due date are required"});
        }


        // ==================================================
        // CHECK COMPANY
        // ==================================================

        const companyData=await ClientCompany.findById(company);

        if (!companyData) {

            return res.status(404).json({success: false, message: "Company not found"});
        }

        if (!companyData.isActive) {

            return res.status(400).json({success: false, message:"Cannot create invoice for inactive company"});
        }


        // ==================================================
        // CHECK PROJECT
        // ==================================================

        if (project) {

            const projectData=await ClientProject.findOne({_id: project, company});

            if (!projectData) {

                return res.status(400).json({success: false, message:"Selected project does not belong to this company"});
            }
        }

        // ==================================================
        // INVOICE TYPE
        // ==================================================

        const finalInvoiceType =invoiceType === "GST Invoice" ? "GST Invoice" : "Invoice";


        // ==================================================
        // GENERATE INVOICE NUMBER
        // NORMAL AND GST HAVE SEPARATE SERIAL
        // ==================================================

        const currentYear = new Date().getFullYear();

        const lastInvoice = await ClientInvoice.findOne({invoiceType: finalInvoiceType, invoiceNumber: {$regex: `^INV-${currentYear}-`}}).sort({ createdAt: -1 });

        let nextNumber = 1;

        if (lastInvoice?.invoiceNumber) {

            const match = lastInvoice.invoiceNumber.match(new RegExp(`^INV-${currentYear}-(\\d+)$`));

            if (match) {
                nextNumber = Number(match[1]) + 1;
            }
        }

        const generatedInvoiceNumber =`INV-${currentYear}-${String(nextNumber).padStart(3, "0")}`;

        // ==================================================
        // CHECK DUPLICATE INVOICE
        // ==================================================

        const existingInvoice = await ClientInvoice.findOne({invoiceType: finalInvoiceType, invoiceNumber: generatedInvoiceNumber});

        if (existingInvoice) {
            return res.status(400).json({success: false, message: "Invoice number already exists"});
        }

        // ==================================================
        // CREATE
        // ==================================================

        const invoice=new ClientInvoice({

                company,

                project:project || null,

                invoiceNumber:generatedInvoiceNumber,

                title,

                description:description || "",

                clientAddress: clientAddress.trim(),

                clientState: clientState || "",

                clientStateCode: clientStateCode || "",

                invoiceType: finalInvoiceType,

                items:Array.isArray(items) ? items : [],

                taxPercentage:Number(taxPercentage || 0),

                // discount:Number(discount || 0),

                // ==========================================
                // GST FIELDS
                // ==========================================

                sellerGSTIN:invoiceType === "GST Invoice" ? (sellerGSTIN || "").trim().toUpperCase(): "",

                buyerGSTIN:invoiceType === "GST Invoice" ? (buyerGSTIN || "").trim().toUpperCase(): "",

                placeOfSupply:invoiceType === "GST Invoice" ? (placeOfSupply || "").trim(): "",

                gstType: gstType || "CGST_SGST",

                reverseCharge:invoiceType === "GST Invoice" ? Boolean(reverseCharge): false,

                hsnSac:invoiceType === "GST Invoice" ? (hsnSac || "").trim(): "",

                cgstPercentage:invoiceType === "GST Invoice" ? Number(cgstPercentage || 0) : 0,

                sgstPercentage:invoiceType === "GST Invoice" ? Number(sgstPercentage || 0) : 0,

                igstPercentage:invoiceType === "GST Invoice" ? Number(igstPercentage || 0) : 0,

                // ==========================================
                // DATES
                // ==========================================

                issueDate:issueDate || new Date(),

                dueDate,

                notes:notes || "",

                status: "Pending"

            });

        await invoice.save();

        await populateInvoice(ClientInvoice.findById(invoice._id));

        return res.status(201).json({success: true, message:"Invoice created successfully", invoice});

    } catch (error) {

        console.error("Create Invoice Error:", error);

        if (error.keyPattern?.invoiceNumber) {

        return res.status(409).json({success: false, message: `Invoice number "${error.keyValue?.invoiceNumber}" already exists`});

    }

        if (error.code === 11000) {

            return res.status(400).json({success: false, message: "Invoice number already exists"});
        }

        return res.status(500).json({success: false, message:"Failed to create invoice"});
    }
};


// ======================================================
// UPDATE INVOICE
// ======================================================

const updateInvoice=async(req, res)=>{

    try {

        const invoice=await ClientInvoice.findById(req.params.id);

        if (!invoice) {

            return res.status(404).json({success: false, message: "Invoice not found"});
        }

        // const {company, project, invoiceNumber, title, description, items, taxPercentage, discount, issueDate, dueDate, notes, status}=req.body;
        const {company, project, invoiceNumber, title, description, clientAddress, clientState, clientStateCode, gstType, items, taxPercentage, invoiceType, sellerGSTIN, buyerGSTIN, placeOfSupply, reverseCharge, hsnSac, cgstPercentage, sgstPercentage, igstPercentage, issueDate, dueDate, notes, status}=req.body;

        if (company !== undefined) {

            const companyData=await ClientCompany.findById(company);

            if (!companyData) {

                return res.status(404).json({success: false, message: "Company not found"});
            }

            invoice.company=company;
        }

        if (project !== undefined) {

            if (project) {

                const projectData=await ClientProject.findOne({_id: project, company:company || invoice.company});

                if (!projectData) {

                    return res.status(400).json({success: false, message:"Project does not belong to selected company"});
                }

                invoice.project=project;

            } else {

                invoice.project=null;
            }
        }

        if (invoiceType !== undefined) {

            invoice.invoiceType = invoiceType;

            if (invoiceType === "GST Invoice") {

                invoice.sellerGSTIN =(sellerGSTIN || "").trim().toUpperCase();

                invoice.buyerGSTIN =(buyerGSTIN || "").trim().toUpperCase();

                invoice.placeOfSupply =(placeOfSupply || "").trim();

                invoice.reverseCharge =Boolean(reverseCharge);

                invoice.hsnSac =(hsnSac || "").trim();

                invoice.cgstPercentage =Number(cgstPercentage || 0);

                invoice.sgstPercentage =Number(sgstPercentage || 0);

                invoice.igstPercentage=Number(igstPercentage || 0);

            } else {

                invoice.sellerGSTIN = "";
                invoice.buyerGSTIN = "";
                invoice.placeOfSupply = "";
                invoice.reverseCharge = false;
                invoice.hsnSac = "";
                invoice.cgstPercentage = 0;
                invoice.sgstPercentage = 0;
                invoice.igstPercentage = 0;
                invoice.gstType = "CGST_SGST";

            }
        }

        if (invoiceNumber !== undefined)
            invoice.invoiceNumber= invoiceNumber;

        if (title !== undefined)
            invoice.title= title;

        if (description !== undefined)
            invoice.description = description;

        if (clientAddress !== undefined) {

            invoice.clientAddress=clientAddress.trim();
        }

        if (clientState !== undefined) {
            invoice.clientState = clientState;
        }            

        if (clientStateCode !== undefined) {
            invoice.clientStateCode = clientStateCode;
        }        

        if (gstType !== undefined){
            invoice.gstType = gstType;
        }

        if (items !== undefined)
            invoice.items = items;

        if (taxPercentage !== undefined)
            invoice.taxPercentage =Number(taxPercentage);

        // if (discount !== undefined)
        //     invoice.discount =Number(discount);

        if (issueDate !== undefined)
            invoice.issueDate = issueDate;

        if (dueDate !== undefined)
            invoice.dueDate = dueDate;

        if (notes !== undefined)
            invoice.notes = notes;

        if (status !== undefined)
            invoice.status = status;

        await invoice.save();

        const populatedInvoice=await populateInvoice(ClientInvoice.findById(invoice._id));

        return res.status(200).json({success: true, message:"Invoice updated successfully", invoice: populatedInvoice});

    } catch (error) {

        console.error("Update Invoice Error:", error);

        return res.status(500).json({success: false, message:"Failed to update invoice"});
    }
};


// ======================================================
// DELETE INVOICE
// ======================================================

const deleteInvoice=async(req, res)=>{

    try {

        const invoice=await ClientInvoice.findById(req.params.id);

        if (!invoice) {

            return res.status(404).json({success: false, message: "Invoice not found"});
        }

        // invoice.isActive = false;

        // await invoice.save();

        // return res.status(200).json({success: true, message:"Invoice deleted successfully"});

        await ClientInvoice.findByIdAndDelete(req.params.id);

        return res.status(200).json({success: true, message: "Invoice permanently deleted successfully"});

    } catch (error) {

        console.error("Delete Invoice Error:", error);

        return res.status(500).json({success: false, message:"Failed to delete invoice"});
    }
};


// ======================================================
// CLIENT - GET INVOICES
// ======================================================

const getClientInvoices=async(req, res)=>{

    try {

        const companyId=req.client.companyId;

        if (!companyId) {

            return res.status(400).json({success: false, message:"Company information not found"});
        }

        const invoices= await populateInvoice(ClientInvoice.find({company: companyId, isActive: true})).sort({createdAt: -1});

        return res.status(200).json({success: true, count: invoices.length, invoices});

    } catch (error) {

        console.error("Client Invoices Error:", error);

        return res.status(500).json({success: false, message:"Failed to fetch invoices"});
    }
};


// ======================================================
// CLIENT - GET SINGLE INVOICE
// ======================================================

const getClientInvoiceById=async(req, res)=>{

    try {

        const companyId=req.client.companyId;

        if (!companyId) {

            return res.status(400).json({success: false, message:"Company information not found"});
        }

        const invoice=await populateInvoice(ClientInvoice.findOne({_id: req.params.id, company: companyId, isActive: true}));

        if (!invoice) {

            return res.status(404).json({success: false, message:"Invoice not found or access denied"});
        }

        return res.status(200).json({success: true, invoice});

    } catch (error) {

        console.error("Client Invoice Details Error:", error);

        return res.status(500).json({success: false, message:"Failed to fetch invoice"});
    }
};


// ======================================================
// CREATE RAZORPAY ORDER
// ======================================================

const createInvoicePaymentOrder=async(req, res)=>{

    try {

        const companyId=req.client.companyId;

        const invoice=await ClientInvoice.findOne({_id: req.params.id, company: companyId, isActive: true});

        if (!invoice) {

            return res.status(404).json({success: false, message:"Invoice not found or access denied"});
        }

        if (invoice.dueAmount <= 0) {

            return res.status(400).json({success: false, message:"This invoice is already paid"});
        }

        if (
            invoice.status === "Cancelled"
        ) {

            return res.status(400).json({success: false, message:"Cancelled invoice cannot be paid"});
        }

        const amount= Math.round(invoice.dueAmount * 100);

        const razorpayOrder=await razorpay.orders.create({

                amount,

                currency: "INR",

                receipt:invoice.invoiceNumber,

                notes: {

                    invoiceId:invoice._id.toString(),

                    companyId:companyId.toString()

                }

            });

        invoice.paymentHistory.push({razorpayOrderId:razorpayOrder.id, amount:invoice.dueAmount, status: "Created"});

        await invoice.save();

        return res.status(200).json({success: true, key:process.env.KEY_ID, order: razorpayOrder, amount:invoice.dueAmount, invoice});

    } catch (error) {

        console.error("Create Payment Order Error:", error);

        return res.status(500).json({success: false, message:"Failed to create payment order"});
    }
};


// ======================================================
// VERIFY RAZORPAY PAYMENT
// ======================================================

const verifyInvoicePayment=async(req, res)=>{

    try {

        const companyId=req.client.companyId;

        const {razorpay_order_id, razorpay_payment_id, razorpay_signature}=req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {

            return res.status(400).json({success: false, message:"Payment verification data is incomplete"});
        }

        const invoice=await ClientInvoice.findOne({company: companyId, "paymentHistory.razorpayOrderId":razorpay_order_id, isActive: true});

        if (!invoice) {

            return res.status(404).json({success: false, message:"Payment invoice not found"});
        }

        const generatedSignature=crypto.createHmac("sha256", process.env.KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");

        if (generatedSignature !== razorpay_signature) {

            return res.status(400).json({success: false, message:"Invalid payment signature"});
        }

        const payment=invoice.paymentHistory.find(item=>item.razorpayOrderId === razorpay_order_id);

        if (!payment) {

            return res.status(404).json({success: false, message:"Payment record not found"});
        }


        // Prevent duplicate verification

        if (payment.status === "Paid") {

            return res.status(200).json({success: true, message:"Payment already verified", invoice});
        }

        payment.razorpayPaymentId=razorpay_payment_id;

        payment.razorpaySignature=razorpay_signature;

        payment.status="Paid";

        payment.paidAt=new Date();

        invoice.paidAmount=Number(invoice.paidAmount || 0) + Number(payment.amount || 0);

        await invoice.save();

        const updatedInvoice=await populateInvoice(ClientInvoice.findById(invoice._id));

        return res.status(200).json({success: true, message:"Payment verified successfully", invoice:updatedInvoice});

    } catch (error) {

        console.error("Verify Invoice Payment Error:", error);

        return res.status(500).json({success: false, message:"Failed to verify payment"});
    }
};


// ======================================================
// DOWNLOAD CLIENT INVOICE PDF
// ======================================================

const downloadClientInvoicePDF = async (req, res) => {

    try {

        const companyId=req.client.companyId;

        const invoice= await ClientInvoice.findOne({_id: req.params.id, company: companyId, isActive: true}).populate("company", "companyName contactPerson email phone address gstNumber").populate("project", "projectName projectType");

        if (!invoice) {

            return res.status(404).json({success: false, message:"Invoice not found or access denied"});

        }


        // ==================================================
        // INVOICE PDF SECTION OLD
        // ==================================================
        
        // const doc=new PDFDocument({margin: 50});

        // doc.font(path.join(__dirname, "../fonts/NotoSans-Regular.ttf"));

        // res.setHeader("Content-Type", "application/pdf");

        // res.setHeader("Content-Disposition", `attachment; filename="${invoice.invoiceNumber}.pdf"`);

        // doc.pipe(res);

        // // ==================================================
        // // HEADER
        // // ==================================================

        // doc.fontSize(22).text("LAKSHMI NARAYAN AND COMPANY", {align: "center"});

        // doc.moveDown().fontSize(18).text("INVOICE", {align: "center"});

        // doc.moveDown();

        // // ==================================================
        // // INVOICE INFO
        // // ==================================================

        // doc.fontSize(11).text(`Invoice Number: ${invoice.invoiceNumber}`)
        // .text(`Issue Date: ${new Date(invoice.issueDate).toLocaleDateString("en-IN")}`)
        // .text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString("en-IN")}`)
        // .text(`Status: ${invoice.status}`);

        // doc.moveDown();

        // // ==================================================
        // // COMPANY
        // // ==================================================

        // doc.fontSize(13).text("Bill To");

        // doc.fontSize(11).text(invoice.company?.companyName || "")
        // .text(invoice.company?.contactPerson || "").text(invoice.company?.email || "")
        // .text(invoice.company?.phone || "");

        // doc.moveDown();

        // // ==================================================
        // // PROJECT
        // // ==================================================

        // if (invoice.project) {

        //     doc.fontSize(12).text(`Project: ${invoice.project.projectName}`);

        // }

        // doc.moveDown();

        // // ==================================================
        // // ITEMS
        // // ==================================================

        // doc.fontSize(12).text("Description");

        // doc.moveDown(0.5);

        // invoice.items.forEach((item, index) => {

        //         doc.fontSize(10).text(`${index + 1}. ${item.description}`)
        //         .text(`Quantity: ${item.quantity} | Rate: ₹${Number(item.rate).toLocaleString("en-IN")} | Amount: ₹${Number(item.amount).toLocaleString("en-IN")}`);

        //         doc.moveDown(0.5);

        //     }
        // );

        // doc.moveDown();

        // // ==================================================
        // // TOTALS
        // // ==================================================

        // doc.fontSize(11).text(`Subtotal: ₹${Number(invoice.subtotal).toLocaleString("en-IN")}`, {align: "right"})
        // .text(`Tax (${invoice.taxPercentage}%): ₹${Number(invoice.taxAmount).toLocaleString("en-IN")}`, {align: "right"})
        // .text(`Discount: ₹${Number(invoice.discount).toLocaleString("en-IN")}`, {align: "right"}).fontSize(14)
        // .text(`Total: ₹${Number(invoice.totalAmount).toLocaleString("en-IN")}`, {align: "right"}).fontSize(11)
        // .text(`Paid: ₹${Number(invoice.paidAmount).toLocaleString("en-IN")}`, {align: "right"})
        // .text(`Due: ₹${Number(invoice.dueAmount).toLocaleString("en-IN")}`, {align: "right"});


        // // ==================================================
        // // NOTES
        // // ==================================================

        // if (invoice.notes) {

        //     doc.moveDown().fontSize(11).text("Notes").fontSize(10).text(invoice.notes);

        // }

        // doc.moveDown(2).fontSize(9).text("Thank you for your business.", {align: "center"});

        // doc.end();


        // ==================================================
        // INVOICE PDF NEW
        // ==================================================

        const doc = new PDFDocument({

            size: "A4",

            margin: 0,

            bufferPages: true

        });


        res.setHeader("Content-Type", "application/pdf");

        res.setHeader("Content-Disposition", `attachment; filename="${invoice.invoiceNumber}.pdf"`);


        doc.pipe(res);


        // ==================================================
        // PAGE DIMENSIONS
        // ==================================================

        const pageWidth = 595.28;
        const pageHeight = 841.89;
        const left = 35;
        const right = pageWidth - 35;
        const contentWidth =right - left;


        // ==================================================
        // COLORS
        // ==================================================

        const blue = "#173F91";
        const lightBlue = "#B8D0F5";
        const lightGray = "#E5E7EB";
        const border = "#222222";
        const textGray = "#444444";


        // ==================================================
        // HELPERS
        // ==================================================

        const money = (value) => {

            return `₹${Number(value || 0).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;

        };

        const dateFormat = (date) => {

            if (!date) return "";

            return new Date(date).toLocaleDateString("en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );
        };

        const drawLine = (x1, y1, x2, y2, width = 1) => {

            doc.lineWidth(width).strokeColor(border).moveTo(x1, y1).lineTo(x2, y2).stroke();
        };

        const drawRect = (x, y, width, height, fill = null, stroke = border) => {

            if (fill) {

                doc.fillColor(fill).rect(x, y, width, height).fill();
            }

            if (stroke) {

                doc.lineWidth(1).strokeColor(stroke).rect(x, y, width, height).stroke();
            }
        };


        // ==================================================
        // OUTER BORDER
        // ==================================================

        drawRect(left, 35, contentWidth, pageHeight - 70, null, border);


        // ==================================================
        // HEADER
        // ==================================================

        const headerTop = 35;
        const headerHeight = 125;

        // Company Name

        doc.font(boldFont).fontSize(17).fillColor("#111111").text("LAKSHMI NARAYAN AND COMPANY", left + 12, headerTop + 14, {width: 300});


        // Seller Address

        doc.font(regularFont).fontSize(10.5).fillColor(textGray).text("76/229, Kuli Bazar",left + 12,headerTop + 40)
            .text("District: Kanpur Nagar",left + 12, headerTop + 56)
            .text("State: Uttar Pradesh", left + 12, headerTop + 72)
            .text("Country: India", left + 12, headerTop + 88)
            .text("Contact: 9335187678", left + 12, headerTop + 104);


        // INVOICE heading

        doc.font(regularFont).fontSize(34).fillColor(blue).text("INVOICE", 365, headerTop + 45,
                {
                    width: 175,
                    align: "right",
                    lineBreak: false
                }
            );


        // ==================================================
        // HEADER BOTTOM
        // ==================================================

        drawLine(left, headerTop + headerHeight, right, headerTop + headerHeight);


        // ==================================================
        // INVOICE INFORMATION SECTION
        // ==================================================

        const infoTop =headerTop + headerHeight;
        const infoHeight = 83;
        const middleX =left + contentWidth * 0.50;

        drawLine(middleX, infoTop, middleX, infoTop + infoHeight);


        // Invoice info labels

        const infoLabelX =left + 12;
        const infoValueX =left + 115;

        doc.font(regularFont).fontSize(10).fillColor(textGray).text("Invoice#", infoLabelX, infoTop + 15)
            .text("Invoice Date", infoLabelX, infoTop + 33).text("Terms", infoLabelX, infoTop + 51)
            .text("Due Date", infoLabelX, infoTop + 69);

        doc.font(boldFont).fontSize(10).fillColor("#222222").text(invoice.invoiceNumber, infoValueX, infoTop + 15)
            .text(dateFormat(invoice.issueDate), infoValueX, infoTop + 33)
            .text("Due on Receipt", infoValueX, infoTop + 51).text(dateFormat(invoice.dueDate), infoValueX, infoTop + 69);


        // ==================================================
        // BILL TO / SHIP TO
        // ==================================================

        const addressTop =infoTop + infoHeight;
        const addressHeaderHeight = 27;
        const addressHeight = 145;

        // Header backgrounds

        drawRect(left, addressTop, contentWidth / 2, addressHeaderHeight, lightGray, border);

        drawRect(middleX, addressTop, contentWidth / 2, addressHeaderHeight, lightGray, border);

        // Header text

        doc.font(regularFont).fontSize(11).fillColor("#222222").text("Bill To", left + 10, addressTop + 8)
            .text("Ship To", middleX + 10, addressTop + 8);

        // Vertical divider

        drawLine(middleX, addressTop, middleX, addressTop + addressHeaderHeight + addressHeight);

        // Bottom border

        drawLine(left, addressTop + addressHeaderHeight + addressHeight, right, addressTop + addressHeaderHeight + addressHeight);

        // ==================================================
        // CLIENT BILL TO
        // ==================================================

        const clientName =invoice.company?.companyName || "Client";

        doc.font(boldFont).fontSize(11).fillColor("#222222").text(clientName, left + 10, addressTop + 48,
                {
                    width: 195,
                    lineGap: 2
                }
            );

        // Client address

        const clientAddress =invoice.clientAddress || "";

        const clientNameHeight =doc.heightOfString(clientName,
        {
            width: 195,
            font: boldFont,
            fontSize: 11
        }
    );

        doc.font(regularFont).fontSize(10.5).fillColor(textGray).text(clientAddress, left + 10, addressTop + 55 + clientNameHeight,
        
        {
            width: 195,
            lineGap: 3
        }
            );

        // ==================================================
        // SHIP TO
        // ==================================================

        doc.font(regularFont).fontSize(10.5).fillColor(textGray).text(clientAddress, middleX + 10, addressTop + 48,
                {
                    width: 210,
                    lineGap: 3
                }
            );

        // ==================================================
        // ITEMS TABLE
        // ==================================================

        const tableTop =addressTop + addressHeaderHeight + addressHeight;
        const tableHeaderHeight = 28;

        // Column widths

        const colNo = 28;
        const colDescription = 305;
        const colQty = 63;
        const colRate = 68;
        const colAmount =contentWidth - colNo - colDescription - colQty - colRate;
        const xNo = left;
        const xDescription =xNo + colNo;
        const xQty =xDescription + colDescription;
        const xRate =xQty + colQty;
        const xAmount =xRate + colRate;

        // Header background

        doc.fillColor(blue).rect(left, tableTop, contentWidth, tableHeaderHeight).fill();

        // Header text

        doc.font(regularFont).fontSize(9.5).fillColor("#FFFFFF").text("#", xNo + 8, tableTop + 9)
            .text("Item & Description", xDescription + 10, tableTop + 9).text("Qty", xQty, tableTop + 9,
                {
                    width: colQty,
                    align: "center"
                }
            ).text("Rate", xRate, tableTop + 9,
                {
                    width: colRate,
                    align: "center"
                }
            ).text("Amount", xAmount, tableTop + 9,
                {
                    width: colAmount - 5,
                    align: "center"
                }
            );

        // Vertical lines

        drawLine(xDescription, tableTop, xDescription, tableTop + tableHeaderHeight);
        drawLine(xQty, tableTop, xQty, tableTop + tableHeaderHeight);
        drawLine(xRate, tableTop, xRate, tableTop + tableHeaderHeight);
        drawLine(xAmount, tableTop, xAmount, tableTop + tableHeaderHeight);

        // ==================================================
        // ITEM ROWS
        // ==================================================

        let currentY =tableTop + tableHeaderHeight;

        const itemRows =invoice.items || [];

        itemRows.forEach((item, index) => {

                const description =item.description || "";

                // Determine row height

                const descriptionHeight =doc.heightOfString(description,
                        {
                            width:colDescription - 20,
                            font:regularFont,
                            fontSize: 10
                        }
                    );

                const rowHeight =Math.max(54, descriptionHeight + 30);

                // Row border

                drawRect(left, currentY, contentWidth, rowHeight, null, border);

                // Vertical lines

                drawLine(xDescription, currentY, xDescription, currentY + rowHeight);
                drawLine(xQty, currentY, xQty, currentY + rowHeight);
                drawLine(xRate, currentY, xRate, currentY + rowHeight);
                drawLine(xAmount, currentY, xAmount, currentY + rowHeight);

                // Number

                doc.font(regularFont).fontSize(9.5).fillColor("#222222").text(String(index + 1), xNo + 10, currentY + 15);

                // Description

                doc.font(regularFont).fontSize(10).fillColor("#222222").text(description, xDescription + 10, currentY + 14,
                        {
                            width:
                                colDescription - 20
                        }
                    );

                // Quantity

                doc.font(regularFont).fontSize(9.5).text(Number(item.quantity || 0).toFixed(2), xQty, currentY + 15,
                        {
                            width: colQty,
                            align: "center"
                        }
                    );

                // Rate

                doc.font(regularFont).fontSize(9.5).text(money(item.rate), xRate + 2, currentY + 15,
                        {
                            width:
                                colRate - 4,
                            align: "center"
                        }
                    );

                // Amount

                doc.font(regularFont).fontSize(9.5).text(money(item.amount), xAmount + 2, currentY + 15,
                        {
                            width:
                                colAmount - 4,
                            align: "center"
                        }
                    );

                currentY += rowHeight;

            }
        );

        // ==================================================
        // SUBTOTAL
        // ==================================================

        const subtotalHeight = 32;

        drawRect( xRate, currentY, colRate + colAmount, subtotalHeight, null, border);

        doc.font(boldFont).fontSize(10).fillColor("#222222").text("Sub Total", xRate - 95, currentY + 10,
                {
                    width: 90,
                    align: "right"
                }
            );

        doc.font(regularFont).fontSize(10).text(money(invoice.subtotal), xAmount + 5, currentY + 10,
                {
                    width:
                        colAmount - 10,
                    align: "center"
                }
            );

        currentY += subtotalHeight;

        // ==================================================
        // BOTTOM INFORMATION
        // ==================================================

        const bottomTop =currentY;
        // const bottomHeight = 175;

        // Left side

        const summaryX =xQty;
        const summaryWidth =right - summaryX;

        // Left Terms area

        // drawRect(left, bottomTop, summaryX - left, bottomHeight, null, border);

        // Right summary box

        drawRect(summaryX, bottomTop, summaryWidth, 105, lightBlue, border);

        // ==================================================
        // THANKS
        // ==================================================

        doc.font(regularFont).fontSize(10).fillColor(textGray).text("Thanks for choosing us.", left + 10, bottomTop + 22,
        {
            width: summaryX - left - 20
        }
        );

        // ==================================================
        // TERMS & CONDITIONS
        // ==================================================

        doc.font(boldFont).fontSize(11).fillColor("#222222").text("Terms & Conditions", left + 10, bottomTop + 48);

        doc.font(regularFont).fontSize(8.8).fillColor(textGray).text("Full payment is due upon receipt of this invoice.", left + 10, bottomTop + 67,
                {
                    width:summaryX - left - 20
                }
            ).text("Late payments may incur additional charges or", left + 10, bottomTop + 81,
                {
                    width:summaryX - left - 20
                }
            ).text("interest as per the applicable laws.", left + 10, bottomTop + 95,
                {
                    width:summaryX - left - 20
                }
            );

        // ==================================================
        // TAX
        // ==================================================

        doc.font(boldFont).fontSize(9.5).fillColor("#222222").text("Tax Rate", summaryX + 10, bottomTop + 16);

        doc.font(boldFont).fontSize(9.5).text(`${Number(invoice.taxPercentage || 0)
            .toFixed(2)}%`, summaryX + 75, bottomTop + 16,
                {
                    width:summaryWidth - 85,
                    align: "right"
                }
            );

        // ==================================================
        // TOTAL
        // ==================================================

        doc.font(boldFont).fontSize(10.5).text("Total", summaryX + 10, bottomTop + 43);

        doc.font(boldFont).fontSize(10.5).text(money(invoice.totalAmount), summaryX + 75, bottomTop + 43,
                {
                    width:summaryWidth - 85,
                    align: "right"
                }
            );

        // ==================================================
        // BALANCE DUE
        // ==================================================

        doc.font(boldFont).fontSize(10.5).text("Balance Due", summaryX + 10, bottomTop + 70);

        doc.font(boldFont).fontSize(10.5).text(money(invoice.dueAmount), summaryX + 75, bottomTop + 70,
                {
                    width:summaryWidth - 85,
                    align: "right"
                }
            );

        // ==================================================
        // FOOTER
        // ==================================================

        const footerY = pageHeight - 55;

        doc.font(regularFont).fontSize(8).fillColor(textGray).text("Lakshmi Narayan And Company", left, footerY,
        {
            width: contentWidth,
            align: "center",
            lineBreak: false
        }
        );

        doc.end();

    } catch (error) {

        console.error("Invoice PDF Error:", error);

        if (!res.headersSent) {

            return res.status(500).json({success: false, message: "Failed to generate invoice PDF"});

        }

    }

};



// ======================================================
// NUMBER TO WORDS - INDIAN FORMAT
// ======================================================

const numberToWordsIndian = (number) => {

    const ones = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen"
    ];

    const tens = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety"
    ];

    const convertBelowThousand = (num) => {

        let result = "";

        if (num >= 100) {

            result +=
                ones[Math.floor(num / 100)] +
                " Hundred ";

            num %= 100;

        }

        if (num >= 20) {

            result +=
                tens[Math.floor(num / 10)] +
                " ";

            num %= 10;

        }

        if (num > 0) {

            result +=
                ones[num] +
                " ";

        }

        return result.trim();

    };

    number = Math.floor(Number(number || 0));

    if (number === 0) {

        return "Zero";

    }

    let result = "";

    const crore = Math.floor(number / 10000000);

    number %= 10000000;

    const lakh = Math.floor(number / 100000);

    number %= 100000;

    const thousand = Math.floor(number / 1000);

    number %= 1000;

    if (crore) {

        result +=
            convertBelowThousand(crore) +
            " Crore ";

    }

    if (lakh) {

        result +=
            convertBelowThousand(lakh) +
            " Lakh ";

    }

    if (thousand) {

        result +=
            convertBelowThousand(thousand) +
            " Thousand ";

    }

    if (number) {

        result +=
            convertBelowThousand(number);

    }

    return result.trim();

};



// ======================================================
// DOWNLOAD GST TAX INVOICE PDF
// ======================================================

const downloadClientGSTInvoicePDF = async (req, res) => {

    try {

        const companyId = req.client.companyId;
        const invoice = await ClientInvoice.findOne({_id: req.params.id, company: companyId, isActive: true})
        .populate("company", "companyName contactPerson email phone address gstNumber")
        .populate("project", "projectName projectType");

        if (!invoice) {

            return res.status(404).json({success: false, message: "Invoice not found"});

        }

        if (invoice.invoiceType !== "GST Invoice") {

            return res.status(400).json({success: false, message: "This is not a GST Invoice"});

        }

        const doc = new PDFDocument({
            size: "A4",
            margin: 0
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${invoice.invoiceNumber}-GST-Invoice.pdf"`
        );

        doc.pipe(res);

        // ==================================================
        // PAGE
        // ==================================================

        const pageWidth = 595.28;
        const pageHeight = 841.89;

        const left = 35;
        const right = pageWidth - 35;
        const contentWidth = right - left;

        const blue = "#173F91";
        const lightBlue = "#B8D0F5";
        const lightGray = "#E5E7EB";
        const border = "#222222";
        const textGray = "#444444";

        // ==================================================
        // HELPERS
        // ==================================================

        const money = (value) => {

            return `₹${Number(value || 0).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )}`;

        };

        const dateFormat = (date) => {

            if (!date) return "";

            return new Date(date).toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        };

        const drawLine = (
            x1,
            y1,
            x2,
            y2,
            width = 1
        ) => {

            doc
                .lineWidth(width)
                .strokeColor(border)
                .moveTo(x1, y1)
                .lineTo(x2, y2)
                .stroke();

        };

        const drawRect = (
            x,
            y,
            width,
            height,
            fill = null,
            stroke = border
        ) => {

            if (fill) {

                doc
                    .fillColor(fill)
                    .rect(x, y, width, height)
                    .fill();

            }

            if (stroke) {

                doc
                    .lineWidth(1)
                    .strokeColor(stroke)
                    .rect(x, y, width, height)
                    .stroke();

            }

        };

        // ==================================================
        // OUTER BORDER
        // ==================================================

        drawRect(
            left,
            35,
            contentWidth,
            pageHeight - 70,
            null,
            border
        );

        // ==================================================
        // HEADER
        // ==================================================

        const headerTop = 35;
        const headerHeight = 146;

        doc
            .font(boldFont)
            .fontSize(17)
            .fillColor("#111111")
            .text(
                "LAKSHMI NARAYAN AND COMPANY",
                left + 12,
                headerTop + 12,
                {
                    width: 310
                }
            );

        doc
            .font(regularFont)
            .fontSize(10)
            .fillColor(textGray)
            .text(
                "76/229, Kuli Bazar",
                left + 12,
                headerTop + 38
            )
            .text(
                "District: Kanpur Nagar",
                left + 12,
                headerTop + 54
            )
            .text(
                "State: Uttar Pradesh",
                left + 12,
                headerTop + 70
            )
            .text(
                "Country: India",
                left + 12,
                headerTop + 86
            )
            .text(
                `Email: ${process.env.SELLER_EMAIL || ""}`,
                left + 12,
                headerTop + 102
            )
            .text(
                "Contact: 9335187678",
                left + 12,
                headerTop + 118
            )
            .text(
                `GSTIN: ${process.env.SELLER_GSTIN || "09BYAPS6688F1ZT"}`,
                left + 12,
                headerTop + 134
            );

        // ==================================================
        // ORIGINAL FOR RECIPIENT
        // ==================================================

        doc
            .font(boldFont)
            .fontSize(9)
            .fillColor("#444444")
            .text(
                "ORIGINAL FOR RECIPIENT",
                345,
                headerTop + 17,
                {
                    width: 205,
                    align: "right",
                    lineBreak: false
                }
            );

        // ==================================================
        // TAX INVOICE HEADING
        // ==================================================

        doc
            .font(boldFont)
            .fontSize(27)
            .fillColor(blue)
            .text(
                "TAX INVOICE",
                345,
                headerTop + 48,
                {
                    width: 205,
                    align: "right",
                    lineBreak: false
                }
            );

        drawLine(
            left,
            headerTop + headerHeight,
            right,
            headerTop + headerHeight
        );

        // ==================================================
        // INVOICE INFORMATION
        // ==================================================

        const infoTop = headerTop + headerHeight;
        const infoHeight = 82;

        const middleX =
            left + contentWidth * 0.50;

        drawLine(
            middleX,
            infoTop,
            middleX,
            infoTop + infoHeight
        );

        doc
            .font(regularFont)
            .fontSize(9.5)
            .fillColor(textGray)
            .text(
                "Invoice#",
                left + 12,
                infoTop + 13
            )
            .text(
                "Invoice Date",
                left + 12,
                infoTop + 31
            )
            .text(
                "Terms",
                left + 12,
                infoTop + 49
            )
            .text(
                "Due Date",
                left + 12,
                infoTop + 67
            );

        doc
            .font(boldFont)
            .fontSize(9.5)
            .fillColor("#222222")
            .text(
                invoice.invoiceNumber,
                left + 105,
                infoTop + 13
            )
            .text(
                dateFormat(invoice.issueDate),
                left + 105,
                infoTop + 31
            )
            .text(
                "Due on Receipt",
                left + 105,
                infoTop + 49
            )
            .text(
                dateFormat(invoice.dueDate),
                left + 105,
                infoTop + 67
            );

        // ==================================================
        // SUPPLY / GST INFORMATION
        // ==================================================

        doc
            .font(regularFont)
            .fontSize(9.5)
            .fillColor(textGray)
            .text(
                "Place of Supply",
                middleX + 10,
                infoTop + 13
            )
            .text(
                "Supply Type",
                middleX + 10,
                infoTop + 31
            )
            .text(
                "Seller State Code",
                middleX + 10,
                infoTop + 49
            )
            .text(
                "Buyer State Code",
                middleX + 10,
                infoTop + 67
            );

        doc
            .font(boldFont)
            .fontSize(9.5)
            .fillColor("#222222")
            .text(
                invoice.placeOfSupply ||
                invoice.clientState ||
                "",
                middleX + 105,
                infoTop + 13
            )
            .text(
                invoice.gstType === "IGST"
                    ? "Inter-State"
                    : "Intra-State",
                middleX + 105,
                infoTop + 31
            )
            .text(
                process.env.SELLER_STATE_CODE || "09",
                middleX + 105,
                infoTop + 49
            )
            .text(
                invoice.clientStateCode || "",
                middleX + 105,
                infoTop + 67
            );

        // ==================================================
        // BILL TO / SHIP TO
        // ==================================================

        const addressTop =
            infoTop + infoHeight;

        const addressHeaderHeight = 27;
        const addressHeight = 60;

        drawRect(
            left,
            addressTop,
            contentWidth / 2,
            addressHeaderHeight,
            lightGray,
            border
        );

        drawRect(
            middleX,
            addressTop,
            contentWidth / 2,
            addressHeaderHeight,
            lightGray,
            border
        );

        doc
            .font(regularFont)
            .fontSize(10.5)
            .fillColor("#222222")
            .text(
                "Bill To",
                left + 10,
                addressTop + 8
            )
            .text(
                "Ship To",
                middleX + 10,
                addressTop + 8
            );

        drawLine(
            middleX,
            addressTop,
            middleX,
            addressTop +
            addressHeaderHeight +
            addressHeight
        );

        drawLine(
            left,
            addressTop +
            addressHeaderHeight +
            addressHeight,
            right,
            addressTop +
            addressHeaderHeight +
            addressHeight
        );

        // ==================================================
        // BUYER
        // ==================================================

        const clientName =
            invoice.company?.companyName ||
            "Client";

        doc
            .font(boldFont)
            .fontSize(8.5)
            .fillColor("#222222")
            .text(
                clientName,
                left + 10,
                addressTop + 27,
                {
                    width: 195
                }
            );

        doc
            .font(regularFont)
            .fontSize(7)
            .fillColor(textGray)
            .text(
                invoice.clientAddress || "",
                left + 10,
                addressTop + 40,
                {
                    width: 195,
                    lineGap: 1
                }
            );

        doc
            .font(boldFont)
            .fontSize(8)
            .fillColor("#222222")
            .text(
                `GSTIN: ${invoice.buyerGSTIN || invoice.company?.gstNumber || "N/A"}`,
                left + 10,
                addressTop + 68,
                {
                    width: 205
                }
            );

        doc
            .font(regularFont)
            .fontSize(7)
            .fillColor(textGray)
            .text(
                `State: ${invoice.clientState || ""}`,
                middleX + 10,
                addressTop + 27,
                {
                    width: 205
                }
            )
            .text(
                invoice.clientAddress || "",
                middleX + 10,
                addressTop + 37,
                {
                    width: 205,
                    lineGap: 1
                }
            )
            .text(
                `State Code: ${invoice.clientStateCode || ""}`,
                middleX + 10,
                addressTop + 67,
                {
                    width: 205
                }
            );

        // ==================================================
        // ITEM TABLE
        // ==================================================

        const tableTop =
            addressTop +
            addressHeaderHeight +
            addressHeight;

        const tableHeaderHeight = 31;

        const colNo = 27;
        const colDescription = 190;
        const colHSN = 65;
        const colQty = 45;
        const colRate = 65;
        const colIGST = 55;

        const colAmount =
            contentWidth -
            colNo -
            colDescription -
            colHSN -
            colQty -
            colRate -
            colIGST;

        const xNo = left;

        const xDescription =xNo + colNo;

        const xHSN =xDescription + colDescription;

        const xQty =xHSN + colHSN;

        const xRate =xQty + colQty;

        const xIGST =xRate + colRate;

        const xAmount=xIGST + colIGST;

        doc
            .fillColor(blue)
            .rect(
                left,
                tableTop,
                contentWidth,
                tableHeaderHeight
            )
            .fill();

        doc
            .font(regularFont)
            .fontSize(8)
            .fillColor("#FFFFFF")
            .text(
                "#",
                xNo + 7,
                tableTop + 10
            )
            .text(
                "Item & Description",
                xDescription + 6,
                tableTop + 10
            )
            .text(
                "HSN/SAC",
                xHSN + 3,
                tableTop + 10,
                {
                    width: colHSN - 6,
                    align: "center"
                }
            )
            .text(
                "Qty",
                xQty,
                tableTop + 10,
                {
                    width: colQty,
                    align: "center"
                }
            )
            .text(
                "Rate",
                xRate,
                tableTop + 10,
                {
                    width: colRate,
                    align: "center"
                }
            )
            .text(
                "IGST",
                xIGST,
                tableTop + 10,
                {
                    width: colIGST,
                    align: "center"
                }
            )
            .text(
                "Amount",
                xAmount,
                tableTop + 10,
                {
                    width: colAmount,
                    align: "center"
                }
            );

        drawLine(
            xDescription,
            tableTop,
            xDescription,
            tableTop + tableHeaderHeight
        );

        drawLine(
            xHSN,
            tableTop,
            xHSN,
            tableTop + tableHeaderHeight
        );

        drawLine(
            xQty,
            tableTop,
            xQty,
            tableTop + tableHeaderHeight
        );

        drawLine(
            xRate,
            tableTop,
            xRate,
            tableTop + tableHeaderHeight
        );

        drawLine(
            xIGST,
            tableTop,
            xIGST,
            tableTop + tableHeaderHeight
        );

        drawLine(
            xAmount,
            tableTop,
            xAmount,
            tableTop + tableHeaderHeight
        );

        // ==================================================
        // ITEM ROWS
        // ==================================================

        let currentY =
            tableTop +
            tableHeaderHeight;

        const itemRows =
            invoice.items || [];

        itemRows.forEach(
            (item, index) => {

                const description =
                    item.description || "";

                const descriptionHeight =
                    doc.heightOfString(
                        description,
                        {
                            width:
                                colDescription - 12,
                            font:
                                regularFont,
                            fontSize:
                                9
                        }
                    );

                const rowHeight =
                    Math.max(
                        35,
                        descriptionHeight + 25
                    );

                drawRect(
                    left,
                    currentY,
                    contentWidth,
                    rowHeight,
                    null,
                    border
                );

                drawLine(
                    xDescription,
                    currentY,
                    xDescription,
                    currentY + rowHeight
                );

                drawLine(
                    xHSN,
                    currentY,
                    xHSN,
                    currentY + rowHeight
                );

                drawLine(
                    xQty,
                    currentY,
                    xQty,
                    currentY + rowHeight
                );

                drawLine(
                    xRate,
                    currentY,
                    xRate,
                    currentY + rowHeight
                );

                drawLine(
                    xIGST,
                    currentY,
                    xIGST,
                    currentY + rowHeight
                );

                drawLine(
                    xAmount,
                    currentY,
                    xAmount,
                    currentY + rowHeight
                );

                doc
                    .font(regularFont)
                    .fontSize(8.5)
                    .fillColor("#222222")
                    .text(
                        String(index + 1),
                        xNo + 9,
                        currentY + 15
                    );

                doc
                    .font(regularFont)
                    .fontSize(9)
                    .text(
                        description,
                        xDescription + 6,
                        currentY + 12,
                        {
                            width:
                                colDescription - 12
                        }
                    );

                doc
                    .font(regularFont)
                    .fontSize(8)
                    .text(
                        item.hsnSac || "-",
                        xHSN + 3,
                        currentY + 15,
                        {
                            width:
                                colHSN - 6,
                            align: "center"
                        }
                    );

                doc
                    .font(regularFont)
                    .fontSize(8.5)
                    .text(
                        Number(
                            item.quantity || 0
                        ).toFixed(2),
                        xQty,
                        currentY + 15,
                        {
                            width: colQty,
                            align: "center"
                        }
                    );

                doc
                    .font(regularFont)
                    .fontSize(8.5)
                    .text(
                        money(item.rate),
                        xRate + 2,
                        currentY + 15,
                        {
                            width:
                                colRate - 4,
                            align: "center"
                        }
                    );

                    const itemIGSTPercentage=Number(invoice.igstPercentage || 0);

            const itemIGSTAmount =invoice.gstType === "IGST" ? Number(item.amount || 0) * itemIGSTPercentage / 100: 0;

            doc
                .font(regularFont)
                .fontSize(8)
                .text(
                    `${itemIGSTPercentage.toFixed(2)}%`,
                    xIGST,
                    currentY + 10,
                    {
                        width: colIGST,
                        align: "center"
                    }
                )
                .text(
                    money(itemIGSTAmount),
                    xIGST,
                    currentY + 22,
                    {
                        width: colIGST,
                        align: "center"
                    }
                );

                doc
                    .font(regularFont)
                    .fontSize(8.5)
                    .text(
                        money(item.amount),
                        xAmount + 2,
                        currentY + 15,
                        {
                            width:
                                colAmount - 4,
                            align: "center"
                        }
                    );

                currentY += rowHeight;

            }
        );

        // ==================================================
        // BANK ACCOUNT DETAILS
        // ==================================================

        // ==================================================
        // BOTTOM SECTION
        // LEFT  = BANK DETAILS + TERMS
        // RIGHT = AMOUNT / GST SUMMARY
        // ==================================================

        const bottomTop = currentY;

        // --------------------------------------------------
        // COLUMN WIDTHS
        // --------------------------------------------------

        const leftColumnWidth = xQty - left;
        const rightColumnX = xQty;
        const rightColumnWidth = right - rightColumnX;


        // ==================================================
        // RIGHT SIDE - AMOUNT SECTION
        // ==================================================

        const taxableValue = Number(invoice.subtotal || 0);

        const gstRate = Number(invoice.taxPercentage || 0);

        const totalGST = Number(invoice.taxAmount || 0);

        let cgst = 0;
        let sgst = 0;
        let igst = 0;

        if (invoice.gstType === "IGST") {

            igst = totalGST;

        } else {

            cgst = totalGST / 2;
            sgst = totalGST / 2;

        }


        // --------------------------------------------------
        // RIGHT SUMMARY HEIGHT
        // --------------------------------------------------

        const summaryHeight =
            invoice.gstType === "IGST"
                ? 150
                : 170;


        // --------------------------------------------------
        // RIGHT SUMMARY BOX
        // --------------------------------------------------

        drawRect(
            rightColumnX,
            bottomTop,
            rightColumnWidth,
            summaryHeight,
            lightBlue,
            border
        );


        // ==================================================
        // RIGHT SIDE - TAXABLE VALUE
        // ==================================================

        const taxX = rightColumnX + 10;

        const taxValueX = rightColumnX + 92;

        doc
            .font(boldFont)
            .fontSize(8.8)
            .fillColor("#222222")
            .text(
                "Taxable Amount",
                taxX,
                bottomTop + 12
            );

        doc
            .font(boldFont)
            .fontSize(8.8)
            .text(
                money(taxableValue),
                taxValueX,
                bottomTop + 12,
                {
                    width: rightColumnWidth - 102,
                    align: "right"
                }
            );


        // ==================================================
        // GST
        // ==================================================

        if (invoice.gstType === "IGST") {

            doc
                .font(boldFont)
                .fontSize(8.8)
                .text(
                    `IGST (${gstRate.toFixed(2)}%)`,
                    taxX,
                    bottomTop + 35
                )
                .text(
                    money(igst),
                    taxValueX,
                    bottomTop + 35,
                    {
                        width: rightColumnWidth - 102,
                        align: "right"
                    }
                );

        } else {

            doc
                .font(boldFont)
                .fontSize(8.8)
                .text(
                    `CGST (${(gstRate / 2).toFixed(2)}%)`,
                    taxX,
                    bottomTop + 35
                )
                .text(
                    money(cgst),
                    taxValueX,
                    bottomTop + 35,
                    {
                        width: rightColumnWidth - 102,
                        align: "right"
                    }
                );

            doc
                .font(boldFont)
                .fontSize(8.8)
                .text(
                    `SGST (${(gstRate / 2).toFixed(2)}%)`,
                    taxX,
                    bottomTop + 58
                )
                .text(
                    money(sgst),
                    taxValueX,
                    bottomTop + 58,
                    {
                        width: rightColumnWidth - 102,
                        align: "right"
                    }
                );

        }


        // ==================================================
        // TOTAL POSITION
        // ==================================================

        const totalY =
            invoice.gstType === "IGST"
                ? bottomTop + 68
                : bottomTop + 91;


        // --------------------------------------------------
        // SEPARATOR
        // --------------------------------------------------

        drawLine(
            rightColumnX + 8,
            totalY - 7,
            right - 8,
            totalY - 7
        );


        // ==================================================
        // GRAND TOTAL
        // ==================================================

        doc
            .font(boldFont)
            .fontSize(9.5)
            .fillColor("#222222")
            .text(
                "Grand Total",
                taxX,
                totalY + 5
            );

        doc
            .font(boldFont)
            .fontSize(9.5)
            .text(
                money(invoice.totalAmount),
                taxValueX,
                totalY + 5,
                {
                    width: rightColumnWidth - 102,
                    align: "right"
                }
            );


        // ==================================================
        // PAID AMOUNT
        // ==================================================

        doc
            .font(boldFont)
            .fontSize(8.8)
            .text(
                "Paid Amount",
                taxX,
                totalY + 30
            );

        doc
            .font(boldFont)
            .fontSize(8.8)
            .text(
                money(invoice.paidAmount),
                taxValueX,
                totalY + 30,
                {
                    width: rightColumnWidth - 102,
                    align: "right"
                }
            );


        // ==================================================
        // BALANCE DUE
        // ==================================================

        doc
            .font(boldFont)
            .fontSize(9.5)
            .text(
                "Balance Due",
                taxX,
                totalY + 53
            );

        doc
            .font(boldFont)
            .fontSize(9.5)
            .text(
                money(invoice.dueAmount),
                taxValueX,
                totalY + 53,
                {
                    width: rightColumnWidth - 102,
                    align: "right"
                }
            );


        // ==================================================
        // LEFT SIDE - BANK ACCOUNT DETAILS
        // ==================================================

        const bankTop = bottomTop + 5;

        doc
            .font(boldFont)
            .fontSize(10)
            .fillColor("#222222")
            .text(
                "Bank Account Details",
                left + 10,
                bankTop,
                {
                    width: leftColumnWidth - 20
                }
            );

        doc
            .font(regularFont)
            .fontSize(8.5)
            .fillColor(textGray)
            .text(
                "Account Holder Name: Lakshmi Narayan And Co",
                left + 10,
                bankTop + 18,
                {
                    width: leftColumnWidth - 20
                }
            )
            .text(
                "Bank Name: State Bank Of India",
                left + 10,
                bankTop + 33,
                {
                    width: leftColumnWidth - 20
                }
            )
            .text(
                "Account Number: 44567921145",
                left + 10,
                bankTop + 48,
                {
                    width: leftColumnWidth - 20
                }
            )
            .text(
                "Branch Name: Halsey Road (Kanpur)",
                left + 10,
                bankTop + 63,
                {
                    width: leftColumnWidth - 20
                }
            )
            .text(
                "IFSC Code: SBIN0001226",
                left + 10,
                bankTop + 78,
                {
                    width: leftColumnWidth - 20
                }
            );


        // ==================================================
        // LEFT SIDE - TERMS & CONDITIONS
        // VERY SMALL GAP AFTER BANK DETAILS
        // ==================================================

        const termsTop = bankTop + 99;

        doc
            .font(boldFont)
            .fontSize(10)
            .fillColor("#222222")
            .text(
                "Terms & Conditions",
                left + 10,
                termsTop,
                {
                    width: leftColumnWidth - 20
                }
            );

        doc
            .font(regularFont)
            .fontSize(7.8)
            .fillColor(textGray)
            .text(
                "Full payment is due upon receipt of this invoice.",
                left + 10,
                termsTop + 17,
                {
                    width: leftColumnWidth - 20
                }
            )
            .text(
                "Late payments may incur additional charges",
                left + 10,
                termsTop + 31,
                {
                    width: leftColumnWidth - 20
                }
            )
            .text(
                "as per the applicable terms.",
                left + 10,
                termsTop + 44,
                {
                    width: leftColumnWidth - 20
                }
            );


        // ==================================================
        // AMOUNT IN WORDS
        // ==================================================

        const amountWordsY =
            bottomTop +
            Math.max(summaryHeight, 160) +
            10;

        doc
            .font(boldFont)
            .fontSize(9)
            .fillColor("#222222")
            .text(
                "Amount in Words:",
                left + 10,
                amountWordsY
            );

        doc
            .font(regularFont)
            .fontSize(9)
            .fillColor(textGray)
            .text(
                `Rupees ${numberToWordsIndian(
                    Number(invoice.totalAmount || 0)
                )} Only`,
                left + 105,
                amountWordsY,
                {
                    width: contentWidth - 115
                }
            );

        // ==================================================
        // AUTHORIZED SIGNATORY
        // ==================================================

        const signY =
            amountWordsY + 10;
        const signBoxX = right - 195;
        const signBoxWidth = 180;
        

        // --------------------------------------------------
        // COMPANY NAME
        // --------------------------------------------------

        doc
            .font(regularFont)
            .fontSize(8)
            .fillColor(textGray)
            .text(
                "For LAKSHMI NARAYAN AND COMPANY",
                signBoxX,
                signY,
                {
                    width: signBoxWidth,
                    align: "center",
                    lineBreak: false
                }
            );

        // --------------------------------------------------
        // SIGNATURE IMAGE
        // --------------------------------------------------

        doc.image(
            signatureImage,
            signBoxX + 35,
            signY + 15,
            {
                fit: [110, 42],
                align: "center",
                valign: "center"
            }
        );

        // --------------------------------------------------
        // SIGNATURE LINE
        // --------------------------------------------------

        drawLine(
            signBoxX + 5,
            signY + 60,
            signBoxX + signBoxWidth - 5,
            signY + 60
        );

        // --------------------------------------------------
        // AUTHORIZED SIGNATORY
        // --------------------------------------------------

        doc
            .font(regularFont)
            .fontSize(8)
            .fillColor(textGray)
            .text(
                "Authorized Signatory",
                signBoxX,
                signY + 65,
                {
                    width: signBoxWidth,
                    align: "center",
                    lineBreak: false
                }
            );

        // ==================================================
        // FOOTER
        // ==================================================

        doc
            .font(regularFont)
            .fontSize(8)
            .fillColor(textGray)
            .text(
                "This is a computer generated GST Tax Invoice.",
                left,
                pageHeight - 52,
                {
                    width: contentWidth,
                    align: "center",
                    lineBreak: false
                }
            );

        doc.end();

    } catch (error) {

        console.error("GST Invoice PDF Error:", error);

        if (!res.headersSent) {

            return res.status(500).json({success: false, message: "Failed to generate GST invoice PDF"});

        }

    }

};

// ======================================================
// EXPORT
// ======================================================

module.exports={
            getAllInvoices,
            getInvoiceById,
            createInvoice,
            updateInvoice,
            deleteInvoice,
            getClientInvoices,
            getClientInvoiceById,
            createInvoicePaymentOrder,
            verifyInvoicePayment,
            downloadClientInvoicePDF,
            downloadClientGSTInvoicePDF
};