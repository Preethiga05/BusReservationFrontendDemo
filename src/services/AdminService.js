import axios from "axios";

const API = "http://localhost:8080/api/admin";

class AdminService {

    getToken() {

        return {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

    }


    getDashboard(
        period,
        bookingStatus,
        page,
        size
    ) {

        return axios.get(
            API + "/dashboard",
            {
                params: {
                    period: period,
                    bookingStatus: bookingStatus,
                    page: page,
                    size: size
                },
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            }
        );

    }


    getMyProfile() {

        return axios.get(
            API + "/profile",
            this.getToken()
        );

    }

}

export default new AdminService();