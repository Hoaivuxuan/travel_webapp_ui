"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import { Table, Space, Button, Menu, Dropdown } from "antd";
import { AiOutlineBars, AiOutlineEye } from "react-icons/ai";
import HotelDetailsModal from "./HotelDetails";

export default function UserAdmin() {
  const [listHotel, setListHotel] = useState<any>([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isHotelDetailsVisible, setIsHotelDetailsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:8080/hotels?noRooms=0&keyword=");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setListHotel(data.hotels);
        localStorage.setItem("listBookingHotel", JSON.stringify(listHotel));
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [listHotel]);

  const handleViewDetails = (record: any) => {
    setSelectedHotel(record);
    setIsHotelDetailsVisible(true);
  };

  const handleHotelDetailsModalClose = () => {
    setSelectedHotel(null);
    setIsHotelDetailsVisible(false);
  };

  const hotelMenu = (record: any) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleViewDetails(record)}>
        <div className="flex items-center">
          <AiOutlineEye className="mr-2" /> Xem chi tiết
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="flex items-center">
          <AiOutlineBars className="mr-2" /> Lịch sử đặt phòng
        </div>
      </Menu.Item>
    </Menu>
  );

  const hotelColumns = [
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, record: any) => (
        <Space className="flex items-center justify-center">
          <Dropdown overlay={hotelMenu(record)} trigger={['click']}>
            <Button type="link" icon={<AiOutlineBars className="text-lg" />} />
          </Dropdown>
        </Space>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
      render: (id: number) => id.toString().padStart(6, "0"),
    },
    {
      title: "Hotel Name",
      dataIndex: "hotel_name",
      key: "hotel_name",
      render: (_: any, record: any) => (
        <a href={record.website} target="_blank" rel="noopener noreferrer">
          {record.hotel_name}
        </a>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "City",
      dataIndex: ["city", "name"],
      key: "city",
    },
    {
      title: "Total Reviews",
      dataIndex: ["reviews", "total_reviews"],
      key: "total_reviews",
    },
    {
      title: "Average Rating",
      dataIndex: ["reviews", "average_rating"],
      key: "average_rating",
    },
  ];

  return (
    <main className="h-screen">
      <section className="p-6 bg-white rounded-t-lg">
        <h3 className="mb-2 text-xl font-bold">Hệ thống nơi lưu trú</h3>
        <Table
          bordered
          dataSource={listHotel}
          columns={hotelColumns}
          rowClassName="editable-row"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }}
        />
      </section>
      <HotelDetailsModal
        hotel={selectedHotel}
        visible={isHotelDetailsVisible}
        onClose={handleHotelDetailsModalClose}
      />
    </main>
  );
}
