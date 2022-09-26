import React from "react";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import likes from './assets/like-red.svg'
import nlikes from './assets/like-grey.svg'
import './index.less'
import 'bootstrap/dist/css/bootstrap.min.css';


const DiscussionList = ()=>{
    // const [likeClick, setLikeClick] = useState(false)
    // useEffect(() => {s
    //     const likesImg = likeClick ? likes : nlikes
    //
    // })

    const arr = [1,2,3,4]
    return(
        <div className="discussion-list">

            {arr.map((index)=>{
                return <div className="discussion-card" key={index.toString()}>
                <div className="likes-column">
                    {/*<img onClick={(e)=>setLikeClick(!likeClick)} src= {likeClick ? likes: nlikes} alt=""/>*/}
                    <img src= {likes} alt=""/>

                </div>
                <div className="discussion-col">
                    <div className="discussion-info">
                        <Button variant="outline-primary" size="sm">Category</Button>{' '}
                        <Button variant="outline-primary" size="sm">Author</Button>{' '}
                        <Button variant="outline-primary" size="sm">DateTime</Button>{' '}
                    </div>
                    <div className="discussion-title">
                        Title
                    </div>
                    <div className="discussion-description">
                        description content
                    </div>
                    <div className="discussion-actionbar">
                        comment {}
                    </div>
                </div>

            </div>
            })}

        </div>
    )
}

export default DiscussionList