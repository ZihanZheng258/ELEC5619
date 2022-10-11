import React from 'react';
import api from "../../api";
import './index.less'
import Button from "react-bootstrap/Button";
import Comment from "../../components/Comment";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {message} from "antd";

const NoteDetail = () =>{

    const params = useParams().id;

    const [detail, setDetail] = useState([]);
    const [detailUser, setDetailUser] = useState([])
    const [detailCategory, setDetailCategory] = useState([])
    const [boughtList, setBoughtList] = useState([]);
    const [comment, setComment] = useState("")
    useEffect(()=>{
        api.getNoteDetail(params)
            .then((response)=>{
                console.log(response)
                setDetail(response.data.data.note)
                setDetailUser(response.data.data.note.jsonOwner)
                setDetailCategory(response.data.data.note.jsonCategory)
            })
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
            console.log(boughtList)
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
                                        ELEC5619
                                    </div>
                       </div>


                       <div className="noteCardContent">
                                    <div className="noteTitle">
                                        {detail.name} | Category: {detailCategory.content}
                                    </div>
                                    <div className="noteTitle">
                                        Price is: ${detail.price}, This note is currently purchased: {detail.numOfBuy} time(s)
                                    </div>
                                    <div className="noteDescription">
                                        {detail.description}

                                    </div>
                                    <div className="noteOther">
                                            Other things that are inside the specific API.
                                            {detail.jsonBuyers}

                                    </div>
                                    <div className="noteTag">
                                        {detailUser.nickName} | Note posted at: {detail.createDate}
                                    </div>
                       </div>
                       <div className="noteCardActionBar">
                                <Button variant="outline-info"
                                onClick={()=>saveNote(params)
                                }>Save</Button>{' '}
                                <Button variant="outline-info"
                                onClick={()=>buyNote(params)
                                }>Buy</Button>{' '}
                       </div>
            </div>
            <div>

            </div>
            </div>
        </>
    )

}

export default NoteDetail