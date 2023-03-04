/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CustomersPage from './js/pages/CustomersPage';
import InvoicesPage from './js/pages/InvoicesPage';
import LoginPage from './js/pages/LoginPage';
import AuthAPI from './js/services/authAPI';
import AuthContext from './js/contexts/AuthContext';
import RequireAuth from './js/components/RequireAuth';

AuthAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>

            <HashRouter>
                
                <Navbar/>
                <main className="mt-5">
                    <Routes>
                        <Route 
                            path="/login"
                            element={<LoginPage />}
                        />
                        <Route path="/customers" element={
                            <RequireAuth redirectTo="/login">
                                <CustomersPage />;
                            </RequireAuth>
                        } />
                        <Route path="/invoices" element={
                            <RequireAuth redirectTo="/login">
                                <InvoicesPage />;
                            </RequireAuth>
                        } />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </main>

            </HashRouter>
        </AuthContext.Provider>
    );
}

const rootElement = document.getElementById('app');
//ReactDOM.render(<app />, rootElement);
ReactDOM.createRoot(rootElement).render(<App />);
