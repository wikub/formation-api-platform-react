import axios from "axios";

function findAll() {
    return axios
        .get('/api/invoices')
        .then(response => response.data['hydra:member']);
}

function deleteInvoice(id) {
    return axios
        .delete('/api/invoices/'+id)
        ;
}

function find(id) {
    return axios
        .get('/api/invoices/'+id)
        .then(response => response.data);
}

function update(id, invoice) {
    return axios
        .put('/api/invoices/'+id, invoice)
        .then(response => response.data);
}

function create(invoice) {
    return axios
        .post('/api/invoices', invoice)
        .then(response => response.data);
}

export default {
    findAll,
    delete: deleteInvoice,
    find,
    update,
    create
}