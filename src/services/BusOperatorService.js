import axios from "axios";

const BASE_URL = "http://localhost:8080/api/bus-operator";

class BusOperatorService {

    getToken() {

        return {

            headers: {

                Authorization:
                    "Bearer " + localStorage.getItem("token")

            }

        };

    }

    getAllBusOperators() {

        return axios.get(

            `${BASE_URL}/getAll`,

            this.getToken()

        );

    }

    getBusOperatorById(busOperatorId) {

        return axios.get(

            `${BASE_URL}/get-by-id/${busOperatorId}`,

            this.getToken()

        );

    }

    deactivateBusOperator(busOperatorId) {

        return axios.delete(

            `${BASE_URL}/deactivate/${busOperatorId}`,

            this.getToken()

        );

    }

    activateBusOperator(busOperatorId) {

        return axios.put(

            `${BASE_URL}/activate/${busOperatorId}`,

            {},

            this.getToken()

        );

    }
    getMyProfile() {

    return axios.get(
        `${BASE_URL}/profile`,
        this.getToken()
    );

}
updateProfile(profileData) {

    return axios.put(

        BASE_URL + "/update-profile",

        profileData,

        this.getToken()

    );

}

}

export default new BusOperatorService();