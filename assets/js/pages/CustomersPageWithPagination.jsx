import React, {useEffect, useState} from "react";
import axios from 'axios';
import Pagination from "../components/Pagination";

const CustomersPageWithPagination = props => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        axios
            .get(`/api/customers?pagination=true&itemsPerPage=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data['hydra:member']);
                setTotalItems(response.data['hydra:totalItems']);
            })

            .catch(error => console.log(error.response))
            ;
    }, [currentPage]);

    const handleDelete = (id) => {
        
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));
        
        axios
            .delete('/api/customers/'+id)
            .then(response => console.log('ok'))
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error.response);
            });
            ;
    }

    const handlePageChange = (page) => {
        setCustomers([]);
        setCurrentPage(page);
    }

    const itemsPerPage = 10;
    const paginateCustomers = Pagination.getData(customers, currentPage, itemsPerPage);

    return ( 
    <>
        <h1>Liste des clients (Pagination)</h1>

        <table className="table table-hover">
            <thead>
                <tr className="text-center">
                    <th>#</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th>Factures</th>
                    <th>Montant total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.length === 0 && <tr><td colSpan="7" className="text-center">Chargement en cours ...</td></tr>}
                {customers.map((customer, index) => (
                    <tr key={customer.id} className="text-center">
                        <td>{customer.id}</td>
                        <td>
                            <a href="#">{customer.firstname} {customer.lastname}</a>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td>
                            <span className="badge bg-primary">{customer.invoices.length}</span>
                        </td>
                        <td>{ customer.totalAmount.toLocaleString() } &euros</td>
                        <td>
                            <button 
                                onClick={() => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0} 
                                className="btn btn-danger btn-sm"
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChanged={handlePageChange} />
        

    </>
    );
};

export default CustomersPageWithPagination;