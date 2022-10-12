import './index.less'
import React, { useState, useEffect } from 'react'
import { Input, message, Pagination } from 'antd'
import Interface from "../../../api/index"

const Have = () => {

    const { Search } = Input

    const onSearch = (keyWords) => {
        console.log(keyWords)
    }

    const [ownedNoteList, setOwnedNoteList] = useState([])

    const getOwnedNote = () => {
        Interface.getUserSelf().then((response) => {
            Interface.getOwnedNote(response.data.data.user.id).then((res) => {
                const data = res.data.data && res.data.data.notes ? res.data.data.notes : []
                setOwnedNoteList(data)
            })
        })
    }

    useEffect(() => {
        getOwnedNote()
    }, [])

    return (
        <div className='my_note_container'>
            <div className='search_container'>
                <Search
                    placeholder='Search My Owned Notes'
                    allowClear
                    enterButton='Search'
                    size='large'
                    onSearch={onSearch}
                />
            </div>
            <div className='posts_list'>
                {(ownedNoteList || []).map((item) => {
                    return (
                        <div className='post_item' key={item} >
                            <div className='info-box'>
                                <div className='info-row meta-row'>
                                    {item.description}
                                </div>
                                <div className='info-row title-row'>{`Price：$ ${item.price} `}</div>
                                <div className='info-row abstract-row'>{`NumOfBuy：${item.numOfBuy || 1}`}</div>
                                <div className='info-row action-row'>
                                    {`CreateDate：${item.createDate}`}
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
