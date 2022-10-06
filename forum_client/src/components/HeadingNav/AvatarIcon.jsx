import { useRef } from "react";
import { Avatar, Modal, Menu, Dropdown, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PasswordModal from "./PasswordModal";
import InfoModal from "./InfoModal";
import avatar from "./assets/user.png";

const AvatarIcon = () => {
    const navigate = useNavigate();
    const passRef = useRef(null);
    const infoRef = useRef(null);
    const logout = () => {
        Modal.confirm({
            title: "Tips",
            icon: <ExclamationCircleOutlined />,
            content: "Are you sure you want to log out?",
            okText: "ok",
            cancelText: "cancel",
            onOk: () => {
                localStorage.removeItem("token");
                message.success("Log out successfully!");
                navigate("/login");
            },
        });
    };

    const menu = (
        <Menu
            items={[
                {
                    key: "1",
                    label: <span className="dropdown-item">Home Page</span>,
                    onClick: () => navigate("/"),
                },
                {
                    type: "divider",
                },
                {
                    key: "2",
                    label: <span className="dropdown-item">Personal information</span>,
                    onClick: () => infoRef.current.showModal({ name: 11 }),
                },
                {
                    key: "3",
                    label: <span className="dropdown-item">Change Password</span>,
                    onClick: () => passRef.current.showModal({ name: 11 }),
                },
                {
                    type: "divider",
                },
                {
                    key: "4",
                    label: <span className="dropdown-item">Log Out</span>,
                    onClick: logout,
                },
            ]}
        ></Menu>
    );
    return (
        <>
            <Dropdown overlay={menu} placement="bottom" arrow trigger={["click"]}>
                <Avatar size="large" src={avatar} />
            </Dropdown>
            <InfoModal innerRef={infoRef}></InfoModal>
            <PasswordModal innerRef={passRef}></PasswordModal>
        </>
    );
};

export default AvatarIcon;
