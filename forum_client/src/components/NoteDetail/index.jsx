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


const NoteDetail = () =>{

    const params = useParams().id;

    const [detail, setDetail] = useState([]);
    const [self, setSelf] = useState([]);
    const [detailUser, setDetailUser] = useState([])
    const [detailCategory, setDetailCategory] = useState([])
    const [boughtList, setBoughtList] = useState([]);
    const [object, setObject] = useState([]);
    const [comment, setComment] = useState("")
    let counter = 0;

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
                        api.getBoughtList(response.data.data.user.id)
                                            .then((response) => {
                                            setObject(response.data.data.notes)
                                        })

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

    let count = 0;
    function foo(userID){
        console.log('self.id:'  + self.id);

        for(let x of object){
            if(x.id == params){
                count++;
            }
        }

        return count;
    }


    const download = (noteID)=>{
            api.downloadNote(noteID)
                .then(response => {
                    console.log(response.headers.get('Content-Disposition'))
                    const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = filename;
                        a.click();
                    });})}


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
        counter = (foo(self.id))

        const buyNote = (noteID,userID)=>{
            //console.log(counter)
            console.log(boughtList)


            if(counter >= 1){
                message.error("You already brought this note!")
                download(noteID)
            }
            else if(counter == 0){
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
                                        {params}| Category: {detailCategory.content} | {counter}
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
                                        {detailUser.nickName}| {self.id} | Note posted at: {detail.createDate}
                                    </div>
                       </div>
                       <div className="noteCardActionBar">
                                <Button variant="outline-info"
                                onClick={()=>saveNote(params)
                                }>Save</Button>{' '}
                                <Button variant="outline-info"
                                onClick={()=>buyNote(params,self.id)
                                }>Buy</Button>{' '}
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