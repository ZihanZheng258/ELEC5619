import React from "react";
import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import './index.less'
import Button from 'react-bootstrap/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import likes from '../DiscussionList/assets/like-red.svg'
import nlikes from '../DiscussionList/assets/like-grey.svg'
import {message} from "antd";
import Comment from '../Comment'
import 'react-comments-section/dist/index.css'

import api from "../../api"
import moment from "moment";
import commentImg from "../Comment/assets/comment.svg";


const SearchList = () =>{
    const [searchedList, setSearchedList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [boughtList, setBoughtList] = useState([]);
    const [user, setUser] = useState('');
    const target = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        api.getSelf()
            .then((response)=>{
                api.getBoughtNotes(response.data.data.user.id)
                    .then((response)=>{
                        const arr = [response.data.data.notes]
                        arr[0].forEach((element)=>{
                            setBoughtList(prevState => [...prevState, element.id])
                        })
                    })
            })
            if (target.type === "note"){
                api.searchByNotes(target.searchContent,page-1)
                    .then((response)=>{
                        setSearchedList(response.data.data.notes.content)
                        setTotalPage(response.data.data.notes.totalPages)
                    }).catch((err)=>{
                    message.error("something wrong, please try again")
                })

            } else if(target.type ==="discussion"){
                api.searchByDiscussions(target.searchContent,page-1)
                    .then((response)=>{
                        setSearchedList(response.data.data.discussions.content)
                        setTotalPage(response.data.data.discussions.totalPages)

                    }).catch((err)=>{
                        message.error("something wrong, please try again")
                })
            }
 },[])
    const pageChange = (event,value)=>{
        setPage(value);
        if (target.type === "note"){
            api.searchByNotes(target.searchContent,value-1)
                .then((response)=>{
                    setSearchedList(response.data.data.notes.content)
                }).catch((err)=>{
                message.error("something wrong, please try again")
            })

        } else if(target.type ==="discussion"){
            api.searchByDiscussions(target.searchContent,value-1)
                .then((response)=>{
                    setSearchedList(response.data.data.discussions.content)
                }).catch((err)=>{
                message.error("something wrong, please try again")
            })
        }
    };
    const disLikeDiscussion = (dislikeID)=>{
        api.getCancelLikeDiscussion(dislikeID)
            .then((response)=>{
                api.searchByDiscussions(target.searchContent,page-1)
                    .then((response)=>{
                        setSearchedList(response.data.data.discussions.content)
                        setTotalPage(response.data.data.discussions.totalPages)
                    })


            });
    }
    const likeDiscussion = (likeID)=>{
        api.getLikeDiscussion(likeID)
            .then((response)=>{
                api.searchByDiscussions(target.searchContent,page-1)
                    .then((response)=>{
                        setSearchedList(response.data.data.discussions.content)
                        setTotalPage(response.data.data.discussions.totalPages)
                    })

            });
    }
    const saveNote = (noteID)=>{
        api.saveNote(noteID)
            .then((response)=>{
                message.success('Note saved successfully', 5)
            })
            .catch((err)=>{
                message.error('Sorry, something went wrong or You may already saved note, please try again',10)
                console.log(err)

            })
    }

    const buyNote = (noteID)=>{
        if (boughtList.indexOf(noteID)>-1){
            message.error('You already bought the note, please check your bought list', 5)
        }
        else{
            api.buyNote(noteID)
                .then((response)=>{
                    if (!response.data.flag){
                        message.error('Sorry, your '+ response.data.message, 5)
                    } else {
                        message.success('Note '+ response.data.data.note.name + ' bought successfully', 5)
                        setBoughtList(prevState => [...prevState, response.data.data.note.id])
                    }
                })
                .catch((err)=>{
                    message.error('Sorry, something went wrong, please try again',10)
                })
        }
    }
    const downloadNote = (noteID)=>{
        api.downloadNote(noteID)
            .then((res)=>{

            })
    }

    return(
        <div className="searchList">
            <div className="searchResults">
                    {target.type ==="discussion" && searchedList.map((index)=>{
                        return <div key={"discussion"+index.id.toString()}>
                            <div className="discussion-card" key={"discussion-card"+index.id.toString()}>
                                <div className="likes-column" key={"likes-column"+index.id.toString()}>

                                    { index.jsonLiker.map((liker)=>{
                                        return <div key={"likeBtn"+index.id}>
                                            {
                                                <img
                                                    src= {likes}
                                                    alt=""
                                                    onClick={()=>disLikeDiscussion(index.id)}
                                                />
                                            }
                                        </div>

                                    })}
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
                    })
                    }
                    {target.type ==="note" && searchedList.map((index)=>{
                        return <div className="noteListCard" key={index.id}>
                            <div className="col1">
                                <div className="noteCardImage">
                                    <img src="" alt=""/>

                                    <div className="card-unit">
                                        {index.jsonCategory.content}
                                    </div>

                                </div>
                                {
                                    boughtList.indexOf(index.id)>-1 &&
                                    <div className="noteVerify">✅<span>note bought</span></div>
                                }

                            </div>



                            <div className="noteCardContent">
                                <div className="noteTitle">
                                    {index.name}
                                </div>
                                <div className="noteDescription">
                                    {index.description}
                                </div>
                                <div className="noteTag">
                                    <strong> by {index.jsonOwner.nickName}
                                    </strong>
                                </div>
                            </div>


                            <div className="noteCardActionBar">
                                <Button variant="outline-info" onClick={()=>navigate('/note/'+ index.id)}>View</Button>{' '}
                                <Button variant="outline-info"
                                        onClick={()=>saveNote(index.id)
                                        }>Save</Button>{' '}
                                {
                                    !(boughtList.indexOf(index.id)>-1) &&
                                    <Button variant="outline-info"
                                            onClick={()=>buyNote(index.id)
                                            }>Buy
                                    </Button>
                                }
                                {
                                    boughtList.indexOf(index.id)>-1 &&
                                    <Button variant="outline-info"
                                            onClick={()=>downloadNote(index.id)
                                            }>Download
                                    </Button>
                                }


                            </div>
                        </div>
                    })
                    }
            </div>
            <div className={"pagination"}>
                <Stack spacing={4} >
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

export default SearchList