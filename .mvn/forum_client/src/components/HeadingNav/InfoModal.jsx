import { useState, useImperativeHandle, useEffect } from "react";
import { Modal, message, Col, Row, Switch } from "antd";

const InfoModal = (props) => {

    const { userInfo } = props;

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

    useEffect(() => {
        console.log('?InfoModal')
    }, []);

    return (
        <Modal
            footer={null}
            onOk={handleOk}
            open={modalVisible}
            destroyOnClose={true}
            title="Personal Information"
            onCancel={handleCancel}
        >
            <Row align="middle">
                <Col span={4}>
                    <span>NickName:</span>
                </Col>
                <Col span={20} gutter={{ xs: 8, sm: 16, md: 24 }}>
                    <span>{userInfo.nickName}</span>
                </Col>
            </Row>
            <Row align="middle">
                <Col span={4}>
                    <span>User Status:</span>
                </Col>
                <Col span={20} gutter={{ xs: 8, sm: 16, md: 24 }}>
                    <Switch
                        size="small"
                        defaultChecked
                        checkedChildren={userInfo.status === 1 ? "online" : "off"}
                        unCheckedChildren={userInfo.status === 1 ? "online" : "off"}
                    />
                </Col>
            </Row>
            <Row align="middle">
                <Col span={4}>
                    <span>User Score:</span>
                </Col>
                <Col span={20} gutter={{ xs: 8, sm: 16, md: 24 }}>
                    <span>{userInfo.credit}</span>
                </Col>
            </Row>
        </Modal>
    );
};
export default InfoModal;
