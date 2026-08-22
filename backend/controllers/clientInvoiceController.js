const ClientInvoice = require("../models/clientInvoiceModel");
const ClientCompany = require("../models/clientCompanyModel");
const ClientProject = require("../models/clientProjectModel");

const crypto = require("crypto");
const Razorpay = require("razorpay");
const PDFDocument = require("pdfkit");
const path = require("path");
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
        const {company, project, invoiceNumber, title, description, clientAddress, items, taxPercentage, issueDate, dueDate, notes}=req.body;

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
        // CHECK DUPLICATE INVOICE
        // ==================================================

        const existingInvoice=await ClientInvoice.findOne({invoiceNumber});

        if (existingInvoice) {

            return res.status(400).json({success: false, message:"Invoice number already exists"});
        }


        // ==================================================
        // CREATE
        // ==================================================

        const invoice=new ClientInvoice({

                company,

                project:project || null,

                invoiceNumber,

                title,

                description:description || "",

                clientAddress: clientAddress.trim(),

                items:Array.isArray(items) ? items : [],

                taxPercentage:Number(taxPercentage || 0),

                // discount:Number(discount || 0),

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
        const {company, project, invoiceNumber, title, description, clientAddress, items, taxPercentage, issueDate, dueDate, notes, status}=req.body;

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

        if (invoiceNumber !== undefined)
            invoice.invoiceNumber= invoiceNumber;

        if (title !== undefined)
            invoice.title= title;

        if (description !== undefined)
            invoice.description = description;

        if (clientAddress !== undefined) {

            invoice.clientAddress=clientAddress.trim();
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

        invoice.isActive = false;

        await invoice.save();

        return res.status(200).json({success: true, message:"Invoice deleted successfully"});

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

        invoice.payments.push({razorpayOrderId:razorpayOrder.id, amount:invoice.dueAmount, status: "Created"});

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

        const invoice=await ClientInvoice.findOne({company: companyId, "payments.razorpayOrderId":razorpay_order_id, isActive: true});

        if (!invoice) {

            return res.status(404).json({success: false, message:"Payment invoice not found"});
        }

        const generatedSignature=crypto.createHmac("sha256", process.env.KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");

        if (generatedSignature !== razorpay_signature) {

            return res.status(400).json({success: false, message:"Invalid payment signature"});
        }

        const payment=invoice.payments.find(item=>item.razorpayOrderId === razorpay_order_id);

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

        const invoice= await ClientInvoice.findOne({_id: req.params.id, company: companyId, isActive: true}).populate("company", "companyName contactPerson email phone").populate("project", "projectName projectType");

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
        const lightGray = "#F2F3F5";
        const border = "#222222";
        const textGray = "#777777";


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
            .text("Country: India", left + 12, headerTop + 88);


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

        doc.font(boldFont).fontSize(12).fillColor("#222222").text(clientName, left + 10, addressTop + 48,
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
            fontSize: 12
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
        const bottomHeight = 175;

        // Left side

        const summaryX =xQty;
        const summaryWidth =right - summaryX;

        // Left Terms area

        // drawRect(left, bottomTop, summaryX - left, bottomHeight, null, border);

        // Right summary box

        drawRect(summaryX, bottomTop, summaryWidth, 110, lightBlue, border);

        // ==================================================
        // THANKS
        // ==================================================

        doc.font(regularFont).fontSize(10).fillColor(textGray).text("Thanks for choosing us.", left + 10, bottomTop + 35);

        // ==================================================
        // TERMS & CONDITIONS
        // ==================================================

        doc.font(boldFont).fontSize(12).fillColor("#222222").text("Terms & Conditions", left + 10, bottomTop + 90);

        doc.font(regularFont).fontSize(9.5).fillColor(textGray).text("Full payment is due upon receipt of this invoice.", left + 10, bottomTop + 113,
                {
                    width:summaryX - left - 20
                }
            ).text("Late payments may incur additional charges or", left + 10, bottomTop + 128,
                {
                    width:summaryX - left - 20
                }
            ).text("interest as per the applicable laws.", left + 10, bottomTop + 143,
                {
                    width:summaryX - left - 20
                }
            );

        // ==================================================
        // TAX
        // ==================================================

        doc.font(boldFont).fontSize(10).fillColor("#222222").text("Tax Rate", summaryX + 10, bottomTop + 20);

        doc.font(boldFont).fontSize(10).text(`${Number(invoice.taxPercentage || 0)
            .toFixed(2)}%`, summaryX + 80, bottomTop + 20,
                {
                    width:summaryWidth - 90,
                    align: "right"
                }
            );

        // ==================================================
        // TOTAL
        // ==================================================

        doc.font(boldFont).fontSize(11).text("Total", summaryX + 10, bottomTop + 48);

        doc.font(boldFont).fontSize(11).text(money(invoice.totalAmount), summaryX + 80, bottomTop + 48,
                {
                    width:summaryWidth - 90,
                    align: "right"
                }
            );

        // ==================================================
        // BALANCE DUE
        // ==================================================

        doc.font(boldFont).fontSize(11).text("Balance Due", summaryX + 10, bottomTop + 78);

        doc.font(boldFont).fontSize(11).text(money(invoice.dueAmount), summaryX + 80, bottomTop + 78,
                {
                    width:summaryWidth - 90,
                    align: "right"
                }
            );

        // ==================================================
        // FOOTER
        // ==================================================

        doc.font(regularFont).fontSize(8).fillColor(textGray).text("Lakshmi Narayan And Company", left, pageHeight - 55,
                {
                    width: contentWidth,
                    align: "center"
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
            downloadClientInvoicePDF
};