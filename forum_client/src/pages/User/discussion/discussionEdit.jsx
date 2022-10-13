import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

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
const DiscussionEdit = (props)=>{
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { state } = useLocation();
    useEffect(() => {
        console.log(state);

    }, []);


    const onFinish = (values) => {
        console.log(values)
        api.editDiscussion(state.id,values.title,values.content)
            .then((res)=>{
                console.log(res);
                message.success("Discussion uploaded!");
                navigate('/user/myDiscussions');
            })


    };
    return(
        <div className={"newForm"}>
            <h1>Edit My Discussion</h1>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Title"
                    initialValue={state.title}
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
                    initialValue={state.content}
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
                    initialValue={state.category}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input disabled={true}/>
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

export default DiscussionEdit