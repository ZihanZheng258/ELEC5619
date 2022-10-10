import React from "react";
import HeadingNav from "../../components/HeadingNav";
import SidebarMenu from "../../components/SidebarMenu";
import BottomNav from "../../components/BottomNav";
import DiscussionList from "../../components/DiscussionList";
import Announcement from "./Announcement";
import './index.less'
import '../../config/config.js';
import {useEffect, useState} from "react";

const Home = () =>{
    // const {title, description} = props
    const [cardContents, setCardContents] = useState([]);
    // useEffect(()=>{
    //     setCardContents()
    // })


    return(
        <>
            <div className="homeContent">

                    <div className="layout-header">
                        <HeadingNav/>
                    </div>
                    <div className="layout-row">
                        <div className="layout-sidebar">
                            <SidebarMenu/>
                        </div>
                        <div className="layout-col">
                            <div className="layout-content">
                                <Announcement/>
                            </div>
                            <DiscussionList />

                            <div className="layout-footer">
                                <BottomNav/>
                            </div>
                        </div>

                </div>

            </div>
        </>
    )
}

export default Home