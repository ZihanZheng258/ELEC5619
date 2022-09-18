import React from "react";
import './index.less'
import {SearchOutlined} from '@ant-design/icons'


const HeadingNav = () => {
    return (
        <div className="navheader">
            <div className="search">
                <div className="searchIcon">
                    <img src={require("./assets/search.png")} alt="search" width="23px"/>
                </div>
                <input className="bar" type="search" placeholder="Search" />

            </div>
            <div className="profile">
                <div className="profileImage">
                    <img src={require("./assets/user.png")} alt="user" width="33px"/>
                </div>
                <div className="signInText">
                    <span>Sign in</span>
                </div>
            </div>

        </div>
    )


}

export default HeadingNav