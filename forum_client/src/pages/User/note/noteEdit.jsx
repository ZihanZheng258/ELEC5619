import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import "../discussion/discussionPost.less"
import { Button, Form, Input, Select,message,Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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
const NoteEdit = ()=>{
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();
    const { state } = useLocation();
    const onFinish = (values) => {

        let formData = new FormData();
        formData.append('file', fileList[0]);

        console.log([...formData])
        // axios api edit upload to database

        api.editFileToDatabase(
            state.id,
            values.name,
            values.cost,
            values.description,
            ).then( (uploadres)=>{
            // console.log(uploadres)
            message.success("Your note has been update Successfully");
            navigate("/user/publishedNotes")
        }).catch(err=>{
            console.log(err)
        })

    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };
    return(
        <div className={"newForm"}>
            <h1>Edit My Note</h1>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Title"
                    initialValue={state.name}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="cost"
                    label="Cost"
                    initialValue={state.cost}

                    rules={[
                        {
                            required: true,
                            message: "A value must be entered",
                            pattern: new RegExp(/^[0-9]+$/)
                        },
                    ]}
                >
                    <Input />
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

                <Form.Item
                    name="description"
                    label="Description"
                    initialValue={state.description}

                    rules={[
                        {
                            required: true,
                            max: 250
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                {/*<Form.Item style={{marginLeft:"15%"}}>*/}
                {/*    <Upload {...props}>*/}
                {/*        <Button icon={<UploadOutlined />}>Select Note</Button>*/}
                {/*    </Upload>*/}
                {/*</Form.Item>*/}
                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        {'Update'}
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}

export default NoteEdit


