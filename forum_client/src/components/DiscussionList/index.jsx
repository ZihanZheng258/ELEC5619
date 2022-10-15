import React from "react";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import './index.less'
import Button from 'react-bootstrap/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import likes from './assets/like-red.svg'
import nlikes from './assets/like-grey.svg'

import Comment from '../Comment'
import 'react-comments-section/dist/index.css'

import api from "../../api"
import moment from "moment";
import commentImg from "../Comment/assets/comment.svg";

const DiscussionList = (props)=>{
    const [discussion,setDiscussion] = useState([]);
    const [user, setUser] = useState('');
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const params = props.category;

    useEffect(()=>{
        try {
            if (!(params.category.length === 0)){
                api.getDiscussionbyCategoryPage(params.category,page-1)
                    .then((response)=>{
                        setDiscussion(response.data.data.discussions.content);
                        console.log(response.data.data.discussions.content)

                        setTotalPage(response.data.data.discussions.totalPages)
                    })
            }
        } catch (err){
            api.getDiscussionByPage(page-1)
                .then((response)=>{
                    setDiscussion(response.data.data.discussion.content);
                    console.log(response.data.data.discussion.content)

                    setTotalPage(response.data.data.discussion.totalPages)
                })
        }

        api.getSelf()
            .then((response)=>{
                setUser(response.data.data.user.id)
            })
    },[params])

    const likerRendder = (index)=> {
        console.log('ress',index)
        if (index.jsonLiker.length === 0) {
            return <>
                <img
                    src={nlikes}
                    alt=""
                    onClick={() => likeDiscussion(index.id)}
                />
            </>
        } else if (index.jsonLiker.length > 0) {
            for (const i of index.jsonLiker) {
                if (i.id === user) {
                    return <div key={"likeBtn" + index.id}>
                        <img
                            src={likes}
                            alt=""
                            onClick={() => disLikeDiscussion(index.id)}
                        />
                    </div>

                }
            }
            return <div key={"likeBtn" + index.id}>
                <img
                    src={nlikes}
                    alt=""
                    onClick={() => likeDiscussion(index.id)}
                />
            </div>
        }
    }




    const disLikeDiscussion = (dislikeID)=>{
        api.getCancelLikeDiscussion(dislikeID)
            .then((response)=>{
                try {
                    if (!(params.category.length === 0)){
                        api.getDiscussionbyCategoryPage(params.category,page-1)
                            .then((response)=>{
                                setDiscussion(response.data.data.discussions.content);
                                setTotalPage(response.data.data.discussions.totalPages)
                            })
                    }
                } catch (err){
                    api.getDiscussionByPage(page-1)
                        .then((response)=>{
                            setDiscussion(response.data.data.discussion.content);
                            setTotalPage(response.data.data.discussion.totalPages)
                        })
                }

            });
    }
    const likeDiscussion = (likeID)=>{
        api.getLikeDiscussion(likeID)
            .then((response)=>{
                try {
                    if (!(params.category.length === 0)){
                        api.getDiscussionbyCategoryPage(params.category,page-1)
                            .then((response)=>{
                                setDiscussion(response.data.data.discussions.content);
                                setTotalPage(response.data.data.discussions.totalPages)
                            })
                    }
                } catch (err){
                    api.getDiscussionByPage(page-1)
                        .then((response)=>{
                            setDiscussion(response.data.data.discussion.content);
                            setTotalPage(response.data.data.discussion.totalPages)
                        })
                }
            });
    }
    const pageChange = (event,value)=>{
        setPage(value);
        api.getDiscussionByPage(value-1)
            .then((response)=>{
                setDiscussion(response.data.data.discussion.content);
            })
    };

    return(
        <div className="discussion-list" >
            {discussion.map((index)=>{
                return <div key={"discussion"+index.id.toString()}>
                    <div className="discussion-card" key={"discussion-card"+index.id.toString()}>
                        <div className="likes-column" key={"likes-column"+index.id.toString()}>

                            { likerRendder(index)
                            }
                            <div className="likeNumber">
                                {index.likeNumber}
                            </div>

                        </div>
                        <div className="discussion-col" key={"discussion-col"+index.id.toString()} >
                            <div className="discussion-info">
                                <Button variant="outline-primary" size="sm" key={"buttonCate"+index.id.toString()}>{index.jsonCategory.content}</Button>{' '}
                                <Button variant="outline-primary" size="sm" key={"buttonName"+index.id.toString()}>{index.jsonUser.nickName}</Button>{' '}
                                <Button variant="outline-primary" size="sm" key={"buttonTime"+index.id.toString()}>{moment(index.createDate).fromNow()}</Button>{' '}
                            </div>
                            <Link to={"/discussion/"+index.id} key={"discussionLink"+index.id.toString()}>
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
                                </div>
                            </Link>

                        </div>

                    </div>
                </div>
            })}

            <div style={{margin:"10px auto"}} key={"PageDiv"}>
                <Stack spacing={4}>
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