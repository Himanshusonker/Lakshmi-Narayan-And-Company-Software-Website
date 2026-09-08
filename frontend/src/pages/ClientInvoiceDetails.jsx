import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientAxios from "../api/clientAxios";

const ClientInvoiceDetails=()=>{

    const { id } = useParams();
    const [invoice, setInvoice]=useState(null);
    const [loading, setLoading]=useState(true);
    const [paying, setPaying]=useState(false);
    
    const navigate = useNavigate();

    const formatDate=(date)=>{

        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };

    const formatAmount=(amount)=>{

        return Number(amount || 0).toLocaleString("en-IN", {style: "currency", currency: "INR"});

    };

    const fetchInvoice=async()=>{

        try {

            setLoading(true);

            const response= await clientAxios.get(`/api/client/invoices/${id}`);

            if (response.data.success) {

                setInvoice(response.data.invoice);

            }

        } catch (error) {

            console.error("Invoice Details Error:", error);

            if (error.response?.status === 401) {

                localStorage.removeItem("clientToken");

                localStorage.removeItem("clientData");

                navigate("/client/login");

                return;

            }

            alert(error.response?.data?.message || "Failed to load invoice");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchInvoice();

    }, [id]);


    const loadRazorpayScript=()=>{

        return new Promise((resolve)=>{

            const existing=document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');

            if (existing) {

                resolve(true);

                return;

            }


            const script=document.createElement("script");

            script.src="https://checkout.razorpay.com/v1/checkout.js";

            script.onload=()=>resolve(true);

            script.onerror=()=>resolve(false);

            document.body.appendChild(script);

        });

    };

    const handleDownloadPDF = async () => {

    try {

        if (!invoice) return;

        const pdfEndpoint =invoice.invoiceType === "GST Invoice"
                ? `/api/client/invoices/${invoice._id}/gst-invoice`
                : `/api/client/invoices/${invoice._id}/pdf`;

        // const response= await clientAxios.get(`/api/client/invoices/${invoice._id}/pdf`, {responseType: "blob"});
        const response= await clientAxios.get(pdfEndpoint, {responseType: "blob"});

        const blob =new Blob( [response.data], {type: "application/pdf"});

        const url= window.URL.createObjectURL(blob);

        const link=document.createElement("a");

        link.href = url;

        // link.download =`${invoice.invoiceNumber}.pdf`;
        link.download =invoice.invoiceType === "GST Invoice"
                ? `${invoice.invoiceNumber}-GST.pdf`
                : `${invoice.invoiceNumber}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.error("PDF Download Error:", error);

        alert(error.response?.data?.message || "Unable to download invoice PDF");

    }

};

    const handlePayment=async()=>{

        try {

            if (!invoice) return;

            if (Number(invoice.dueAmount) <= 0) {

                alert("This invoice is already paid.");

                return;

            }

            setPaying(true);

            const scriptLoaded= await loadRazorpayScript();

            if (!scriptLoaded) {

                alert("Razorpay could not be loaded.");

                return;

            }

            const response= await clientAxios.post(`/api/client/invoices/${invoice._id}/payment/order`);

            if (!response.data.success) {

                throw new Error(response.data.message || "Payment order creation failed");

            }

            const {key, order}= response.data;

            const options={

                key,

                amount:order.amount,

                currency:order.currency,

                name:"Lakshmi Narayan And Company",

                description:invoice.title,

                order_id:order.id,

                handler:async function (paymentResponse) 
                {
                        try {

                            const verifyResponse= await clientAxios.post(`/api/client/invoices/${invoice._id}/payment/verify`,
                                    {
                                        razorpay_order_id:paymentResponse.razorpay_order_id,

                                        razorpay_payment_id:paymentResponse.razorpay_payment_id,

                                        razorpay_signature:paymentResponse.razorpay_signature
                                    }
                                );

                            if (verifyResponse.data.success) {

                                alert("Payment successful!");

                                setInvoice(verifyResponse.data.invoice);

                            }

                        } catch (error) {

                            console.error("Payment Verification Error:", error);

                            alert(error.response?.data?.message || "Payment verification failed");

                        }

                    },

                prefill: {

                    name:invoice.company ?.contactPerson || "",

                    email:invoice.company ?.email || "",

                    contact:invoice.company ?.phone || ""

                },

                notes: {

                    invoiceNumber:invoice.invoiceNumber

                },

                theme: {

                    color: "#111827"

                }

            };

            const razorpay=new window.Razorpay(options);

            razorpay.on("payment.failed",function (response) {

                    console.error("Payment Failed:", response.error);

                    alert(response.error?.description || "Payment failed");

                }
            );

            razorpay.open();

        } catch (error) {

            console.error("Payment Error:", error);

            alert(error.response?.data?.message || error.message || "Unable to start payment");

        } finally {

            setPaying(false);

        }

    };


    if (loading) {

        return (
            <div className="client-invoice-details-loading">
                Loading Invoice...
            </div>
        );

    }


    if (!invoice) {

        return (
            <div className="client-invoice-details-error">

                <h2>
                    Invoice Not Found
                </h2>

                <button onClick={() =>navigate("/client/invoices")}>
                    Back to Invoices
                </button>

            </div>
        );

    }

    return (

        <div className="client-invoice-details-page">

            <button className="client-invoice-back" onClick={() =>navigate("/client/invoices")}>
                ← Back to Invoices
            </button>

            <div className="client-invoice-details-header">

                <div>

                    <span>
                        {invoice.invoiceType === "GST Invoice" ? "GST INVOICE" : "INVOICE"}
                    </span>

                    <h1>
                        {invoice.invoiceNumber}
                    </h1>

                    <p>
                        {invoice.title}
                    </p>

                    {invoice.invoiceType === "GST Invoice" && (
                        <small className="invoice-gst-badge">
                            GST Invoice
                        </small>
                    )}

                </div>

                <span className={`client-invoice-status ${invoice.status?.toLowerCase().replaceAll(" ","-")}`}>
                    {invoice.status}
                </span>

            </div>

            <div className="client-invoice-company">

                {invoice.invoiceType === "GST Invoice" && (
                    <div className="client-invoice-gst-details">

                        <div>
                            <span>
                                SELLER GSTIN
                            </span>

                            <strong>
                                {invoice.sellerGSTIN || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>
                                BUYER GSTIN
                            </span>

                            <strong>
                                {invoice.buyerGSTIN || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>
                                PLACE OF SUPPLY
                            </span>

                            <strong>
                                {invoice.placeOfSupply || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>
                                GST TYPE
                            </span>

                            <strong>
                                {invoice.gstType === "IGST"
                                    ? "IGST"
                                    : "CGST + SGST"}
                            </strong>
                        </div>

                    </div>
                )}

                <div>

                    <span>
                        BILLED TO
                    </span>

                    <strong>
                        {invoice.company ?.companyName || "-"}
                    </strong>

                    <small>
                        {invoice.company ?.contactPerson || "-"}
                    </small>

                    <small>
                        Email: {invoice.company?.email || "-"}
                    </small>

                    {invoice.invoiceType === "GST Invoice" && (
                    <>
                        <small>
                            Buyer GSTIN: {invoice.buyerGSTIN || "-"}
                        </small>

                        <small>
                            Place of Supply: {invoice.placeOfSupply || "-"}
                        </small>
                    </>
                    )}

                </div>

                <div>

                    <span>
                        INVOICE DATE
                    </span>

                    <strong>
                        {formatDate(invoice.issueDate)}
                    </strong>

                </div>

                <div>

                    <span>
                        DUE DATE
                    </span>

                    <strong>
                        {formatDate(invoice.dueDate)}
                    </strong>

                </div>

            </div>

            <div className="client-invoice-items">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Description
                            </th>

                            {invoice.invoiceType === "GST Invoice" && (
                            <th>
                                HSN/SAC
                            </th>
                            )}

                            <th>
                                Qty
                            </th>

                            <th>
                                Rate
                            </th>

                            <th>
                                Amount
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {invoice.items?.map((item) => (

                                <tr key={item._id}>

                                    <td>
                                        {item.description}
                                    </td>

                                    {invoice.invoiceType === "GST Invoice" && (
                                    <td>
                                        {item.hsnSac || "-"}
                                    </td>
                                    )}

                                    <td>
                                        {item.quantity}
                                    </td>

                                    <td>
                                        {formatAmount(item.rate)}
                                    </td>

                                    <td>
                                        {formatAmount(item.amount)}
                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

            <div className="client-invoice-summary">

                <div>
                    <span>
                        Subtotal
                    </span>

                    <strong>
                        {formatAmount(invoice.subtotal)}
                    </strong>
                </div>

                <div>
                    {/* <span>
                        Tax
                        ({invoice.taxPercentage}%)
                    </span>

                    <strong>
                        {formatAmount(invoice.taxAmount)}
                    </strong> */}

                    {invoice.invoiceType === "GST Invoice" ? (

                        <>
                            {invoice.gstType === "IGST" ? (

                                <div>
                                    <span>
                                        IGST ({invoice.igstPercentage || 0}%)
                                    </span>

                                    <strong>
                                        {formatAmount(invoice.igstAmount)}
                                    </strong>
                                </div>

                            ) : (

                                <>
                                    <div>
                                        <span>
                                            CGST ({invoice.cgstPercentage || 0}%)
                                        </span>

                                        <strong>
                                            {formatAmount(invoice.cgstAmount)}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            SGST ({invoice.sgstPercentage || 0}%)
                                        </span>

                                        <strong>
                                            {formatAmount(invoice.sgstAmount)}
                                        </strong>
                                    </div>
                                </>

                            )}
                        </>

                    ) : (

                        <div>
                            <span>
                                Tax ({invoice.taxPercentage || 0}%)
                            </span>

                            <strong>
                                {formatAmount(invoice.taxAmount)}
                            </strong>
                        </div>

                    )}
                </div>

                {/* <div>
                    <span>
                        Discount
                    </span>

                    <strong>
                        -
                        {formatAmount(invoice.discount)}
                    </strong>
                </div> */}

                <div className="invoice-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        {formatAmount(invoice.totalAmount)}
                    </strong>

                </div>

                <div>

                    <span>
                        Paid
                    </span>

                    <strong>
                        {formatAmount(invoice.paidAmount)}
                    </strong>

                </div>

                <div className="invoice-due">

                    <span>
                        Due Amount
                    </span>

                    <strong>
                        {formatAmount(invoice.dueAmount)}
                    </strong>

                </div>

            </div>

            <div className="client-invoice-actions">

                                    {/* DOWNLOAD INVOICE PDF */}

                <button onClick={handleDownloadPDF} className="client-download-invoice-btn">
                    Download Invoice PDF
                </button>

                                    {/* ONLINE PAYMENT */}

                {Number(invoice.dueAmount) > 0 && invoice.status !== "Cancelled" && (

                    <button onClick={handlePayment} disabled={paying} className="client-pay-invoice-btn">

                        {paying ? "Processing...": `Pay ${formatAmount(invoice.dueAmount)}`}

                    </button>

                )}

            </div>

            {invoice.notes && (

                <div className="client-invoice-notes">

                    <span>
                        NOTES
                    </span>

                    <p>
                        {invoice.notes}
                    </p>

                </div>

            )}

            {Array.isArray(invoice.paymentHistory) && invoice.paymentHistory.some(payment => payment.status === "Paid") && (

                <div className="client-invoice-payments">

                    <h2>
                        Payment History
                    </h2>

                    {invoice.paymentHistory.filter(payment => payment.status === "Paid").map(payment => (

                            <div key={payment._id}>

                                <strong>
                                    {formatAmount(payment.amount)}
                                </strong>

                                <span>
                                    Paid on{" "}
                                    {formatDate(payment.paidAt)}
                                </span>

                                <small>
                                    Payment ID:{" "}
                                    {payment.razorpayPaymentId}
                                </small>

                            </div>
                        )
                    )}

                </div>
            )}

        </div>
    );
};
export default ClientInvoiceDetails;