import "./myPosts.less";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Pagination } from "antd";
const { Search } = Input;
const onSearch = (value) => console.log(value);
const MyPosts = () => {
    return (
        <div className="myposts_container">
            <div className="search_container">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
            <div className="posts_list">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
                    return (
                        <div className="post_item" key={item}>
                            <div className="info-box">
                                <div className="info-row meta-row">
                                    this is title time and tips
                                </div>
                                <div className="info-row title-row">
                                    this is content this is content this is content this is
                                    content this is content this is content
                                </div>
                                <div className="info-row abstract-row">
                                    this is content this is content this is content this is
                                    content this is content this is content
                                </div>
                                <div className="info-row action-row">
                                    this is content this is content this is content this is
                                    content this is content this is content
                                </div>
                            </div>
                            <img
                                src={
                                    "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9846017b84404411a0cd4ed386536fb1~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?"
                                }
                                className="lazy thumb"
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>
            <div className="posts_footer">
                <Pagination defaultCurrent={6} total={500} />
            </div>
        </div>
    );
};
export default MyPosts;
