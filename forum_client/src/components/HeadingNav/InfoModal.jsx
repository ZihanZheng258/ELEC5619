import { useState, useImperativeHandle } from "react";
import { Modal, message, Col, Row, Switch } from "antd";

const InfoModal = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    useImperativeHandle(props.innerRef, () => ({
        showModal,
    }));

    const showModal = (params) => {
        console.log(params);
        setModalVisible(true);
    };

    const handleOk = () => {
        setModalVisible(false);
        message.success("Successfully Modified User Information!");
    };

    const handleCancel = () => {
        setModalVisible(false);
    };
    return (
        <Modal
            title="Personal Information"
            onOk={handleOk}
            destroyOnClose={true}
            open={modalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Row align="middle">
                <Col span={4}>
                    <span>NickName:</span>
                </Col>
                <Col span={20} gutter={{ xs: 8, sm: 16, md: 24 }}>
                    <span>9527-test</span>
                </Col>
            </Row>
            <Row align="middle">
                <Col span={4}>
                    <span>User Status:</span>
                </Col>
                <Col span={20} gutter={{ xs: 8, sm: 16, md: 24 }}>
                    <Switch
                        size="small"
                        checkedChildren="online"
                        unCheckedChildren="off"
                        defaultChecked
                    />
                </Col>
            </Row>
            <Row align="middle">
                <Col span={4}>
                    <span>User Score:</span>
                </Col>
                <Col span={20} gutter={{ xs: 8, sm: 16, md: 24 }}>
                    <span>100</span>
                </Col>
            </Row>
        </Modal>
    );
};
export default InfoModal;
