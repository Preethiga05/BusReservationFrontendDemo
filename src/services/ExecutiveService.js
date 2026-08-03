import axios from "axios";

class ExecutiveService {

    getProfile() {

        const token = localStorage.getItem("token");

        return axios.get(

            "http://localhost:8080/api/executive/profile",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

    }

}

export default new ExecutiveService();