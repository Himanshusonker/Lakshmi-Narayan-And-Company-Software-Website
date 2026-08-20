const ClientWorkRequest = require("../models/clientWorkRequestModel");
const ClientCompany = require("../models/clientCompanyModel");
const Service = require("../models/serviceModel");


// ======================================================
// CLIENT - CREATE REQUEST
// ======================================================

const createWorkRequest = async (req, res) => {

    try {

        const {company, service, serviceName, category, requirement, attachments, priority} = req.body;

        // console.log(req.body);

        if (!company) {

            return res.status(400).json({success: false, message: "Company is required"});

        }

        if (!service) {

            return res.status(400).json({success: false, message: "Service is required"});

        }

        if (!requirement?.trim()) {

            return res.status(400).json({success: false, message: "Requirement description is required"});

        }


        // ==============================================
        // CHECK COMPANY
        // ==============================================

        const companyData= await ClientCompany.findById(company);

        if (!companyData) {

            return res.status(404).json({success: false, message: "Company not found"});

        }

        if (!companyData.isActive) {

            return res.status(400).json({success: false, message: "Company account is inactive"});

        }


        // ==============================================
        // CHECK SERVICE
        // ==============================================

        const serviceData = await Service.findById(service);

        // console.log("hiiiiiiiiiiiiiii");
        // console.log("========== SERVICE DEBUG ==========");
        // console.log("Service ID:", service);
        // console.log("Service Title:", serviceData?.title);
        // console.log("Service Category:", serviceData?.category);
        // console.log("Full Service:", serviceData);
        // console.log("===================================");

        if (!serviceData) {

            return res.status(404).json({success: false, message: "Service not found"});

        }


        // ==============================================
        // CREATE REQUEST
        // ==============================================

        const request= await ClientWorkRequest.create({

            company:companyData._id,
            service:serviceData._id,
            serviceName:serviceData.title || "",
            category:serviceData.category || "",
            requirement:requirement.trim(),
            attachments:Array.isArray(attachments) ? attachments: [],
            priority:priority || "Medium",
            status: "Pending"

        });

        await request.populate("company", "companyName contactPerson email phone");

        return res.status(201).json({success: true, message: "Work request submitted successfully", request});

    } catch (error) {

        console.error("Create Work Request Error:", error);

        return res.status(500).json({success: false, message: "Failed to submit work request"});

    }

};


// ======================================================
// CLIENT - GET MY REQUESTS
// ======================================================

const getClientWorkRequests = async (req, res) => {

    try {

        const { companyId }= req.params;

        const requests=await ClientWorkRequest.find({company: companyId}).populate("company","companyName contactPerson email phone").sort({createdAt: -1});

        return res.status(200).json({success: true, count: requests.length, requests});

    } catch (error) {

        console.error("Get Client Work Requests Error:", error);

        return res.status(500).json({success: false, message: "Failed to fetch work requests"});

    }

};


// ======================================================
// CLIENT - GET SINGLE REQUEST
// ======================================================

const getClientWorkRequestById = async (req, res) => {

    try {

        const request= await ClientWorkRequest.findOne({_id: req.params.id, company: req.params.companyId}).populate("company","companyName contactPerson email phone");

        if (!request) {

            return res.status(404).json({success: false, message: "Work request not found"});

        }

        return res.status(200).json({success: true, request});

    } catch (error) {

        console.error("Get Work Request Error:", error);

        return res.status(500).json({success: false, message: "Failed to fetch work request"});

    }

};


// ======================================================
// ADMIN - GET ALL REQUESTS
// ======================================================

const getAllWorkRequests = async (req, res) => {

    try {

        const requests= await ClientWorkRequest.find().populate("company","companyName contactPerson email phone").sort({createdAt: -1});

        return res.status(200).json({success: true, count: requests.length, requests});

    } catch (error) {

        console.error("Get All Work Requests Error:", error);

        return res.status(500).json({success: false, message: "Failed to fetch work requests"});

    }

};


// ======================================================
// ADMIN - UPDATE REQUEST
// ======================================================

const updateWorkRequest = async (req, res) => {

    try {

        const {status, priority, adminNotes} = req.body;

        const request=await ClientWorkRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({success: false, message: "Work request not found"});

        }

        if (status !== undefined) {

            request.status = status;

        }

        if (priority !== undefined) {

            request.priority = priority;

        }

        if (adminNotes !== undefined) {

            request.adminNotes = adminNotes;

        }

        await request.save();

        await request.populate("company","companyName contactPerson email phone");

        return res.status(200).json({success: true, message: "Work request updated successfully", request});

    } catch (error) {

        console.error("Update Work Request Error:", error);

        return res.status(500).json({success: false, message: "Failed to update work request"});

    }

};


// ======================================================
// ADMIN - DELETE REQUEST
// ======================================================

const deleteWorkRequest = async (req, res) => {

    try {

        const request=await ClientWorkRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({success: false, message: "Work request not found"});

        }

        await ClientWorkRequest.findByIdAndDelete(req.params.id);

        return res.status(200).json({success: true, message: "Work request deleted successfully"});

    } catch (error) {

        console.error("Delete Work Request Error:", error);

        return res.status(500).json({success: false, message: "Failed to delete work request"});

    }

};
module.exports={
            createWorkRequest,
            getClientWorkRequests,
            getClientWorkRequestById,
            getAllWorkRequests,
            updateWorkRequest,
            deleteWorkRequest
};