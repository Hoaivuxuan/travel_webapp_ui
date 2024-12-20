import React, { useEffect, useState } from "react";
import { Modal, Table, Tag } from "antd";
import { typeVehicleTags } from "@/data/defaultValues";

interface ListVehicleModalProps {
  data: any;
  visible: boolean;
  onClose: () => void;
}

const ListVehicleModal: React.FC<ListVehicleModalProps> = ({ data, visible, onClose }) => {
  const [loading, setLoading] = useState(true);
  if(!data) return;

  const vehicleColumns = [
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
        className="h-[520px]"
        pagination={{ pageSize: 8 }}
        bordered
      />
    </Modal>
  );
};

export default ListVehicleModal;
