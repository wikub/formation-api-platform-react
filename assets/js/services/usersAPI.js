import axios from "axios";
import { API_URL_USERS } from "../config";

function register(user) {
    return axios.post(API_URL_USERS, user);
}

export default {
    register
};