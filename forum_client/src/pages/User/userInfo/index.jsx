import React, { useState, useEffect } from 'react'
import { Descriptions, Switch } from 'antd'
import "./index.less"
const UserInfo = () => {

    useEffect(() => {

    }, [])



    return (
        <div className='userinfo_container'>
            <Descriptions title="User Info" layout="vertical" bordered>
                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="NickName">Joker</Descriptions.Item>
                <Descriptions.Item label="onLine">
                    <Switch
                        size="small"
                        defaultChecked
                        checkedChildren={"online"}
                        unCheckedChildren={"off"}
                    />

                </Descriptions.Item>
                <Descriptions.Item label="Phone No." >1810000000</Descriptions.Item>

                <Descriptions.Item label="UserScore">100</Descriptions.Item>
            </Descriptions>
        </div>
    )
}
export default UserInfo
