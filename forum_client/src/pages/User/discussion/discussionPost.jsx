import React from "react";
import {useNavigate} from "react-router-dom";

import "./discussionPost.less"
import { Button, Form, Input, Select,message } from 'antd';

import api from "../../../api"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};
const DiscussionPost = ()=>{
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log(values)
        api.createCategory(values.category)
            .then((response)=>{
                console.log(response.data.data.Category.id)

                api.createDiscussion(values.title,values.content,response.data.data.Category.id)
                    .then((res)=>{
                        message.success("New discussion posted");
                        navigate("/user/myDiscussions")
                    }).catch((err)=>{
                    message.error("Something wrong, please try again");
                })
            })

    };
    return(
        <div className={"newForm"}>
            <h1>Create New Discussion</h1>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    rules={[
                        {
                            required: true,
                            max: 250
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}

export default DiscussionPost