import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL_LOGIN } from "../config";

function authenticate(credentials) {
    return axios
        .post(API_URL_LOGIN, credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token);
            setAxiosToken(token);
            return true;
        })
        ;
}

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function setup() {
    // axios.defaults.headers["Access-Control-Allow-Origin"] = '*';
    // axios.defaults.headers["Access-Control-Allow-Methods"] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
    // axios.defaults.headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization';
    // axios.defaults.headers["Access-Control-Allow-Credentials"] = true;

    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);

        if (jwtData.exp * 1000 < Date.now()) {
            logout();
        } else {
            setAxiosToken(token);
        }
    }
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    
    if (token) {
        const jwtData = jwtDecode(token);

        if (jwtData.exp * 1000 > Date.now()) {
            return true;
        }
    }
    
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}