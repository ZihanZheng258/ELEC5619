import React from "react";
import {useState, useEffect} from "react";

import './index.less'
import '../../fonts/bptypewrite.damaged-italic.otf'

const SidebarMenu = ()=>{
    const [isLifeActive, setLifeIsActive] = useState(false);
    const [isEntertainmentActive, setEntertainmentIsActive] = useState(false);
    const [isNotesActive, setNotesIsActive] = useState(false);
    const [isUniActive, setUniIsActive] = useState(false);
    return(
        <div className="sideBar">
            <div className="title_logo">
                <span>Notepile</span>
            </div>

            <div className="navList">
                <ul>
                    {/*Announcement*/}
                    <li>
                        Announcement
                    </li>

                    {/*Life*/}
                    <li onClick={(e)=> setLifeIsActive(!isLifeActive) }>
                        Life
                    </li>
                    {isLifeActive && (
                    <ul className="lifeContent">
                            <li>Recent</li>
                            <li>Food</li>
                            <li>Other</li>
                    </ul>
                    )}

                    {/*Entertainment*/}
                    <li onClick={(e)=>setEntertainmentIsActive(!isEntertainmentActive)}>
                        Entertainment
                    </li>
                    {isEntertainmentActive && (
                    <ul className="entertainmentContent">
                        <li>Games</li>
                        <li>Sports</li>
                        <li>Music</li>
                        <li>Televisions</li>
                        <li>Others</li>
                    </ul>
                    )}


                    {/*Notes*/}
                    <li onClick={(e)=>setNotesIsActive(!isNotesActive)}>
                        Notes
                    </li>

                    {isNotesActive && (
                            <ul>
                                <li>All</li>
                                <li>Art and social sciences</li>
                                <li>Engineering</li>
                                <li>Medicine and health</li>
                                <li>Science</li>
                                <li>Architecture, design and planning</li>
                                <li>Business</li>
                                <li>Law</li>
                                <li>Music</li>
                            </ul>
                        )}


                    {/*Our Uni*/}
                    <li onClick={(e)=>setUniIsActive(!isUniActive)}>
                        Our Uni
                    </li>
                    {isUniActive && (
                        <ul>
                            <li>All</li>
                            <li>Art and social sciences</li>
                            <li>Engineering</li>
                            <li>Medicine and health</li>
                            <li>Science</li>
                            <li>Architecture, design and planning</li>
                            <li>Business</li>
                            <li>Law</li>
                            <li>Music</li>
                        </ul>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SidebarMenu