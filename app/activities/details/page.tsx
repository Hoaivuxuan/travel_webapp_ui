"use client";

import React, { useState, useEffect } from "react";
import { Descriptions, Table, message } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import listCountries from "@/data/SelectCountry.json";
import { TicketService } from "@/services/TourService";

const BookingDetails: React.FC = () => {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [ticketDetails, setTicketDetails] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const detailsParams = useSearchParams();
  const bookingId = detailsParams.get("id");

  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    if (!bearerToken) return;

    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const data = (await TicketService.getBookingByUser(bookingId)).data
          .bookingTicketResponses[0];
        console.log("check data:", data);
        const detailsTicket = [
          {
            nameTour: data.tour.tour_name,
            nameTicket: data.buyed_ticket[0].ticket_class,
            count: data.buyed_ticket[0].quantity,
            price: data.total_price * 1.1,
          },
        ];
        setTicketDetails(detailsTicket);
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

  const columns = [
    {
      title: "Tên tour",
      dataIndex: "nameTour",
      key: "nameTour",
    },
    {
      title: "Tên vé",
      dataIndex: "nameTicket",
      key: "nameTicket",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Tổng giá (VNĐ)",
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
          {bookingDetails.customer?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {bookingDetails.customer?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Điện thoại" span={3}>
          {bookingDetails.customer?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Quốc gia" span={3}>
          {bookingDetails.customer?.country}
        </Descriptions.Item>
      </Descriptions>

      <h2 className="text-xl font-semibold mt-6">Chi tiết vé</h2>
      <Table
        dataSource={ticketDetails}
        columns={columns}
        size="middle"
        rowKey="name"
        pagination={false}
      />

      <div className="mt-6">
        <p className="text-lg font-bold mt-2">
          Tổng giá: {(bookingDetails.total_price * 1.1).toLocaleString("vi-VN")}{" "}
          VNĐ
        </p>
      </div>
    </div>
  );
};

export default BookingDetails;
