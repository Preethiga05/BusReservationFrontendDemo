import axios from "axios";

const BASE_URL = "http://localhost:8080/api/passenger";

class PassengerService {

    getToken() {

        return {

            headers: {

                Authorization:
                    "Bearer " + localStorage.getItem("token")

            }

        };

    }

    getAllPassengers() {

        return axios.get(

            `${BASE_URL}/getAll`,

            this.getToken()

        );

    }

    getPassengerById(passengerId) {

        return axios.get(

            `${BASE_URL}/get-by-id/${passengerId}`,

            this.getToken()

        );

    }

    deactivatePassenger(passengerId) {

        return axios.delete(

            `${BASE_URL}/deactivate/${passengerId}`,

            this.getToken()

        );

    }

    activatePassenger(passengerId) {

        return axios.put(

            `${BASE_URL}/activate/${passengerId}`,

            {},

            this.getToken()

        );

    }

}

export default new PassengerService();