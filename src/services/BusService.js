import axios from "axios";

const API = "http://localhost:8080/api/bus";

class BusService {

    getToken() {

        return {

            headers: {

                Authorization:
                    "Bearer " + localStorage.getItem("token")

            }

        };

    }


    getOwnBuses() {

        return axios.get(

            API + "/get-own-buses",

            this.getToken()

        );

    }


    addBus(busData) {

        return axios.post(

            API + "/add",

            busData,

            this.getToken()

        );

    }


    deactivateBus(busId) {

        return axios.delete(

            API + "/deactivate/" + busId,

            this.getToken()

        );

    }


    activateBus(busId) {

        return axios.put(

            API + "/activate/" + busId,

            {},

            this.getToken()

        );

    }


    getBusById(busId) {

        return axios.get(

            API + "/get-by-id/" + busId,

            this.getToken()

        );

    }

    updateBus(busId, busData) {

    return axios.put(

        API + "/update/" + busId,

        busData,

        this.getToken()

    );

}

}

export default new BusService();