import axios from "axios";
import { getToken } from "../utils/Auth";

class SeatService {

    getByBus(busId){

        const token = getToken();

        if(token){

            return axios.get(
                `http://localhost:8080/api/seat/get-by-bus/${busId}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

        }

        return axios.get(
            `http://localhost:8080/api/seat/get-by-bus/${busId}`
        );

    }

}

export default new SeatService();