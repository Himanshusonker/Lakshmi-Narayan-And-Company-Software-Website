const ServiceModel = require("../models/serviceModel");

// ============================================================================
// GET ALL SERVICES
// ============================================================================

const getAllServices=async(req, res)=>{

    try {

        const services = await ServiceModel.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.status(200).json({success: true, message: "Services fetched successfully", data: services });

    } catch (error) {

        console.log("Get Services Error:", error);
        res.status(500).json({success: false, message: "Unable to fetch services", error: error.message });
    }
};


// ============================================================================
// GET SINGLE SERVICE BY SLUG
// ============================================================================

const getServiceBySlug=async(req, res)=>{

    try {

        const { slug } = req.params;

        const service = await ServiceModel.findOne({ slug: slug, isActive: true });

        if (!service) 
        {

            return res.status(404).json({ success: false, message: "Service not found" });
        }

        res.status(200).json({ success: true, message: "Service fetched successfully", data: service });

    } catch (error) {

        console.log("Get Service Error:", error);
        res.status(500).json({ success: false, message: "Unable to fetch service", error: error.message });
    }
};


// ============================================================================
// CREATE SERVICE
// ============================================================================

const createService=async(req, res)=>{

    try {

        const {title, slug, category, shortDescription, description, icon, image, features, technologies, process, benefits, buttonText, buttonLink, order } = req.body;

        const existingService = await ServiceModel.findOne({ slug: slug });

        if (existingService) 
        {

            return res.status(400).json({ success: false, message: "Service with this slug already exists" });
        }

        const service = await ServiceModel.create({title, slug, category, shortDescription, description, icon, image, features, technologies, process, benefits, buttonText, buttonLink, order });

        res.status(201).json({ success: true, message: "Service created successfully", data: service });

    } catch (error) {

        console.log("Create Service Error:", error);

        res.status(500).json({ success: false, message: "Unable to create service", error: error.message });
    }
};

// ============================================================================
// UPDATE SERVICE
// ============================================================================

const updateService=async(req, res)=>{

    try {

        const { id } = req.params;

        const updatedService= await ServiceModel.findByIdAndUpdate(id, req.body, 
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedService) 
        {

            return res.status(404).json({ success: false, message: "Service not found" });
        }

        res.status(200).json({ success: true, message: "Service updated successfully", data: updatedService });

    } catch (error) {

        console.log("Update Service Error:", error);

        res.status(500).json({ success: false, message: "Unable to update service", error: error.message });
    }
};

// ============================================================================
// DELETE SERVICE
// ============================================================================

const deleteService=async(req, res)=>{

    try {

        const { id } = req.params;

        const deletedService= await ServiceModel.findByIdAndDelete(id);

        if (!deletedService) 
        {

            return res.status(404).json({ success: false, message: "Service not found" });
        }

        res.status(200).json({ success: true, message: "Service deleted successfully" });

    } catch (error) {

        console.log("Delete Service Error:", error);

        res.status(500).json({ success: false, message: "Unable to delete service", error: error.message });
    }
};
module.exports={
            getAllServices,
            getServiceBySlug,
            createService,
            updateService,
            deleteService
};













// const ServiceModel = require("../models/serviceModel");

// // =================================================================================================
// // GET ALL SERVICES
// // =================================================================================================

// const getAllServices = async (req, res) => {
//     try {

//         const services = await ServiceModel
//             .find()
//             .sort({ order: 1 });

//         res.status(200).json({
//             success: true,
//             message: "Services fetched successfully",
//             data: services
//         });

//     } catch (error) {

//         console.log("Get Services Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Unable to fetch services",
//             error: error.message
//         });
//     }
// };


// // =================================================================================================
// // GET SINGLE SERVICE BY SLUG
// // =================================================================================================

// const getServiceBySlug = async (req, res) => {

//     try {

//         const service = await ServiceModel.findOne({
//             slug: req.params.slug
//         });

//         if (!service) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Service not found"
//             });

//         }

