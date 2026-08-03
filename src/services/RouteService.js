import axios from "axios";

const BASE_URL = "http://localhost:8080/api/route";

class RouteService {

    getToken() {

        return {

            headers: {

                Authorization:
                    "Bearer " + localStorage.getItem("token")

            }

        };

    }

    getAllRoutes() {

        return axios.get(

            `${BASE_URL}/getAll`,

            this.getToken()

        );

    }

    getRouteById(routeId) {

        return axios.get(

            `${BASE_URL}/get-by-id/${routeId}`,

            this.getToken()

        );

    }

    addRoute(route) {

        return axios.post(

            `${BASE_URL}/add`,

            route,

            this.getToken()

        );

    }

    deactivateRoute(routeId) {

        return axios.delete(

            `${BASE_URL}/deactivate/${routeId}`,

            this.getToken()

        );

    }

    activateRoute(routeId) {

        return axios.put(

            `${BASE_URL}/activate/${routeId}`,

            {},

            this.getToken()

        );

    }

}

export default new RouteService();