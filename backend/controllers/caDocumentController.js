const CADocument = require("../models/caDocumentModel");
const path = require("path");
const fs = require("fs");



// =========================================================
// SEND DOCUMENT / MESSAGE TO ADMIN
// =========================================================

const sendCADocument = async (req, res) => {

    try {

        // ---------------------------------------------
        // CHECK CA AUTHENTICATION
        // ---------------------------------------------

        if (!req.ca || !req.ca._id) {

            return res.status(401).json({
                success: false,
                message: "CA authentication required"
            });

        }


        // ---------------------------------------------
        // GET FORM DATA
        // ---------------------------------------------

        const {
            title,
            message
        } = req.body;


        // ---------------------------------------------
        // VALIDATE TITLE
        // ---------------------------------------------

        if (!title || !title.trim()) {

            return res.status(400).json({
                success: false,
                message: "Title is required"
            });

        }


        // ---------------------------------------------
        // MESSAGE + FILE CHECK
        // ---------------------------------------------

        if (
            (!message || !message.trim()) &&
            !req.file
        ) {

            return res.status(400).json({
                success: false,
                message: "Please write a message or attach a document"
            });

        }


        // ---------------------------------------------
        // FILE DATA
        // ---------------------------------------------

        let fileName = "";
        let filePath = "";
        let fileType = "";
        let fileSize = 0;


        if (req.file) {

            fileName = req.file.originalname || "";

            filePath = req.file.path || "";

            fileType = req.file.mimetype || "";

            fileSize = req.file.size || 0;

        }


        // ---------------------------------------------
        // CREATE DOCUMENT
        // ---------------------------------------------

        const document = await CADocument.create({

            ca: req.ca._id,

            sender: "CA",

            title: title.trim(),

            message: message
                ? message.trim()
                : "",

            fileName,

            filePath,

            fileType,

            fileSize,

            adminIsRead: false, 
            
            caIsRead: true

        });


        // ---------------------------------------------
        // SUCCESS
        // ---------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Document / message sent to admin successfully",

            document

        });

    } catch (error) {

        console.error(
            "Send CA Document Error:",
            error
        );


        // ---------------------------------------------
        // DELETE UPLOADED FILE IF DB SAVE FAILED
        // ---------------------------------------------

        if (req.file?.path) {

            try {

                if (
                    fs.existsSync(
                        req.file.path
                    )
                ) {

                    fs.unlinkSync(
                        req.file.path
                    );

                }

            } catch (fileError) {

                console.error(
                    "Uploaded File Cleanup Error:",
                    fileError
                );

            }

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to send document to admin",

            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined

        });

    }

};


// =========================================================
// GET CA DOCUMENTS
// =========================================================

const getCADocuments = async (req, res) => {

    try {

        if (!req.ca || !req.ca._id) {

            return res.status(401).json({
                success: false,
                message: "CA authentication required"
            });

        }


        const documents =
            await CADocument.find({
                ca: req.ca._id
            })
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            documents

        });

    } catch (error) {

        console.error(
            "Get CA Documents Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch CA documents"

        });

    }

};



const markCADocumentAsReadByCA = async (req, res) => {
    try {
        if (!req.ca || !req.ca._id) {
            return res.status(401).json({
                success: false,
                message: "CA authentication required"
            });
        }

        const document = await CADocument.findOne({
            _id: req.params.id,
            ca: req.ca._id
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }

        document.caIsRead = true;

        await document.save();

        return res.status(200).json({
            success: true,
            message: "Document marked as read",
            document
        });

    } catch (error) {
        console.error(
            "Mark CA Document Read Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to mark document as read"
        });
    }
};


    const downloadCADocumentByCA = async (req, res) => {
        try {
            if (!req.ca || !req.ca._id) {
                return res.status(401).json({
                    success: false,
                    message: "CA authentication required"
                });
            }

            const document = await CADocument.findOne({
                _id: req.params.id,
                ca: req.ca._id
            });

            if (!document) {
                return res.status(404).json({
                    success: false,
                    message: "Document not found"
                });
            }

            if (!document.filePath) {
                return res.status(404).json({
                    success: false,
                    message: "No file attached"
                });
            }

            if (!fs.existsSync(document.filePath)) {
                return res.status(404).json({
                    success: false,
                    message: "File not found on server"
                });
            }

            return res.download(
                document.filePath,
                document.fileName
            );

        } catch (error) {
            console.error(
                "CA Download Document Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Failed to download document"
            });
        }
    };




    // =========================================================
    // Admin Sent Document to CA
    // =========================================================

