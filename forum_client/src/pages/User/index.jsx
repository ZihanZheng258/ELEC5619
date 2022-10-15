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
    PushpinOutlined,
    HeartOutlined,
    NotificationOutlined,
    UserOutlined

} from '@ant-design/icons'
import { Outlet } from "react-router-dom"
import HeadingNav from "../../components/HeadingNav"
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
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
                        label: <span className="dropdown-item">notes published</span>,
                        onClick: () => navigate("/user/publishedNotes"),
                        icon: <PublishOutlinedIcon />,
                    },
                    {
                        key: "2",
                        label: <span className="dropdown-item">notes owned</span>,
                        onClick: () => navigate("/user/myNotes"),
                        icon: <ListOutlinedIcon />,

                    },
                    {
                        key: "4",
                        label: <span className="dropdown-item">notes wishlist</span>,
                        onClick: () => navigate("/user/notesWishlist"),
                        icon: <HeartOutlined />,

                    },
                ]

            },
            {
                key: "sub2",
                icon: <SendOutlined />,
                label: <span className="dropdown-item">Discussion</span>,
                children: [
                    {
                        key: "5",
                        label: <span className="dropdown-item">discussions post</span>,
                        onClick: () => navigate("/user/myDiscussions"),
                        icon: <PublishOutlinedIcon />,
                    },
                    {
                        key: "6",
                        label: <span className="dropdown-item">discussions liked</span>,
                        onClick: () => navigate("/user/discussionLiked"),
                        icon: <LikeOutlined />,
                    },
                ]
            },
            {
                key: "7",
                label: <span className="dropdown-item">Comment</span>,
                onClick: () => navigate("/user/comment"),
                icon: <TextsmsOutlinedIcon />,

            },
            {
                key: "8",
                label: <span className="dropdown-item">Notice</span>,
                onClick: () => navigate("/user/notice"),
                icon: <NotificationOutlined />,
            },
            {
                key: "9",
                label: <span className="dropdown-item">Profile</span>,
                onClick: () => navigate("/user/myProfile"),
                icon:<UserOutlined />,

            },
            // {
            //     key: "10",
            //     label: <span className="dropdown-item">Settings</span>,
            //     onClick: () => navigate("/user/setting"),
            //     icon: <SettingOutlined />,
            // },
        ]


    const onOpenChange = (keys) => {

        console.log(keys,444444);
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
