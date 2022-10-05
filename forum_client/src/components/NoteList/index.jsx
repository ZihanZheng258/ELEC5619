import React from 'react';
import './index.less'
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Comment from '../Comment'


const NoteList = () =>{
    const arr = [1,2,3,4,5]
    const navigate = useNavigate();
    return(
        <>
            {arr.map((index)=>{
                return <div className="noteListCard" key={index.toString()}>
                    <div className="noteCardImage">
                        <img src="" alt=""/>
                    </div>


                    <div className="noteCardContent">
                        <div className="noteTitle">
                            Note Name
                        </div>
                        <div className="noteDescription">
                            It's a library to generate random codes according to given pattern. Use # as a
                            placeholder for upper and lowercase characters as well as digits: var cr = new ...
                            It's a library to generate random codes according to given pattern. Use # as a
                            placeholder for upper and lowercase characters as well as digits: var cr = new ...

                        </div>
                        <div className="noteTag">
                            by authorName
                        </div>
                    </div>


                    <div className="noteCardActionBar">
                        <Button variant="outline-info" onClick={()=>navigate('/notedetailpage')}>View</Button>{' '}
                        <Button variant="outline-info">Save</Button>{' '}
                        <Button variant="outline-info">Buy</Button>{' '}

                    </div>
                </div>
            })}
        </>
    )
}

export default NoteList