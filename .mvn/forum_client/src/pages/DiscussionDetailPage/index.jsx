import React from "react";
import HeadingNav from "../../components/HeadingNav";
import SidebarMenu from "../../components/SidebarMenu";
import BottomNav from "../../components/BottomNav";
import DiscussionDetail from "../../components/DiscussionDetail";
import './index.less'

const DiscussionDetailPage = () =>{

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
                            <DiscussionDetail />
                        </div>

                        <div className="layout-footer">
                            <BottomNav/>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default DiscussionDetailPage