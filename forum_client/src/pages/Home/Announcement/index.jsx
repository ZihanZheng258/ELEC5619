import React from "react";
import './index.less'

const arr = [1,2,3,4]

const Annoucement = ()=>{
    return(
        <div className="Announcement">
            <div className="annoucement-title">
                <p>Announcement</p>
            </div>
            <div className="announcement-card">
                {arr.map((index)=>{
                // div class loop
                    return <div className="card" key={index.toString()}>
                    <div className="card-title">
                        Card Title
                    </div>
                    <div className="card-description">
                        Set the flex property for the “row header”, “row content”, and “row footer”
                        classes, separately. html, body  height: 100%; margin: 0;  ...
                    </div>
                </div>
            })}
            </div>
        </div>


    )
}


export default Annoucement