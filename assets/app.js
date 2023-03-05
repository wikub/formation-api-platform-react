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
import CustomerPage from './js/pages/CustomerPage';
import InvoicesPage from './js/pages/InvoicesPage';
import LoginPage from './js/pages/LoginPage';
import AuthAPI from './js/services/authAPI';
import AuthContext from './js/contexts/AuthContext';
import RequireAuth from './js/components/RequireAuth';
import InvoicePage from './js/pages/InvoicePage';
import RegisterPage from './js/pages/RegisterPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

AuthAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>

            <HashRouter>
                
                <Navbar/>
                <main className="m-5">
                    <Routes>
                        <Route 
                            path="/login"
                            element={<LoginPage />}
                        />
                        <Route 
                            path="/register"
                            element={<RegisterPage />}
                        />
                        <Route path="/customer/:id" element={
                            <RequireAuth redirectTo="/login">
                                <CustomerPage />;
                            </RequireAuth>
                        } />
                        <Route path="/customers" element={
                            <RequireAuth redirectTo="/login">
                                <CustomersPage />;
                            </RequireAuth>
                        } />

                        <Route path="/invoice/:id" element={
                            <RequireAuth redirectTo="/login">
                                <InvoicePage />;
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

            <ToastContainer position={toast.POSITION.TOP_CENTER} />
        </AuthContext.Provider>
    );
}

const rootElement = document.getElementById('app');
//ReactDOM.render(<app />, rootElement);
ReactDOM.createRoot(rootElement).render(<App />);
