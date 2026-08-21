const mongoose= require("mongoose");

const invoiceItemSchema= new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
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
            unique: true,
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

        payments: {
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

    const subtotal = this.items.reduce((total, item) => {

            const quantity = Number(item.quantity || 0);
            const rate = Number(item.rate || 0);

            item.amount = quantity * rate;

            return total + item.amount;

        },
        0
    );

    this.subtotal = subtotal;

    const taxPercentage = Number(this.taxPercentage || 0);

    this.taxAmount= (subtotal * taxPercentage) / 100;

    // ==================================================
    // DISCOUNT CALCULATION CODE COMMENT HAI
    // ==================================================

    // this.totalAmount= Math.max(0, subtotal + this.taxAmount - Number(this.discount || 0));

    this.totalAmount= Math.max(0, subtotal + this.taxAmount);

    this.paidAmount= Math.max(0, Number(this.paidAmount || 0));

    this.dueAmount = Math.max(0, this.totalAmount - this.paidAmount);

    if (this.status !== "Draft" && this.status !== "Cancelled") {

        if (this.dueAmount <= 0) {

            this.status = "Paid";

        } else if (this.paidAmount > 0) {

            this.status = "Partially Paid";

        } else if (this.dueDate && new Date(this.dueDate) < new Date()) {

            this.status = "Overdue";

        } else {

            this.status = "Pending";
        }
    }

    next();
});
module.exports= mongoose.model("ClientInvoice", clientInvoiceSchema);