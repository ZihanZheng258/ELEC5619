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
                <div className="announcement">
                    <Link to={"/discussion/category/announcement"}>
                        <div className={"accountSettingBtn"}>
                            <CampaignOutlinedIcon/>
                            <span>
                                Announcement
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="Category">
                    <ul>
                        <li>
                            <Link to={"/"}>
                                All
                            </Link>
                        </li>
                        <li>
                            <Link to={"/discussion/category/life"}>
                                Life
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/discussion/category/entertainment",state:{category: "entertainment"}}}>
                                Entertainment
                            </Link>
                        </li>

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
                    </ul>
                </div>


            </div>
            <div className="setting">
                <Link to={"/user/myProfile"}>
                    <div className={"accountSettingBtn"}>
                        <SettingOutlined/>
                        <span>Settings</span>
                    </div>

                </Link>
            </div>
        </div>
    )
}

export default SidebarMenu