import axios from "axios";

/**
 * path address
 */

const client = axios.create({baseURL:'http://localhost:8090'},{headers:{"Authorization":`Bearer `+localStorage.getItem("token")}});

/**
 * request method
 */
export default {
    //check jwt token


    // get login user info - /getUser/Self
    getSelf:  () => {
        return axios.get('http://localhost:8090/user/self',{headers:{"Authorization":`Bearer `+localStorage.getItem("token")}});
    }

    // get all discussion list - /getAll
}

