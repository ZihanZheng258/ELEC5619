import React, { useState, useEffect} from "react";
import {Link} from "react-router-dom";
import api from "../../../api"
import './index.less'

const arr = [1,2,3,4]

const Annoucement = ()=>{
    const [announcement, setAnnouncement] = useState([]);
    useEffect(() => {
        api.getAnnouncement()
            .then(response=>{
                setAnnouncement(response.data.data.discussions.content)
            })
    }, []);

    return(
        <div className="Announcement">
            <div className="annoucement-title">
                <p>Announcement</p>
            </div>
            <div className="announcement-card">
                {announcement.map((index)=>{
                    // div class loop
                    return <Link to={"/discussion/"+index.id} key={"announcement"+index.id.toString()}>
                    <div className="card">
                        <div className="card-title">
                            {index.title}
                        </div>
                        <div className="card-description">
                            {index.content}
                        </div>
                    </div>
                    </Link>

                })}
            </div>


        </div>


    )
}


export default Annoucement