import {React, useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import './index.less'
import {message} from "antd"
import api from "../../api";
import moment from "moment";

const SearchList = () =>{
    const arr = [1,2,3,4];
    const [searchedList, setSearchedList] = useState([]);
    const target = useParams();
    useEffect(()=>{
            if (target.type === "note"){
                api.searchByNotes(target.searchContent,target.page)
                    .then((response)=>{
                        setSearchedList(response.data.data.notes.content)
                    }).catch((err)=>{
                    message.error("something wrong, please try again")
                })

            } else if(target.type ==="discussion"){
                api.searchByDiscussions(target.searchContent,target.page)
                    .then((response)=>{
                        setSearchedList(response.data.data.discussions.content)
                    }).catch((err)=>{
                        message.error("something wrong, please try again")
                })
            }
 },[])

    return(
        <div className="searchList">
            <div className="searchResults">
                <ul>
                    {target.type ==="discussion" && searchedList.map((index)=>{
                        return <Link to={"/discussion/"+index.id} >
                            <li key={index.id}>
                                <h5 className="title">{index.title}</h5>
                                <div className="content">
                                    {index.content}
                                </div>
                                <div className="date">
                                    <span>Poster: {index.jsonUser.nickName}</span>
                                    <span>Category: {index.jsonCategory.content}</span>
                                    <span>Date: {moment(index.createDate).format('L')}</span>
                                </div>
                            </li>

                        </Link>
                    })
                    }
                    {target.type ==="note" && searchedList.map((index)=>{
                        return <Link to={
                            // "/note/"+index.id
                            ""
                        } >
                        <li key={index.id}>
                            <h5 className="title">{index.name}</h5>
                            <div className="content">
                                {index.description}
                            </div>
                            <div className="date">
                                <span>Poster: {index.jsonOwner.nickName}</span>
                                <span>Category: {index.jsonCategory.content}</span>
                                <span>Date: {moment(index.createDate).format('L')}</span>
                            </div>
                        </li>
                        </Link>
                    })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SearchList