import React, {useState,useEffect} from "react";
import './index.less'
import commentImg from './assets/comment.svg'
import avatar from './assets/avatar.jpeg'
import {Link, useParams} from "react-router-dom";
import '../../config/config.js'
import api from "../../api"
import moment from "moment";
import {message} from "antd";

const Comment =(props) =>{
    const [comments, setComments] = useState([]);
    const [replyMessage, setReplyMessage] = useState([]);
    const [target, setTarget] = useState({});
    const [parent, setParent] = useState({});
    const [receiver, setReceiver] = useState(-1)
    const discussionID = useParams().id;


    useEffect(()=>{
        api.getComments(discussionID)
            .then((response)=>{
                setComments(response.data.data.comments)
            })
        },[])

    const handleSubmit = event => {
        event.preventDefault();
        console.log('parent:'+parent.parentID, 'target: '+target.targetID)
        api.postComment(discussionID,target.targetID,parent.parentID,1,replyMessage)
            .then(()=>{
                message.success("message posted!")

                api.getComments(discussionID)
                    .then((response)=>{
                        setComments(response.data.data.comments)
                    });
                setReplyMessage('');
            }).catch(function (error) {
            message.error("something wrong, please try again!")
        });

        console.log('form submitted ✅');
    };

    return(
        <>
            <div className="commentBlock">
                <div className="comment-action" onClick={()=>{}}>
                    <img src= {commentImg} alt=""/> <span>{props.numComment} Comments</span>
                </div>
                <div  className="comment-expand">
                    <div className="comment">
                        <div className="mainCommenter">
                            {comments.map((index)=>{
                                return <div key={index.id}>
                                    <div className="commenterInfo">
                                        <img className="avatar" src={avatar} alt=""/>
                                        <span className="commentUserName">{index.jsonSender.nickName}</span>
                                    </div>
                                    <div className="mainCommenterContent">
                                        <div className="mainCommenterContent-content">
                                            {index.content}
                                        </div>
                                        <div className="mainCommenterContent-dateReply">
                                            <span className="date">{moment(index.createDate).format('L')} </span>
                                            <button
                                                onClick={()=>{
                                                    setTarget(
                                                        {...target, targetID: index.id,
                                                            targetName:index.jsonSender.nickName});
                                                    setParent({...parent, parentID:index.id});
                                                    setReceiver(index.jsonSender.id);
                                                }
                                                }>
                                                reply
                                            </button>
                                        </div>
                                        {index.jsonChildren.map((child)=>{
                                            return <>
                                                <div className="subCommenter" key={child.id}>
                                                    <div className="subCommenterContent">
                                                        <div>
                                                            <img className="avatar" src={avatar} alt=""/>
                                                            <span className="commentUserName">{child.jsonSender.nickName} replied @{child.targetName}</span>
                                                        </div>
                                                        <div className="subCommenterContent-content">
                                                            {child.content}
                                                            <div className="subCommenterContent-dateReply">
                                                                <span className="date">{moment(child.createDate).format('L')} </span>
                                                                    <button
                                                                        onClick={()=>{
                                                                            setTarget(
                                                                                {...target, targetID: child.id,
                                                                                    targetName:child.jsonSender.nickName});
                                                                            setParent({...parent, parentID:index.id})
                                                                            setReceiver(child.jsonSender.id);
                                                                        }
                                                                        }>
                                                                        reply
                                                                    </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </>
                                        })
                                        }

                                    </div>
                                    {target.targetName && index.id===parent.parentID &&
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <img className="avatar" src={avatar} alt=""/>
                                                <input
                                                    className="reply-editor"
                                                    type="text"
                                                    placeholder={"reply to @"+ target.targetName}
                                                    value = {replyMessage}
                                                    onChange={event => setReplyMessage(event.target.value)}
                                                />
                                                <button type="submit">Reply</button>
                                            </form>
                                        </div>
                                    }

                                </div>
                            })

                            }

                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default Comment