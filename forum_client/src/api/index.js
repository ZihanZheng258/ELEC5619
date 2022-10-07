import axios from "axios";

/**
 * path address
 */

const client = axios.create({baseURL:'http://localhost:8090'},{headers:{"Authorization":`Bearer `+localStorage.getItem("token")}});

/**
 * request method
 */
export default {
    // sign in
    signIn: (username, password) =>{
        return axios.post('http://localhost:8090/auth/signin',
            {usernameOrEmail:username, password:password }
        );
    },

    // get login user info - /getUser/Self
    getSelf:  () => {
        return axios.get(
            'http://localhost:8090/user/self',
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },

    // get all discussion list  by page - /discussion/page/:pageNum
    getDiscussionByPage: (pageNum)=>{
        return axios.get(
            'http://localhost:8090/discussion/page/' + pageNum,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    // get announcement
    getAnnouncement: () =>{
        return axios.get(
            'http://localhost:8090/discussion/category/announcement/0' ,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    getDiscussionDetail:(discussionID) =>{
        return axios.get(
            'http://localhost:8090/discussion/'+discussionID ,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    }

}


