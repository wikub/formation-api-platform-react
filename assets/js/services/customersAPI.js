import axios from "axios";
import { API_URL_CUSTOMERS } from "../config";
import Cache from "../services/cache";

async function findAll() {

    const cachedCustomers = await Cache.get('customers');
    if (cachedCustomers) return cachedCustomers;

    return axios
        .get(API_URL_CUSTOMERS)
        .then(response => {
            const customers = response.data['hydra:member'];
            Cache.set('customers', customers);
            return customers;
        })
        ;
}

function deleteCustomer(id) {

    return axios
        .delete(API_URL_CUSTOMERS+id)
        .then(response => {
            Cache.invalidate('customers');
            return response;
        });
        ;
}

function find(id) {
    return axios
        .get(API_URL_CUSTOMERS+id)
        .then(response => response.data);
}

function update(id, customer) {
    return axios
        .put(API_URL_CUSTOMERS+id, customer)
        .then(response => {
            Cache.invalidate('customers');
            return response.data;
        });
}

function create(customer) {
    return axios
        .post(API_URL_CUSTOMERS, customer)
        .then(response => {
            Cache.invalidate('customers');
            return response.data;
    });
}

export default {
    findAll,
    delete: deleteCustomer,
    find,
    update,
    create
}