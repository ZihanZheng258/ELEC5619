import React from "react";
import HeadingNav from "../../components/HeadingNav";
import SidebarMenu from "../../components/SidebarMenu";
import BottomNav from "../../components/BottomNav";
import DiscussionList from "../../components/DiscussionList";
import Announcement from "./Announcement";
import './index.less'
import '../../config/config.js';
import {useEffect, useState} from "react";
import api from "../../api/index"
import setAuthToken from "../Login/setAuthToken";
const Home = () =>{

    const downloadFile = ()=>{
        fetch('http://localhost:8090/note/downloadNote/177',{headers:{"Authorization":`Bearer `+localStorage.getItem("token")}})
            .then(response => {
                console.log(response.headers.get('Content-Disposition'))
                const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                });})}

    return(
        <>
            <div className="homeContent">
                <div className="layout-header">
                        <HeadingNav />
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