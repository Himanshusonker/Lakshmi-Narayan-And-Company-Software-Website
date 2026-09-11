const multer = require("multer");
const path = require("path");
const fs = require("fs");


// =========================================================
// UPLOAD DIRECTORY
// =========================================================

const uploadDir = path.join(
    __dirname,
    "../uploads/ca-documents"
);


// Create directory if it does not exist

if (!fs.existsSync(uploadDir)) {

    fs.mkdirSync(
        uploadDir,
        {
            recursive: true
        }
    );

}


// =========================================================
// STORAGE
// =========================================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            uploadDir
        );

    },

    filename: (req, file, cb) => {

        const extension =
            path.extname(file.originalname);

        const baseName =
            path
                .basename(
                    file.originalname,
                    extension
                )
                .replace(
                    /[^a-zA-Z0-9-_]/g,
                    "-"
                );

        const uniqueName =
            `${baseName}-${Date.now()}${extension}`;

        cb(
            null,
            uniqueName
        );

    }

});


// =========================================================
// FILE FILTER
// =========================================================

const fileFilter = (req, file, cb) => {

    const allowedExtensions = [

        ".pdf",

        ".doc",
        ".docx",

        ".xls",
        ".xlsx",

        ".jpg",
        ".jpeg",
        ".png",

        ".zip"

    ];

    const extension =
        path
            .extname(file.originalname)
            .toLowerCase();


    if (
        allowedExtensions.includes(
            extension
        )
    ) {

        cb(
            null,
            true
        );

    } else {

        cb(
            new Error(
                "Unsupported file type"
            ),
            false
        );

    }

};


// =========================================================
// MULTER
// =========================================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:
            10 * 1024 * 1024

    }

});


module.exports = upload;