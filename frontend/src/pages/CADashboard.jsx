import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import caAxios from "../api/caAxios";
import * as XLSX from "xlsx";

const CADashboard = () => {

    const navigate = useNavigate();

    const [ca, setCA] = useState(null);

    const [invoices, setInvoices] = useState([]);

    const [search, setSearch] = useState("");

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    const [loading, setLoading] = useState(true);

    const [documentForm, setDocumentForm] = useState({
    title: "",
    message: "",
    file: null
    });

    const [documentSending, setDocumentSending] = useState(false);

    const [documentError, setDocumentError] = useState("");

    const [documentSuccess, setDocumentSuccess] = useState("");
    
    const [documents, setDocuments] = useState([]);

    const [documentsLoading, setDocumentsLoading] =useState(true);

    const [documentReadLoading, setDocumentReadLoading] =useState(null);



    const fetchInvoices = async () => {

        try {

            const response = await caAxios.get("/api/ca/invoices",
                {
                    params: {
                        search,
                        fromDate,
                        toDate
                    }
                }
            );

            if (response.data.success) {

                setInvoices(
                    response.data.invoices || []
                );

            }

        } catch (error) {

            console.error(
                "CA Invoice Error:",
                error
            );

            if (
                error.response?.status === 401
            ) {

                localStorage.removeItem(
                    "caToken"
                );

                localStorage.removeItem(
                    "caData"
                );

                navigate("/ca/login");

            }

        } finally {

            setLoading(false);

        }

    };


const fetchDocuments = async () => {
    try {
        setDocumentsLoading(true);

        const response = await caAxios.get(
            "/api/ca/documents"
        );

        if (response.data.success) {
            setDocuments(
                response.data.documents || []
            );
        }

    } catch (error) {
        console.error(
            "CA Documents Error:",
            error
        );

        if (error.response?.status === 401) {
            localStorage.removeItem("caToken");
            localStorage.removeItem("caData");

            navigate("/ca/login");
        }

    } finally {
        setDocumentsLoading(false);
    }
};




    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date)
            .toLocaleDateString("en-IN");

    };


    const downloadPDF = async (invoice) => {

        try {

            const endpoint =
                invoice.invoiceType === "GST Invoice"
                    ? `/api/ca/invoices/${invoice._id}/gst-invoice`
                    : `/api/ca/invoices/${invoice._id}/pdf`;

            const response=await caAxios.get( endpoint,
                {
                    responseType: "blob"
                }
            );

            const blob =
                new Blob(
                    [response.data],
                    {
                        type: "application/pdf"
                    }
                );

            const url =
                window.URL.createObjectURL(
                    blob
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                invoice.invoiceType === "GST Invoice"
                    ? `${invoice.invoiceNumber}-GST-Invoice.pdf`
                    : `${invoice.invoiceNumber}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(
                "PDF Download Error:",
                error
            );

            alert(
                "Failed to download invoice"
            );

        }

    };


const downloadDocument = async (documentItem) => {
    try {
        const response = await caAxios.get(
            `/api/ca/documents/${documentItem._id}/download`,
            {
                responseType: "blob"
            }
        );

        const blob = new Blob(
            [response.data],
            {
                type:
                    documentItem.fileType ||
                    "application/octet-stream"
            }
        );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            documentItem.fileName ||
            "admin-document";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error(
            "Download CA Document Error:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to download document"
        );
    }
};


const exportToExcel = () => {

    if (!invoices.length) {

        alert(
            "No invoices available to export"
        );

        return;

    }

    const rows = invoices.map(invoice => {

        // ==========================================
        // COMBINE ALL ITEMS INTO ONE CELL
        // ==========================================

        const items = (invoice.items || [])
            .map(item => item.description || "")
            .filter(Boolean)
            .join(", ");

        const plans = (invoice.items || [])
            .map(item => item.plan || "")
            .filter(Boolean)
            .join(", ");

        const hsnSac = (invoice.items || [])
            .map(item => item.hsnSac || "")
            .filter(Boolean)
            .join(", ");

        const quantities = (invoice.items || [])
            .map(item => item.quantity ?? "")
            .filter(value => value !== "")
            .join(", ");

        const rates = (invoice.items || [])
            .map(item => item.rate ?? "")
            .filter(value => value !== "")
            .join(", ");

        const itemAmounts = (invoice.items || [])
            .map(item => item.amount ?? "")
            .filter(value => value !== "")
            .join(", ");


        // ==========================================
        // ONE ROW = ONE INVOICE
        // ==========================================

        return {

            "Invoice Number":
                invoice.invoiceNumber || "",

            "Invoice Type":
                invoice.invoiceType || "",

            "Company":
                invoice.company?.companyName || "",

            "Project":
                invoice.project?.projectName ||
                "General",

            "Title":
                invoice.title || "",

            "Issue Date":
                formatDate(invoice.issueDate),

            "Due Date":
                formatDate(invoice.dueDate),

            "Status":
                invoice.status || "",

            "Items":
                items,

            "Plan":
                plans,

            "HSN/SAC":
                hsnSac,

            "Quantity":
                quantities,

            "Rate":
                rates,

            "Item Amount":
                itemAmounts,

            "Subtotal":
                invoice.subtotal ?? 0,

            "Tax":
                invoice.taxAmount ?? 0,

            "Total":
                invoice.totalAmount ?? 0,

            "Paid":
                invoice.paidAmount ?? 0,

            "Due":
                invoice.dueAmount ?? 0,

            "Buyer GSTIN":
                invoice.buyerGSTIN || "",

            "Place Of Supply":
                invoice.placeOfSupply || ""

        };

    });


    // ==========================================
    // CREATE EXCEL
    // ==========================================

    const worksheet =
        XLSX.utils.json_to_sheet(rows);


    const workbook =
        XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Invoices"
    );


    // ==========================================
    // DOWNLOAD
    // ==========================================

    XLSX.writeFile(
        workbook,
        "CA-Invoices.xlsx"
    );

};


    const logout = () => {

        localStorage.removeItem(
            "caToken"
        );

        localStorage.removeItem(
            "caData"
        );

        navigate("/ca/login");

    };

    const handleDocumentChange = (e) => {

    const { name, value } = e.target;

    setDocumentForm(previous => ({
        ...previous,
        [name]: value
    }));

};


    const handleDocumentFileChange = (e) => {

        const file = e.target.files?.[0] || null;

        setDocumentForm(previous => ({
            ...previous,
            file
        }));

    };

    const handleDocumentSubmit = async (e) => {

    e.preventDefault();

    setDocumentError("");
    setDocumentSuccess("");

    if (!documentForm.title.trim()) {

        setDocumentError(
            "Please enter a title"
        );

        return;

    }

    if (
        !documentForm.message.trim() &&
        !documentForm.file
    ) {

        setDocumentError(
            "Please write a message or attach a document"
        );

        return;

    }

    try {

        setDocumentSending(true);

        const formData = new FormData();

        formData.append(
            "title",
            documentForm.title
        );

        formData.append(
            "message",
            documentForm.message
        );

        if (documentForm.file) {

            formData.append(
                "document",
                documentForm.file
            );

        }

        const response = await caAxios.post(
            "/api/ca/documents",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        if (response.data.success) {

            setDocumentSuccess(
                "Document / message sent to admin successfully."
            );

            setDocumentForm({
                title: "",
                message: "",
                file: null
            });

        }

    } catch (error) {

        console.error(
            "Send CA Document Error:",
            error
        );

        setDocumentError(
            error.response?.data?.message ||
            "Failed to send document to admin"
        );

    } finally {

        setDocumentSending(false);

    }

};


const markDocumentAsRead = async (documentId) => {
    try {
        setDocumentReadLoading(documentId);

        const response = await caAxios.put(
            `/api/ca/documents/${documentId}/read`
        );

        if (response.data.success) {
            setDocuments(previous =>
                previous.map(documentItem =>
                    documentItem._id === documentId
                        ? {
                            ...documentItem,
                            caIsRead: true
                        }
                        : documentItem
                )
            );
        }

    } catch (error) {
        console.error(
            "Mark CA Document Read Error:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to mark document as read"
        );

    } finally {
        setDocumentReadLoading(null);
    }
};


    useEffect(() => {

        const token =
            localStorage.getItem("caToken");

        if (!token) {

            navigate("/ca/login");

            return;

        }

        const caData =
            localStorage.getItem("caData");

        if (caData) {

            setCA(
                JSON.parse(caData)
            );

        }

        fetchInvoices();

        fetchDocuments();

    }, []);


    return (

        <div className="ca-dashboard">

            <header>

                <div>

                    <span>
                        CA PORTAL
                    </span>

                    <h1>
                        CA Dashboard
                    </h1>

                    <p>
                        Welcome, {ca?.name}
                    </p>

                </div>

                <button onClick={logout}>
                    Logout
                </button>

            </header>


            <section className="ca-invoice-filter">

                {/* TOP ROW - INVOICE COUNT */}
                <div className="ca-invoice-count-row">

                    <div className="ca-invoice-count">

                        <span className="ca-invoice-count-label">
                            TOTAL INVOICES
                        </span>

                        <strong className="ca-invoice-count-number">
                            {invoices.length}
                        </strong>

                    </div>

                </div>


                {/* BOTTOM ROW - SEARCH & FILTERS */}
                <div className="ca-invoice-filter-controls">

                    <input
                        type="text"
                        placeholder="Search Invoice Number, Company, Project..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) =>
                            setFromDate(e.target.value)
                        }
                    />

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) =>
                            setToDate(e.target.value)
                        }
                    />

                    <button onClick={fetchInvoices}>
                        Filter
                    </button>

                    <button onClick={exportToExcel}>
                        Export Excel
                    </button>

                </div>

            </section>


            <section className="ca-invoice-list">

                {loading ? (

                    <p>
                        Loading invoices...
                    </p>

                ) : (

                    invoices.length > 0 ? (

                        invoices.map(invoice => (

                            <div
                                className="ca-invoice-row"
                                key={invoice._id}
                            >

                                <span>
                                    {invoice.invoiceNumber}
                                </span>

                                <span>
                                    {invoice.company?.companyName}
                                </span>

                                <span>
                                    {invoice.project?.projectName ||
                                        "General"}
                                </span>

                                <span>
                                    {formatDate(
                                        invoice.issueDate
                                    )}
                                </span>

                                <span>
                                    ₹ {Number(
                                        invoice.totalAmount
                                    ).toLocaleString("en-IN")}
                                </span>

                                <span>
                                    {invoice.status}
                                </span>

                                <button
                                    onClick={() =>
                                        downloadPDF(
                                            invoice
                                        )
                                    }
                                >
                                    PDF
                                </button>

                            </div>

                        ))

                    ) : (

                        <p>
                            No invoices found.
                        </p>

                    )

                )}

            </section>

            <section className="ca-admin-message-section">

            <div className="ca-admin-message-header">

                <div>
                    <span className="ca-admin-message-eyebrow">
                        ADMIN COMMUNICATION
                    </span>

                    <h2>
                        Send Document / Message to Admin
                    </h2>

                    <p>
                        You can send any document or message directly to the admin.
                    </p>
                </div>

            </div>


            <form
                className="ca-admin-message-form"
                onSubmit={handleDocumentSubmit}
            >

                <div className="ca-admin-message-field">

                    <label>
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter document or message title"
                        value={documentForm.title}
                        onChange={handleDocumentChange}
                        required
                    />

                </div>


                <div className="ca-admin-message-field">

                    <label>
                        Message
                    </label>

                    <textarea
                        name="message"
                        placeholder="Write your message..."
                        value={documentForm.message}
                        onChange={handleDocumentChange}
                        rows="5"
                    />

                </div>


                <div className="ca-admin-message-field">

                    <label>
                        Attach Document
                    </label>

                    <input
                        type="file"
                        onChange={handleDocumentFileChange}
                    />

                    {documentForm.file && (

                        <div className="ca-selected-file">

                            <span>
                                📎 {documentForm.file.name}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setDocumentForm(previous => ({
                                        ...previous,
                                        file: null
                                    }))
                                }
                            >
                                Remove
                            </button>

                        </div>

                    )}

                </div>


                {documentError && (

                    <div className="ca-document-alert error">
                        {documentError}
                    </div>

                )}


                {documentSuccess && (

                    <div className="ca-document-alert success">
                        {documentSuccess}
                    </div>

                )}


                <div className="ca-admin-message-actions">

                    <button
                        type="submit"
                        disabled={documentSending}
                    >
                        {documentSending
                            ? "Sending..."
                            : "Send to Admin"
                        }
                    </button>

                </div>

            </form>

        </section>


        <section className="ca-admin-documents-section">

            <div className="ca-admin-documents-header">

                <div>
                    <span className="ca-admin-documents-eyebrow">
                        ADMIN COMMUNICATION
                    </span>

                    <h2>
                        Documents & Messages from Admin
                    </h2>

                    <p>
                        Documents and messages sent to you by the admin.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={fetchDocuments}
                    disabled={documentsLoading}
                >
                    Refresh
                </button>

            </div>


            {documentsLoading ? (

                <div className="ca-admin-document-empty">
                    Loading documents...
                </div>

            ) : (

                (() => {

                    const adminDocuments = documents.filter(
                        documentItem =>
                            documentItem.sender === "ADMIN"
                    );

                    if (!adminDocuments.length) {
                        return (
                            <div className="ca-admin-document-empty">
                                No documents or messages from admin.
                            </div>
                        );
                    }

                    return (
                        <div className="ca-admin-document-list">

                            {adminDocuments.map(
                                (documentItem) => {

                                    const isUnread =
                                        !documentItem.caIsRead;

                                    return (

                                        <div
                                            key={documentItem._id}
                                            className={
                                                isUnread
                                                    ? "ca-admin-document-item unread"
                                                    : "ca-admin-document-item read"
                                            }
                                        >

                                            {/* HEADER */}

                                            <div className="ca-admin-document-top">

                                                <div>

                                                    <span className="ca-admin-document-sender">
                                                        ADMIN → CA
                                                    </span>

                                                    <h3>
                                                        {documentItem.title}
                                                    </h3>

                                                </div>


                                                <span
                                                    className={
                                                        isUnread
                                                            ? "ca-admin-read-status unread"
                                                            : "ca-admin-read-status read"
                                                    }
                                                >
                                                    {isUnread
                                                        ? "Unread"
                                                        : "Read"
                                                    }
                                                </span>

                                            </div>


                                            {/* MESSAGE */}

                                            {documentItem.message && (

                                                <div className="ca-admin-document-message">

                                                    {documentItem.message}

                                                </div>

                                            )}


                                            {/* FILE */}

                                            {documentItem.fileName && (

                                                <div className="ca-admin-document-file">

                                                    <div>

                                                        <span>
                                                            📎
                                                        </span>

                                                        <div>

                                                            <strong>
                                                                {
                                                                    documentItem.fileName
                                                                }
                                                            </strong>

                                                            {documentItem.fileSize > 0 && (

                                                                <small>
                                                                    {" "}
                                                                    (
                                                                    {
                                                                        (
                                                                            documentItem.fileSize /
                                                                            1024
                                                                        ).toFixed(1)
                                                                    }
                                                                    KB)
                                                                </small>

                                                            )}

                                                        </div>

                                                    </div>

                                                <button type="button" onClick={() => downloadDocument(documentItem)}>
                                                    
                                                    Download
                                                        
                                                </button>

                                                </div>

                                            )}


                                            {/* FOOTER */}

                                            <div className="ca-admin-document-footer">

                                                <span>
                                                    {formatDate(
                                                        documentItem.createdAt
                                                    )}
                                                </span>


                                                {isUnread && (

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            markDocumentAsRead(
                                                                documentItem._id
                                                            )
                                                        }
                                                        disabled={
                                                            documentReadLoading ===
                                                            documentItem._id
                                                        }
                                                    >

                                                        {documentReadLoading ===
                                                        documentItem._id
                                                            ? "Marking..."
                                                            : "Mark as Read"
                                                        }

                                                    </button>

                                                )}

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>
                    );

                })()

            )}

        </section>      

        </div>

    );

};

export default CADashboard;