import './user.less'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Outlet } from "react-router-dom"

const User = () => {

    const rootSubmenuKeys = ['sub1', 'sub2']
    const [openKeys, setOpenKeys] = useState(['sub2'])
    const navigate = useNavigate()
    const items =
        [
            {
                key: "sub1",
                label: <span className="dropdown-item">Note</span>,
                icon: <SettingOutlined />,

                children: [
                    {
                        key: "1",
                        label: <span className="dropdown-item">notes i sent</span>,
                        onClick: () => navigate("/user/notesent"),
                        icon: <SettingOutlined />,
                    },
                    {
                        key: "2",
                        label: <span className="dropdown-item">notes i bought</span>,
                        onClick: () => navigate("/user/notebuy"),
                        icon: <SettingOutlined />,

                    },
                    {
                        key: "3",
                        label: <span className="dropdown-item">notes i have</span>,
                        onClick: () => navigate("/user/notehave"),
                        icon: <SettingOutlined />,

                    },
                    {
                        key: "4",
                        label: <span className="dropdown-item">notes i like</span>,
                        onClick: () => navigate("/user/notelike"),
                        icon: <SettingOutlined />,

                    },
                ]
            },
            {
                key: "sub2",
                icon: <SettingOutlined />,
                label: <span className="dropdown-item">Post</span>,
                children: [
                    {
                        key: "5",
                        label: <span className="dropdown-item">posts i sent</span>,
                        onClick: () => navigate("/user/postsent"),
                        icon: <SettingOutlined />,
                    },
                    {
                        key: "6",
                        label: <span className="dropdown-item">posts i like</span>,
                        onClick: () => navigate("/user/postlike"),
                        icon: <SettingOutlined />,
                    },
                ]
            },
            {
                key: "7",
                label: <span className="dropdown-item">comment</span>,
                onClick: () => navigate("/user/comment"),
                icon: <SettingOutlined />,

            },
            {
                key: "8",
                label: <span className="dropdown-item">notice</span>,
                onClick: () => navigate("/user/notice"),
                icon: <SettingOutlined />,
            },
            {
                key: "9",
                label: <span className="dropdown-item">userInfo</span>,
                onClick: () => navigate("/user/userinfo"),
                icon: <SettingOutlined />,

            },
            {
                key: "10",
                label: <span className="dropdown-item">setting</span>,
                onClick: () => navigate("/user/setting"),
                icon: <SettingOutlined />,
            },
        ]


    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }


    useEffect(() => {

    }, [])

    return (
        <div className='user_container'>
            <div className='left'>
                <Menu
                    mode='inline'
                    openKeys={openKeys}
                    style={{
                        width: 220,
                    }}
                    items={items}
                    onOpenChange={onOpenChange}
                />
            </div>
            <div className='right'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
export default User
