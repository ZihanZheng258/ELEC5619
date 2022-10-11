import {React, useEffect, useState} from "react";
import './index.less'
import { SearchOutlined } from '@ant-design/icons'
import {Link, useNavigate} from "react-router-dom";
import {message, Select} from 'antd';
import api from "../../api";
import AvatarIcon from "./AvatarIcon"


const HeadingNav = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [type, setType] = useState("discussion");
    const [searchContent, setContent] = useState('');
    const [page, setPage] = useState(0);
    const { Option } = Select;

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
                <form action={"/search/"+type+"/"+searchContent+"/"+page}>
                    <Select
                        defaultValue="discussion" style={{ width: 120 }}
                        onChange={event => setType(event)}>
                        <Option value="discussion">discussion</Option>
                        <Option value="note">note</Option>
                    </Select>
                    <input
                        className="bar"
                        type="search"
                        placeholder={"Search by " + type}
                        value = {searchContent}
                        onChange={event => setContent(event.target.value)}
                    />
                    <button type="submit"></button>
                </form>



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