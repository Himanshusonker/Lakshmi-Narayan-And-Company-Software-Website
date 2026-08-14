import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";

const AdminLeads=()=>{

    const [leads, setLeads]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");
    const [selectedLead, setSelectedLead]=useState(null);
    const [status, setStatus]=useState("");
    const [adminNote, setAdminNote]=useState("");

    // ========================================================================
    // GET LEADS
    // ========================================================================

    const getLeads=async()=>{

        try {

            setLoading(true);
            setError("");

            const response= await adminAxios.get(`/leads/admin/all`);

            if (response.data.success) {

                setLeads(response.data.data);

            }

        } catch (error) {

            console.log("Admin Leads Error:", error);

            setError(error.response?.data?.message || "Unable to load leads");

        } finally {

            setLoading(false);

        }
    };

    useEffect(()=>{

        getLeads();

    }, []);


    // ========================================================================
    // OPEN LEAD
    // ========================================================================

    const openLead=(lead)=>{

        setSelectedLead(lead);
        setStatus(lead.status);
        setAdminNote(lead.adminNote || "");

    };


    // ========================================================================
    // UPDATE LEAD
    // ========================================================================

    const updateLead=async()=>{

        try {

            const response= await adminAxios.put(`/leads/admin/${selectedLead._id}`,
                {
                    status,
                    adminNote
                }
            );

            if (response.data.success) {

                alert("Lead updated successfully");
                setSelectedLead(null);
                getLeads();
            }

        } catch (error) {

            console.log("Update Lead Error:", error);

            alert(error.response?.data?.message || "Unable to update lead");
        }
    };


    // ========================================================================
    // DELETE LEAD
    // ========================================================================

    const deleteLead=async(id)=>{

        const confirmDelete= window.confirm("Are you sure you want to delete this lead?");

        if (!confirmDelete) {
            return;
        }

        try {

            const response= await adminAxios.delete(`/leads/admin/${id}`);

            if (response.data.success) {

                alert("Lead deleted successfully");
                getLeads();

            }

        } catch (error) {

            console.log("Delete Lead Error:", error);

            alert(error.response?.data?.message || "Unable to delete lead");

        }
    };


    // ========================================================================
    // LOADING
    // ========================================================================

    if (loading) {

        return (

            <div className="admin-leads-loading">
                <div className="admin-leads-loader"></div>

                <p>
                    Loading leads...
                </p>

            </div>

        );
    }


    // ========================================================================
    // ERROR
    // ========================================================================

    if (error) {

        return (

            <div className="admin-leads-error">

                <h2>
                    {error}
                </h2>

                <button onClick={getLeads}>
                    Try Again
                </button>

            </div>

        );
    }

    return (

        <div className="admin-leads-page">
            <div className="admin-leads-header">
                <div>

                    <span>
                        ADMIN PANEL
                    </span>

                    <h1>
                        Project Leads
                    </h1>

                    <p>
                        Manage enquiries submitted through Get a Quote.
                    </p>

                </div>

                <div className="lead-count">

                    <strong>
                        {leads.length}
                    </strong>

                    <span>
                        Total Leads
                    </span>

                </div>

            </div>


{/* ========================================== LEADS TABLE ======================================= */}

            <div className="leads-table-wrapper">

                {leads.length === 0 ? (

                    <div className="no-leads">

                        <h3>
                            No Leads Found
                        </h3>

                        <p>
                            New project enquiries will appear here.
                        </p>

                    </div>

                ) : (

                    <table className="leads-table">

                        <thead>

                            <tr>

                                <th>
                                    Client
                                </th>

                                <th>
                                    Service
                                </th>

                                <th>
                                    Budget
                                </th>

                                <th>
                                    Timeline
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {leads.map((lead)=>(

                                <tr key={lead._id}>

                                    <td>

                                        <div className="lead-client">

                                            <strong>
                                                {lead.name}
                                            </strong>

                                            <small>
                                                {lead.email}
                                            </small>

                                            <small>
                                                {lead.phone}
                                            </small>

                                        </div>

                                    </td>

                                    <td>
                                        {lead.service}
                                    </td>

                                    <td>
                                        {lead.budget || "-"}
                                    </td>

                                    <td>
                                        {lead.timeline || "-"}
                                    </td>

                                    <td>

                                        <span className={`lead-status status-${lead.status.toLowerCase().replaceAll(" ", "-")}`}>
                                            {lead.status}
                                        </span>

                                    </td>

                                    <td>

                                        {new Date(lead.createdAt).toLocaleDateString("en-IN")}

                                    </td>

                                    <td>

                                        <div className="lead-actions">

                                            <button onClick={()=>openLead(lead)}>
                                                View
                                            </button>

                                            <button className="delete-lead" onClick={()=> deleteLead(lead._id)}>
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                )}

            </div>

{/* ========================================= LEAD MODAL ========================================== */}

            {selectedLead && (

                <div className="lead-modal-overlay">

                    <div className="lead-modal">

                        <button className="close-modal" onClick={()=>setSelectedLead(null)}>
                            ×
                        </button>

                        <span className="modal-small-title">
                            PROJECT ENQUIRY
                        </span>

                        <h2>
                            {selectedLead.name}
                        </h2>

                        <div className="lead-details">

                            <div>
                                <strong>Email</strong>
                                <p>
                                    {selectedLead.email}
                                </p>
                            </div>


                            <div>
                                <strong>Phone</strong>
                                <p>
                                    {selectedLead.phone}
                                </p>
                            </div>


                            <div>
                                <strong>Company</strong>
                                <p>
                                    {selectedLead.company || "-"}
                                </p>
                            </div>

                            <div>
                                <strong>Service</strong>
                                <p>
                                    {selectedLead.service}
                                </p>
                            </div>

                            <div>
                                <strong>Budget</strong>
                                <p>
                                    {selectedLead.budget || "-"}
                                </p>
                            </div>

                            <div>
                                <strong>Timeline</strong>
                                <p>
                                    {selectedLead.timeline || "-"}
                                </p>
                            </div>

                        </div>

                        <div className="lead-message">

                            <strong>
                                Project Details
                            </strong>

                            <p>
                                {selectedLead.message}
                            </p>

                        </div>

                                            {/* STATUS */}

                        <div className="admin-lead-field">

                            <label>
                                Lead Status
                            </label>

                            <select value={status} onChange={(e)=>setStatus(e.target.value)}>

                                <option value="New">
                                    New
                                </option>

                                <option value="Contacted">
                                    Contacted
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Converted">
                                    Converted
                                </option>

                                <option value="Closed">
                                    Closed
                                </option>

                            </select>

                        </div>


                                            {/* ADMIN NOTE */}

                        <div className="admin-lead-field">

                            <label>
                                Admin Note
                            </label>

                            <textarea value={adminNote} onChange={(e)=>setAdminNote(e.target.value)} placeholder="Write internal note..." rows="4"/>

                        </div>

                        <button className="update-lead-button" onClick={updateLead}>
                            Save Changes
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
};
export default AdminLeads;