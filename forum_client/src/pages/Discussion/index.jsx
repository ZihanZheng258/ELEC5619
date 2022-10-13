import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import HeadingNav from "../../components/HeadingNav";
import SidebarMenu from "../../components/SidebarMenu";
import Announcement from "../Home/Announcement";
import DiscussionList from "../../components/DiscussionList";
import BottomNav from "../../components/BottomNav";

const Discussion = () =>{
    const params = useParams()
    useEffect(() => {
    }, [params]);


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
                            </div>
                            <DiscussionList category={params}/>

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