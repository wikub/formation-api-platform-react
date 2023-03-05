import React, {useEffect, useState} from "react";
import Field from "../components/forms/Field";
import { Link, useParams, useNavigate } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import { toast } from "react-toastify";

const customerPage = () => {

    const navigate = useNavigate();
    const {id = "new"} = useParams();

    const [customer, setCustomer] = useState({
        lastname: "",
        firstname: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastname: "",
        firstname: "",
        email: "",
        company: ""
    });

    const [editing, setEditing] = useState(false);

    const fetchCustomer = async (id) => {
        try {
            const {lastname, firstname, email, company} = await CustomersAPI.find(id);
            setCustomer({lastname, firstname, email, company});
        }catch (error) {
            toast.error("Aucun clien trouvé");
            navigate("/customers", { replace: true });
        }
    }

    useEffect(() => {
        if( id !== "new" ) {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);
    

    const handleChange = ({currentTarget}) => {
        setCustomer({
            ...customer,
            [currentTarget.name]: currentTarget.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            if(editing) {
                await CustomersAPI.update(id, customer);
                toast.success("Le client a bien été modifié");
                navigate("/customers", { replace: true });
            } else {
                await CustomersAPI.create(customer);
                toast.success("Le client a bien été ajouté");
                navigate("/customers", { replace: true });
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
            toast.error("Il y a des erreurs dans votre formulaire");
        }
    }

    return (
        <>
            <h1>Client {editing && <>#{id}</> }</h1>
            <form onSubmit={handleSubmit}>
                <Field name="lastname" label="Nom" value={customer.lastname} onChange={handleChange} error={errors.lastname} />
                <Field name="firstname" label="Prénom" value={customer.firstname} onChange={handleChange} error={errors.firstname} />
                <Field name="email" label="Email" type="email" value={customer.email}  onChange={handleChange} error={errors.email} />
                <Field name="company" label="Société" value={customer.company} onChange={handleChange} error={errors.company} />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                    <Link to="/customers" className="btn btn-secondary ml-3">Annuler</Link>
                </div>
            </form>
        </>
    )
}

export default customerPage;