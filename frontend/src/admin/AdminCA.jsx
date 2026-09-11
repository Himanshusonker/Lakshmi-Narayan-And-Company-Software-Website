import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";

const AdminCA = () => {

    const [cas, setCAs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: ""
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================================================
    // CA COMMUNICATION STATES
    // =========================================================

    const [documents, setDocuments] = useState([]);

    const [documentsLoading, setDocumentsLoading] =
        useState(true);

    const [selectedCA, setSelectedCA] =
        useState("");

    const [documentForm, setDocumentForm] = useState({
        title: "",
        message: "",
        file: null
    });

    const [documentSending, setDocumentSending] =
        useState(false);

    const [documentError, setDocumentError] =
        useState("");

    const [documentSuccess, setDocumentSuccess] =
        useState("");


    // =========================================================
    // GET ALL CA
    // =========================================================

    const fetchCAs = async () => {

        try {

            setLoading(true);

            const response =await adminAxios.get("/api/admin/ca");

            if (response.data.success) {

                setCAs(
                    response.data.cas || []
                );

            }

        } catch (error) {

            console.error(
                "Fetch CA Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load CA list"
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // GET ALL CA DOCUMENTS / MESSAGES
    // =========================================================

    const fetchDocuments = async () => {

        try {

            setDocumentsLoading(true);

            const response =await adminAxios.get("/api/ca/documents/admin/all");

            if (response.data.success) {

                setDocuments(
                    response.data.documents || []
                );

            }

        } catch (error) {

            console.error(
                "Fetch CA Documents Error:",
                error
            );

            setDocumentError(
                error.response?.data?.message ||
                "Failed to load CA messages"
            );

        } finally {

            setDocumentsLoading(false);

        }

    };


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        fetchCAs();

        fetchDocuments();

    }, []);


    // =========================================================
    // INPUT CHANGE
    // =========================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // =========================================================
    // OPEN REGISTER FORM
    // =========================================================

    const openRegisterForm = () => {

        setFormData({
            name: "",
            email: "",
            username: "",
            password: ""
        });

        setError("");
        setSuccess("");

        setShowForm(true);

    };


    // =========================================================
    // CLOSE REGISTER FORM
    // =========================================================

    const closeRegisterForm = () => {

        if (saving) return;

        setShowForm(false);

        setError("");

        setFormData({
            name: "",
            email: "",
            username: "",
            password: ""
        });

    };


    // =========================================================
    // REGISTER CA
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.username.trim() ||
            !formData.password
        ) {

            setError(
                "All fields are required"
            );

            return;

        }


        try {

            setSaving(true);

            const response =
                await adminAxios.post(
                    "/api/admin/ca",
                    formData
                );

            if (response.data.success) {

                setSuccess(
                    "CA registered successfully"
                );

                setFormData({
                    name: "",
                    email: "",
                    username: "",
                    password: ""
                });

                await fetchCAs();

                setTimeout(() => {

                    setShowForm(false);
                    setSuccess("");

                }, 800);

            }

        } catch (error) {

            console.error(
                "Register CA Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to register CA"
            );

        } finally {

            setSaving(false);

        }

    };


    // =========================================================
    // TOGGLE CA STATUS
    // =========================================================

    const toggleStatus = async (id) => {

        try {

            const response =
                await adminAxios.put(
                    `/api/admin/ca/${id}/status`
                );

            if (response.data.success) {

                setCAs((previous) =>
                    previous.map((ca) =>
                        ca._id === id
                            ? {
                                ...ca,
                                isActive:
                                    response.data.ca.isActive
                            }
                            : ca
                    )
                );

            }

        } catch (error) {

            console.error(
                "Toggle CA Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update CA status"
            );

        }

    };


    // =========================================================
    // DOCUMENT FORM CHANGE
    // =========================================================

    const handleDocumentChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setDocumentForm((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // =========================================================
    // DOCUMENT FILE CHANGE
    // =========================================================

    const handleDocumentFileChange = (e) => {

        const file =
            e.target.files?.[0] || null;

        setDocumentForm((previous) => ({
            ...previous,
            file
        }));

    };


    // =========================================================
    // SEND DOCUMENT / MESSAGE TO CA
    // =========================================================

    const handleSendToCA = async (e) => {

        e.preventDefault();

        setDocumentError("");
        setDocumentSuccess("");


        if (!selectedCA) {

            setDocumentError(
                "Please select a CA"
            );

            return;

        }


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


            const formData =
                new FormData();


            formData.append(
                "caId",
                selectedCA
            );


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


            const response =
                await adminAxios.post(
                    "/api/ca/documents/admin/send",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );


            if (response.data.success) {

                setDocumentSuccess(
                    "Message / document sent to CA successfully."
                );


                setDocumentForm({
                    title: "",
                    message: "",
                    file: null
                });


                setSelectedCA("");


                await fetchDocuments();

            }

        } catch (error) {

            console.error(
                "Send Admin CA Document Error:",
                error
            );

            setDocumentError(
                error.response?.data?.message ||
                "Failed to send message to CA"
            );

        } finally {

            setDocumentSending(false);

        }

    };


    // =========================================================
    // MARK DOCUMENT AS READ
    // =========================================================

    const markAsRead = async (documentId) => {
  
    try {
        const response = await adminAxios.put(
            `/api/ca/documents/admin/${documentId}/read`
        );

        if (response.data.success) {

            setDocuments((previous) =>
                previous.map((document) =>
                    document._id === documentId
                        ? {
                            ...document,
                            adminIsRead: true
                        }
                        : document
                )
            );

        }

    } catch (error) {

        console.error(
            "Mark Document Read Error:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to update read status"
        );

    }
};


    // =========================================================
    // DOWNLOAD DOCUMENT
    // =========================================================

    const downloadDocument = async (documentItem) => {

        try {

            const response =
                await adminAxios.get(
                    `/api/ca/documents/admin/${documentItem._id}/download`,
                    {
                        responseType: "blob"
                    }
                );


            const blob =
                new Blob(
                    [response.data],
                    {
                        type:
                            documentItem.fileType ||
                            "application/octet-stream"
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
                documentItem.fileName ||
                "CA-document";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            window.URL.revokeObjectURL(
                url
            );

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


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date)
            .toLocaleString(
                "en-IN",
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            );

    };


    // =========================================================
    // RETURN
    // =========================================================

    return (

        <div className="admin-ca-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="admin-ca-header">

                <div>

                    <span className="admin-ca-eyebrow">
                        CA MANAGEMENT
                    </span>

                    <h1>
                        CA Management
                    </h1>

                    <p>
                        Register and manage Chartered
                        Accountant accounts.
                    </p>

                </div>


                <button
                    type="button"
                    className="admin-ca-register-btn"
                    onClick={openRegisterForm}
                >

                    <span>
                        +
                    </span>

                    Register CA

                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && !showForm && (

                <div className="admin-ca-alert error">
                    {error}
                </div>

            )}


            {/* =================================================
                CA TABLE
            ================================================= */}

            <div className="admin-ca-table-card">

                <div className="admin-ca-table-wrapper">

                    <table className="admin-ca-table">

                        <thead>

                            <tr>

                                <th>
                                    CA Name
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Login ID
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="admin-ca-empty"
                                    >
                                        Loading CA records...
                                    </td>

                                </tr>

                            ) : cas.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="admin-ca-empty"
                                    >
                                        No CA registered yet.
                                    </td>

                                </tr>

                            ) : (

                                cas.map((ca) => (

                                    <tr key={ca._id}>

                                        <td>

                                            <strong>
                                                {ca.name}
                                            </strong>

                                        </td>


                                        <td>
                                            {ca.email}
                                        </td>


                                        <td>

                                            <span className="admin-ca-login-id">
                                                {ca.username}
                                            </span>

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    ca.isActive
                                                        ? "admin-ca-status active"
                                                        : "admin-ca-status inactive"
                                                }
                                            >

                                                {ca.isActive
                                                    ? "Active"
                                                    : "Disabled"
                                                }

                                            </span>

                                        </td>


                                        <td>

                                            <button
                                                type="button"
                                                className={
                                                    ca.isActive
                                                        ? "admin-ca-action disable"
                                                        : "admin-ca-action enable"
                                                }
                                                onClick={() =>
                                                    toggleStatus(
                                                        ca._id
                                                    )
                                                }
                                            >

                                                {ca.isActive
                                                    ? "Disable"
                                                    : "Enable"
                                                }

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =================================================
                REGISTER CA MODAL
            ================================================= */}

            {showForm && (

                <div
                    className="admin-ca-modal-overlay"
                    onClick={closeRegisterForm}
                >

                    <div
                        className="admin-ca-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="admin-ca-modal-header">

                            <div>

                                <span>
                                    CA REGISTRATION
                                </span>

                                <h2>
                                    Register CA
                                </h2>

                            </div>


                            <button
                                type="button"
                                className="admin-ca-close-btn"
                                onClick={closeRegisterForm}
                                disabled={saving}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="admin-ca-form"
                        >

                            {error && (

                                <div className="admin-ca-alert error">
                                    {error}
                                </div>

                            )}


                            {success && (

                                <div className="admin-ca-alert success">
                                    {success}
                                </div>

                            )}


                            <div className="admin-ca-form-group">

                                <label htmlFor="ca-name">
                                    CA Name
                                </label>

                                <input
                                    id="ca-name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter CA name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />

                            </div>


                            <div className="admin-ca-form-group">

                                <label htmlFor="ca-email">
                                    Email
                                </label>

                                <input
                                    id="ca-email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />

                            </div>


                            <div className="admin-ca-form-group">

                                <label htmlFor="ca-username">
                                    Login ID
                                </label>

                                <input
                                    id="ca-username"
                                    type="text"
                                    name="username"
                                    placeholder="Enter login ID"
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                />

                            </div>


                            <div className="admin-ca-form-group">

                                <label htmlFor="ca-password">
                                    Password
                                </label>

                                <input
                                    id="ca-password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />

                            </div>


                            <div className="admin-ca-form-actions">

                                <button
                                    type="button"
                                    className="admin-ca-cancel-btn"
                                    onClick={closeRegisterForm}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="admin-ca-create-btn"
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Creating..."
                                        : "Create CA"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* =================================================
                CA COMMUNICATION SECTION
            ================================================= */}

            <section className="admin-ca-communication">


                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <div className="admin-ca-communication-header">

                    <div>

                        <span className="admin-ca-eyebrow">
                            CA COMMUNICATION
                        </span>

                        <h2>
                            Documents & Messages
                        </h2>

                        <p>
                            View documents and messages
                            received from CAs and send
                            messages or documents back.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    ADMIN → CA SEND FORM
                ================================================= */}

                <div className="admin-ca-send-card">

                    <div className="admin-ca-send-card-header">

                        <div>

                            <span>
                                ADMIN → CA
                            </span>

                            <h3>
                                Send Document / Message
                            </h3>

                        </div>

                    </div>


                    <form
                        className="admin-ca-send-form"
                        onSubmit={handleSendToCA}
                    >


                        {/* CA SELECT */}

                        <div className="admin-ca-form-group">

                            <label>
                                Select CA
                            </label>

                            <select
                                value={selectedCA}
                                onChange={(e) =>
                                    setSelectedCA(
                                        e.target.value
                                    )
                                }
                                required
                            >

                                <option value="">
                                    Select CA
                                </option>

                                {cas.map((ca) => (

                                    <option
                                        key={ca._id}
                                        value={ca._id}
                                    >
                                        {ca.name} - {ca.email}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* TITLE */}

                        <div className="admin-ca-form-group">

                            <label>
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter message or document title"
                                value={
                                    documentForm.title
                                }
                                onChange={
                                    handleDocumentChange
                                }
                            />

                        </div>


                        {/* MESSAGE */}

                        <div className="admin-ca-form-group">

                            <label>
                                Message
                            </label>

                            <textarea
                                name="message"
                                rows="5"
                                placeholder="Write your message..."
                                value={
                                    documentForm.message
                                }
                                onChange={
                                    handleDocumentChange
                                }
                            />

                        </div>


                        {/* FILE */}

                        <div className="admin-ca-form-group">

                            <label>
                                Attach Document
                            </label>

                            <input
                                type="file"
                                onChange={
                                    handleDocumentFileChange
                                }
                            />


                            {documentForm.file && (

                                <div className="admin-ca-selected-file">

                                    <span>
                                        📎{" "}
                                        {documentForm.file.name}
                                    </span>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setDocumentForm(
                                                (previous) => ({
                                                    ...previous,
                                                    file: null
                                                })
                                            )
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            )}

                        </div>


                        {/* ALERTS */}

                        {documentError && (

                            <div className="admin-ca-alert error">
                                {documentError}
                            </div>

                        )}


                        {documentSuccess && (

                            <div className="admin-ca-alert success">
                                {documentSuccess}
                            </div>

                        )}


                        {/* SEND BUTTON */}

                        <div className="admin-ca-send-actions">

                            <button
                                type="submit"
                                disabled={
                                    documentSending
                                }
                            >

                                {documentSending
                                    ? "Sending..."
                                    : "Send to CA"
                                }

                            </button>

                        </div>

                    </form>

                </div>


                {/* =================================================
                    DOCUMENT / MESSAGE LIST
                ================================================= */}

                <div className="admin-ca-messages-card">

                    <div className="admin-ca-messages-header">

                        <div>

                            <span>
                                COMMUNICATION HISTORY
                            </span>

                            <h3>
                                CA Messages & Documents
                            </h3>

                        </div>


                        <button
                            type="button"
                            onClick={fetchDocuments}
                            disabled={
                                documentsLoading
                            }
                        >
                            Refresh
                        </button>

                    </div>


                    {documentsLoading ? (

                        <div className="admin-ca-message-empty">
                            Loading messages...
                        </div>

                    ) : documents.length === 0 ? (

                        <div className="admin-ca-message-empty">

                            No CA messages or documents
                            available.

                        </div>

                    ) : (

                        <div className="admin-ca-message-list">

                            {documents.map(
                                (documentItem) => (

                                    <div
                                        key={
                                            documentItem._id
                                        }
                                        className={
                                        documentItem.adminIsRead
                                            ? "admin-ca-message-item read"
                                            : "admin-ca-message-item unread"
                                    }
                                    >


                                        {/* MESSAGE HEADER */}

                                        <div className="admin-ca-message-top">

                                            <div>

                                                <span
                                                    className={
                                                        documentItem.sender ===
                                                        "CA"
                                                            ? "admin-ca-sender ca"
                                                            : "admin-ca-sender admin"
                                                    }
                                                >

                                                    {documentItem.sender ===
                                                    "CA"
                                                        ? "CA → Admin"
                                                        : "Admin → CA"
                                                    }

                                                </span>


                                                <h4>
                                                    {
                                                        documentItem.title
                                                    }
                                                </h4>

                                            </div>


                                            <span
                                                className={
                                                    documentItem.adminIsRead
                                                        ? "admin-ca-read-status read"
                                                        : "admin-ca-read-status unread"
                                                }
                                            >

                                                {documentItem.adminIsRead
                                                    ? "Read"
                                                    : "Unread"
                                                }

                                            </span>

                                        </div>


                                        {/* CA INFORMATION */}

                                        <div className="admin-ca-message-ca">

                                            <strong>
                                                CA:
                                            </strong>{" "}

                                            {
                                                documentItem.ca?.name ||
                                                "Unknown CA"
                                            }


                                            {documentItem.ca?.email && (

                                                <span>
                                                    {" "}
                                                    (
                                                    {
                                                        documentItem
                                                            .ca
                                                            .email
                                                    }
                                                    )
                                                </span>

                                            )}

                                        </div>


                                        {/* MESSAGE */}

                                        {documentItem.message && (

                                            <div className="admin-ca-message-body">

                                                {
                                                    documentItem.message
                                                }

                                            </div>

                                        )}


                                        {/* FILE */}

                                        {documentItem.fileName && (

                                            <div className="admin-ca-message-file">

                                                <div>

                                                    <span>
                                                        📎
                                                    </span>

                                                    <div>

                                                        <strong>
                                                            {
                                                                documentItem
                                                                    .fileName
                                                            }
                                                        </strong>

                                                        {documentItem.fileSize > 0 && (

                                                            <small>

                                                                {" "}
                                                                (
                                                                {(
                                                                    documentItem
                                                                        .fileSize /
                                                                    1024
                                                                ).toFixed(1)}
                                                                {" "}
                                                                KB)

                                                            </small>

                                                        )}

                                                    </div>

                                                </div>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        downloadDocument(
                                                            documentItem
                                                        )
                                                    }
                                                >
                                                    Download
                                                </button>

                                            </div>

                                        )}


                                        {/* FOOTER */}

                                        <div className="admin-ca-message-footer">

                                            <span>
                                                {formatDate(
                                                    documentItem.createdAt
                                                )}
                                            </span>


                                            <div>

                                                {!documentItem.adminIsRead && (

                                                    <button
                                                        type="button"
                                                        className="admin-ca-mark-read"
                                                        onClick={() =>
                                                            markAsRead(
                                                                documentItem._id
                                                            )
                                                        }
                                                    >
                                                        Mark as Read
                                                    </button>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </section>

        </div>

    );

};


export default AdminCA;

