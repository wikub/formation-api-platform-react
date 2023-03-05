import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";

const LoginPage = () => {

    let navigate = useNavigate();

    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials, setCredentials] = React.useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("You have been logged in");
            navigate("/customers", { replace: true });
        } catch (error) {
            setError("Aucun compte avec cet identifiant ou mot de passe");
            toast.error("Aucun compte avec cet identifiant ou mot de passe");
        }
    }


    return (
        <>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <Field name="username" label="Identifiant" value={credentials.username} onChange={handleChange} placeholder="Identifiant" type="text" error={error} />
                <Field name="password" label="Mot de passe" value={credentials.password} onChange={handleChange} placeholder="Mot de passe" type="password" error="" />
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Connexion</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;