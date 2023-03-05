import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import UserAPI from "../services/usersAPI";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        plainPassword: "",
        password_confirmation: ""
    });

    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        plainPassword: "",
        password_confirmation: ""
    });

    const handleChange = ({currentTarget}) => {
        setUser({
            ...user,
            [currentTarget.name]: currentTarget.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiErrors = {};
        if(user.plainPassword !== user.password_confirmation) {
            apiErrors.password_confirmation = "Passwords do not match";
            setErrors(apiErrors);
            return;
        }

        try {
            const response = await UserAPI.register(user);
            setErrors({});
            toast.success("You have been registered");
            navigate("/login", { replace: true });
        } catch ({response}) {
            const {violations} = response.data;

            if( violations ) {
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                })

                setErrors(apiErrors);
            }
            toast.error("An error has occured");
        }

    }

    return (
        <div>
            <h1>Inscription</h1>

            <form onSubmit={handleSubmit} >
                <Field name="firstname" label="Prénom" type="text" onChange={handleChange} value={user.firstname} error={errors.firstname} />
                <Field name="lastname" label="Nom" type="text" onChange={handleChange} value={user.lastname} error={errors.lastname} />
                <Field name="email" label="Email" type="email" onChange={handleChange} value={user.email} error={errors.email} />
                <Field name="plainPassword" label="Mot de passe" type="password" onChange={handleChange} value={user.password} error={errors.plainPassword} />
                <Field name="password_confirmation" label="Confirmation du mot de passe" type="password" onChange={handleChange} value={user.password_confirmation} error={errors.password_confirmation} />

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">S'inscrire</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;