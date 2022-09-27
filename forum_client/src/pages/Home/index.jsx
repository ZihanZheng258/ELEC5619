import React from "react";
import HeadingNav from "../../components/HeadingNav";
import SidebarMenu from "../../components/SidebarMenu";
import BottomNav from "../../components/BottomNav";
import DiscussionList from "../../components/DiscussionList";
import Announcement from "./Announcement";
import './index.less'
import '../../config/config.js';
import {useEffect, useState} from "react";
import axios from 'axios';

const Home = () =>{
    // const {title, description} = props
    const [cardContents, setCardContents] = useState([]);
    // useEffect(()=>{
    //     setCardContents()
    // })


    return(
        <div>

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
                                <DiscussionList {...cardContents}/>
                            </div>
                            <div className="layout-footer">
                                <BottomNav/>
                            </div>
                        </div>

                </div>

            </div>
        </div>
    )
}
function getData(){
    let tempData
    return tempData = [
        {
            "id": 1,
            "title": "test",
            "description": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
            "category": "test",
            "author": "testAuthor",
            "datetime": "11/11/2022"
        },
        {
            "id": 2,
            "title": "test",
            "description": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
            "category": "test",
            "author": "testAuthor",
            "datetime": "11/11/2022"
        },
        {
            "id": 3,
            "title": "test",
            "description": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
            "category": "test",
            "author": "testAuthor",
            "datetime": "11/11/2022"
        },
        {
            "id": 4,
            "title": "test",
            "description": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
            "category": "test",
            "author": "testAuthor",
            "datetime": "11/11/2022"
        },

    ]

}

export default Home