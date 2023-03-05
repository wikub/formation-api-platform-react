import axios from "axios";

function findAll() {
    return axios
        .get('/api/customers')
        .then(response => response.data['hydra:member']);
}

function deleteCustomer(id) {
    return axios
        .delete('/api/customers/'+id)
        ;
}

function find(id) {
    return axios
        .get('/api/customers/'+id)
        .then(response => response.data);
}

function update(id, customer) {
    return axios
        .put('/api/customers/'+id, customer)
        .then(response => response.data);
}

function create(customer) {
    return axios
        .post('/api/customers', customer)
        .then(response => response.data);
}

export default {
    findAll,
    delete: deleteCustomer,
    find,
    update,
    create
}