const sendAdminCADocument = async (req, res) => {

    try {

        // ==========================================
        // ADMIN AUTHENTICATION
        // ==========================================

        if (!req.admin || !req.admin._id) {

            return res.status(401).json({
                success: false,
                message: "Admin authentication required"
            });

        }


        const {
            caId,
            title,
            message
        } = req.body;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!caId) {

            return res.status(400).json({
                success: false,
                message: "CA is required"
            });

        }


        if (!title || !title.trim()) {

            return res.status(400).json({
                success: false,
                message: "Title is required"
            });

        }


        if (
            (!message || !message.trim()) &&
            !req.file
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please write a message or attach a document"
            });

        }


        // ==========================================
        // FILE DATA
        // ==========================================

        let fileName = "";
        let filePath = "";
        let fileType = "";
        let fileSize = 0;


        if (req.file) {

            fileName =
                req.file.originalname || "";

            filePath =
                req.file.path || "";

            fileType =
                req.file.mimetype || "";

            fileSize =
                req.file.size || 0;

        }


        // ==========================================
        // CREATE DOCUMENT
        // ==========================================

        const document =
            await CADocument.create({

                ca: caId,

                sender: "ADMIN",

                title: title.trim(),

                message:
                    message
                        ? message.trim()
                        : "",

                fileName,

                filePath,

                fileType,

                fileSize,

                adminIsRead: true,

                caIsRead: false

            });


        return res.status(201).json({

            success: true,

            message:
                "Message / document sent to CA successfully",

            document

        });

    } catch (error) {

        console.error(
            "Send Admin CA Document Error:",
            error
        );


        // ==========================================
        // DELETE FILE IF DB SAVE FAILED
        // ==========================================

        if (req.file?.path) {

            try {

                if (
                    fs.existsSync(
                        req.file.path
                    )
                ) {

                    fs.unlinkSync(
                        req.file.path
                    );

                }

            } catch (fileError) {

                console.error(
                    "File Cleanup Error:",
                    fileError
                );

            }

        }


        return res.status(500).json({

            success: false,

            message:
                "Failed to send document to CA",

            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined

        });

    }

};


const getAdminCADocuments = async (req, res) => {

    try {

        if (!req.admin || !req.admin._id) {

            return res.status(401).json({
                success: false,
                message: "Admin authentication required"
            });

        }


        const documents =
            await CADocument.find()
                .populate(
                    "ca",
                    "name email username"
                )
                .sort({
                    createdAt: -1
                });


        return res.status(200).json({

            success: true,

            documents

        });

    } catch (error) {

        console.error(
            "Get Admin CA Documents Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch CA documents"

        });

    }

};

const markCADocumentAsRead = async (req, res) => {

    try {

        if (!req.admin || !req.admin._id) {
            return res.status(401).json({
                success: false,
                message: "Admin authentication required"
            });
        }

        const document =
            await CADocument.findById(
                req.params.id
            );

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found"
            });
        }

        document.adminIsRead = true;

        await document.save();

        return res.status(200).json({
            success: true,
            message: "Document marked as read",
            document
        });

    } catch (error) {

        console.error(
            "Mark CA Document Read Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to mark document as read"
        });

    }

};

const downloadCADocument = async (req, res) => {

    try {

        if (!req.admin || !req.admin._id) {

            return res.status(401).json({
                success: false,
                message: "Admin authentication required"
            });

        }

        const document =
            await CADocument.findById(
                req.params.id
            );

        if (!document) {

            return res.status(404).json({
                success: false,
                message: "Document not found"
            });

        }

        if (!document.filePath) {

            return res.status(404).json({
                success: false,
                message: "No file attached"
            });

        }

        if (!fs.existsSync(document.filePath)) {

            return res.status(404).json({
                success: false,
                message: "File not found on server"
            });

        }

        return res.download(
            document.filePath,
            document.fileName
        );

    } catch (error) {

        console.error(
            "Download CA Document Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to download document"
        });

    }

};





// =========================================================
// EXPORT
// =========================================================

module.exports = {

    sendCADocument,
    getCADocuments,
    sendAdminCADocument,
    getAdminCADocuments,
    markCADocumentAsRead,
    markCADocumentAsReadByCA,
    downloadCADocument,
    downloadCADocumentByCA
};

