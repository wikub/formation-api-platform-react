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

import React from 'react';
//import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CustomersPage from './js/pages/CustomersPage';
import InvoicesPage from './js/pages/InvoicesPage';

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            
            <main className="mt-5">
                <Routes>
                    <Route path="/customers" element={<CustomersPage />} />
                    <Route path="/invoices" element={<InvoicesPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </main>

        </HashRouter>
    );
}

const rootElement = document.getElementById('app');
//ReactDOM.render(<app />, rootElement);
ReactDOM.createRoot(rootElement).render(<App />);
