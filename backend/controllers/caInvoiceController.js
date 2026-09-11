const ClientInvoice = require("../models/clientInvoiceModel");
const {downloadClientInvoicePDF, downloadClientGSTInvoicePDF} = require("./clientInvoiceController");



// ==========================================
// GET CA INVOICES
// ==========================================

const getCAInvoices = async (req, res) => {

    try {

        const {
            search = "",
            fromDate,
            toDate
        } = req.query;

        const query = {};

        // =====================================
        // DATE FILTER
        // =====================================

        if (fromDate || toDate) {

            query.issueDate = {};

            if (fromDate) {

                query.issueDate.$gte =
                    new Date(`${fromDate}T00:00:00`);

            }

            if (toDate) {

                query.issueDate.$lte =
                    new Date(`${toDate}T23:59:59.999`);

            }

        }

        let invoices = await ClientInvoice.find(query)
            .populate(
                "company",
                "companyName contactPerson email phone"
            )
            .populate(
                "project",
                "projectName"
            )
            .sort({
                issueDate: -1
            });

        // =====================================
        // SEARCH
        // =====================================

        if (search.trim()) {

            const text = search
                .toLowerCase()
                .trim();

            invoices = invoices.filter(invoice => {

                return (

                    invoice.invoiceNumber
                        ?.toLowerCase()
                        .includes(text)

                    ||

                    invoice.company?.companyName
                        ?.toLowerCase()
                        .includes(text)

                    ||

                    invoice.project?.projectName
                        ?.toLowerCase()
                        .includes(text)

                    ||

                    invoice.title
                        ?.toLowerCase()
                        .includes(text)

                    ||

                    invoice.status
                        ?.toLowerCase()
                        .includes(text)

                );

            });

        }

        res.json({

            success: true,

            count: invoices.length,

            invoices

        });

    } catch (error) {

        console.error("CA Invoice Error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch invoices"

        });

    }

};

// ==========================================
// CA - DOWNLOAD NORMAL INVOICE PDF
// ==========================================

const downloadCAInvoicePDF = async (req, res) => {

    try {

        // CA request identify karega
        req.isCA = true;

        // Existing Client Invoice PDF generator reuse
        return await downloadClientInvoicePDF(
            req,
            res
        );

    } catch (error) {

        console.error(
            "CA Invoice PDF Error:",
            error
        );

        if (!res.headersSent) {

            return res.status(500).json({
                success: false,
                message: "Failed to generate invoice PDF"
            });

        }

    }

};

// ==========================================
// CA - DOWNLOAD GST INVOICE PDF
// ==========================================

const downloadCAGSTInvoicePDF = async (req, res) => {

try {

        // CA request identify karega
        req.isCA = true;

        // Existing Client GST PDF generator reuse
        return await downloadClientGSTInvoicePDF(
            req,
            res
        );

    } catch (error) {

        console.error(
            "CA GST Invoice PDF Error:",
            error
        );

        if (!res.headersSent) {

            return res.status(500).json({
                success: false,
                message: "Failed to generate GST invoice PDF"
            });

        }

    }

};

module.exports = {
    getCAInvoices,
    downloadCAInvoicePDF,
    downloadCAGSTInvoicePDF

};