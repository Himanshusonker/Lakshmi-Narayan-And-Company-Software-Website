const mongoose = require("mongoose");


// =================================================================================================
// ADMIN SCHEMA
// =================================================================================================

const adminSchema = new mongoose.Schema(

    {
        name: {

            type: String,

            required: true,

            trim: true

        },


        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },


        password: {

            type: String,

            required: true

        },


        role: {

            type: String,

            default: "admin"

        }

    },

    {
        timestamps: true
    }

);
const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;