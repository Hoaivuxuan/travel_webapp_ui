"use client";

import React, { useState, useEffect } from "react";
import { Collapse, Table, Button, Space, Tag, message, Menu, Dropdown } from "antd";
import { AiOutlineBars, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { statusTags } from "@/data/defaultValues";
import { format } from "date-fns";
import BookingDetailsModal from "./BookingHotelDetails";

const BookingHotelPage: React.FC = () => {
  const [listBookingHotel, setListBookingHotel] = useState<any | null>();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const bearerToken = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/bookingRoom/user/${userId}`, {
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
        // const bookingHotelData = data.bookingRoom.map((item: any, index: number) => ({
        //   id: item.id,
        //   hotel: item.hotel,
        //   customer: item.customerInfo,
        //   checkin: item.checkin_date,
        //   checkout: item.checkout_date,
        //   roomSelection: item.room_selection,
        //   totalPrice: item.totalPrice,
        //   noAdults: item.adults,
        //   noChildren: item.children,
        // }));
        setListBookingHotel(data.bookingRoom);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error("Failed to fetch bookings. Please try again.");
      }
    };
  
    fetchData();
  }, [listBookingHotel, userId]);

  const userMenu = (record: any) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleViewDetails(record)}>
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
        return record.no_adult + (record.no_children || 0);
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
          .filter(tag => tag.id === 0)
          .map(tag => 
            <Tag color={tag.color} key={tag.id}>{tag.text}</Tag>
          );
        return <>{status}</>;
      },
    },
  ];

  const handleViewDetails = (record: any) => {
    setSelectedBooking(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedBooking(null);
    setIsModalVisible(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Collapse
        bordered
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        accordion
      >
        <Collapse.Panel header="HÓA ĐƠN ĐẶT PHÒNG" key="1">
          <Table
            bordered
            dataSource={listBookingHotel}
            columns={columns}
            rowClassName="editable-row"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1500 }}
          />
        </Collapse.Panel>
        <Collapse.Panel header="HÓA ĐƠN THUÊ XE" key="2">
          {/* Add corresponding data and columns for rental invoices */}
        </Collapse.Panel>
        <Collapse.Panel header="HÓA ĐƠN ĐẶT TOUR/VÉ THAM QUAN" key="3">
          {/* Add corresponding data and columns for tour invoices */}
        </Collapse.Panel>
      </Collapse>
      <BookingDetailsModal
        booking={selectedBooking}
        visible={isModalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default BookingHotelPage;
