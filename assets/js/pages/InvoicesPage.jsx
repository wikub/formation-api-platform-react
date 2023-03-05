import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import moment from "moment";
import InvoicesAPI from "../services/invoicesAPI";
import {Link} from "react-router-dom";

const STATUS_CLASSES = {
    PAID: "success",
    CANCELLED: "danger",
    SENT: "warning",

}

const STATUS_LABELS = {
    PAID: "Payée",
    CANCELLED: "Annulée",
    SENT: "Envoyée",
}

const InvoicesPage = props => {
    
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleDelete = async(id) => {    
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        
        try {
            await InvoicesAPI.delete(id);
        } catch (error) {
            console.log(error);
            setInvoices(originalInvoices);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = ({currentTarget}) => {
        setCurrentPage(1);
        setSearch(currentTarget.value);
    }

    const itemsPerPage = 10;

    const filteredInvoices = invoices.filter(invoice => {
        return invoice.customer.firstname.toLowerCase().includes(search.toLowerCase()) 
        || invoice.customer.lastname.toLowerCase().includes(search.toLowerCase())
        || invoice.amount.toString().includes(search.toLowerCase())
        || ( STATUS_LABELS[invoice.status].toLowerCase().includes(search.toLowerCase()))
        ;
    });

    const paginateInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    const formatDate = (str) => {
        return moment(str).format('DD/MM/YYYY');
    }


    return (
        <>
            <h1>
                Liste des factures
                <Link to="/invoice/new" className="btn btn-primary ml-3">Nouvelle</Link>
            </h1>

            <div className="form-group">
                <input type="text" className="form-control" placeholder="Rechercher une facture" onChange={handleSearch} value={search} />
            </div>

            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>Chrono</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Montant</th>
                        <th>Etat</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginateInvoices.map(invoice => (
                        <tr className="text-center" key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{formatDate(invoice.sentAt)}</td>
                            <td>
                                <a href="#">{invoice.customer.firstname} {invoice.customer.lastname} </a>
                            </td>
                            <td>{invoice.amount.toLocaleString()}</td>
                            <td>
                                <span 
                                    className={"badge bg-" + STATUS_CLASSES[invoice.status]}
                                >
                                    {STATUS_LABELS[invoice.status]}
                                </span>
                            </td>
                            <td>
                                <Link to={`/invoice/${invoice.id}`} className="btn btn-sm btn-primary">Modifier</Link>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(invoice.id)}
                                >Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredInvoices.length} />

        </>
    )
}

export default InvoicesPage;