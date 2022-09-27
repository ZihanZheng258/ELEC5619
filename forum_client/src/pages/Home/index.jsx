import React from "react";
import HeadingNav from "../../components/HeadingNav";
import SidebarMenu from "../../components/SidebarMenu";
import BottomNav from "../../components/BottomNav";
import DiscussionList from "../../components/DiscussionList";
import Announcement from "./Announcement";
import './index.less'

const Home = () =>{
    return(
        <div>
            <HeadingNav/>
            <SidebarMenu/>
            <div className="homeContent">
                <Announcement/>
                <DiscussionList/>

            </div>
            <BottomNav/>
        </div>
    )
}
export default Home