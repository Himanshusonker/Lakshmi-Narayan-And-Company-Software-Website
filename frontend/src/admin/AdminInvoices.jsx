import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";

const AdminInvoices = () => {

    const [invoices, setInvoices] = useState([]);
    const [invoiceType, setInvoiceType] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [projects, setProjects] = useState([]);

    const [loading, setLoading] =useState(true);

    const [showModal, setShowModal] =useState(false);

    const [editingInvoice, setEditingInvoice] =useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const initialForm = {

        company: "",
        project: "",
        invoiceNumber: "",
        title: "",
        description: "",
        clientAddress: "",
        invoiceType: "Invoice",
        clientState: "",
        clientStateCode: "",
        // sellerGSTIN: "",
        buyerGSTIN: "",
        placeOfSupply: "",
        reverseCharge: false,
        hsnSac: "",
        cgstPercentage: 9,
        sgstPercentage: 9,
        igstPercentage: 0,
        gstType: "CGST_SGST",
        items: [
            {
                description: "",
                hsnSac: "",
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
        // SEARCH + NORMAL / GST FILTER
        // ==================================================

        const filteredInvoices = invoices.filter((invoice) => {

            const search = searchTerm.toLowerCase().trim();

            if (!search) {
                return true;
            }

            return (
                invoice.invoiceNumber?.toLowerCase().includes(search) ||
                invoice.company?.companyName?.toLowerCase().includes(search) ||
                invoice.project?.projectName?.toLowerCase().includes(search) ||
                invoice.status?.toLowerCase().includes(search)
            );

        });

        const normalInvoices = filteredInvoices.filter(invoice => invoice.invoiceType !== "GST Invoice");

        const gstInvoices = filteredInvoices.filter(invoice => invoice.invoiceType === "GST Invoice");

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
                    hsnSac: "",
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

        setInvoiceType("Invoice");

        setFormData({...initialForm, invoiceType: "Invoice"});

        setShowModal(true);

    };


    // ==================================================
    // EDIT
    // ==================================================

    const handleEdit = (invoice) => {

        setEditingInvoice(invoice);

        setInvoiceType(invoice.invoiceType || "Invoice");

        setFormData({

            company:invoice.company?._id || "",

            project:invoice.project?._id || "",

            invoiceNumber:invoice.invoiceNumber || "",

            title:invoice.title || "",

            description:invoice.description || "",

            clientAddress: invoice.clientAddress || "",

            clientState: invoice.clientState || "",

            clientStateCode: invoice.clientStateCode || "",

            gstType: invoice.gstType || "CGST_SGST",

            // sellerGSTIN: invoice.sellerGSTIN || "",
            
            buyerGSTIN: invoice.buyerGSTIN || "",

            placeOfSupply: invoice.placeOfSupply || "",
            
            reverseCharge: invoice.reverseCharge || false,
            
            hsnSac: invoice.hsnSac || invoice.items?.[0]?.hsnSac || "",
            
            cgstPercentage: invoice.cgstPercentage ?? 9,
            
            sgstPercentage: invoice.sgstPercentage ?? 9,
            
            igstPercentage: invoice.igstPercentage ?? 0,
            
            invoiceType: invoice.invoiceType || "Invoice",

            items: invoice.items?.map(item => ({
                
                description: item.description || "",
                
                hsnSac: item.hsnSac || "",
                
                quantity: item.quantity || 1,
                
                rate: item.rate || 0
            
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

                cgstPercentage: Number(formData.cgstPercentage) || 0,

                sgstPercentage: Number(formData.sgstPercentage) || 0,

                igstPercentage: Number(formData.igstPercentage) || 0,

                reverseCharge: Boolean(formData.reverseCharge),

                // discount:Number(formData.discount),

                items: formData.items.map(item => {

                    const quantity = Number(item.quantity) || 0;
                    const rate = Number(item.rate) || 0;

                    return {
                        description: item.description,
                        hsnSac: item.hsnSac || "",
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
    // DOWNLOAD NORMAL INVOICE
    // ==================================================

    const handleDownloadInvoice = async (id, invoiceNumber) => {

        try {

            const response =await adminAxios.get(`/api/admin/invoices/${id}/pdf`,
                    {
                        responseType: "blob"
                    }
                );

            const blob = new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

            const url =window.URL.createObjectURL(blob);

            const link=document.createElement("a");

            link.href = url;

            link.download=`${invoiceNumber}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error("Normal Invoice Download Error:", error);

            alert("Failed to download invoice");

        }

    };


    // ==================================================
    // DOWNLOAD GST INVOICE
    // ==================================================

    const handleDownloadGSTInvoice= async (id, invoiceNumber) => {

        try {

            const response= await adminAxios.get(`/api/admin/invoices/${id}/gst-invoice`, {responseType: "blob"});

            const blob = new Blob([response.data], {type: "application/pdf"});

            const url=window.URL.createObjectURL(blob);

            const link=document.createElement("a");

            link.href=url;

            link.download=`${invoiceNumber}-GST-Invoice.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error("GST Invoice Download Error:", error);

            alert("Failed to download GST Invoice");

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

                {/* {!invoiceType && (

                    <div className="invoice-type-selector">

                        <p>
                            Select Invoice Type
                        </p>

                        <div className="invoice-type-buttons">

                            <button type="button" onClick={() => {setInvoiceType("Invoice"); setFormData(prev => ({...prev, invoiceType: "Invoice"}));}}>
                                Invoice
                            </button>

                            <button type="button" onClick={() => {setInvoiceType("GST Invoice"); setFormData(prev => ({...prev, invoiceType: "GST Invoice"}));}}>
                                GST Invoice
                            </button>

                        </div>

                    </div>

                )} */}

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

            <div className="admin-invoice-search">

                <input type="text" placeholder="Search Invoice Number, Company, Project..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value);}}/>

            </div>

                    {/* =====================================================
                                        NORMAL INVOICES
                    ===================================================== */}

            <div className="admin-invoice-section">

                <div className="admin-invoice-section-header">
                    <div>
                        <span>REGULAR BILLING</span>
                        <h2>Normal Invoices</h2>
                    </div>

                    <strong>
                        {normalInvoices.length} Invoice {normalInvoices.length !== 1 ? "s" : ""}
                    </strong>
                </div>


                <div className="admin-invoice-table-wrapper invoice-scroll-box">

                    <table>

                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Company</th>
                                <th>Project</th>
                                <th>Amount</th>
                                <th>Due</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {normalInvoices.length > 0 ? (

                                normalInvoices.map(invoice => (

                                    <tr key={invoice._id}>

                                        <td>
                                            {invoice.invoiceNumber}
                                        </td>

                                        <td>
                                            {invoice.company?.companyName}
                                        </td>

                                        <td>
                                            {invoice.project?.projectName || "General"}
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

                                            <button onClick={() =>handleDownloadInvoice(invoice._id, invoice.invoiceNumber)}>
                                                Invoice
                                            </button>

                                            <button onClick={() => handleEdit(invoice)}>
                                                Edit
                                            </button>

                                            <button onClick={() => handleDelete(invoice._id)}>
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                                ) : (

                                <tr>
                                    <td colSpan="8" className="admin-invoice-empty">
                                        No Normal Invoice Found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


            </div>


                        {/* =====================================================
                                                GST INVOICES
                        ===================================================== */}

            <div className="admin-invoice-section gst-invoice-list-section">

                <div className="admin-invoice-section-header">

                    <div>
                        <span>GST BILLING</span>
                        <h2>GST Invoices</h2>
                    </div>

                    <strong>
                        {gstInvoices.length} GST Invoice {gstInvoices.length !== 1 ? "s" : ""}
                    </strong>

                </div>


                <div className="admin-invoice-table-wrapper invoice-scroll-box">

                    <table>

                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Company</th>
                                <th>Project</th>
                                <th>Amount</th>
                                <th>Due</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {gstInvoices.length > 0 ? (

                                gstInvoices.map(invoice => (

                                    <tr key={invoice._id}>

                                        <td>
                                            {invoice.invoiceNumber}
                                        </td>

                                        <td>
                                            {invoice.company?.companyName}
                                        </td>

                                        <td>
                                            {invoice.project?.projectName || "General"}
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

                                            <button onClick={() =>handleDownloadGSTInvoice(invoice._id, invoice.invoiceNumber)}>
                                                GST Invoice
                                            </button>

                                            <button onClick={() => handleEdit(invoice)}>
                                                Edit
                                            </button>

                                            <button onClick={() => handleDelete(invoice._id)}>
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="8" className="admin-invoice-empty">
                                        No GST Invoice Found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


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

                            <div className="invoice-type-selector">
                                <label>Invoice Type *</label>

                                <select value={invoiceType || "Invoice"} onChange={(e) => { const type = e.target.value; setInvoiceType(type); setFormData(prev => ({...prev, invoiceType: type}));}}>
                                    <option value="Invoice">
                                        Invoice
                                    </option>

                                    <option value="GST Invoice">
                                        GST Invoice
                                    </option>
                                </select>
                            </div>

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

                            {/* =====================================================
                                                GST ONLY FIELDS
                            ===================================================== */}

                            {invoiceType === "GST Invoice" && (

                            <>

                            <label>
                                Client State *
                            </label>

                            <input name="clientState" value={formData.clientState} onChange={handleChange} placeholder="e.g. Madhya Pradesh" required/>

                            <label>
                                Client State Code *
                            </label>

                            <input name="clientStateCode" value={formData.clientStateCode} onChange={handleChange} placeholder="e.g. 23" maxLength="2" required/>

                            <label>
                                GST Type
                            </label>

                            <select name="gstType" value={formData.gstType} onChange={handleChange}>

                                <option value="CGST_SGST">
                                    CGST + SGST
                                </option>

                                <option value="IGST">
                                    IGST
                                </option>

                            </select>

                            </>

                            )}

                        {/* =====================================================
                                        GST INVOICE DETAILS
                        ===================================================== */}

                            {invoiceType === "GST Invoice" && (

                            <div className="gst-invoice-section">

                                <h3>
                                    GST Invoice Details
                                </h3>

                                {/* <label>
                                    Seller GSTIN *
                                </label>

                                <input name="sellerGSTIN" value={formData.sellerGSTIN} onChange={handleChange} placeholder="Enter Seller GSTIN" maxLength="15" required/> */}

                                <label>
                                    Buyer GSTIN *
                                </label>

                                <input name="buyerGSTIN" value={formData.buyerGSTIN} onChange={handleChange} placeholder="Enter Client GSTIN" maxLength="15" required/>

                                <label>
                                    Place of Supply
                                </label>

                                <input name="placeOfSupply" value={formData.placeOfSupply} onChange={handleChange} placeholder="e.g. Madhya Pradesh" required/>

                                <label>
                                    HSN / SAC Code *
                                </label>

                                <input name="hsnSac" value={formData.hsnSac} onChange={handleChange} placeholder="Enter HSN / SAC Code" required/>

                                <label>
                                    Reverse Charge
                                </label>

                                <select name="reverseCharge" value={formData.reverseCharge ? "Yes" : "No"} onChange={(e) =>setFormData(prev => ({...prev, reverseCharge: e.target.value === "Yes"}))}>

                                    <option value="No">
                                        No
                                    </option>

                                    <option value="Yes">
                                        Yes
                                    </option>

                                </select>

                                <h4>
                                    GST Tax Breakdown
                                </h4>

                                <label>
                                    CGST %
                                </label>

                                <input type="number" min="0" name="cgstPercentage" value={formData.cgstPercentage} onChange={handleChange}/>

                                <label>
                                    SGST %
                                </label>

                                <input type="number" min="0" name="sgstPercentage" value={formData.sgstPercentage} onChange={handleChange}/>

                                <label>
                                    IGST %
                                </label>

                                <input type="number" min="0" name="igstPercentage" value={formData.igstPercentage} onChange={handleChange}/>

                            </div>

                        )}

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

                                        {invoiceType === "GST Invoice" && (

                                        <input placeholder="HSN / SAC" value={item.hsnSac || ""} onChange={e => handleItemChange(index, "hsnSac", e.target.value)} required/>

                                        )}

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

                            {invoiceType !== "GST Invoice" && (
                            
                            <>

                            <label>
                                Tax %
                            </label>

                            <input type="number" min="0" name="taxPercentage" value={formData.taxPercentage} onChange={handleChange}/>

                            </>
                            )}

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