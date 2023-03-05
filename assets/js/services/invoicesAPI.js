import axios from "axios";
import { API_URL_INVOICES } from "../config";

function findAll() {
    return axios
        .get(API_URL_INVOICES)
        .then(response => response.data['hydra:member']);
}

function deleteInvoice(id) {
    return axios
        .delete(API_URL_INVOICES+id)
        ;
}

function find(id) {
    return axios
        .get(API_URL_INVOICES+id)
        .then(response => response.data);
}

function update(id, invoice) {
    return axios
        .put(API_URL_INVOICES+id, invoice)
        .then(response => response.data);
}

function create(invoice) {
    return axios
        .post(API_URL_INVOICES, invoice)
        .then(response => response.data);
}

export default {
    findAll,
    delete: deleteInvoice,
    find,
    update,
    create
}