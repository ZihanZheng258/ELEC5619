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

const DiscussionList = ({handleClick})=>{
    const [discussion,setDiscussion] = useState([]);

    useEffect(()=>{
        api.getDiscussionByPage(0)
            .then((response)=>{
                console.log(response)
                setDiscussion(response.data.data.discussion.content)
        })
    },[])


    const [isChecked, setIsChecked] = useState(false);
    const toggleCheck = () => {
        setIsChecked(!isChecked);
        handleClick()
    }

    return(
        <div className="discussion-list">
            {discussion.map((index)=>{
                return <div className="discussion-card" key={index.id}>
                <div className="likes-column">
                    {/*<img onClick={(e)=>setLikeClick(!likeClick)} src= {likeClick ? likes: nlikes} alt=""/>*/}
                    <img src= {likes} alt=""/>
                    <div className="likeNumber">
                        {index.likeNumber}
                    </div>

                </div>
                <div className="discussion-col">
                    <div className="discussion-info">
                        <Button variant="outline-primary" size="sm">JsonCategory</Button>{' '}
                        <Button variant="outline-primary" size="sm">UserName</Button>{' '}
                        <Button variant="outline-primary" size="sm">{moment(index.createDate).fromNow()}</Button>{' '}
                    </div>
                    <Link to={"/discussion/"+index.id}>
                        <div className="discussion-title">
                                {index.title}
                        </div>
                        <div className="discussion-description">
                                {index.content}
                        </div>
                    </Link>

                    <div className="discussion-actionbar">
                        <Comment />
                    </div>
                </div>

            </div>
            })}

        </div>
    )
}

export default DiscussionList