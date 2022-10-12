import React, { useState, useEffect } from "react";
import "./index.less"
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined, } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import loginLeft from "../../assets/images/login_left2.png";
import Interface from "../../api/index"

const Register = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const onFinish = (useParams) => {
        setLoading(true);
        Interface.signUp(useParams).then(res => {
            console.log(res)
            setLoading(false);
            if (res.flag) {
                message.success(res.message || 'register success!');
                setTimeout(() => {
                    navigate && navigate('/login')
                }, 1e3)
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        console.log('?12312S')
    }, []);

    return (
        <div className="register-container">
            <div className="login-box">
                {/* <div className="login-left">
                    <img src={loginLeft} alt="login" />
                </div> */}
                <div className="login-form">
                    {/* <div className="login-logo">
                        <img className="login-icon" src={logo} alt="logo" />
                        <span className="logo-text">Register Page</span>
                    </div> */}
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 5 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="default"
                        autoComplete="off"
                    >

                        <Form.Item label="NickName" name="nickName" rules={[{ required: true, message: "please enter nickname" }]}>
                            <Input placeholder="please enter nickName" prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{ required: true, message: "please enter password" }]}>
                            <Input.Password autoComplete="new-password" placeholder="please enter password" prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item label="Phone No" name="phoneNumber" rules={[{ required: true, message: "please enter phone Number" }, {
                            pattern: /^(1[0-9])\d{9,15}$/,
                            message: 'please enter the valid phoneNumber',
                            trigger: 'change'
                        }]}>
                            <Input placeholder="please enter phone Number" prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "please enter phone Email" }]}>
                            <Input placeholder="please enter email" prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item className="login-btn">
                            {/* <Button
                                loading={loading}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Reset
                            </Button> */}
                            <Button type="primary" htmlType="submit" loading={loading}
                                style={{
                                    width: '100%',
                                    background: '#2da44e',
                                    borderColor: '#2da44e',
                                    fontWeight: '500',
                                    height: '56px',
                                    borderRadius: '6px',
                                }}
                            >
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                    <p className='login-callout'>
                        Already have an account ?
                        <span href="" style={{ color: '#40a9ff', cursor: 'pointer' }} onClick={() => navigate('/login')}>
                            {' Sign in → '}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Register;