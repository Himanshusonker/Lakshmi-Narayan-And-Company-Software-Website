const ClientCompany = require("../models/clientCompanyModel");

// ======================================================
// GET ALL COMPANIES
// ======================================================

const getAllCompanies = async (req, res) => {
    try {

        const companies = await ClientCompany.find().select("-password").sort({ createdAt: -1 });

        return res.status(200).json({success: true, count: companies.length, companies});

    } catch (error) {

        console.error("Get Companies Error:", error);

        return res.status(500).json({success: false, message: "Failed to fetch companies"});
    }
};


// ======================================================
// GET SINGLE COMPANY
// ======================================================

const getCompanyById = async (req, res) => {
    try {

        const { id } = req.params;

        const company = await ClientCompany.findById(id).select("-password");
        if (!company) 
        {

            return res.status(404).json({success: false, message: "Company not found"});
        }

        return res.status(200).json({success: true, company});

    } catch (error) {

        console.error("Get Company Error:", error);

        return res.status(500).json({success: false, message: "Failed to fetch company"});
    }
};


// ======================================================
// UPDATE COMPANY
// ======================================================

const updateCompany = async (req, res) => {
    try {

        const { id } = req.params;

        const {companyName, contactPerson, email, phone, address, gstNumber, isActive} = req.body;

        const company = await ClientCompany.findById(id);

        if (!company) 
        {

            return res.status(404).json({success: false, message: "Company not found"});
        }

        if (companyName !== undefined) 
        {
            company.companyName = companyName;
        }

        if (contactPerson !== undefined) 
        {
            company.contactPerson = contactPerson;
        }

        if (email !== undefined) 
        {
            company.email = email;
        }

        if (phone !== undefined) 
        {
            company.phone = phone;
        }

        if (address !== undefined) 
        {
            company.address = address;
        }

        if (gstNumber !== undefined) 
        {
            company.gstNumber = gstNumber;
        }

        if (isActive !== undefined) 
        {
            company.isActive = isActive;
        }

        await company.save();

        return res.status(200).json({success: true, message: "Company updated successfully",
            company: {
                ...company.toObject(),
                password: undefined
            }
        });

    } catch (error) {

        console.error("Update Company Error:", error);

        return res.status(500).json({success: false, message: "Failed to update company"});
    }
};


// ======================================================
// DELETE COMPANY
// ======================================================

const deleteCompany = async (req, res) => {
    try {

        const { id } = req.params;

        const company = await ClientCompany.findById(id);

        if (!company) 
        {

            return res.status(404).json({success: false, message: "Company not found"});
        }

        await ClientCompany.findByIdAndDelete(id);

        return res.status(200).json({success: true, message: "Company deleted successfully"});

    } catch (error) {

        console.error("Delete Company Error:", error);

        return res.status(500).json({success: false, message: "Failed to delete company"});
    }
};


// ======================================================
// TOGGLE COMPANY STATUS
// ======================================================

const toggleCompanyStatus = async (req, res) => {
    try {

        const { id } = req.params;

        const company = await ClientCompany.findById(id);

        if (!company) 
        {

            return res.status(404).json({success: false, message: "Company not found"});
        }

        company.isActive = !company.isActive;

        await company.save();

        return res.status(200).json({success: true, message: company.isActive ? "Company activated successfully" : "Company deactivated successfully", isActive: company.isActive});

    } catch (error) {

        console.error("Toggle Company Status Error:", error);

        return res.status(500).json({success: false, message: "Failed to update company status"});
    }
};
module.exports={
        getAllCompanies,
        getCompanyById,
        updateCompany,
        deleteCompany,
        toggleCompanyStatus
};