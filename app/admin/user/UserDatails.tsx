import React from "react";
import { Modal, Descriptions, Tag, Image } from "antd";
import { format } from "date-fns";

interface UserDetailsModalProps {
  user: any;
  visible: boolean;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, visible, onClose }) => {
  if (!user) return null;
  return (
    <Modal
      title="User Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
    >
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item>
          <Image
            width={100}
            src={user.avatar || "https://via.placeholder.com/100"}
            alt="user"
          />
        </Descriptions.Item>
        <Descriptions.Item label="ID">
          {user.id.toString().padStart(6, "0")}
        </Descriptions.Item>
        <Descriptions.Item label="Username">
          {user.name || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Full Name">
          {user.first_name && user.last_name
            ? `${user.first_name} ${user.last_name}`
            : `${user.role} ${user.id}`}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {user.email || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {user.phone_number || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {user.address || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Country">
          {user.country || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {user.date_of_birth
            ? format(new Date(user.date_of_birth), "dd/MM/yyyy")
            : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={user.active ? "green" : "red"}>
            {user.active ? "Active" : "Inactive"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          <Tag color={user.role === "ADMIN" ? "blue" : "default"}>
            {user.role}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserDetailsModal;
