import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../api/clientAxios";

const ClientInvoices = () => {

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const fetchInvoices=async()=>{

        try {

            setLoading(true);

            const response=await clientAxios.get("/api/client/invoices");

            if (response.data.success) {

                setInvoices(response.data.invoices || []);

            }

        } catch (error) {

            console.error("Fetch Invoices Error:", error);

            if (error.response?.status === 401) {

                localStorage.removeItem("clientToken");

                localStorage.removeItem("clientData");

                navigate("/client/login");

            }

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchInvoices();

    }, []);


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


    const getStatusClass=(status)=>{

        return status ?.toLowerCase().replaceAll(" ", "-");

    };

    const filteredInvoices=invoices.filter((invoice)=>{

            const text=search.toLowerCase();

            return (

                invoice.invoiceNumber ?.toLowerCase().includes(text) ||

                invoice.title ?.toLowerCase().includes(text) ||

                invoice.status ?.toLowerCase().includes(text) ||

                invoice.project?.projectName ?.toLowerCase().includes(text)

            );

        });


    if (loading) {

        return (
            <div className="client-invoices-loading">
                Loading Invoices...
            </div>
        );

    }


    return (

        <div className="client-invoices-page">

            <div className="client-invoices-header">

                <div>

                    <span>
                        CLIENT BILLING
                    </span>

                    <h1>
                        Invoices & Payments
                    </h1>

                    <p>
                        View your invoices,
                        payment status and
                        payment history.
                    </p>

                </div>

            </div>

            <div className="client-invoices-search">

                <input type="text" placeholder="Search invoice, project or status..." value={search} onChange={(e)=>setSearch(e.target.value)}/>

            </div>

            <div className="client-invoice-table-wrapper">

                <table className="client-invoice-table">

                    <thead>

                        <tr>

                            <th>
                                Invoice
                            </th>

                            <th>
                                Project
                            </th>

                            <th>
                                Issue Date
                            </th>

                            <th>
                                Due Date
                            </th>

                            <th>
                                Amount
                            </th>

                            <th>
                                Due
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

                        {filteredInvoices.length === 0 ? (

                            <tr>

                                <td colSpan="8" className="client-no-invoices">
                                    No invoices found.
                                </td>

                            </tr>

                        ) : (

                            filteredInvoices.map((invoice) => (

                                    <tr key={invoice._id}>

                                        <td>

                                            <strong>
                                                {invoice.invoiceNumber}
                                            </strong>

                                            <small>
                                                {invoice.title}
                                            </small>

                                        </td>

                                        <td>
                                            {invoice.project ?.projectName || "General"}
                                        </td>

                                        <td>
                                            {formatDate(invoice.issueDate)}
                                        </td>

                                        <td>
                                            {formatDate(invoice.dueDate)}
                                        </td>

                                        <td>
                                            {formatAmount(invoice.totalAmount)}
                                        </td>

                                        <td>
                                            {formatAmount(invoice.dueAmount)}
                                        </td>

                                        <td>

                                            <span className={`client-invoice-status ${getStatusClass(invoice.status)}`}>
                                                {invoice.status}
                                            </span>

                                        </td>

                                        <td>

                                            <button onClick={() =>navigate(`/client/invoices/${invoice._id}`)}>
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};
export default ClientInvoices;