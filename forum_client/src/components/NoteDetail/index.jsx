import React from 'react';
import './index.less'
import Button from "react-bootstrap/Button";
import Comment from "../../components/Comment";
import { useNavigate } from "react-router-dom";

const NoteDetail = () =>{
    const arr = [1]
    const navigate = useNavigate();
    return(
        <>
            {arr.map((index)=>{
                return <div>
                    <div className="noteListCard" key={index.toString()}>
                    <div className="noteCardImage">
                        <img src="" alt=""/>
                        <div className="card-unit">
                            ELEC5619
                        </div>
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
                        <div className="noteOther">
                                Other things that are inside the specific API.

                        </div>
                        <div className="noteTag">
                            by authorName
                        </div>
                    </div>
                </div>
                <div>
                    <Comment/>
                </div>
                </div>
            })}
        </>
    )
}

export default NoteDetail