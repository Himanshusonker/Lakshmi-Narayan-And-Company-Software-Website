const mongoose= require("mongoose");

const invoiceItemSchema= new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true
        },

        hsnSac: {
            type: String,
            default: "",
            trim: true
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1
        },

        rate: {
            type: Number,
            required: true,
            min: 0
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        _id: true
    }
);

const paymentSchema=new mongoose.Schema(
    {
        razorpayOrderId: {
            type: String,
            default: ""
        },

        razorpayPaymentId: {
            type: String,
            default: ""
        },

        razorpaySignature: {
            type: String,
            default: ""
        },

        amount: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: [
                "Created",
                "Pending",
                "Paid",
                "Failed",
                "Refunded"
            ],
            default: "Created"
        },

        paidAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);
const clientInvoiceSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClientCompany",
            required: true
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClientProject",
            default: null
        },

        invoiceNumber: {
            type: String,
            required: true,
            trim: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        clientAddress: {
            type: String,
            required: true,
            trim: true
        },


        // ==================================================
        // GST INVOICE DETAILS
        // ==================================================

        invoiceType: {
            type: String,
            enum: ["Invoice", "GST Invoice"],
            default: "Invoice"
        },

        sellerGSTIN: {
            type: String,
            default: "",
            trim: true,
            uppercase: true
        },

        buyerGSTIN: {
            type: String,
            default: "",
            trim: true,
            uppercase: true
        },

        clientState: {
        type: String,
        default: "",
        trim: true
        },

        clientStateCode: {
            type: String,
            default: "",
            trim: true
        },

        placeOfSupply: {
            type: String,
            default: "",
            trim: true
        },

        reverseCharge: {
            type: Boolean,
            default: false
        },

        cgstPercentage: {
            type: Number,
            default: 0,
            min: 0
        },

        cgstAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        sgstPercentage: {
            type: Number,
            default: 0,
            min: 0
        },

        sgstAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        igstPercentage: {
            type: Number,
            default: 0,
            min: 0
        },

        igstAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        gstType: {
            type: String,
            enum: ["CGST_SGST", "IGST"],
            default: "CGST_SGST"
        },

        items: {
            type: [invoiceItemSchema],
            default: []
        },

        subtotal: {
            type: Number,
            default: 0,
            min: 0
        },

        taxPercentage: {
            type: Number,
            default: 0,
            min: 0
        },

        taxAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        // discount: {
        //     type: Number,
        //     default: 0,
        //     min: 0
        // },

        totalAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        paidAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        dueAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        issueDate: {
            type: Date,
            default: Date.now
        },

        dueDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Pending",
                "Paid",
                "Partially Paid",
                "Overdue",
                "Cancelled"
            ],
            default: "Pending"
        },

        notes: {
            type: String,
            default: "",
            trim: true
        },

        paymentHistory: {
            type: [paymentSchema],
            default: []
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);


// ======================================================
// AUTOMATICALLY CALCULATE INVOICE TOTAL
// ======================================================

clientInvoiceSchema.pre("save", function (next) {

    // ==================================================
    // ITEM AMOUNT + SUBTOTAL
    // ==================================================

    const subtotal = this.items.reduce((total, item) => {

        const quantity = Number(item.quantity || 0);
        const rate = Number(item.rate || 0);

        item.amount = quantity * rate;

        return total + item.amount;

    }, 0);

    this.subtotal = subtotal;


    // ==================================================
    // TAX / GST CALCULATION
    // ==================================================

    if (this.invoiceType === "GST Invoice") {

        if (this.gstType === "IGST") {

            // ==========================================
            // IGST
            // ==========================================

            const igstPercentage = Number(this.igstPercentage || 0);

            this.cgstPercentage = 0;
            this.cgstAmount = 0;

            this.sgstPercentage = 0;
            this.sgstAmount = 0;

            this.igstPercentage = igstPercentage;

            this.igstAmount =(subtotal * igstPercentage) / 100;

            this.taxAmount =this.igstAmount;

        } else {

            // ==========================================
            // CGST + SGST
            // ==========================================

            const cgstPercentage = Number(this.cgstPercentage || 0);

            const sgstPercentage = Number(this.sgstPercentage || 0);

            this.cgstPercentage = cgstPercentage;

            this.cgstAmount =(subtotal * cgstPercentage) / 100;

            this.sgstPercentage = sgstPercentage;

            this.sgstAmount =(subtotal * sgstPercentage) / 100;

            this.igstPercentage = 0;
            this.igstAmount = 0;

            this.taxAmount =this.cgstAmount + this.sgstAmount;
        }

    } else {

        // ==============================================
        // NORMAL INVOICE
        // ==============================================

        const taxPercentage =Number(this.taxPercentage || 0);

        this.taxAmount =(subtotal * taxPercentage) / 100;

        this.cgstPercentage = 0;
        this.cgstAmount = 0;

        this.sgstPercentage = 0;
        this.sgstAmount = 0;

        this.igstPercentage = 0;
        this.igstAmount = 0;
    }


    // ==================================================
    // TOTAL
    // ==================================================

    this.totalAmount =Math.max(0, subtotal + this.taxAmount);


    // ==================================================
    // PAID AMOUNT
    // ==================================================

    this.paidAmount =Math.max(0, Number(this.paidAmount || 0));


    // ==================================================
    // DUE AMOUNT
    // ==================================================

    this.dueAmount =Math.max( 0, this.totalAmount - this.paidAmount);


    // ==================================================
    // STATUS
    // ==================================================

    if (this.status !== "Draft" && this.status !== "Cancelled") {

        if (this.dueAmount <= 0) {

            this.status = "Paid";

        } else if (this.paidAmount > 0) {

            this.status = "Partially Paid";

        } else if (
            this.dueDate && new Date(this.dueDate) < new Date()
        ) {

            this.status = "Overdue";

        } else {

            this.status = "Pending";
        }
    }

    next();
});
module.exports= mongoose.model("ClientInvoice", clientInvoiceSchema);