import {React, useEffect, useState} from "react";
import './index.less'
import { SearchOutlined } from '@ant-design/icons'
import {Link, useNavigate} from "react-router-dom";
import api from "../../api";
import AvatarIcon from "./AvatarIcon"


const HeadingNav = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    useEffect( () => {
        api.getSelf().
        then((response)=>{
            setUser(response.data.data.user.nickName)
        })
    }, []);
    return (
        <div className="navheader">
            <div className="title_logo">
                <Link to="/">
                    <span>Notepile</span>
                </Link>

            </div>

            <div className="search">
                <div className="searchIcon">
                    <img src={require("./assets/search.png")} alt="search" width="23px" />
                </div>
                <input className="bar" type="search" placeholder="Search" />

            </div>
            <div className="profile">
                <div className="profileImage">
                    <AvatarIcon />
                    {/* <img src={require("./assets/user.png")} alt="user" width="33px" /> */}
                </div>
                <div className="signInText">
                    <span>{user}</span>
                </div>
            </div>

        </div>
    )


}

export default HeadingNav