import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import './index.less'
import '../../fonts/bptypewrite.damaged-italic.otf'
import {SettingOutlined} from "@ant-design/icons";
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

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
                        <Link to={"/discussion/category/announcement"}>
                            <div className={"accountSettingBtn"}>
                            <CampaignOutlinedIcon/>
                            <span>
                                Announcement
                            </span>
                            </div>
                        </Link>
                    </li>

                    {/*Life*/}
                    <li>
                        <Link to={"/discussion/category/life"}>
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
                    <li>
                        <Link to={{pathname:"/discussion/category/entertainment",state:{category: "entertainment"}}}>
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
                    <li>
                        <Link to={"/discussion/category/uni"}>
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
                    <li>
                        <Link to={"/user/myProfile"}>
                            <div className={"accountSettingBtn"}>
                                    <SettingOutlined/>
                                    <span>Settings</span>
                            </div>

                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarMenu