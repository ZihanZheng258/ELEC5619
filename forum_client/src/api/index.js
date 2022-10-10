import axios from 'axios'

/**
 * path address
 */

const client = axios.create(
	{ baseURL: 'http://localhost:8090' },
	{ headers: { Authorization: `Bearer ` + localStorage.getItem('token') } }
)

/**
 * request method
 */
export default {
	// sign in
	signIn: (username, password) => {
		return axios.post('http://localhost:8090/auth/signin', { usernameOrEmail: username, password: password })
	},

	// sign up
	signUp: (params = {}) => {
		return axios.post(
			'http://localhost:8090/auth/signup',
			{ params },
			{ headers: { Authorization: `Bearer ` + localStorage.getItem('token') } }
		)
	},

	// get login user info - /getUser/Self
	getSelf: () => {
		return axios.get('http://localhost:8090/user/self', {
			headers: { Authorization: `Bearer ` + localStorage.getItem('token') },
		})
	},

    // get all discussion list  by page - /discussion/page/:pageNum
    getDiscussionByPage: (page)=>{
        return axios.get(
            'http://localhost:8090/discussion/page/' + page,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    // like discussion by id
    getLikeDiscussion: (discussionID)=>{
        return axios.get(
            'http://localhost:8090/discussion/like/' + discussionID,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    // cancel like of discussion by id
    getCancelLikeDiscussion: (discussionID)=>{
        return axios.get(
            'http://localhost:8090/discussion/cancelLike/' + discussionID,
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
    // get Discussion details
    getDiscussionDetail:(discussionID) =>{
        return axios.get(
            'http://localhost:8090/discussion/'+discussionID ,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    //get Comments by disucssion id
    getComments: (discussionID)=>{
        return axios.get(
            'http://localhost:8090/comment/discussion/'+discussionID ,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    // post new comment
    postComment: (discussionID, targetID, parentID,isComment,message)=>{
        return axios.post(
            'http://localhost:8090/comment/' ,
            {
                discussionID:discussionID,
                targetID: targetID, // user target id
                parentID: parentID, // parent comment id
                isCommentOfComment: isComment, // if it is comment under comment
                content: message // content
            },
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    // get note list by page
    getNotesByPage: (page)=>{
        return axios.get(
            'http://localhost:8090/note/page/' + page,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    // save note to wish list
    saveNote: (noteID)=>{
        return axios.get(
            'http://localhost:8090/note/wish/' + noteID,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    buyNote: (noteID)=>{
        return axios.get(
            'http://localhost:8090/note/buy/' + noteID,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    // verify bought note
    getBoughtList: (userID)=>{
        return axios.get(
            'http://localhost:8090/note/buyer/' + userID,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    // queryUserInfo
    queryUserInfo: (userID) => {
        return axios.get(`http://localhost:8090/user/${userID}`, {
            headers: { Authorization: `Bearer ` + localStorage.getItem('token') },
        })
    },
    // search method by discussions
    searchByDiscussions: (searchContent, page)=>{
        return axios.get(
            'http://localhost:8090/discussion/search/' + searchContent+"/"+page,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    },
    // search method by notes
    searchByNotes: (searchContent, page)=>{
        return axios.get(
            'http://localhost:8090/note/search/' + searchContent+"/"+page,
            {headers:{"Authorization":`Bearer `+localStorage.getItem("token")}}
        );
    }

}
