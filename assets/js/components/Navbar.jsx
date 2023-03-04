import React, {useContext} from "react";
import AuthAPI from "../services/authAPI";
import {NavLink, useNavigate} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">SimReact</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/customers">Clients</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">Inscription</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
                            </li>
                        </>
                    )) ||
                    
                    <li className="nav-item">
                        <button 
                            className="btn btn-danger"
                            onClick={() => handleLogout()}
                        >
                            Déconnexion
                        </button>
                    </li>
                    }

                </ul>
                </div>
            </div>
            </nav>
    );
}

export default Navbar;