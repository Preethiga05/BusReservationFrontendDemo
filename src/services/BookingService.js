import axios from "axios";
import { getToken } from "../utils/Auth";

const API = "http://localhost:8080/api/booking";

class BookingService {

    calculateFare(bookingData) {

        return axios.post(

            API + "/calculate-fare",

            bookingData,

            {

                headers: {

                    Authorization: "Bearer " + getToken()

                }

            }

        );
    }
    addBooking(bookingData) {

        return axios.post(

            API + "/add",

            bookingData,

            {

                headers: {

                    Authorization:

                        "Bearer " + getToken()

                }

            }

        );
    }
    getPassengerBookings() {

        return axios.get(
            API + "/get-by-passenger",
            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        );
    }
    getBookingHistory() {

        return axios.get(

            API + "/booking-history",

            {

                headers: {

                    Authorization: "Bearer " + getToken()

                }

            }

        );

    }
    getSeatNumbers(bookingId) {

    return axios.get(

        API + "/seat-numbers/" + bookingId,

        {
            headers: {
                Authorization:
                    "Bearer " + getToken()
            }
        }

    );

}
    getOperatorBookingsByDateAndStatus(journeyDate, bookingStatus) {

        return axios.get(
            API + "/get-by-operator/date/status",
            {
                params: {
                    journeyDate: journeyDate,
                    bookingStatus: bookingStatus
                },
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        );

    }
    getOwnBookings() {

        return axios.get(
            API + "/get-by-operator",
            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        );

    }

    getBookingById(bookingId) {

        return axios.get(
            API + "/get-by-id/" + bookingId,
            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        );

    }

}

export default new BookingService();