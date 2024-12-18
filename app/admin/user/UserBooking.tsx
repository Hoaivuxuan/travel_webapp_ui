import React, { useEffect, useState } from "react";
import { Modal, Table, Tag, Collapse, Button, Dropdown, Menu, Space, message } from "antd";
import { statusTags } from "@/data/defaultValues";
import { format } from "date-fns";
import { AiOutlineEye, AiOutlineDelete, AiOutlineBars } from "react-icons/ai";

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
  const [listBookingHotel, setListBookingHotel] = useState<any | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    if(!user || !bearerToken) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/bookingRoom/user/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setListBookingHotel(data.bookingRoom);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error("Failed to fetch bookings. Please try again.");
      }
    };
  
    fetchData();
  }, [listBookingHotel, user]);

  const userMenu = (record: any) => (
    <Menu>
      <Menu.Item key="1">
        <div className="flex items-center">
          <AiOutlineEye className="mr-2" /> Xem chi tiết
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="flex items-center">
          <AiOutlineDelete className="mr-2" /> Hủy đơn đặt
        </div>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "",
      key: "actions",
      render: (_: any, record: any) => (
        <Space className="flex items-center justify-center">
          <Dropdown overlay={userMenu(record)} trigger={['click']}>
            <Button type="link" icon={<AiOutlineBars className="text-lg" />} />
          </Dropdown>
        </Space>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => id.toUpperCase(),
    },
    {
      title: "Khách sạn",
      dataIndex: ["hotel", "hotel_name"],
      key: "hotelName",
      width: 300,
    },
    {
      title: "Khách hàng",
      dataIndex: ["customerInfo", "fullname"],
      key: "customerName",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: ["customerInfo", "email"],
      key: "email",
      width: 250,
    },
    {
      title: "Điện thoai",
      dataIndex: ["customerInfo", "phone"],
      key: "phone",
      width: 150,
    },
    {
      title: "Thời gian lưu trú",
      key: "time",
      width: 250,
      render: (_: any, record: any) => {
        const checkin = format(new Date(record.checkin_date), "dd/MM/yyyy");
        const checkout = format(new Date(record.checkout_date), "dd/MM/yyyy");
        return `${checkin} - ${checkout}`;
      },
    },    
    {
      title: "Số phòng",
      dataIndex: ["room_selection", "totalRooms"],
      key: "totalRooms",
      width: 100,
    },
    {
      title: "Số khách",
      key: "guest",
      width: 100,
      render: (_: any, record: any) => {
        return record.no_adult + record.no_children;
      },
    }, 
    {
      title: "Tổng chi phí",
      dataIndex: ["totalPrice"],
      key: "totalPrice",
      width: 200,
      render: (totalPrice: number) => `${totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (text: any, record: any) => {
        const status = statusTags
          .filter(tag => tag.id === Number(record.status))
          .map(tag => 
            <Tag color={tag.color} key={tag.id}>{tag.text}</Tag>
          );
        return <>{status}</>;
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
        <Collapse.Panel header="HÓA ĐƠN ĐẶT PHÒNG" key="1">
          <Table
            dataSource={listBookingHotel}
            columns={columns}
            bordered
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1500 }}
          />
        </Collapse.Panel>
        <Collapse.Panel header="HÓA ĐƠN THUÊ XE" key="2">
          {/* <Table
            dataSource={filteredBookings}
            columns={columns}
            bordered
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1500 }}
          /> */}
        </Collapse.Panel>
        <Collapse.Panel header="HÓA ĐƠN ĐẶT TOUR/VÉ THAM QUAN" key="3">
          {/* <Table
            dataSource={filteredBookings}
            columns={columns}
            bordered
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1500 }}
          /> */}
        </Collapse.Panel>
      </Collapse>
    </Modal>
  );
};

export default UserBookingsModal;
