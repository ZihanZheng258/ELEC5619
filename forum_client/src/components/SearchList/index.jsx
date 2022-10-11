import {React, useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import './index.less'
import {message} from "antd"
import api from "../../api";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const SearchList = () =>{
    const [searchedList, setSearchedList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const target = useParams();
    useEffect(()=>{
            if (target.type === "note"){
                api.searchByNotes(target.searchContent,page-1)
                    .then((response)=>{
                        setSearchedList(response.data.data.notes.content)
                        setTotalPage(response.data.data.notes.totalPages)
                    }).catch((err)=>{
                    message.error("something wrong, please try again")
                })

            } else if(target.type ==="discussion"){
                api.searchByDiscussions(target.searchContent,page-1)
                    .then((response)=>{
                        setSearchedList(response.data.data.discussions.content)
                        setTotalPage(response.data.data.discussions.totalPages)

                    }).catch((err)=>{
                        message.error("something wrong, please try again")
                })
            }
 },[])
    const pageChange = (event,value)=>{
        setPage(value);
        if (target.type === "note"){
            api.searchByNotes(target.searchContent,value-1)
                .then((response)=>{
                    setSearchedList(response.data.data.notes.content)
                }).catch((err)=>{
                message.error("something wrong, please try again")
            })

        } else if(target.type ==="discussion"){
            api.searchByDiscussions(target.searchContent,value-1)
                .then((response)=>{
                    setSearchedList(response.data.data.discussions.content)
                }).catch((err)=>{
                message.error("something wrong, please try again")
            })
        }
    };
    return(
        <div className="searchList">
            <div className="searchResults">
                <ul>
                    {target.type ==="discussion" && searchedList.map((index)=>{
                        return <Link to={"/discussion/"+index.id} key={index.id}>
                            <li >
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
                            "/note/"+index.id
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
            <div style={{margin:"10px auto"}} key={"PageDiv"}>
                <Stack spacing={4}>
                    <Pagination
                        siblingCount={4}
                        count={totalPage}
                        showFirstButton
                        showLastButton
                        onChange={pageChange}
                    />
                </Stack>

            </div>
        </div>

    )
}

export default SearchList