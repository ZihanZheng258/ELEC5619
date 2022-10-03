import React, {useState} from "react";
import HeadingNav from "../../components/HeadingNav";
import SidebarMenu from "../../components/SidebarMenu";
import Announcement from "../Home/Announcement";
import DiscussionList from "../../components/DiscussionList";
import BottomNav from "../../components/BottomNav";

const Discussion = () =>{
    return (
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


export default Discussion