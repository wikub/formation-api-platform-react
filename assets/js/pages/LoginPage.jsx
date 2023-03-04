import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";

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
            navigate("/customers", { replace: true });
        } catch (error) {
            setError("Aucun compte avec cet identifiant ou mot de passe");
        }
    }


    return (
        <>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email" 
                        className={"form-control" + (error ? " is-invalid" : "")}
                        id="username" 
                        name="username" 
                        placeholder="Email" 
                        value={credentials.username}
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                    
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        onChange={handleChange}
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={credentials.password}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Connexion</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;