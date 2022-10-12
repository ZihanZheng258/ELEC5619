import React, { useState, useEffect } from 'react'
import { Button, Result, Form, Input, message } from 'antd'
import './index.less'
import { useNavigate } from 'react-router-dom'
const Settings = () => {
    const navigate = useNavigate()

    const updataUserInfo = (params, changePassWord) => {
        console.log(params)
        // Interface.updateUserInfo(params).then(res => {
        //     if (res.data.flag) {
        //         message.success(res.data.message || 'success')
        //         if (changePassWord === "changePassWord") {
        //             navigate('/login');
        //         }
        //     }
        // })
    }

    const onFinish = async (params) => {
        console.log(params, 'params')
    }

    useEffect(() => { }, [])

    return (
        <div className='set_container'>
            {/* changePassWord */}
            <Result
                status='warning'
                extra={
                    <>
                        <Form
                            name='basic'
                            labelCol={{
                                span: 10,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            initialValues={{
                                remember: false,
                            }}
                            autoComplete='off'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label='Old Password'
                                name='username'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label='New Password'
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                        </Form>
                        <Button
                            type='primary'
                            htmlType='submit'
                            onClick={() => {
                                updataUserInfo(
                                    {
                                        oldPassWord: 'oldxxxx',
                                        newPassWord: 'newxxxx',
                                    },
                                    'changePassWord'
                                )
                            }}
                        >
                            Update Password
                        </Button>
                    </>
                }
            />
            {/* changeNickName */}
            <Result
                status='warning'
                extra={
                    <>
                        <Form
                            name='basic'
                            labelCol={{
                                span: 10,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            initialValues={{
                                remember: false,
                            }}
                            autoComplete='off'
                            onFinish={onFinish}
                        >
                            <Form.Item label='Current Nickname' name='oldnickname'>
                                <Input disabled defaultValue='test001' />
                            </Form.Item>

                            <Form.Item
                                label='New Nickname'
                                name='newnickname'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new nickname!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                        <Button
                            type='primary'
                            htmlType='submit'
                            onClick={() => {
                                updataUserInfo(
                                    {
                                        oldNikeName: 'oldxxxx',
                                        newNikeName: 'newxxxx',
                                    },
                                    'changeNickName'
                                )
                            }}
                        >
                            Update NikeName
                        </Button>
                    </>
                }
            />
        </div>
    )
}
export default Settings