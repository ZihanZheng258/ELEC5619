import { useState, useImperativeHandle } from 'react'
import { useNavigate } from "react-router-dom";
import { Modal, message } from 'antd'
import { Form, Input } from 'antd'
import { ExclamationCircleOutlined } from "@ant-design/icons";

const PasswordModal = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const navigate = useNavigate();

    useImperativeHandle(props.innerRef, () => ({
        showModal,
    }))

    const showModal = (params) => {
        console.log(params)
        setIsModalVisible(true)
    }

    const handleOk = () => {
        Modal.confirm({
            title: "Tips",
            icon: <ExclamationCircleOutlined />,
            content: "Are you sure you want to change password?",
            okText: "ok",
            cancelText: "cancel",
            onOk: () => {
                setIsModalVisible(false)
                message.success('Password Modification Succeeded!')
                setTimeout(() => {
                    navigate("/login");
                }, 0.5e3)

                // Interface.changePassWord({
                //     oldPassWord: "oldPass",
                //     newPassWord: "newPass"
                // }).then(res => {
                //     if (res.flag) {
                //         setIsModalVisible(false)
                //         message.success('Password Modification Succeeded!')
                //         setTimeout(() => {
                //             navigate("/login");
                //         }, 0.5e3)
                //     }
                // })
            },
            onCancel: () => {
                console.log('cancel');
            }
        });
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <>
            <Modal
                onOk={handleOk}
                destroyOnClose={true}
                title='Change Password'
                open={isModalVisible}
                onCancel={handleCancel}
            >
                <Form
                    name='basic'
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
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
            </Modal>
        </>
    )
}
export default PasswordModal
