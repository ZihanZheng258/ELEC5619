import React from 'react';
import {useState, useEffect} from "react";

// api
import api from "../../api"

// styles
import './index.less'
import Button from "react-bootstrap/Button";
import {message} from 'antd'

const NoteList = () =>{
    const [notesList, setNotesList] = useState([]);
    useEffect(()=>{
        api.getNotesByPage(0)
            .then((response)=>{
                setNotesList(response.data.data.notes.content)
            })
    },[])
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
        api.buyNote(noteID)
            .then((response)=>{
                if (!response.data.flag){
                    message.error('Sorry, your '+ response.data.message, 5)

                } else {
                    message.success('Note'+  'bought successfully', 5)
                }
            })
            .catch((err)=>{
                message.error('Sorry, something went wrong, please try again',10)
            })    }
    return(
        <>
            {notesList.map((index)=>{
                return <div className="noteListCard" key={index.id}>
                    <div className="noteCardImage">
                        <img src="" alt=""/>
                        <div className="card-unit">
                            {index.jsonCategory.content}
                        </div>
                    </div>


                    <div className="noteCardContent">
                        <div className="noteTitle">
                            Note Name
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
                        <Button variant="outline-info">View</Button>{' '}
                        <Button variant="outline-info"
                                onClick={()=>saveNote(index.id)
                        }>Save</Button>{' '}
                        <Button variant="outline-info"
                                onClick={()=>buyNote(index.id)
                        }>Buy</Button>{' '}

                    </div>
                </div>
            })}
        </>
    )
}

export default NoteList