import './index.less'
import React, { useState, useEffect } from 'react'
import { Input, message, Pagination } from 'antd'

const Sent = () => {

    const { Search } = Input

    const onSearch = (keyWords) => {
        console.log(keyWords)
    }

    const [mySentNote, setMysentNote] = useState([])

    useEffect(() => {
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
                {(mySentNote || []).map((item) => {
                    return (
                        <div className='post_item' key={item} >
                            <div className='info-box'>
                                <div className='info-row meta-row'>this is note i sent</div>
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
export default Sent
