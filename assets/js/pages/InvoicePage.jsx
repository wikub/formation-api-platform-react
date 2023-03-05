import React, {useEffect, useState} from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link, useParams, useNavigate } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import invoicesAPI from "../services/invoicesAPI";
import { toast } from "react-toastify";

const InvoicePage = () => {
    
    const navigate = useNavigate();
    const {id = "new"} = useParams();

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT",
    });

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: "",
    });

    const [editing, setEditing] = useState(false);

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);

            if(invoice.customer === "") {
                setInvoice({
                    ...invoice,
                    customer: data[0].id
                });
            }
        } catch (error) {
            toast.error("Une erreur s'est produite lors du chargement des clients");
            navigate("/invoices", { replace: true });
        }
    }

    const fetchInvoice = async (id) => {
        try {
            const {amount, customer, status} = await invoicesAPI.find(id);
            setInvoice({amount, customer, status});
        }catch (error) {
            toast.error("Une erreur s'est produite lors du chargement de la facture");
            navigate("/invoices", { replace: true });
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if( id !== "new" ) {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id]);

    const handleChange = ({currentTarget}) => {
        setInvoice({
            ...invoice,
            [currentTarget.name]: currentTarget.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if(editing) {
                await invoicesAPI.update(id, {...invoice, customer: `/api/customers/${invoice.customer}`});
                toast.success("La facture a bien été modifiée");
                navigate("/invoices", { replace: true });
            } else {
                await invoicesAPI.create({...invoice, customer: `/api/customers/${invoice.customer}`});
                toast.success("La facture a bien été créée");
                navigate("/invoices", { replace: true });
            }
            
            setErrors({});
        } catch ({response}) {
            const {violations} = response.data;

            if( violations ) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                })

                setErrors(apiErrors);
            }
            toast.error("Il y a des erreurs dans le formulaire");
        }
    }

    return (
        <div>
            <h1>Facture {editing && <>#{id}</> }</h1>

            <form onSubmit={handleSubmit}>
                <Field name="amount" label="Montant" type="number" onChange={handleChange} value={invoice.amount} error={errors.amount} />

                <Select name="customer" label="Client" onChange={handleChange} value={invoice.customer} error={errors.customer}>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.firstname} {customer.lastname}</option>
                    ))}
                </Select>
                
                <Select name="status" label="Statut" onChange={handleChange} value={invoice.status} error={errors.status}>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-secondary ml-3">Annuler</Link>
                </div>

            </form>
        </div>
    )
};

export default InvoicePage;