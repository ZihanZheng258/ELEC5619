import React, {useEffect} from "react";
import HeadingNav from "../../components/HeadingNav";
import SidebarMenu from "../../components/SidebarMenu";
import BottomNav from "../../components/BottomNav";
import './index.less'
import '../../config/config.js';
import SearchList from "../../components/SearchList";
import {useParams} from "react-router-dom";

const Search = () =>{
    const params = useParams();
    useEffect(() => {
        console.log(params.type)


    }, [params]);


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
                            <SearchList />
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Search