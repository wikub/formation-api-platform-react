import axios from "axios";
import jwtDecode from "jwt-decode";

function authenticate(credentials) {
    return axios
        .post("/api/login_check", credentials)
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