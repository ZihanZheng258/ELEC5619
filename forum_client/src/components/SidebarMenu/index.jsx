import React from "react";


import './index.less'
import '../../fonts/bptypewrite.damaged-italic.otf'

const SidebarMenu = ()=>{
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
                    <li>
                        Life
                        <ul>
                            <li>Recent</li>
                            <li>Food</li>
                            <li>Other</li>
                        </ul>
                    </li>

                    {/*Entertainment*/}
                    <li>
                        Entertainment
                        <ul>
                            <li>Games</li>
                            <li>Sports</li>
                            <li>Music</li>
                            <li>Televisions</li>
                            <li>Others</li>
                        </ul>
                    </li>

                    {/*Notes*/}
                    <li>
                        Notes
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
                    </li>

                    {/*Our Uni*/}
                    <li>
                        Our Uni
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
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarMenu