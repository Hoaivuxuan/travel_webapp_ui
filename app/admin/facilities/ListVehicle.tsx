import React, { useState } from "react";
import { Button, Dropdown, Menu, Modal, Space, Table, Tag } from "antd";
import { typeVehicleTags } from "@/data/defaultValues";
import { AiOutlineBars, AiFillEdit } from "react-icons/ai";

interface ListVehicleModalProps {
  data: any;
  visible: boolean;
  onClose: () => void;
}

const ListVehicleModal: React.FC<ListVehicleModalProps> = ({ data, visible, onClose }) => {
  if(!data) return;

  const rentalMenu = (record: any) => (
    <Menu>
      <Menu.Item key="1">
        <div className="flex items-center">
          <AiFillEdit className="mr-2" /> Chỉnh sửa giá thuê
        </div>
      </Menu.Item>
    </Menu>
  );

  const vehicleColumns = [
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, record: any) => (
        <Space className="flex items-center justify-center">
          <Dropdown overlay={rentalMenu(record)} trigger={['click']}>
            <Button type="link" icon={<AiOutlineBars className="text-lg" />} />
          </Dropdown>
        </Space>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id: number) => id.toString().padStart(6, "0"),
    },
    {
      title: "Dòng xe",
      dataIndex: "name",
      key: "name",
      width: 400,
      render: (text: any, record: any) => {
        const type = typeVehicleTags
          .filter(tag => tag.type === record.type)
          .map(tag => (
            <Tag color={tag.color} key={tag.type} >
              <tag.icon className="text-lg my-1" />
            </Tag>
          ));

        return (
          <div className="flex items-center">{type}{record.name}</div>
        );
      },
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      width: 250,
    },
    {
      title: "Giá (ngày)",
      dataIndex: "price",
      key: "price",
      render: (totalPrice: number) => `${(totalPrice|| 0).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}`,
    },
  ];

  return (
    <Modal
      title={`Danh sách phương tiện`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      centered
    >
      <Table
        dataSource={data}
        columns={vehicleColumns}
        size="middle"
        rowKey="id"
        className="h-[550px]"
        pagination={{ pageSize: 8 }}
        bordered
      />
    </Modal>
  );
};

export default ListVehicleModal;
