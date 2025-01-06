"use client";

import React, { useState, useEffect } from "react";
import { Descriptions, Table, message } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { BookingHotelService } from "@/services/BookingService";
import listCountries from "@/data/SelectCountry.json"

const BookingDetails: React.FC = () => {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const detailsParams = useSearchParams();
  const bookingId = detailsParams.get("id");

  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    if(!bearerToken) return;

    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const data = (await BookingHotelService.getDetails(bookingId)).data;
        setBookingDetails(data);
      } catch (error: any) {
        message.error("Lỗi khi tải thông tin đơn hàng.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!bookingDetails) {
    return <div>Không tìm thấy thông tin đơn hàng.</div>;
  }

  if (loading) {
    return <div>Đang tải thông tin đơn hàng...</div>;
  }

  const {
    customerInfo,
    hotel,
    checkin_date,
    checkout_date,
    no_adult,
    no_children,
    room_selection,
    totalPrice,
  } = bookingDetails;

  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại phòng",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Giá (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (price: number) => price.toLocaleString("vi-VN"),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="pb-4">
        <a
          href="/booking-hotel"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-gray-400 transition duration-150"
        >
          Quay lại trang chính
        </a>
      </div>
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
      <Descriptions bordered size="middle">
        <Descriptions.Item label="Họ tên" span={3}>
          {customerInfo?.fullname}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {customerInfo?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Điện thoại" span={3}>
          {customerInfo?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Quốc gia" span={3}>
          {listCountries.find((country) => country.code === customerInfo.country)?.name || ""}
        </Descriptions.Item>
        <Descriptions.Item label="Khách sạn">
          {hotel.hotel_name}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày nhận phòng">
          {checkin_date}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày trả phòng">
          {checkout_date}
        </Descriptions.Item>
        <Descriptions.Item label="Người lớn">
          {no_adult}
        </Descriptions.Item>
        <Descriptions.Item label="Trẻ em">
          {no_children}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng số phòng">
          {room_selection?.totalRooms}
        </Descriptions.Item>
      </Descriptions>

      <h2 className="text-xl font-semibold mt-6">Chi tiết phòng</h2>
      <Table
        dataSource={room_selection?.selected_rooms}
        columns={columns}
        size="middle"
        rowKey="name"
        pagination={false}
      />

      <div className="mt-6">
        <p className="text-lg font-bold mt-2">
          Tổng giá: {totalPrice?.toLocaleString("vi-VN")} VNĐ
        </p>
      </div>
    </div>
  );
};

export default BookingDetails;
