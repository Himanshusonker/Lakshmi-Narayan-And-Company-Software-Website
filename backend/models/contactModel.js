const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(

    {

        name: {
            type: String,
            required: true,
            trim: true
        },


        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },


        phone: {
            type: String,
            required: true,
            trim: true
        },


        subject: {
            type: String,
            required: true,
            trim: true
        },


        message: {
            type: String,
            required: true,
            trim: true
        },


        status: {
            type: String,
            enum: [
                "New",
                "Read",
                "Replied",
                "Contacted",
                "Closed"
            ],
            default: "New"
        }

    },

    {
        timestamps: true
    }

);
const ContactModel=mongoose.model("ContactMessage", contactSchema);
module.exports = ContactModel;