import { useState, useImperativeHandle } from 'react'
import { Modal, message } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'

const PasswordModal = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    useImperativeHandle(props.innerRef, () => ({
        showModal,
    }))

    const showModal = (params) => {
        console.log(params)
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
        message.success('Password Modification Succeeded!')
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <>
            <Modal
                title='Change Password'
                onOk={handleOk}
                destroyOnClose={true}
                onCancel={handleCancel}
                open={isModalVisible}
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
