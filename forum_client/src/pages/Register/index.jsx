import React, { useState, useEffect } from "react";
import "./index.less"
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import loginLeft from "../../assets/images/login_left2.png";

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const onFinish = async ({ username, password }) => {
        setLoading(true);
        message.success('Register success! ')
        setTimeout(() => {
            navigate('/login')
            setLoading(false);
        }, 3000)
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="register-container">
            <div className="login-box">
                <div className="login-left">
                    <img src={loginLeft} alt="login" />
                </div>
                <div className="login-form">

                    <div className="login-logo">
                        <img className="login-icon" src={logo} alt="logo" />
                        <span className="logo-text">Register Page</span>
                    </div>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 5 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="large"
                        autoComplete="off"
                    >
                        <Form.Item label="Username" name="username" rules={[{ required: true, message: "please enter username" }]}>
                            <Input placeholder="please enter username" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: "please enter password" }]}>
                            <Input.Password autoComplete="new-password" placeholder="please enter password" prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item label="NickName" name="nickname" rules={[{ required: true, message: "please enter nickname" }]}>
                            <Input placeholder="please enter nickname" prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item label="Phone No" name="phone" rules={[{ required: true, message: "please enter phone Number" }, {
                            pattern: /^(1[0-9])\d{9,15}$/,
                            message: 'please enter the valid phone no.',
                            trigger: 'change'
                        }]}>
                            <Input.Password placeholder="please enter phone Number" prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "please enter phone Email" }]}>
                            <Input.Password placeholder="please enter  Email" prefix={<LockOutlined />} />
                        </Form.Item>


                        <Form.Item className="login-btn">
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                }}
                                icon={<CloseCircleOutlined />}
                            >
                                Reset
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </div>
    )
};

export default Login;