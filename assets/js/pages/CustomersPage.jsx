import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";

const CustomersPage = props => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCustomers();
    }, []);


    const handleDelete = async(id) => {    
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        
        try {
            await CustomersAPI.deleteCustomer(id);
        } catch (error) {
            setCustomers(originalCustomers);
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

    const filteredCustomers = customers.filter(customer => {
        return customer.firstname.toLowerCase().includes(search.toLowerCase()) 
        || customer.lastname.toLowerCase().includes(search.toLowerCase())
        || customer.email.toLowerCase().includes(search.toLowerCase())
        || (customer.company && customer.company.toLowerCase().includes(search.toLowerCase()))
        ;
    });

    const paginateCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

    return ( 
    <>
        <h1>Liste des clients</h1>

        <div className="form-group">
            <input type="text" className="form-control" placeholder="Rechercher un client" onChange={handleSearch} value={search} />
        </div>
        
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
                {paginateCustomers.map((customer, index) => (
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
                        <td>{ customer.totalAmount.toLocaleString() } &euro;</td>
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
        
        <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length} onPageChanged={handlePageChange} />
        

    </>
    );
};

export default CustomersPage;