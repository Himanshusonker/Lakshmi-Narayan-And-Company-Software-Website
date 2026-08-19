import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientWorkRequest = () => {

    const [services, setServices] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({

        service: "",
        requirement: "",
        priority: "Medium"

    });

    const [attachment, setAttachment] = useState(null);

    const companyId=localStorage.getItem("companyId");

    // ======================================================
    // API BASE URL
    // ======================================================

    const API_URL=import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;


    // ======================================================
    // FETCH SERVICES
    // ======================================================

    const fetchServices = async () => {

        try {

            const response=await axios.get(`${API_URL}/api/services`);

            console.log("SERVICES API RESPONSE:", response.data);

            if (response.data.success) {

                setServices(response.data.services || []);

            }

        } catch (error) {

            console.error("Fetch Services Error:", error);
            console.error("Services Error Response:", error.response?.data);

        }

    };


    // ======================================================
    // FETCH REQUESTS
    // ======================================================

    const fetchRequests = async () => {

        try {

            const response=await axios.get(`${API_URL}/api/client/work-requests/company/${companyId}`);

            if (response.data.success) {

                setRequests(response.data.requests || []);

            }

        } catch (error) {

            console.error("Fetch Requests Error:", error);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchServices();

        if (companyId) {

            fetchRequests();

        } else {

            setLoading(false);

        }

    }, []);


    // ======================================================
    // CHANGE
    // ======================================================

    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData((prev) => ({...prev, [name]: value}));

    };


    // ======================================================
    // SUBMIT
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!companyId) {

            alert("Company login information not found.");

            return;

        }


        if (!formData.service) {

            alert("Please select a service.");

            return;

        }

        if (!formData.requirement.trim()) {

            alert("Please enter your requirement.");

            return;

        }


        try {

            setSubmitting(true);

            const selectedService=services.find((item) =>item._id === formData.service);

            const attachments = [];

            /*
             * Attachment upload can be connected
             * to Cloudinary here.
             */

            if (attachment) {

                const cloudinaryData=new FormData();

                cloudinaryData.append("file", attachment);

                cloudinaryData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                const cloudinaryResponse=await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
                        {
                            method: "POST",

                            body: cloudinaryData
                        }
                    );

                const cloudinaryResult=await cloudinaryResponse.json();

                if (!cloudinaryResult.secure_url) {

                    throw new Error("Attachment upload failed");

                }

                attachments.push({

                    name:attachment.name,
                    originalName:attachment.name,
                    url:cloudinaryResult.secure_url,
                    publicId:cloudinaryResult.public_id || "",
                    fileType:attachment.type,
                    fileSize:attachment.size,
                    uploadedAt:new Date()

                });

            }

            const response=await axios.post(`${API_URL}/api/client/work-requests`,
                    {

                        company:companyId,
                        service:formData.service,
                        serviceName:selectedService?.serviceName || selectedService?.title || "",
                        category:selectedService?.category || "",
                        requirement:formData.requirement,
                        priority:formData.priority,
                        attachments
                    }
                );

            if (response.data.success) {

                alert("Work request submitted successfully.");

                setFormData({service: "", requirement: "", priority: "Medium"});

                setAttachment(null);

                const fileInput = document.getElementById("workRequestAttachment");

                if (fileInput) {
                    fileInput.value = "";
                }

                fetchRequests();

            }

        } catch (error) {

            console.error("Submit Work Request Error:", error);

            alert(error.response?.data?.message || error.message || "Failed to submit request.");

        } finally {

            setSubmitting(false);

        }

    };


    // ======================================================
    // STATUS CLASS
    // ======================================================

    const getStatusClass = (status) => {

        return status ?.toLowerCase().replaceAll(" ", "-");

    };

    return (

        <div className="client-work-request-page">

            <div className="client-work-request-header">

                <span>
                    CLIENT SERVICES
                </span>

                <h1>
                    Service / Work Request
                </h1>

                <p>
                    Submit a new requirement
                    to our team.
                </p>

            </div>


{/* ========================================== NEW REQUEST ======================================== */}

            <div className="client-work-request-card">

                <h2>
                    New Service Request
                </h2>

                <form onSubmit={handleSubmit}>


                                            {/* SERVICE */}

                    <div className="form-group">

                        <label>
                            Service / Category *
                        </label>

                        <select name="service" value={formData.service} onChange={handleChange} required>

                            <option value="">
                                Select Service
                            </option>

                            {services.map((service) => (

                                    <option key={service._id} value={service._id}>
                                        {service.serviceName || service.title}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                                            {/* PRIORITY */}

                    <div className="form-group">

                        <label>
                            Priority
                        </label>

                        <select name="priority" value={formData.priority} onChange={handleChange}>

                            <option>
                                Low
                            </option>

                            <option>
                                Medium
                            </option>

                            <option>
                                High
                            </option>

                            <option>
                                Urgent
                            </option>

                        </select>

                    </div>


                                            {/* REQUIREMENT */}

                    <div className="form-group">

                        <label>
                            Requirement Description *
                        </label>

                        <textarea name="requirement" value={formData.requirement} onChange={handleChange} rows="6" placeholder="Describe your requirement..." required/>

                    </div>


                                            {/* ATTACHMENT */}

                    <div className="form-group">

                        <label>
                            Attachment
                        </label>

                        <input id="workRequestAttachment" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" onChange={(e)=>setAttachment(e.target.files[0])}/>

                        <small>
                            PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                        </small>

                    </div>

                    <button type="submit" disabled={submitting}>

                        {submitting ? "Submitting...": "Submit Request"}

                    </button>

                </form>

            </div>


{/* ========================================== REQUEST HISTORY ==================================== */}

            <div className="client-work-request-card">

                <h2>
                    My Work Requests
                </h2>

                {loading ? (

                    <p>
                        Loading requests...
                    </p>

                ) : requests.length === 0 ? (

                    <p>
                        No work requests found.
                    </p>

                ) : (

                    <div className="work-request-list">

                        {requests.map((request) => (

                                <div className="work-request-item" key={request._id}>

                                    <div>

                                        <strong>
                                            {request.serviceName}
                                        </strong>

                                        <p>
                                            {request.requirement}
                                        </p>

                                        <small>
                                            {new Date(request.createdAt).toLocaleDateString("en-IN")}
                                        </small>

                                    </div>

                                    <span className={`work-request-status ${getStatusClass(request.status)}`}>
                                        {request.status}
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

};
export default ClientWorkRequest;