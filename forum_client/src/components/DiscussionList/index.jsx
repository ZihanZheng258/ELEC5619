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

    // useEffect(()=>{
    //     let api = "http://localhost:8090/discussion/6";
    //     const axios = require('axios');
    //     axios.get(api)
    //         .then((response)=> {
    //             // handle success
    //             console.log(response.data);
    //             let tempData = response.data
    //             this.setState({
    //                 welcome_list:tempData
    //             })
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //
    //         })
    // })


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
                    <img src= {likes} alt=""/>

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