import axios from "axios";

const API =
    "http://localhost:8080/api/executive";

class ExecutiveService {

    getToken() {

        return {

            headers: {

                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")

            }

        };

    }


    // ============================================
    // GET ALL EXECUTIVES
    // ============================================

    getAllExecutives() {

        return axios.get(

            API + "/getAll",

            this.getToken()

        );

    }


    // ============================================
    // GET EXECUTIVE BY ID
    // ============================================

    getExecutiveById(executiveId) {

        return axios.get(

            API + "/get-by-id/" + executiveId,

            this.getToken()

        );

    }


    // ============================================
    // ADD EXECUTIVE
    // ============================================

    addExecutive(executiveData) {

        return axios.post(

            API + "/add",

            executiveData,

            this.getToken()

        );

    }


    // ============================================
    // GET EXECUTIVE COUNT
    // ============================================

    getExecutiveCount() {

        return axios.get(

            API + "/get-count",

            this.getToken()

        );

    }


    // ============================================
    // DEACTIVATE EXECUTIVE
    // ============================================

    deactivateExecutive(executiveId) {

        return axios.delete(

            API + "/deactivate/" + executiveId,

            this.getToken()

        );

    }


    // ============================================
    // GET MY PROFILE
    // ============================================

    getMyProfile() {

        return axios.get(

            API + "/profile",

            this.getToken()

        );

    }


    // ============================================
    // UPDATE MY PROFILE
    // ============================================

    updateProfile(profileData) {

        return axios.put(

            API + "/update-profile",

            profileData,

            this.getToken()

        );

    }

}

export default new ExecutiveService();