import React from 'react';
import {useState, useEffect} from "react";

// api
import api from "../../api"

// styles
import './index.less'
import Button from "react-bootstrap/Button";
import {message} from 'antd'
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";


const NoteList = (props) =>{
    const [notesList, setNotesList] = useState([]);
    const [boughtList, setBoughtList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const navigate = useNavigate();
    const params = props.category;

    useEffect(()=>{
        try {
            if (!(params.category.length === 0)){
                api.getNoteByCategory(params.category,page-1)
                    .then((response)=>{
                        setNotesList(response.data.data.notes.content);
                        setTotalPage(response.data.data.notes.totalPages)

                    })
            }
        } catch (err){
            api.getNotesByPage(page-1)
                .then((response)=>{
                    setNotesList(response.data.data.notes.content)
                    setTotalPage(response.data.data.notes.totalPages)
                });
        }


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

        // verify note bought

    },[params]);

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
    const pageChange = (event,value)=>{
        setPage(value);
        console.log(value)
        api.getNotesByPage(value-1)
            .then((response)=>{
                setNotesList(response.data.data.notes.content)
            })
    };

    return(
        <>
            {notesList.map((index)=>{
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
                            <div className="noteVerify">???<span>note bought</span></div>
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
            })}
            <div style={{margin:"20px auto"}}>
                {totalPage>0 &&
                    <Stack spacing={10}>
                        <Pagination
                            siblingCount={4}
                            count={totalPage}
                            showFirstButton
                            showLastButton
                            onChange={pageChange}
                        />
                    </Stack>

                }
            </div>
        </>
    )
}

export default NoteList