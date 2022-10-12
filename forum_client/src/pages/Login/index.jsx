import React, { useState } from 'react'
import './index.less'
import './setAuthToken'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { CloseCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import loginLeft from '../../assets/images/login_left4.png'
import logo from '../../assets/images/logo.png'
import setAuthToken from './setAuthToken'
import api from '../../api'
import moment from 'moment'

const Login = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false)

    const onFinish = async ({ username, password }) => {
        setLoading(true)
        api.signIn(username, password)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    // remove current user info

                    //get token from response
                    const token = response.data.accessToken
                    const expire = moment().add(23, 'hours')
                    //set JWT token to local
                    localStorage.setItem('token', token)
                    localStorage.setItem('expire', expire)

                    message.success('login success!')
                    console.log(token)
                    setTimeout(() => {
                        navigate('/')
                        setLoading(false)
                    }, 500)
                } else {
                    setLoading(false)
                    message.error('please check your account or password!')
                }
            })
            .catch(function (error) {
                setLoading(false)
                message.error('please check your account or password!')
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className='login-container'>
            <div className='login-box'>
                {/* <div className="login-left">
                    <img src={loginLeft} alt="login" />
                </div> */}

                <div className='login-form'>
                    {/* <div className="login-logo">
                        <img className="login-icon" src={logo} alt="logo" />
                        <span className="logo-text">Login Page</span>
                    </div> */}
                    <Form
                        form={form}
                        name='basic'
                        size='default'
                        autoComplete='off'
                        onFinish={onFinish}
                        labelCol={{ span: 5 }}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item name='username' rules={[{ required: true, message: 'please enter username' }]}>
                            <label className='login_label'>Username</label>
                            <Input placeholder='please enter username' prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item name='password' rules={[{ required: true, message: 'please enter password' }]}>
                            <label className='login_label'>Password</label>
                            <Input.Password
                                autoComplete='new-password'
                                placeholder='please enter password'
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>
                        <Form.Item className='login-btn'>
                            {/* <Button
                                loading={loading}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Reset
                            </Button> */}
                            <Button
                                style={{
                                    width: '100%',
                                    background: '#2da44e',
                                    borderColor: '#2da44e',
                                    fontWeight: '500',
                                    height: '56px',
                                    borderRadius: '6px',
                                }}
                                type='primary'
                                htmlType='submit'
                                loading={loading}
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                    <p className='login-callout'>
                        No Account ?
                        <span
                            href=''
                            style={{ color: '#40a9ff', cursor: 'pointer' }}
                            onClick={() => navigate('/register')}
                        >
                            {' Create an account '}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
