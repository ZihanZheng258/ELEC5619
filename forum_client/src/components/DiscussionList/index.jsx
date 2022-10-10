import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import './index.less'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import likes from './assets/like-red.svg'
import nlikes from './assets/like-grey.svg'

import Comment from '../Comment'
import 'react-comments-section/dist/index.css'

import api from "../../api"
import moment from "moment";
import commentImg from "../Comment/assets/comment.svg";

const DiscussionList = ({handleClick})=>{
    const [discussion,setDiscussion] = useState([]);
    const [user, setUser] = useState('');
    const [likers, setLikers] = useState([]);

    useEffect(()=>{
        api.getDiscussionByPage(0)
            .then((response)=>{
                console.log(response)
                setDiscussion(response.data.data.discussion.content);
        })
        api.getSelf()
            .then((response)=>{
            setUser(response.data.data.user.id)
        })
    },[])
    const disLikeDiscussion = (dislikeID)=>{
    }
    const likeDiscussion = (likeID)=>{
        api.getLikeDiscussion(likeID)
            .then((response)=>{
                api.getDiscussionByPage(0)
                    .then((response)=>{
                        console.log(response)
                        setDiscussion(response.data.data.discussion.content);
                    })
            });
    }



    return(
        <div className="discussion-list">
            {discussion.map((index)=>{
                return <div className="discussion-card" key={index.id}>
                <div className="likes-column">

                    { index.jsonLiker.map((liker)=>{
                        return <>
                        {
                            liker.id===user &&
                            <img
                                src= {likes}
                                alt=""
                                onClick={()=>disLikeDiscussion(index.id)}
                            />

                        }

                        </>

                    })
                    }
                    {
                        index.jsonLiker.length === 0 &&
                        <img
                            src= {nlikes}
                            alt=""
                            onClick={()=>likeDiscussion(index.id)}
                        />


                    }
                    <div className="likeNumber">
                        {index.likeNumber}
                    </div>

                </div>
                <div className="discussion-col">
                    <div className="discussion-info">
                        <Button variant="outline-primary" size="sm">{index.jsonCategory.content}</Button>{' '}
                        <Button variant="outline-primary" size="sm">{index.jsonUser.nickName}</Button>{' '}
                        <Button variant="outline-primary" size="sm">{moment(index.createDate).fromNow()}</Button>{' '}
                    </div>
                    <Link to={"/discussion/"+index.id}>
                        <div className="discussion-title">
                                {index.title}
                        </div>
                        <div className="discussion-description">
                                {index.content}
                        </div>

                    <div className="discussion-actionbar" >
                        <div className="comment-action" onClick={()=>{}}>
                            <img src= {commentImg} alt=""/> <span>{index.commentNumber} Comments</span>
                        </div>
                        {/*<Comment/>*/}
                    </div>
                    </Link>

                </div>

            </div>
            })}

        </div>
    )
}

export default DiscussionList