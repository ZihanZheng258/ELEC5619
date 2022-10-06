import React, {useEffect, useState} from "react";
import './index.less'
import { SearchOutlined } from '@ant-design/icons'
import {Link, useNavigate} from "react-router-dom";
import api from "../../api";

const HeadingNav = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    useEffect( () => {
        api.getSelf().
        then((response)=>{
            console.log('good',response)
            setUser(response.data.data.user.nickName)
            console.log(user)
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
                    <img src={require("./assets/user.png")} alt="user" width="33px" />
                </div>
                <div className="signInText" onClick={() => navigate('/login')}>
                    <span>{user}</span>
                </div>
            </div>

        </div>
    )


}

export default HeadingNav