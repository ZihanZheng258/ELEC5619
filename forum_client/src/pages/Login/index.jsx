import React, {useState} from "react";
import "./index.less"
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, message} from "antd";
import {CloseCircleOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import loginLeft from "../../assets/images/login_left4.png";
import logo from "../../assets/images/logo.png";

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const onFinish = async ({ username, password }) => {
        setLoading(true);
// Example POST method implementation:
        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response// parses JSON response into native JavaScript objects

        }

        postData('http://localhost:8090/auth/signin', { usernameOrEmail: username, password:password })
            .then((res=> res.json().then( data=> ({
                data:data,
                status: res.status
            })).then(res=> {
                console.log(res)
                if (res.status === 200){
                    setLoading(false);
                    // console.log(data); // JSON data parsed by `data.json()` call
                    message.success("login success!")
                    console.log('@AccessToken', res.data.accessToken)
                    localStorage.setItem('accessToken',res.data.accessToken);
                    setTimeout(() => {
                        navigate('/')
                        setLoading(false);
                    }, 500)
                } else{
                    setLoading(false);
                    message.error("please check your account or password!" )
                }


            })));

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