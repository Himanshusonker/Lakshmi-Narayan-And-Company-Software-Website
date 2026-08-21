const ClientInvoice = require("../models/clientInvoiceModel");
const ClientCompany = require("../models/clientCompanyModel");
const ClientProject = require("../models/clientProjectModel");

const crypto = require("crypto");
const Razorpay = require("razorpay");
const PDFDocument = require("pdfkit");
const path = require("path");

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

        const {company, project, invoiceNumber, title, description, items, taxPercentage, discount, issueDate, dueDate, notes}=req.body;

        if (!company || !invoiceNumber || !title || !dueDate) {

            return res.status(400).json({success: false, message:"Company, invoice number, title and due date are required"});
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

                items:Array.isArray(items) ? items : [],

                taxPercentage:Number(taxPercentage || 0),

                discount:Number(discount || 0),

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

        const {company, project, invoiceNumber, title, description, items, taxPercentage, discount, issueDate, dueDate, notes, status}=req.body;

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

        if (items !== undefined)
            invoice.items = items;

        if (taxPercentage !== undefined)
            invoice.taxPercentage =
                Number(taxPercentage);

        if (discount !== undefined)
            invoice.discount =
                Number(discount);

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

        const doc=new PDFDocument({margin: 50});

        doc.font(path.join(__dirname, "../fonts/NotoSans-Regular.ttf"));

        res.setHeader("Content-Type", "application/pdf");

        res.setHeader("Content-Disposition", `attachment; filename="${invoice.invoiceNumber}.pdf"`);

        doc.pipe(res);

        // ==================================================
        // HEADER
        // ==================================================

        doc.fontSize(22).text("LAKSHMI NARAYAN AND COMPANY", {align: "center"});

        doc.moveDown().fontSize(18).text("INVOICE", {align: "center"});

        doc.moveDown();

        // ==================================================
        // INVOICE INFO
        // ==================================================

        doc.fontSize(11).text(`Invoice Number: ${invoice.invoiceNumber}`)
        .text(`Issue Date: ${new Date(invoice.issueDate).toLocaleDateString("en-IN")}`)
        .text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString("en-IN")}`)
        .text(`Status: ${invoice.status}`);

        doc.moveDown();

        // ==================================================
        // COMPANY
        // ==================================================

        doc.fontSize(13).text("Bill To");

        doc.fontSize(11).text(invoice.company?.companyName || "")
        .text(invoice.company?.contactPerson || "").text(invoice.company?.email || "")
        .text(invoice.company?.phone || "");

        doc.moveDown();

        // ==================================================
        // PROJECT
        // ==================================================

        if (invoice.project) {

            doc.fontSize(12).text(`Project: ${invoice.project.projectName}`);

        }

        doc.moveDown();

        // ==================================================
        // ITEMS
        // ==================================================

        doc.fontSize(12).text("Description");

        doc.moveDown(0.5);

        invoice.items.forEach((item, index) => {

                doc.fontSize(10).text(`${index + 1}. ${item.description}`)
                .text(`Quantity: ${item.quantity} | Rate: ₹${Number(item.rate).toLocaleString("en-IN")} | Amount: ₹${Number(item.amount).toLocaleString("en-IN")}`);

                doc.moveDown(0.5);

            }
        );

        doc.moveDown();

        // ==================================================
        // TOTALS
        // ==================================================

        doc.fontSize(11).text(`Subtotal: ₹${Number(invoice.subtotal).toLocaleString("en-IN")}`, {align: "right"})
        .text(`Tax (${invoice.taxPercentage}%): ₹${Number(invoice.taxAmount).toLocaleString("en-IN")}`, {align: "right"})
        .text(`Discount: ₹${Number(invoice.discount).toLocaleString("en-IN")}`, {align: "right"}).fontSize(14)
        .text(`Total: ₹${Number(invoice.totalAmount).toLocaleString("en-IN")}`, {align: "right"}).fontSize(11)
        .text(`Paid: ₹${Number(invoice.paidAmount).toLocaleString("en-IN")}`, {align: "right"})
        .text(`Due: ₹${Number(invoice.dueAmount).toLocaleString("en-IN")}`, {align: "right"});


        // ==================================================
        // NOTES
        // ==================================================

        if (invoice.notes) {

            doc.moveDown().fontSize(11).text("Notes").fontSize(10).text(invoice.notes);

        }

        doc.moveDown(2).fontSize(9).text("Thank you for your business.", {align: "center"});

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