import React from "react";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import likes from './assets/like-red.svg'
import nlikes from './assets/like-grey.svg'
import './index.less'
import 'bootstrap/dist/css/bootstrap.min.css';
import Comment from '../Comment'
import 'react-comments-section/dist/index.css'
import {Link} from "react-router-dom";

const DiscussionList = ({handleClick})=>{
    // const [likeClick, setLikeClick] = useState(false)
    // useEffect(() => {s
    //     const likesImg = likeClick ? likes : nlikes
    //
    // })
    const [cardContent, setCardContent] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setCardContent(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // setCardContent(Array.from(props))
    console.log(cardContent)
    const arr = [1,2,3,4]

        const [isChecked, setIsChecked] = useState(false);
        const toggleCheck = () => {
            setIsChecked(!isChecked);
            handleClick()
        }

    return(
        <div className="discussion-list">

            {cardContent.map((index)=>{
                return <div className="discussion-card" key={index.id}>
                <div className="likes-column">
                    {/*<img onClick={(e)=>setLikeClick(!likeClick)} src= {likeClick ? likes: nlikes} alt=""/>*/}
                    <img src= {checkbox} alt="" onClick = {toggleCheck}/>

                </div>
                <div className="discussion-col">
                    <div className="discussion-info">
                        <Button variant="outline-primary" size="sm">Category</Button>{' '}
                        <Button variant="outline-primary" size="sm">{index.userId}</Button>{' '}
                        <Button variant="outline-primary" size="sm">DateTime</Button>{' '}
                    </div>
                    <Link to="/discussion">
                        <div className="discussion-title">
                                {index.title}
                        </div>
                        <div className="discussion-description">
                                {index.body}
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