import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

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
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const onFinish = (values) => {

        let formData = new FormData();
        formData.append('file', fileList[0]);

        console.log([...formData])
        // setUploading(true); // You can use any AJAX library you like
        // axios api upload to database
        api.uploadFile(formData)
            .then((res)=>{
                console.log(res)
                api.uploadFileToDatabase(
                    res.data.message,
                    values.cost,
                    values.description,
                    values.category,
                    values.name).then( (uploadres)=>{
                    // console.log(uploadres)
                    message.success("Your note has been posted Successfully");
                    navigate("/user/publishedNotes")
                }).catch(err=>{
                    console.log(err)
                })

            })
            .catch(err=>{console.log(err)})


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
            <h1>Create New Note</h1>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="name"
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
                    name="cost"
                    label="Cost"
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
                    label="Category">
                    <Select>
                        <Select.Option value={53}>Art and Social Sciences</Select.Option>
                        <Select.Option value={54}>Business</Select.Option>
                        <Select.Option value={55}>Engineering</Select.Option>
                        <Select.Option value={56}>Law</Select.Option>
                        <Select.Option value={57}>Medicine and health</Select.Option>
                        <Select.Option value={58}>Music</Select.Option>
                        <Select.Option value={59}>Science</Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            max: 250
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item style={{marginLeft:"15%"}}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Select Note</Button>
                    </Upload>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={fileList.length === 0}
                        loading={uploading}
                    >
                        {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}

export default NoteEdit


