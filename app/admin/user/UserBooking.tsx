import React from "react";
import { Modal, Table, Tag, Collapse } from "antd";
import { statusTags } from "@/data/defaultValues";
import { format } from "date-fns";
import { bookingHotel } from "@/data/fakeData";

const { Panel } = Collapse;

interface UserBookingsModalProps {
  user: any;
  visible: boolean;
  onClose: () => void;
}

const UserBookingsModal: React.FC<UserBookingsModalProps> = ({
  user,
  visible,
  onClose,
}) => {
  if (!user) return null;

  const filteredBookings = bookingHotel.filter((item) => item.user === user.id);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
      render: (id: number) => id.toString().padStart(8, "0"),
    },
    {
      title: "Hotel",
      dataIndex: ["hotel", "id"],
      key: "hotelName",
      width: 300,
    },
    {
      title: "Customer",
      dataIndex: ["customerInfo", "fullName"],
      key: "customerName",
      width: 200,
    },
    {
      title: "Time",
      key: "time",
      width: 250,
      render: (_: any, record: any) => {
        const checkin = format(new Date(record.checkinDate), "dd/MM/yyyy");
        const checkout = format(new Date(record.checkoutDate), "dd/MM/yyyy");
        return `${checkin} - ${checkout}`;
      },
    },
    {
      title: "Rooms",
      dataIndex: ["roomSelection", "totalRooms"],
      key: "totalRooms",
      width: 100,
    },
    {
      title: "Price",
      dataIndex: ["roomSelection", "totalPrice"],
      key: "totalPrice",
      width: 200,
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: any) => {
        const tag = statusTags.find((tag) => tag.id === status);
        return tag ? <Tag color={tag.color}>{tag.text}</Tag> : null;
      },
    },
  ];

  return (
    <Modal
      title={`Danh sách hóa đơn`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={1300}
      centered
    >
      <Collapse accordion>
        <Panel header="HÓA ĐƠN ĐẶT PHÒNG" key="1">
          <Table
            dataSource={filteredBookings}
            columns={columns}
            bordered
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1500 }}
          />
        </Panel>
        <Panel header="HÓA ĐƠN THUÊ XE" key="2">
          <Table
            dataSource={filteredBookings}
            columns={columns}
            bordered
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1500 }}
          />
        </Panel>
        <Panel header="HÓA ĐƠN ĐẶT TOUR/VÉ THAM QUAN" key="3">
          <Table
            dataSource={filteredBookings}
            columns={columns}
            bordered
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1500 }}
          />
        </Panel>
      </Collapse>
    </Modal>
  );
};

export default UserBookingsModal;
