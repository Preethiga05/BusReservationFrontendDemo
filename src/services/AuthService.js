import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

class AuthService {

    login(username, password) {

        const basicAuth = btoa(`${username}:${password}`);

        return axios.get(`${BASE_URL}/login`, {

            headers: {

                Authorization: `Basic ${basicAuth}`

            }

        });

    }

}

export default new AuthService();