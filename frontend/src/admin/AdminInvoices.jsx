import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";

const AdminInvoices = () => {

    const [invoices, setInvoices] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [projects, setProjects] = useState([]);

    const [loading, setLoading] =useState(true);

    const [showModal, setShowModal] =useState(false);

    const [editingInvoice, setEditingInvoice] =useState(null);

    const initialForm = {

        company: "",
        project: "",
        invoiceNumber: "",
        title: "",
        description: "",
        clientAddress: "",
        
        items: [
            {
                description: "",
                quantity: 1,
                rate: 0
            }
        ],

        taxPercentage: 18,
        // discount: 0,

        issueDate:new Date().toISOString().substring(0, 10),
        dueDate: "",
        notes: ""

    };

    const [formData, setFormData] =useState(initialForm);


    // ==================================================
    // FETCH INVOICES
    // ==================================================

    const fetchInvoices = async () => {

        try {

            const response= await adminAxios.get("/api/admin/invoices");

            if (response.data.success) {

                setInvoices(response.data.invoices || []);

            }

        } catch (error) {

            console.error("Invoices Error:", error);

        }

    };


    // ==================================================
    // FETCH COMPANIES
    // ==================================================

    const fetchCompanies = async () => {

        try {

            const response= await adminAxios.get("/api/admin/companies");

            if (response.data.success) {

                setCompanies(response.data.companies.filter(company =>company.isActive));

            }

        } catch (error) {

            console.error("Companies Error:", error);

        }

    };


    // ==================================================
    // FETCH PROJECTS
    // ==================================================

    const fetchProjects = async () => {

        try {

            const response= await adminAxios.get("/api/admin/projects");

            if (response.data.success) {

                setProjects(response.data.projects || []);

            }

        } catch (error) {

            console.error("Projects Error:", error);

        }

    };

    useEffect(() => {

        const load = async () => {

            setLoading(true);

            await Promise.all(
            [
                fetchInvoices(),
                fetchCompanies(),
                fetchProjects()
            ]
        );

            setLoading(false);

        };

        load();

    }, []);


    // ==================================================
    // INPUT
    // ==================================================

    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData(prev => ({...prev, [name]: value}));

    };


    // ==================================================
    // ITEM CHANGE
    // ==================================================

    const handleItemChange = (index, field, value) => {

        setFormData(prev => {

            const items =[...prev.items];

            items[index] = {...items[index], [field]: value};

            return {...prev, items};

        });

    };


    // ==================================================
    // ADD ITEM
    // ==================================================

    const addItem = () => {

        if (formData.items.length >= 3) {

        alert("Only 3 items can be added to one invoice.");

        return;

        }
        
        setFormData(prev => ({...prev,
            items: 
            [
                ...prev.items,

                {
                    description: "",
                    quantity: 1,
                    rate: 0
                }
            ]

        }));

    };


    // ==================================================
    // REMOVE ITEM
    // ==================================================

    const removeItem = (index) => {

        setFormData(prev => ({...prev, items:prev.items.filter((_, i) =>i !== index)}));

    };


    // ==================================================
    // CREATE
    // ==================================================

    const handleCreate = () => {

        setEditingInvoice(null);

        setFormData(initialForm);

        setShowModal(true);

    };


    // ==================================================
    // EDIT
    // ==================================================

    const handleEdit = (invoice) => {

        setEditingInvoice(invoice);

        setFormData({

            company:invoice.company?._id || "",

            project:invoice.project?._id || "",

            invoiceNumber:invoice.invoiceNumber || "",

            title:invoice.title || "",

            description:invoice.description || "",

            clientAddress: invoice.clientAddress || "",

            items:invoice.items?.map(item => ({

                        description:item.description,

                        quantity:item.quantity,

                        rate:item.rate
                    })) || [],

            taxPercentage:invoice.taxPercentage || 0,

            // discount:invoice.discount || 0,

            issueDate:invoice.issueDate ?.substring(0, 10) || "",

            dueDate:invoice.dueDate ?.substring(0, 10) || "",

            notes:invoice.notes || ""

        });

        setShowModal(true);

    };


    // ==================================================
    // SUBMIT
    // ==================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {

                ...formData,

                taxPercentage:Number(formData.taxPercentage),

                // discount:Number(formData.discount),

                items: formData.items.map(item => {

                    const quantity = Number(item.quantity) || 0;
                    const rate = Number(item.rate) || 0;

                    return {
                        description: item.description,
                        quantity,
                        rate,
                        amount: quantity * rate
                    };
                })
            };

            let response;

            if (editingInvoice) {

                response= await adminAxios.put(`/api/admin/invoices/${editingInvoice._id}`, payload);

            } else {

                response= await adminAxios.post("/api/admin/invoices", payload);

            }

            if (response.data.success) {

                alert(editingInvoice ? "Invoice updated successfully": "Invoice created successfully");

                setShowModal(false);

                setEditingInvoice(null);

                setFormData(initialForm);

                fetchInvoices();

            }

        } catch (error) {

            console.error("Invoice Save Error:", error);

            alert(error.response?.data?.message || "Failed to save invoice");

        }

    };


    // ==================================================
    // DELETE
    // ==================================================

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this invoice?")) {
            return;
        }

        try {

            const response= await adminAxios.delete(`/api/admin/invoices/${id}`);

            if (response.data.success) {

                alert("Invoice deleted successfully");

                fetchInvoices();

            }

        } catch (error) {

            console.error("Delete Invoice Error:", error);

        }

    };

    if (loading) {

        return (
            <div>
                Loading Invoices...
            </div>
        );

    }

    return (

        <div className="admin-invoices-page">

            <div className="admin-invoices-header">

                <div>

                    <span>
                        BILLING MANAGEMENT
                    </span>

                    <h1>
                        Invoices
                    </h1>

                    <p>
                        Create and manage
                        client invoices.
                    </p>

                </div>


                <button onClick={handleCreate}>
                    + Create Invoice
                </button>

            </div>

            <div className="admin-invoice-table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Invoice
                            </th>

                            <th>
                                Company
                            </th>

                            <th>
                                Project
                            </th>

                            <th>
                                Amount
                            </th>

                            <th>
                                Due
                            </th>

                            <th>
                                Due Date
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {invoices.map(invoice => (

                                <tr key={invoice._id}>

                                    <td>
                                        {invoice.invoiceNumber}
                                    </td>

                                    <td>
                                        {invoice.company ?.companyName}
                                    </td>

                                    <td>
                                        {invoice.project ?.projectName || "General"}
                                    </td>

                                    <td>
                                        ₹ {Number(invoice.totalAmount).toLocaleString("en-IN")}
                                    </td>

                                    <td>
                                        ₹ {Number(invoice.dueAmount).toLocaleString("en-IN")}
                                    </td>

                                    <td>
                                        {new Date(invoice.dueDate).toLocaleDateString("en-IN")}
                                    </td>

                                    <td>
                                        {invoice.status}
                                    </td>

                                    <td>

                                        <button onClick={() =>handleEdit(invoice)}>
                                            Edit
                                        </button>

                                        <button onClick={() =>handleDelete(invoice._id)}>
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

            {showModal && (

                <div className="admin-invoice-modal-overlay">

                    <div className="admin-invoice-modal">

                        <div className="admin-invoice-modal-header">

                            <div>
                                <span>BILLING MANAGEMENT</span>

                                <h2>
                                    {editingInvoice ? "Edit Invoice" : "Create Invoice"}
                                </h2>
                            </div>

                            <button type="button" className="admin-invoice-modal-close" onClick={() => {setShowModal(false); setEditingInvoice(null); setFormData(initialForm);}} aria-label="Close">
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <label>
                                Company *
                            </label>

                            <select name="company" value={formData.company} onChange={handleChange} required>

                                <option value="">
                                    Select Company
                                </option>

                                {companies.map(company => (

                                        <option key={company._id} value={company._id}>
                                            {company.companyName}
                                        </option>
                                    )
                                )}

                            </select>

                            <label>
                            
                                Client Address *

                            </label>

                                <textarea name="clientAddress" value={formData.clientAddress} onChange={handleChange} placeholder="Enter client billing address" rows="4" required/>

                            <label>
                                Project
                            </label>

                            <select name="project" value={formData.project} onChange={handleChange}>

                                <option value="">
                                    General Invoice
                                </option>

                                {projects.filter(project => 
                                
                                !formData.company || project.company?._id === formData.company).map(project => (

                                            <option key={project._id} value={project._id}>
                                                {project.projectName}
                                            </option>
                                        )
                                    )}

                            </select>

                            <label>
                                Invoice Number *
                            </label>

                            <input name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} placeholder="INV-2026-001" required/>

                            <label>
                                Title *
                            </label>

                            <input name="title" value={formData.title} onChange={handleChange} placeholder="Website Development Invoice" required/>

                            <label>
                                Issue Date
                            </label>

                            <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange}/>

                            <label>
                                Due Date *
                            </label>

                            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required/>

                            <h3>
                                Invoice Items
                            </h3>

                            {formData.items.map((item, index) => (

                                    <div key={index} className="admin-invoice-item">

                                        <input placeholder="Description" value={item.description} onChange={e =>handleItemChange(index, "description", e.target.value)} required/>

                                        <input type="number" min="1" placeholder="Qty" value={item.quantity} onChange={e =>handleItemChange(index, "quantity", e.target.value)}/>

                                        <input type="number" min="0" placeholder="Rate" value={item.rate} onChange={e =>handleItemChange(index, "rate", e.target.value)}/>

                                        {formData.items.length > 1 && (

                                            <button type="button" onClick={() =>removeItem(index)}>
                                                Remove
                                            </button>

                                        )}

                                    </div>
                                )
                            )}

                            <button type="button" onClick={addItem}>
                                + Add Item
                            </button>

                            <label>
                                Tax %
                            </label>

                            <input type="number" min="0" name="taxPercentage" value={formData.taxPercentage} onChange={handleChange}/>

                            {/* <label>
                                Discount
                            </label>

                            <input type="number" min="0" name="discount" value={formData.discount} onChange={handleChange}/> */}

                            <label>
                                Description
                            </label>

                            <textarea name="description" value={formData.description} onChange={handleChange}/>

                            <label>
                                Notes
                            </label>

                            <textarea name="notes" value={formData.notes} onChange={handleChange}/>

                            <div>

                                <button type="button" onClick={() =>setShowModal(false)}>
                                    Cancel
                                </button>

                                <button type="submit">
                                    {editingInvoice ? "Update Invoice": "Create Invoice"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

};
export default AdminInvoices;