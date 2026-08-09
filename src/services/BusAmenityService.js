import axios from "axios";
import { getToken } from "../utils/Auth";

const API = "http://localhost:8080/api/bus-amenities";

class BusAmenityService {

    add(busId, amenityIds) {

        return axios.post(

            API + "/add",

            {
                busId: busId,
                amenityIds: amenityIds
            },

            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }

        );

    }


    getByBus(busId) {

        return axios.get(

            API + "/get-by-bus/" + busId,

            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }

        );

    }


    deactivate(busAmenityId) {

        return axios.delete(

            API + "/deactivate/" + busAmenityId,

            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }

        );

    }

}

export default new BusAmenityService();