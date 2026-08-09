import axios from "axios";
import { getToken } from "../utils/Auth";

const API = "http://localhost:8080/api/bus-schedule";

class BusScheduleService {

    getAuthConfig() {

        return {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        };

    }


    getOwnSchedules() {

        return axios.get(
            API + "/get-own-schedules",
            this.getAuthConfig()
        );

    }


    getScheduleById(busScheduleId) {

        return axios.get(
            API + "/get-by-id/" + busScheduleId,
            this.getAuthConfig()
        );

    }


    addSchedule(scheduleData) {

        return axios.post(
            API + "/add",
            scheduleData,
            this.getAuthConfig()
        );

    }


    updateSchedule(busScheduleId, scheduleData) {

        return axios.put(
            API + "/update/" + busScheduleId,
            scheduleData,
            this.getAuthConfig()
        );

    }


    cancelSchedule(busScheduleId) {

        return axios.delete(
            API + "/cancel/" + busScheduleId,
            this.getAuthConfig()
        );

    }

}

export default new BusScheduleService();