//         res.status(200).json({
//             success: true,
//             message: "Service fetched successfully",
//             data: service
//         });

//     } catch (error) {

//         console.log("Get Service Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Unable to fetch service",
//             error: error.message
//         });
//     }
// };


// // =================================================================================================
// // CREATE SERVICE
// // =================================================================================================

// const createService = async (req, res) => {

//     try {

//         const {
//             title,
//             slug,
//             shortDescription,
//             description,
//             icon,
//             image,
//             features,
//             technologies,
//             process,
//             benefits,
//             buttonText,
//             buttonLink,
//             order
//         } = req.body;


//         // -----------------------------------------------------------------------------------------
//         // CHECK SLUG
//         // -----------------------------------------------------------------------------------------

//         const existingService = await ServiceModel.findOne({
//             slug
//         });

//         if (existingService) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Service with this slug already exists"
//             });

//         }


//         // -----------------------------------------------------------------------------------------
//         // CREATE SERVICE
//         // -----------------------------------------------------------------------------------------

//         const service = await ServiceModel.create({

//             title,
//             slug,
//             shortDescription,
//             description,
//             icon,
//             image,
//             features,
//             technologies,
//             process,
//             benefits,
//             buttonText,
//             buttonLink,
//             order

//         });


//         res.status(201).json({

//             success: true,
//             message: "Service created successfully",
//             data: service

//         });

//     } catch (error) {

//         console.log("Create Service Error:", error);

//         res.status(500).json({

//             success: false,
//             message: "Unable to create service",
//             error: error.message

//         });
//     }
// };


// // =================================================================================================
// // UPDATE SERVICE
// // =================================================================================================

// const updateService = async (req, res) => {

//     try {

//         const serviceId = req.params.id;


//         // -----------------------------------------------------------------------------------------
//         // CHECK SERVICE
//         // -----------------------------------------------------------------------------------------

//         const existingService = await ServiceModel.findById(serviceId);

//         if (!existingService) {

//             return res.status(404).json({

//                 success: false,
//                 message: "Service not found"

//             });

//         }


//         // -----------------------------------------------------------------------------------------
//         // CHECK SLUG DUPLICATE
//         // -----------------------------------------------------------------------------------------

//         if (req.body.slug) {

//             const duplicateSlug = await ServiceModel.findOne({

//                 slug: req.body.slug,
//                 _id: { $ne: serviceId }

//             });

//             if (duplicateSlug) {

//                 return res.status(400).json({

//                     success: false,
//                     message: "Another service already uses this slug"

//                 });

//             }
//         }


//         // -----------------------------------------------------------------------------------------
//         // UPDATE
//         // -----------------------------------------------------------------------------------------

//         const updatedService = await ServiceModel.findByIdAndUpdate(

//             serviceId,

//             req.body,

//             {
//                 new: true,
//                 runValidators: true
//             }

//         );


//         res.status(200).json({

//             success: true,
//             message: "Service updated successfully",
//             data: updatedService

//         });

//     } catch (error) {

//         console.log("Update Service Error:", error);

//         res.status(500).json({

//             success: false,
//             message: "Unable to update service",
//             error: error.message

//         });
//     }
// };


// // =================================================================================================
// // DELETE SERVICE
// // =================================================================================================

// const deleteService = async (req, res) => {

//     try {

//         const serviceId = req.params.id;


//         const service = await ServiceModel.findByIdAndDelete(
//             serviceId
//         );


//         if (!service) {

//             return res.status(404).json({

//                 success: false,
//                 message: "Service not found"

//             });

//         }


//         res.status(200).json({

//             success: true,
//             message: "Service deleted successfully"

//         });

//     } catch (error) {

//         console.log("Delete Service Error:", error);

//         res.status(500).json({

//             success: false,
//             message: "Unable to delete service",
//             error: error.message

//         });
//     }
// };


// module.exports = {

//     getAllServices,
//     getServiceBySlug,
//     createService,
//     updateService,
//     deleteService

// };