import axios from "axios";
import { getToken } from "../utils/Auth";

const API = "http://localhost:8080/api/booking-passenger";


class BookingPassengerService {
    

    addPassengers(bookingPassengerData) {

        return axios.post(

            API + "/add",

            bookingPassengerData,

            {

                headers: {

                    Authorization: "Bearer " + getToken()

                }

            }

        );

    }

    getByBooking(bookingId) {

        return axios.get(

            API + "/get-by-booking/" + bookingId,

            {

                headers: {

                    Authorization: "Bearer " + getToken()

                }

            }

        );

    }

}

export default new BookingPassengerService();