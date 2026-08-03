import axios from "axios";

const BASE_URL = "http://localhost:8080/api/amenity";

class AmenityService {

    getToken() {

        return {

            headers: {

                Authorization:
                    "Bearer " + localStorage.getItem("token")

            }

        };

    }

    getAllAmenities() {

        return axios.get(

            `${BASE_URL}/getAll`,

            this.getToken()

        );

    }

    getAmenityById(amenityId) {

        return axios.get(

            `${BASE_URL}/get-by-id/${amenityId}`,

            this.getToken()

        );

    }

    addAmenity(amenity) {

        return axios.post(

            `${BASE_URL}/add`,

            amenity,

            this.getToken()

        );

    }

    deactivateAmenity(amenityId) {

        return axios.delete(

            `${BASE_URL}/deactivate/${amenityId}`,

            this.getToken()

        );

    }
    activateAmenity(amenityId) {

    return axios.put(

        `${BASE_URL}/activate/${amenityId}`,

        {},

        this.getToken()

    );

}

}

export default new AmenityService();