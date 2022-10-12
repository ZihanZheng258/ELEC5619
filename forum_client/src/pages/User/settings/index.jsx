import React, { useState, useEffect } from 'react'
import { Button, Result, Form, Input } from 'antd'
import './index.less'
const Settings = () => {
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
                        <Button type='primary' key='console'>
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
                        <Button type='primary' key='console'>
                            Update NikeName
                        </Button>
                    </>
                }
            />
        </div>
    )
}
export default Settings
