import React, {useState, useEffect, useInsertionEffect} from "react";
import Comment from '../Comment'
import {Link} from "react-router-dom";
import avatar from "../Comment/assets/avatar.jpeg";
import './index.less'
import axios from "axios";




const DiscussionDetail = () =>{

    const [detail, setDetail] = useState();

    // useEffect(()=>{
    //
    //     axios.get('http://localhost:8090/discussion/6')
    //         .then((response) => {
    //             setDetail(response.data.data.discussion);
    //             console.log(response.data.data.discussion);
    //         });
    //
    // }, []);



    return(
        <div className="discussionDetail">
            <div className="discussion-title">
                {detail.title}
            </div>
            <div className="discussionCategory">
                {detail.jsonCategory.content}
            </div>
            <hr/>
            <div className="discussion-content">
                <div className="creator">
                    <div className="avatar">
                        <img className="avatar" src={avatar} alt=""/>
                        <div className="creator-name">{detail.jsonUser.nickName}</div>
                    </div>
                    <div className="create-date">
                        {detail.createDate}
                    </div>
                </div>
                {/*{index.body}*/}
                <div className="contents-block">
                    Steps to reproduce
                    Export PDF.
                    Expected result
                    Expected to be able to search the PDF for a term that I knew was in it.

                    Actual result
                    Search only finds the word if the word is typed backwards.
                    Environment
                    Mac OS 12.3
                    Operating system:
                    Debug info:
                    SYSTEM INFO:
                    Obsidian version: v0.15.8
                    Installer version: v0.15.8
                    Operating system: Darwin Kernel Version 21.4.0: Mon Feb 21 20:36:53 PST 2022; root:xnu-8020.101.4~2/RELEASE_ARM64_T8101 21.4.0
                    Login status: logged in
                    Catalyst license: supporter
                    Insider build toggle: off
                    Live preview: on
                    Legacy editor: off
                    Base theme: light
                    Community theme: Prism
                    Snippets enabled: 3
                    Restricted mode: on
                    <div className="infoBar">
                        <div className="post">
                            <strong>
                                Poster:
                            </strong>
                            <span className="poster-name">
                                userNameCoco
                            </span>
                        </div>
                        <div className="created">
                            <strong>
                                Created by:
                            </strong>
                            <span className="poster-date">
                                03 OCT
                            </span>
                        </div>
                        <div className="numComments">
                            <strong>
                                22 Comments
                            </strong>
                        </div>
                        <div className="numViews">
                            <strong>
                                202 Views
                            </strong>
                        </div>
                        <div className="numLikes">
                            <strong>
                                10 Likes
                            </strong>
                        </div>
                    </div>
                    <div className="comment-box">
                        <div className="reply-box">
                            <img className="avatar" src={avatar} alt=""/>
                            <input className="reply-editor" type="text" placeholder="Add a comment" />
                            <button>Reply</button>
                        </div>
                        <Comment/>
                    </div>
                </div>
            </div>



        </div>
    )
}


export default DiscussionDetail