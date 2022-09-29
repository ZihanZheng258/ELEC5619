import React, {useEffect} from "react";
import './index.less'
import commentImg from './assets/comment.svg'
import avatar from './assets/avatar.jpeg'
import {Link} from "react-router-dom";

const Comment =(props) =>{
    // const commentClick

    // fetch the content
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10',
            {method:"GET"})
            .then(response => response.json())
            .then(data => console.log(data));
    })

    return(
        <>
            <div className="commentBlock">
                <div className="comment-action" onClick={()=>{}}>
                    <img src= {commentImg} alt=""/> <span>22 Comments</span>
                </div>
                <div className="comment-expand">
                    <div className="comment">
                        <div className="mainCommenter">
                            <div className="commenterInfo">
                                <img className="avatar" src={avatar} alt=""/>
                                <span className="commentUserName">userNameCoco</span>
                            </div>
                            <div className="mainCommenterContent">
                                <div className="mainCommenterContent-content">
                                    comment content
                                    quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit mole
                                    stiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto
                                </div>
                                <div className="mainCommenterContent-dateReply">
                                    <span className="date">29/09/2022 </span>
                                    <Link to="">
                                        <span>reply</span>
                                    </Link>
                                </div>
                                <div className="subCommenter">
                                    <div className="subCommenterContent">
                                        <div>
                                            <img className="avatar" src={avatar} alt=""/>
                                            <span className="commentUserName">userNameCisco reply userNameCoco</span>
                                        </div>
                                        <div className="subCommenterContent-content">
                                            comment content
                                            quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit mole
                                            stiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto
                                            <div className="subCommenterContent-dateReply">
                                                <span className="date">29/09/2022 </span>
                                                <Link to="">
                                                    <span>reply</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default Comment