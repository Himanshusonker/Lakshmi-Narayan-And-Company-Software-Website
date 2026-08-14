import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";

const AdminMessages=()=>{

    const [messages, setMessages]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");
    const [selectedMessage, setSelectedMessage]=useState(null);

    // ============================================================
    // GET CONTACT MESSAGES
    // ============================================================

    const getMessages=async()=>{

        try {

            setLoading(true);
            setError("");

            const response = await adminAxios.get("/contact");

            if (response.data.success) {

                setMessages(response.data.data);

            } else {

                setError(response.data.message || "Unable to load contact messages.");

            }

        } catch (error) {

            console.log("Admin Messages Error:", error);
            setError(error.response?.data?.message || "Unable to load contact messages.");

        } finally {

            setLoading(false);

        }
    };


    // ============================================================
    // LOAD MESSAGES
    // ============================================================

    useEffect(()=>{

        getMessages();

    }, []);


    // ============================================================
    // DELETE MESSAGE
    // ============================================================

    const handleDelete=async(id)=>{

        const confirmDelete= window.confirm("Are you sure you want to delete this message?");

        if (!confirmDelete) {
            return;
        }

        try {

            const response= await adminAxios.delete(`/contact/${id}`);

            if (response.data.success) {

                setMessages((previousMessages)=>previousMessages.filter((message)=>message._id !== id));

                if (selectedMessage?._id === id) {
                    setSelectedMessage(null);
                }

                alert("Message deleted successfully.");

            }

        } catch (error) {

            console.log("Delete Message Error:", error);

            alert(error.response?.data?.message || "Unable to delete message.");

        }
    };


    // ============================================================
    // MARK AS READ
    // ============================================================

    const handleMarkAsRead=async(id)=>{

        try {

            const response= await adminAxios.put(`/contact/${id}`,
            {
                status: "Read"
            });

            if (response.data.success) {

                setMessages((previousMessages)=>previousMessages.map((message)=>message._id === id ? 
                            {
                                ...message,
                                status: "Read"
                            }
                            : message
                    )
                );

                if (selectedMessage?._id === id) {

                    setSelectedMessage((previousMessage)=> ({
                        ...previousMessage,
                        status: "Read"
                    }));
                }
            }

        } catch (error) {

            console.log("Mark Read Error:", error);

            alert(error.response?.data?.message || "Unable to update message.");

        }
    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <section className="admin-messages-page">

                <div className="admin-messages-loading">

                    <div className="admin-messages-loader"></div>

                    <p>
                        Loading contact messages...
                    </p>

                </div>

            </section>

        );
    }


    // ============================================================
    // ERROR
    // ============================================================

    if (error) {

        return (

            <section className="admin-messages-page">

                <div className="admin-messages-error">

                    <h2>
                        {error}
                    </h2>

                    <button onClick={getMessages}>
                        Try Again
                    </button>

                </div>

            </section>

        );
    }

    return (

        <section className="admin-messages-page">

            {/* ====================================================
                PAGE HEADER
            ==================================================== */}

            <div className="admin-messages-header">

                <div>

                    <span>
                        CONTACT MANAGEMENT
                    </span>

                    <h1>
                        Contact Messages
                    </h1>

                    <p>
                        View and manage messages submitted
                        through your website contact form.
                    </p>

                </div>

                <div className="admin-message-count">

                    <strong>
                        {messages.length}
                    </strong>

                    <span>
                        Total Messages
                    </span>

                </div>

            </div>


{/* ========================================= MESSAGE LIST ======================================= */}

            {messages.length === 0 ? (

                <div className="admin-no-messages">

                    <div className="admin-no-message-icon">
                        ✉
                    </div>

                    <h2>
                        No Contact Messages
                    </h2>

                    <p>
                        Messages submitted through the contact
                        form will appear here.
                    </p>

                </div>

            ) : (

                <div className="admin-messages-container">

                    {messages.map((message, index)=>(

                        <article className={`admin-message-card ${message.status === "Read" ? "message-read" : "message-unread"}`} key={message._id || index}>


{/* =========================================== MESSAGE TOP ====================================== */}

                            <div className="admin-message-top">

                                <div className="admin-message-user">

                                    <div className="admin-message-avatar">

                                        {message.name ?.charAt(0) ?.toUpperCase() || "U"}
                                    </div>

                                    <div>

                                        <h3>
                                            {message.name}
                                        </h3>

                                        <span>
                                            {message.email}
                                        </span>

                                    </div>

                                </div>


                                <div className="admin-message-status">

                                    {message.status === "Read" ? (

                                        <span className="message-status read">
                                            Read
                                        </span>

                                    ) : (

                                        <span className="message-status unread">
                                            New
                                        </span>

                                    )}

                                </div>

                            </div>


{/* ======================================= MESSAGE INFORMATION ================================= */}

                            <div className="admin-message-info">

                                {message.phone && (

                                    <div className="message-info-item">

                                        <span>
                                            ☎
                                        </span>

                                        <div>

                                            <small>
                                                PHONE
                                            </small>

                                            <p>
                                                {message.phone}
                                            </p>

                                        </div>

                                    </div>

                                )}

                                {message.subject && (

                                    <div className="message-info-item">

                                        <span>
                                            #
                                        </span>

                                        <div>

                                            <small>
                                                SUBJECT
                                            </small>

                                            <p>
                                                {message.subject}
                                            </p>

                                        </div>

                                    </div>

                                )}

                                {message.createdAt && (

                                    <div className="message-info-item">

                                        <span>
                                            ◷
                                        </span>

                                        <div>

                                            <small>
                                                DATE
                                            </small>

                                            <p>
                                                {new Date(message.createdAt).toLocaleDateString("en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}
                                            </p>

                                        </div>

                                    </div>

                                )}

                            </div>


{/* ======================================== MESSAGE PREVIEW ===================================== */}

                            <div className="admin-message-preview">

                                <small>
                                    MESSAGE
                                </small>

                                <p>
                                    {message.message}
                                </p>

                            </div>


{/* ========================================== ACTIONS =========================================== */}

                            <div className="admin-message-actions">

                                <button type="button" className="message-view-btn" onClick={()=>setSelectedMessage(message)}>
                                    View Message
                                </button>

                                {!message.status !== "Read" && (

                                    <button type="button" className="message-read-btn" onClick={()=>handleMarkAsRead(message._id)}>
                                        Mark as Read
                                    </button>

                                )}

                                <button type="button" className="message-delete-btn" onClick={()=> handleDelete(message._id)}>
                                    Delete
                                </button>

                            </div>

                        </article>
                    ))}
                </div>
            )}


{/* ======================================== MESSAGE MODAL ======================================= */}

            {selectedMessage && (

                <div className="admin-message-modal-overlay" onClick={() => setSelectedMessage(null)}>

                    <div className="admin-message-modal" onClick={(e) => e.stopPropagation()}>

                        <div className="admin-message-modal-header">

                            <div>

                                <span>
                                    CONTACT MESSAGE
                                </span>

                                <h2>
                                    {selectedMessage.name}
                                </h2>

                            </div>

                            <button type="button" onClick={()=>setSelectedMessage(null)}>
                                ×
                            </button>

                        </div>

                        <div className="admin-message-modal-body">

                            <div className="modal-contact-details">

                                <div>

                                    <small>
                                        EMAIL
                                    </small>

                                    <a href={`mailto:${selectedMessage.email}`}>
                                        {selectedMessage.email}
                                    </a>

                                </div>

                                {selectedMessage.phone && (

                                    <div>

                                        <small>
                                            PHONE
                                        </small>

                                        <a href={`tel:${selectedMessage.phone}`}>
                                            {selectedMessage.phone}
                                        </a>

                                    </div>
                                )}

                                {selectedMessage.subject && (

                                    <div>

                                        <small>
                                            SUBJECT
                                        </small>

                                        <p>
                                            {selectedMessage.subject}
                                        </p>

                                    </div>
                                )}
                            </div>

                            <div className="modal-message-content">

                                <small>
                                    MESSAGE
                                </small>

                                <p>
                                    {selectedMessage.message}
                                </p>

                            </div>

                            {selectedMessage.createdAt && (

                                <div className="modal-message-date">

                                    Received on{" "}

                                    {new Date(selectedMessage.createdAt).toLocaleString("en-IN")}

                                </div>
                            )}
                        </div>

                        <div className="admin-message-modal-footer">

                            {!selectedMessage.status !== "Read" && (

                                <button type="button" className="message-read-btn" onClick={()=>handleMarkAsRead(selectedMessage._id)}>
                                    Mark as Read
                                </button>
                            )}

                            <button type="button" className="message-delete-btn" onClick={()=>handleDelete(selectedMessage._id)}>
                                Delete
                            </button>

                            <button type="button" className="message-close-btn" onClick={()=>setSelectedMessage(null)}>
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </section>
    );
};
export default AdminMessages;