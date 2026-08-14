const TestimonialModel=require("../models/testimonialModel");


// ============================================================
// GET PUBLIC TESTIMONIALS
// ============================================================

const getTestimonials=async(req, res)=>{

    try {

        const testimonials= await TestimonialModel.find({ isPublished: true }).sort({ order: 1, createdAt: -1  });

        res.status(200).json({success: true, data: testimonials});

    } catch (error) {

        console.log("Get Testimonials Error:", error);

        res.status(500).json({success: false, message: "Unable to fetch testimonials", error: error.message});
    }
};


// ============================================================
// GET ADMIN TESTIMONIALS
// ============================================================

const getAdminTestimonials=async(req, res)=>{

    try {

        const testimonials = await TestimonialModel.find().sort({ order: 1 });

        res.status(200).json({success: true, data: testimonials});

    } catch (error) {

        console.log("Admin Testimonials Error:", error);

        res.status(500).json({success: false, message: "Unable to fetch testimonials", error: error.message});
    }
};


// ============================================================
// CREATE TESTIMONIAL
// ============================================================

const createTestimonial=async(req, res)=>{

    try {
        const { name, email, designation,  message, rating, image, isPublished, order }= req.body;
        // const testimonial= await TestimonialModel.create(req.body);

        // ============================================================================================
        //                                      EMAIL CHECK
        // ============================================================================================

        if (!email || !email.trim()) {

            return res.status(400).json({success: false, message: "Email is required"});

        }

         const normalizedEmail= email.trim().toLowerCase();

        // ============================================================================================
        //                              CHECK EXISTING TESTIMONIAL
        // ============================================================================================

        const existingTestimonial= await TestimonialModel.findOne({email: normalizedEmail});

        if (existingTestimonial) {

            return res.status(409).json({success: false, message:"This client has already submitted a testimonial."});

        }

        const testimonial= await TestimonialModel.create({

                name: name.trim(),

                email: normalizedEmail,

                designation: designation || "",

                message: message.trim(),

                rating: rating || 5,

                image: image || "",

                isPublished:
                    isPublished !== undefined ? isPublished : true,

                order: order || 0

            });

        // ============================================================================================
        //                                      RESPONSE
        // ============================================================================================

        res.status(201).json({success: true, message: "Testimonial added successfully", data: testimonial});

    } catch (error) {

        console.log("Create Testimonial Error:", error);

        // ============================================================================================
        //                              DUPLICATE EMAIL ERROR
        // ============================================================================================

        if (error.code === 11000) {

            return res.status(409).json({success: false, message: "This client has already submitted a testimonial."

            });

        }

        // ============================================================================================
        //                                  SERVER ERROR
        // ============================================================================================

        res.status(500).json({success: false, message: "Unable to add testimonial", error: error.message});
    }
};


// ============================================================
// UPDATE TESTIMONIAL
// ============================================================

const updateTestimonial=async(req, res)=>{

    try {

        const testimonial= await TestimonialModel.findByIdAndUpdate(req.params.id, req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!testimonial) {

            return res.status(404).json({success: false, message: "Testimonial not found"});
        }

        res.status(200).json({success: true, message: "Testimonial updated successfully", data: testimonial});

    } catch (error) {

        console.log("Update Testimonial Error:", error);

        res.status(500).json({success: false, message: "Unable to update testimonial", error: error.message});
    }
};


// ============================================================
// DELETE TESTIMONIAL
// ============================================================

const deleteTestimonial=async(req, res)=>{

    try {

        const testimonial= await TestimonialModel.findByIdAndDelete(req.params.id);

        if (!testimonial) {

            return res.status(404).json({success: false, message: "Testimonial not found"});
        }

        res.status(200).json({success: true, message: "Testimonial deleted successfully"});

    } catch (error) {

        console.log("Delete Testimonial Error:", error);

        res.status(500).json({success: false, message: "Unable to delete testimonial", error: error.message});
    }
};
module.exports={
            getTestimonials,
            getAdminTestimonials,
            createTestimonial,
            updateTestimonial,
            deleteTestimonial
};