"use client";

import React, { useState } from "react";
import { Table, Button, Space, Tag } from "antd";
import { bookingHotel } from "@/data/fakeData";
import { AiOutlineEye } from "react-icons/ai";
import { statusTags } from "@/data/defaultValues";
import { format } from "date-fns";
import BookingDetailsModal from "./BookingHotelDetails";

const BookingHotelPage: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = localStorage.getItem("userId")
  const filteredData = bookingHotel.filter((item) => item.user === Number(userId));

  const columns = [
    {
      title: "",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            icon={<AiOutlineEye className="text-lg" />}
            onClick={() => handleViewDetails(record)}
          />
        </Space>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "Email",
      dataIndex: ["customerInfo", "email"],
      key: "email",
      width: 250,
    },
    {
      title: "Phone",
      dataIndex: ["customerInfo", "phone"],
      key: "phone",
      width: 150,
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
      render: (text: any, record: any) => {
        const status = statusTags
          .filter(tag => tag.id === record.status)
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
      <Table
        bordered
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1500 }}
      />
      <BookingDetailsModal
        booking={selectedBooking}
        visible={isModalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default BookingHotelPage;
