import React from 'react';
import api from "../../api";
import './index.less'
import Button from "react-bootstrap/Button";
import Comment from "../../components/Comment_Note";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {message} from "antd";
import avatar from "../Comment/assets/avatar.jpeg";
import moment from "moment/moment";


const NoteDetail = () =>{

    const params = parseInt(useParams().id);


    const [detail, setDetail] = useState([]);
    const [self, setSelf] = useState([]);
    const [detailUser, setDetailUser] = useState([])
    const [detailCategory, setDetailCategory] = useState([])
    const [boughtList, setBoughtList] = useState([]);
    const [comment, setComment] = useState("")
    const [counter, setCounter] = useState(0)


    useEffect(()=>{
        api.getNoteDetail(params)
            .then((response)=>{
                console.log(response)
                setDetail(response.data.data.note)
                setDetailUser(response.data.data.note.jsonOwner)
                setDetailCategory(response.data.data.note.jsonCategory)
            })
        api.getSelf()
                    .then((response)=>{
                        console.log(response)
                        setSelf(response.data.data.user)
                        api.getBoughtNotes(response.data.data.user.id)
                                            .then((response)=>{
                                                const arr = [response.data.data.notes]
                                                arr[0].forEach((element)=>{
                                                    setBoughtList(prevState => [...prevState, element.id])
                                                })
                                            })

                    })
        //console.log("Just enter: " + boughtList.indexOf(parseInt(params)))


    },[]);
    const handleSubmit = event => {
        event.preventDefault();
        api.postNoteComment(params,-1,-1,null, comment)
            .then(()=>{
                message.success("message posted!")
                window.location.reload(false);
                setComment('');
            }).catch(function (error) {
            message.error("something wrong, please try again!")
        });

        console.log('form submitted ✅');
    };


    const download = (noteID)=>{
            api.downloadNote(noteID).then((response)=>{
            })
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


        const buyNote = (noteID,userID)=>{

            let index = parseInt(params);

            if(boughtList.indexOf(index) > -1){
                message.success("Your note download will start soon.")
                download(noteID)
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
                        console.log(response)
                    })
                    .catch((err)=>{
                        message.error('Sorry, something went wrong, please try again',10)
                    })
            }

        }






    const navigate = useNavigate();
    return(
        <>
            <div>
                       <div className="noteListCard" key={params.toString()}>
                                <div className="noteCardImage">
                                    <img src="" alt=""/>
                                    <div className="card-unit">
                                        {detailCategory.content}
                                    </div>
                       </div>

                       <div className="noteCardContent">
                                    <div className="noteTitle">
                                        {detail.name}| Category: {detailCategory.content}
                                    </div>
                                    <div className="noteTitle">
                                        Price is: ${detail.price}, This note is currently purchased: {detail.numOfBuy} time(s)
                                    </div>
                                    <div className="noteDescription">
                                        {detail.description}

                                    </div>
                                    <div className="noteTag">
                                       Note posted by: {detailUser.nickName} | Note posted at: {moment(detail.createDate).format('DD MMM YYYY')}
                                    </div>
                       </div>
                       <div className="noteCardActionBar">
                                <Button variant="outline-info"
                                onClick={()=>saveNote(params)
                                }>Save</Button>{' '}
                                {
                                       !(boughtList.indexOf(params)>-1) &&
                                       <Button variant="outline-info"
                                        onClick={()=>buyNote(params,self.id)
                                        }>Buy
                                        </Button>
                                }
                                {
                                        boughtList.indexOf(params)>-1 &&
                                        <Button variant="outline-info"
                                        onClick={()=>buyNote(params,self.id)
                                        }>Download
                                        </Button>
                                }
                       </div>
            </div>
            <div className="comment-box">
                                    <div className="reply-box">
                                        <img className="avatar" src={avatar} alt=""/>
                                        <form onSubmit={handleSubmit}>
                                        <input
                                            className="reply-editor"
                                            type="text"
                                            placeholder="Add a comment"
                                            value = {comment}
                                            onChange={event => setComment(event.target.value)}
                                        />
                                        <button type="submit">Reply</button>
                                        </form>
                                    </div>
                                    <Comment numComment= {detail.commentNumber} key={"detailComment"+detail.id} />
                                </div>
            </div>
        </>
    )

}

export default NoteDetail