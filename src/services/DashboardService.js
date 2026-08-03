import axios from "axios";

class DashboardService {

    getDashboardOverview() {

        return axios.get(

            "http://localhost:8080/api/dashboard/overview",

            {

                headers: {

                    Authorization:
                        "Bearer " + localStorage.getItem("token")

                }

            }

        );

    }

}

export default new DashboardService();