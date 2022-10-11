import './index.less'
import React, { useState, useEffect } from 'react'
import { Button, Form, Input, message, Pagination } from 'antd'
const { Search } = Input

const Have = () => {
    const onSearch = (keyWords) => {
        console.log(keyWords)
        getPostList(keyWords)
    }

    const [postsList, setPostsList] = useState([1, 2,])

    const deletePosts = (id) => {

        console.log(id, '???')
        // Modal.confirm({
        //     title: 'Tips',
        //     icon: <ExclamationCircleOutlined />,
        //     content: 'Are you sure you want to delete this post?',
        //     okText: 'ok',
        //     cancelText: 'cancel',
        //     onOk: () => {
        //         Interface.deletePostById({
        //             id: id,
        //         }).then((res) => {
        //             if (res.flag) {
        //                 message.success('Delete Succeeded!')
        //                 getPostList("");
        //             }
        //         })
        //     },
        //     onCancel: () => {
        //         console.log('cancel')
        //     },
        // })
    }

    const getPostList = (params) => {
        // Interface.getPostList({
        //     page: 1,
        //     pageSize: 20,
        //     keyWords: keyWords
        // }).then(res => {
        //     if (res.flag) {
        //         setPostsList((value) => {
        //             value = res.data || []
        //             return value
        //         })
        //     }
        // })
    }

    useEffect(() => {
        getPostList()
    }, [])

    return (
        <div className='my_note_container'>
            <div className='search_container'>
                <Search
                    placeholder='input search text'
                    allowClear
                    enterButton='Search'
                    size='large'
                    onSearch={onSearch}
                />
            </div>
            <div className='posts_list'>
                {(postsList || []).map((item) => {
                    return (
                        <div className='post_item' key={item} onClick={deletePosts(item)}>
                            <div className='info-box'>
                                <div className='info-row meta-row'>this is note i have</div>
                                <div className='info-row title-row'>
                                    this is content this is content this is content this is content this is content this
                                    is content
                                </div>
                                <div className='info-row abstract-row'>
                                    this is content this is content this is content this is content this is content this
                                    is content
                                </div>
                                <div className='info-row action-row'>
                                    this is content this is content this is content this is content this is content this
                                    is content
                                </div>
                            </div>
                            <img
                                src={
                                    'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9846017b84404411a0cd4ed386536fb1~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?'
                                }
                                className='lazy thumb'
                                alt=''
                            />
                        </div>
                    )
                })}
            </div>
            <div className='posts_footer'>
                <Pagination defaultCurrent={1} total={500} />
            </div>
        </div>
    )
}
export default Have
