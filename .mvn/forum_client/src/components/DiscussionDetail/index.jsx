import React from "react";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import Comment from '../Comment'
import avatar from "../Comment/assets/avatar.jpeg";
import api from "../../api"
import './index.less'
import moment from "moment/moment";
import {message} from "antd";

const DiscussionDetail = () =>{
    const params = useParams().id;
    const [detail, setDetail] = useState([]);
    const [detailUser, setDetailUser] = useState([])
    const [detailCategory, setDetailCategory] = useState([])
    const [comment, setComment] = useState("")
    useEffect(()=>{
        api.getDiscussionDetail(params)
            .then((response)=>{
                setDetail(response.data.data.discussion)
                setDetailUser(response.data.data.discussion.jsonUser)
                setDetailCategory(response.data.data.discussion.jsonCategory)
            })
    },[]);
    const handleSubmit = event => {
        event.preventDefault();
        api.postComment(params,-1,-1,null, comment)
            .then(()=>{
                message.success("message posted!")
                window.location.reload(false);
                setComment('');
            }).catch(function (error) {
            message.error("something wrong, please try again!")
        });

        console.log('form submitted ✅');
    };
    return(
        <>
        <div className="discussionDetail">
            <div className="discussion-title">
                {detail.title}
            </div>
            <div className="discussionCategory">
                {detailCategory.content}
            </div>
            <hr/>
            <div className="discussion-content">
                <div className="creator">
                    <div className="avatar">
                        <img className="avatar" src={avatar} alt=""/>
                        <div className="creator-name">
                            {detailUser.nickName}
                        </div>
                    </div>
                    <div className="create-date">
                        {moment(detail.createDate).format('L')}
                    </div>
                </div>
                {/*{index.body}*/}
                <div className="contents-block">
                    {detail.content}
                    <div className="infoBar">
                        <div className="post">
                            <strong>
                                Poster:
                            </strong>
                            <span className="poster-name">
                                {detailUser.nickName}
                            </span>
                        </div>
                        <div className="created">
                            <strong>
                                Created by:
                            </strong>
                            <span className="poster-date">
                                {moment(detail.createDate).format('DD MMM')}
                            </span>
                        </div>
                        <div className="numComments">
                            <strong>
                                {detail.commentNumber}
                                <span> Comments</span>
                            </strong>
                        </div>
                        <div className="numViews">
                            <strong>
                                {detail.viewNumber}
                                <span> Views</span>
                            </strong>
                        </div>
                        <div className="numLikes">
                            <strong>
                                {detail.likeNumber}
                                <span> Likes</span>
                            </strong>
                        </div>
                    </div>
                    <div className="comment-box">
                        <div className="reply-box">
                            <img className="avatar" src={avatar} alt=""/>
                            <form onSubmit={handleSubmit}>
                            <input
                                className="reply-editor"
                                type="text"
                                placeholder="Add a comment"
                                value = {comment}
                                onChange={event => setComment(event.target.value)}
                            />
                            <button type="submit">Reply</button>
                            </form>
                        </div>
                        <Comment numComment= {detail.commentNumber} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default DiscussionDetail