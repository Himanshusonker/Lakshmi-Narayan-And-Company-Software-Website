import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";
import { useNavigate } from "react-router-dom";

const AdminWorkRequests = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editingRequest, setEditingRequest] =useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        status: "Pending",
        priority: "Medium",
        adminNotes: ""

    });


    // ======================================================
    // FETCH
    // ======================================================

    const fetchRequests = async () => {

        try {

            const response=await adminAxios.get("/api/admin/work-requests");

            if (response.data.success) {

                setRequests(response.data.requests || []);

            }

        } catch (error) {

            console.error("Fetch Work Requests Error:", error);

            alert(error.response?.data?.message || "Failed to fetch work requests");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchRequests();

    }, []);


    // ======================================================
    // SEARCH
    // ======================================================

    const filteredRequests=requests.filter((request) => {

            const text=search.toLowerCase();

            return (

                request.serviceName?.toLowerCase().includes(text) ||
                request.company?.companyName?.toLowerCase().includes(text) ||
                request.status?.toLowerCase().includes(text)

            );

        });


    // ======================================================
    // EDIT
    // ======================================================

    const handleEdit = (request) => {

        setEditingRequest(request);

        setFormData({

            status:request.status || "Pending",

            priority:request.priority || "Medium",

            adminNotes:request.adminNotes || ""

        });

    };


    // ======================================================
    // CHANGE
    // ======================================================

    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData((prev) => ({...prev, [name]: value}));

    };


    // ======================================================
    // UPDATE
    // ======================================================

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("adminToken");

            if (!token) {
                alert("Admin login required.");
                navigate("/admin/login");
                return;
}

            const response=await adminAxios.put(`/api/admin/work-requests/${editingRequest._id}`,

                {
                    status: formData.status,
                    priority: formData.priority,
                    adminNotes: formData.adminNotes
                }
            );

            if (response.data.success) {

                alert("Work request updated successfully");

                setEditingRequest(null);

                fetchRequests();

            }

        } catch (error) {

            console.error("Update Work Request Error:", error);

            alert(error.response?.data?.message || "Failed to update request");

        }

    };


    // ======================================================
    // DELETE
    // ======================================================

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this request?")) {

            return;

        }

        try {

            const response=await adminAxios.delete(`/api/admin/work-requests/${id}`);

            if (response.data.success) {

                alert("Request deleted successfully");

                fetchRequests();

            }

        } catch (error) {

            console.error("Delete Request Error:", error);

            alert(error.response?.data?.message || "Failed to delete request");

        }

    };

    if (loading) {

        return (
            <div>
                Loading Work Requests...
            </div>
        );

    }


    return (

        <div className="admin-work-requests-page">

            <div className="admin-projects-header">

                <div>

                    <span>
                        CLIENT SERVICES
                    </span>

                    <h1>
                        Work Requests
                    </h1>

                    <p>
                        Manage client service
                        and work requests.
                    </p>

                </div>

            </div>


                                                {/* SEARCH */}

            <div className="admin-project-search">

                <input type="text" placeholder="Search service, company or status..." value={search} onChange={(e)=>setSearch(e.target.value)}/>

            </div>


                                                {/* TABLE */}

            <div className="admin-project-table-wrapper">

                <table className="admin-project-table">

                    <thead>

                        <tr>

                            <th>
                                #
                            </th>

                            <th>
                                Company
                            </th>

                            <th>
                                Service
                            </th>

                            <th>
                                Requirement
                            </th>

                            <th>
                                Priority
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredRequests.length === 0 ? (

                            <tr>

                                <td colSpan="8">
                                    No work requests found.
                                </td>

                            </tr>

                        ) : (

                            filteredRequests.map((request, index) => (

                                    <tr key={request._id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>

                                            <strong>
                                                {request.company?.companyName}
                                            </strong>

                                            <small>
                                                {request.company?.email}
                                            </small>

                                        </td>

                                        <td>
                                            {request.serviceName}
                                        </td>

                                        <td>

                                            <div style={{maxWidth:"280px"}}>
                                                {request.requirement}
                                            </div>

                                            {request.attachments?.length > 0 && (

                                                <div>

                                                    {
                                                        request.attachments.map((file, i)=>(

                                                                <a key={i} href={file.url} target="_blank" rel="noopener noreferrer">
                                                                    📎 
                                                                    {file.originalName || file.name}
                                                                </a>

                                                            )
                                                        )
                                                    }

                                                </div>

                                            )}

                                        </td>

                                        <td>
                                            {request.priority}
                                        </td>

                                        <td>

                                            <span className={`project-status ${request.status?.toLowerCase().replaceAll(" ","-")}`}>
                                                {request.status}
                                            </span>

                                        </td>

                                        <td>

                                            {new Date(request.createdAt).toLocaleDateString("en-IN")}

                                        </td>

                                        <td>

                                            <button onClick={() =>handleEdit(request)}>
                                                Manage
                                            </button>

                                            <button onClick={() =>handleDelete(request._id)}>
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


                                                {/* EDIT MODAL */}

            {editingRequest && (

                <div className="project-modal-overlay">

                    <div className="project-modal">

                        <div className="project-modal-header">

                            <div>

                                <span>
                                    WORK REQUEST
                                </span>

                                <h2>
                                    Manage Request
                                </h2>

                            </div>

                            <button type="button" onClick={() =>setEditingRequest(null)}>
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleUpdate}>

                            <div className="project-form-grid">

                                <div>

                                    <label>
                                        Status
                                    </label>

                                    <select name="status" value={formData.status} onChange={handleChange}>

                                        <option>
                                            Pending
                                        </option>

                                        <option>
                                            Under Review
                                        </option>

                                        <option>
                                            Approved
                                        </option>

                                        <option>
                                            In Progress
                                        </option>

                                        <option>
                                            Completed
                                        </option>

                                        <option>
                                            Rejected
                                        </option>

                                        <option>
                                            Cancelled
                                        </option>

                                    </select>

                                </div>

                                <div>

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

                                <div className="project-form-full">

                                    <label>
                                        Admin Notes
                                    </label>

                                    <textarea name="adminNotes" value={formData.adminNotes} onChange={handleChange} rows="5" placeholder="Add internal notes..."/>

                                </div>

                                <div className="project-form-full">

                                    <label>
                                        Client Requirement
                                    </label>

                                    <div style={{padding: "15px", background:"#f5f5f5", borderRadius:"8px"}}>
                                        {editingRequest.requirement}
                                    </div>

                                </div>

                                {editingRequest.attachments?.length > 0 && (

                                    <div className="project-form-full">

                                        <label>
                                            Attachments
                                        </label>

                                        {editingRequest.attachments.map((file, index)=>(

                                                <div key={index}>

                                                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                                                        View{" "}
                                                        {file.originalName || file.name}
                                                    </a>

                                                </div>

                                            )
                                        )}

                                    </div>

                                )}

                            </div>

                            <div className="project-modal-actions">

                                <button type="button" onClick={()=>setEditingRequest(null)}>
                                    Cancel
                                </button>

                                <button type="submit">
                                    Update Request
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

};
export default AdminWorkRequests;