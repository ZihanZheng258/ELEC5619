import './index.less'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    RollbackOutlined,
    BookOutlined,
    SendOutlined,
    LikeOutlined,
    PushpinOutlined

} from '@ant-design/icons'
import { Outlet } from "react-router-dom"
import HeadingNav from "../../components/HeadingNav"

const User = () => {

    const rootSubmenuKeys = ['sub1', 'sub2']
    const [openKeys, setOpenKeys] = useState(['sub2'])
    const navigate = useNavigate()
    const items =
        [
            {
                key: "sub0",
                label: <span className="dropdown-item">Back Home</span>,
                onClick: () => navigate("/"),
                icon: <RollbackOutlined />,

            },
            {
                key: "sub1",
                label: <span className="dropdown-item">Note</span>,
                icon: <BookOutlined />,
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
                        icon: <PushpinOutlined />,

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
                icon: <SendOutlined />,
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
                        icon: <LikeOutlined />,
                    },
                ]
            },
            {
                key: "7",
                label: <span className="dropdown-item">Comment</span>,
                onClick: () => navigate("/user/comment"),
                icon: <SettingOutlined />,

            },
            {
                key: "8",
                label: <span className="dropdown-item">Notice</span>,
                onClick: () => navigate("/user/notice"),
                icon: <SettingOutlined />,
            },
            {
                key: "9",
                label: <span className="dropdown-item">UserInfo</span>,
                onClick: () => navigate("/user/userinfo"),
                icon: <SettingOutlined />,

            },
            {
                key: "10",
                label: <span className="dropdown-item">Settings</span>,
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
            <div>
                <HeadingNav />
            </div>
            <div className="userProfile">
                <div className='left'>
                    <Menu
                        mode='inline'
                        openKeys={openKeys}
                        style={{
                            width: 270,
                        }}
                        items={items}
                        onOpenChange={onOpenChange}
                    />
                </div>
                <div className='right'>
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    )
}
export default User
