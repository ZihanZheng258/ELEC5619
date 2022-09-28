import React, { useState, useEffect } from "react";
import "./index.less"
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import loginLeft from "../../assets/images/login_left4.png";
import logo from "../../assets/images/logo.png";

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const onFinish = async ({ username, password }) => {
        setLoading(true);
        if (username === 'admin' && password === '123456') {
            message.success("login success!")
            setTimeout(() => {
                navigate('/')
                setLoading(false);
            }, 2500)
        } else {
            setLoading(false);
            message.error("please check your account or password!")
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-left">
                    <img src={loginLeft} alt="login" />
                </div>
                <div className="login-form">
                    <div className="login-logo">
                        <img className="login-icon" src={logo} alt="logo" />
                        <span className="logo-text">Login Page</span>
                    </div>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 5 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="Default"
                        autoComplete="off"
                    >
                        <Form.Item name="username" rules={[{ required: true, message: "please enter username" }]}>
                            <Input placeholder="UserName：admin" prefix={<UserOutlined />} />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "please enter password" }]}>
                            <Input.Password autoComplete="new-password" placeholder="PassWords：123456" prefix={<LockOutlined />} />
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
                                Login
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </div>
    )
};

export default Login;