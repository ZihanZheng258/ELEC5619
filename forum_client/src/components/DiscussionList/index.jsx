import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import './index.less'
import Button from 'react-bootstrap/Button';
<<<<<<< HEAD
=======
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
>>>>>>> 24b753dfe9e373d93b34ffcade6f09fa261e5979
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
<<<<<<< HEAD
    const [isCommentActivate, setIsCommentActivate] = useState(false);


    useEffect(()=>{
        api.getDiscussionByPage(0)
            .then((response)=>{
                console.log(response)
                setDiscussion(response.data.data.discussion.content);
        })
    },[])


    const [isChecked, setIsChecked] = useState(false);
    const toggleCheck = () => {
        setIsChecked(!isChecked);
        handleClick()
    }
=======
    const [user, setUser] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(()=>{
        api.getDiscussionByPage(page-1)
            .then((response)=>{
                setDiscussion(response.data.data.discussion.content);
                setTotalPage(response.data.data.discussion.totalPages)
        })
        api.getSelf()
            .then((response)=>{
            setUser(response.data.data.user.id)
        })
    },[])
    const disLikeDiscussion = (dislikeID)=>{
        api.getCancelLikeDiscussion(dislikeID)
            .then((response)=>{
                api.getDiscussionByPage(page-1)
                    .then((response)=>{
                        setDiscussion(response.data.data.discussion.content);
                    })
            });
    }
    const likeDiscussion = (likeID)=>{
        api.getLikeDiscussion(likeID)
            .then((response)=>{
                api.getDiscussionByPage(page-1)
                    .then((response)=>{
                        setDiscussion(response.data.data.discussion.content);
                    })
            });
    }
    const pageChange = (event,value)=>{
            setPage(value);
        api.getDiscussionByPage(value-1)
            .then((response)=>{
                setDiscussion(response.data.data.discussion.content);
            })
        };
>>>>>>> 24b753dfe9e373d93b34ffcade6f09fa261e5979

    return(
        <div className="discussion-list">
            {discussion.map((index)=>{
                return <div className="discussion-card" key={index.id}>
                <div className="likes-column">
<<<<<<< HEAD
                    {/*<img onClick={(e)=>setLikeClick(!likeClick)} src= {likeClick ? likes: nlikes} alt=""/>*/}
                    <img src= {likes} alt=""/>
=======

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
>>>>>>> 24b753dfe9e373d93b34ffcade6f09fa261e5979
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
            <div style={{margin:"10px auto"}}>
                <Stack spacing={2}>
                    <Pagination
                        siblingCount={4}
                        count={totalPage}
                        showFirstButton
                        showLastButton
                        onChange={pageChange}
                    />
                </Stack>
            </div>
        </div>
    )
}

export default DiscussionList