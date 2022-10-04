import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import './index.less'
import '../../fonts/bptypewrite.damaged-italic.otf'

const SidebarMenu = ()=>{
    const [isLifeActive, setLifeIsActive] = useState(false);
    const [isEntertainmentActive, setEntertainmentIsActive] = useState(false);
    const [isNotesActive, setNotesIsActive] = useState(false);
    const [isUniActive, setUniIsActive] = useState(false);
    return(
        <div className="sideBar">

            <div className="navList">
                <ul>
                    {/*Announcement*/}
                    <li>
                        <Link to="/">
                            Announcement
                        </Link>
                    </li>

                    {/*Life*/}
                    <li onClick={(e)=> {setLifeIsActive(!isLifeActive)} }>
                        <Link to="/">
                            Life
                        </Link>
                    </li>
                    {/*{isLifeActive && (*/}
                    {/*<ul className="lifeContent">*/}
                    {/*        <li>Recent</li>*/}
                    {/*        <li>Food</li>*/}
                    {/*        <li>Other</li>*/}
                    {/*</ul>*/}
                    {/*)}*/}

                    {/*Entertainment*/}
                    <li onClick={(e)=>setEntertainmentIsActive(!isEntertainmentActive)}>
                        <Link to="/">
                            Entertainment
                        </Link>
                    </li>
                    {/*{isEntertainmentActive && (*/}
                    {/*<ul className="entertainmentContent">*/}
                    {/*    <li>Games</li>*/}
                    {/*    <li>Sports</li>*/}
                    {/*    <li>Music</li>*/}
                    {/*    <li>Televisions</li>*/}
                    {/*    <li>Others</li>*/}
                    {/*</ul>*/}
                    {/*)}*/}


                    {/*Notes*/}
                    <li onClick={(e)=>setNotesIsActive(!isNotesActive)}>
                        <Link to="">
                            Notes
                        </Link>
                    </li>

                    {isNotesActive && (
                            <ul>
                                <li>
                                    <Link to="/notes">
                                        All
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notes">
                                        Art and social sciences
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notes">
                                        Engineering
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notes">
                                        Medicine and health
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notes">
                                        Science
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notes">
                                        Architecture, design and planning
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notes">
                                        Business
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notes">
                                        Law
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notes">
                                        Music
                                    </Link>
                                </li>


                            </ul>
                        )}


                    {/*Our Uni*/}
                    <li onClick={(e)=>setUniIsActive(!isUniActive)}>
                        <Link to="/discussion">
                            Our Uni
                        </Link>
                    </li>
                    {/*{isUniActive && (*/}
                    {/*    <ul>*/}
                    {/*        <li>All</li>*/}
                    {/*        <li>Art and social sciences</li>*/}
                    {/*        <li>Engineering</li>*/}
                    {/*        <li>Medicine and health</li>*/}
                    {/*        <li>Science</li>*/}
                    {/*        <li>Architecture, design and planning</li>*/}
                    {/*        <li>Business</li>*/}
                    {/*        <li>Law</li>*/}
                    {/*        <li>Music</li>*/}
                    {/*    </ul>*/}
                    {/*)}*/}
                </ul>
            </div>
        </div>
    )
}

export default SidebarMenu