import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCompanies = () => {

    const API_URL =import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [editData, setEditData] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
        isActive: true
    });

    const [showEditModal, setShowEditModal] = useState(false);


    // ======================================================
    // GET COMPANIES
    // ======================================================

    const fetchCompanies = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("adminToken");

            const response = await axios.get(`${API_URL}/api/admin/companies`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {

                setCompanies(response.data.companies);

            }

        } catch (error) {

            console.error("Fetch Companies Error:", error);

            alert(error.response?.data?.message || "Failed to fetch companies");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchCompanies();

    }, []);


    // ======================================================
    // SEARCH
    // ======================================================

    const filteredCompanies = companies.filter((company) => {

        const searchText = search.toLowerCase();

        return (
        company.companyName ?.toLowerCase().includes(searchText) || 
        company.contactPerson ?.toLowerCase().includes(searchText) || 
        company.email ?.toLowerCase().includes(searchText) || 
        company.phone ?.includes(search)
        );
    });


    // ======================================================
    // OPEN EDIT
    // ======================================================

    const handleEdit = (company) => {

        setSelectedCompany(company);

        setEditData({
            companyName: company.companyName || "",
            contactPerson: company.contactPerson || "",
            email: company.email || "",
            phone: company.phone || "",
            address: company.address || "",
            gstNumber: company.gstNumber || "",
            isActive: company.isActive
        });

        setShowEditModal(true);
    };


    // ======================================================
    // HANDLE EDIT INPUT
    // ======================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEditData((prev) => ({...prev, [name]: value}));

    };


    // ======================================================
    // UPDATE COMPANY
    // ======================================================

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const token= localStorage.getItem("adminToken");

            const response= await axios.put(`${API_URL}/api/admin/companies/${selectedCompany._id}`,
                editData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {

                alert("Company updated successfully");

                setShowEditModal(false);

                fetchCompanies();

            }

        } catch (error) {

            console.error("Update Company Error:", error);

            alert(error.response?.data?.message || "Failed to update company");
        }
    };


    // ======================================================
    // TOGGLE STATUS
    // ======================================================

    const handleStatus = async (id) => {

        try {

            const token = localStorage.getItem("adminToken");

            const response = await axios.patch(`${API_URL}/api/admin/companies/${id}/status`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {

                fetchCompanies();

            }

        } catch (error) {

            console.error("Status Error:", error);

            alert(error.response?.data?.message || "Failed to update status");

        }

    };


    // ======================================================
    // DELETE COMPANY
    // ======================================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this company?");

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("adminToken");

            const response = await axios.delete(`${API_URL}/api/admin/companies/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {

                alert("Company deleted successfully");

                fetchCompanies();

            }

        } catch (error) {

            console.error("Delete Company Error:", error);

            alert(error.response?.data?.message || "Failed to delete company");

        }

    };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (
            <div className="admin-companies-loading">
                Loading Companies...
            </div>
        );

    }

    return (

        <div className="admin-companies-page">

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div className="admin-companies-header">

                <div>

                    <span className="admin-section-label">
                        COMPANY MANAGEMENT
                    </span>

                    <h1>
                        Registered Companies
                    </h1>

                    <p>
                        Manage all client company accounts
                        registered on the project portal.
                    </p>

                </div>

                <div className="admin-company-count">

                    <strong>
                        {companies.length}
                    </strong>

                    <span>
                        Total Companies
                    </span>

                </div>

            </div>


            {/* ========================================= */}
            {/* SEARCH */}
            {/* ========================================= */}

            <div className="admin-company-toolbar">

                <input type="text" placeholder="Search company, contact person, email or phone..." value={search} onChange={(e) => setSearch(e.target.value)}/>

            </div>

            {/* ========================================= */}
            {/* TABLE */}
            {/* ========================================= */}

            <div className="admin-company-table-wrapper">

                <table className="admin-company-table">

                    <thead>

                        <tr>

                            <th>
                                #
                            </th>

                            <th>
                                Company
                            </th>

                            <th>
                                Contact Person
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Phone
                            </th>

                            <th>
                                GST
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Registered
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredCompanies.length === 0 ? (

                            <tr>

                                <td colSpan="9" className="admin-no-company">
                                    No companies found.
                                </td>

                            </tr>

                        ) : (

                            filteredCompanies.map(
                                (company, index) => (

                                    <tr key={company._id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>

                                            <div className="admin-company-name">

                                                <div className="admin-company-avatar">
                                                    {company.companyName
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>

                                                <strong>
                                                    {company.companyName}
                                                </strong>

                                            </div>

                                        </td>

                                        <td>
                                            {company.contactPerson}
                                        </td>

                                        <td>
                                            {company.email}
                                        </td>

                                        <td>
                                            {company.phone}
                                        </td>

                                        <td>
                                            {company.gstNumber || "-"}
                                        </td>

                                        <td>

                                            <button className={company.isActive ? "company-status active" : "company-status inactive"} onClick={()=>handleStatus(company._id)}>

                                                {company.isActive ? "Active": "Inactive"}

                                            </button>

                                        </td>

                                        <td>

                                            {new Date(company.createdAt).toLocaleDateString("en-IN")}

                                        </td>

                                        <td>

                                            <div className="company-actions">

                                                <button className="company-edit-btn" onClick={() => handleEdit(company)}>
                                                    Edit
                                                </button>

                                                <button className="company-delete-btn" onClick={() =>handleDelete(company._id)}>
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* ========================================= */}
            {/* EDIT MODAL */}
            {/* ========================================= */}

            {showEditModal && (

                <div className="company-modal-overlay">

                    <div className="company-modal">

                        <div className="company-modal-header">

                            <div>

                                <span>
                                    COMPANY MANAGEMENT
                                </span>

                                <h2>
                                    Edit Company
                                </h2>

                            </div>

                            <button onClick={() =>setShowEditModal(false)}>
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleUpdate}>

                            <div className="company-edit-grid">

                                <div>

                                    <label>
                                        Company Name
                                    </label>

                                    <input type="text" name="companyName" value={editData.companyName} onChange={handleChange} required/>

                                </div>

                                <div>

                                    <label>
                                        Contact Person
                                    </label>

                                    <input type="text" name="contactPerson" value={editData.contactPerson} onChange={handleChange} required/>

                                </div>

                                <div>

                                    <label>
                                        Email
                                    </label>

                                    <input type="email" name="email" value={editData.email} onChange={handleChange} required/>

                                </div>

                                <div>

                                    <label>
                                        Phone
                                    </label>

                                    <input type="text" name="phone" value={editData.phone} onChange={handleChange} required/>

                                </div>

                                <div>

                                    <label>
                                        GST Number
                                    </label>

                                    <input type="text" name="gstNumber" value={editData.gstNumber} onChange={handleChange}/>

                                </div>

                                <div className="company-edit-full">

                                    <label>
                                        Address
                                    </label>

                                    <textarea name="address" value={editData.address} onChange={handleChange} rows="4"/>

                                </div>

                            </div>

                            <div className="company-modal-actions">

                                <button type="button" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </button>

                                <button type="submit">
                                    Update Company
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};
export default AdminCompanies;