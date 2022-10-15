import React, { useState, useEffect } from 'react'
import { Descriptions, Switch } from 'antd'
import "./index.less"
import api from "../../../api/index";

const UserInfoModal = (props) => {



    const [userInfo, setUserInfo] = useState({})

    const getUserInfo = () => {
        api.getSelf().then(res => {

        
            if (res) {

                
                const info = res.data && res.data.data.user|| {}
                console.log(info);
                setUserInfo(info);
            }
        }).catch(err => {
            setUserInfo({});
        })
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <div className='userinfo_container'>
            <Descriptions title="User Info" layout="vertical" bordered>
                <Descriptions.Item label="NickName">{userInfo.nickName || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Email">{userInfo.email || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="OnLine">
                    <Switch
                        size="small"
                        defaultChecked={userInfo.status === 1}
                        checkedChildren={"online"}
                        unCheckedChildren={"off"}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="PhoneNumber" >{userInfo.phoneNumber || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Credit">{userInfo.credit || 'N/A'}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}
export default UserInfoModal;
