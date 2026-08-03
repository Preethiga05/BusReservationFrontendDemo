import axios from "axios";

const BASE_URL = "http://localhost:8080/api/bus-operator-application";

class BusOperatorApplicationService {

    getToken() {

        return {

            headers: {

                Authorization:
                    "Bearer " + localStorage.getItem("token")

            }

        };

    }

    submitApplication(application) {

        return axios.post(
            `${BASE_URL}/add`,
            application
        );

    }

    getAllApplications() {

        return axios.get(
            `${BASE_URL}/getAll`,
            this.getToken()
        );

    }

    getApplicationById(applicationId) {

        return axios.get(
            `${BASE_URL}/get-by-id/${applicationId}`,
            this.getToken()
        );

    }

    approveApplication(applicationId) {

        return axios.put(
            `${BASE_URL}/approve/${applicationId}`,
            {},
            this.getToken()
        );

    }

    rejectApplication(applicationId, remarks) {

        return axios.put(
            `${BASE_URL}/reject/${applicationId}?remarks=${remarks}`,
            {},
            this.getToken()
        );

    }

}

export default new BusOperatorApplicationService();