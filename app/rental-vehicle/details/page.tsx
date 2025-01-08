"use client";

import React, { useEffect, useState } from "react";
import { Descriptions, Table, message } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { BookingVehicleService } from "@/services/BookingService";
import listCountries from "@/data/SelectCountry.json";

const BookingVehicleDetails: React.FC = () => {
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const detailsParams = useSearchParams();
  const bookingId = detailsParams.get("id");

  useEffect(() => {
    const fetchBookingVehicleDetails = async () => {
      try {
        setLoading(true);
        const data = (await BookingVehicleService.getDetails(bookingId)).data;
        setBookingDetails(data);
      } catch (error: any) {
        message.error("Lỗi khi tải thông tin đặt xe.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingVehicleDetails();
    }
  }, [bookingId]);

  if (!bookingDetails) {
    return <div>Không tìm thấy thông tin đặt xe.</div>;
  }
  
  if (loading) {
    return <div>Đang tải thông tin đặt xe...</div>;
  }

  const {
    customerInfo,
    driverInfo,
    vehicle,
    facility,
    pickup: pickupInfo,
    return: returnInfo,
    services,
    total_price
  } = bookingDetails;

  const serviceColumns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
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

  const driverColumns = [
    {
      title: "Lái xe",
      key: "fullName",
      render: (_: any, record: any) => {
        return `${record.title} ${record.fullName}`;
      },
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="pb-4">
        <a
          href="/rental-vehicle"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150"
        >
          Quay lại trang chính
        </a>
      </div>
      <h1 className="text-2xl font-bold mb-4">Chi tiết đặt xe</h1>
      <div className="flex items-start space-x-2">
        <Descriptions bordered size="middle" className="w-1/3">
          <Descriptions.Item label="Khách hàng" span={3}>
            {customerInfo?.fullName || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {customerInfo?.email || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={3}>
            {customerInfo?.phone || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Quốc gia" span={3}>
            {listCountries.find((country) => country.code === customerInfo?.country)?.name || "N/A"}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered column={2} size="middle" className="w-2/3">
          <Descriptions.Item label="Phương tiện" span={2}>
            <div className="flex items-center">
              <p className="mr-2 text-xs text-green-600 bg-green-200 rounded-sm px-2 py-1 inline-block">
                {vehicle?.brand}
              </p>
              {vehicle?.name}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Cơ sở thuê" span={2}>
            {facility?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Điểm nhận xe">
            {pickupInfo?.name || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày nhận xe">
            {pickupInfo?.date || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Điểm trả xe">
            {returnInfo?.name || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày trả xe">
            {returnInfo?.date || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mt-6">Dịch vụ bổ sung</h2>
          <Table
            dataSource={services?.bonusServices || []}
            columns={serviceColumns}
            size="middle"
            rowKey="name"
            pagination={false}
            bordered
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mt-6">Thông tin tài xế</h2>
          <ul className="pl-4">
            {driverInfo?.listDrivers?.map((driver: any, index: number) => (
              <li key={index}>
                {index + 1}. {driver.title} {driver.fullName} - {driver.phone}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-lg font-bold">Tổng giá thuê xe: {total_price?.toLocaleString("vi-VN")} VNĐ</p>
        <p className="text-lg font-bold">Phí dịch vụ: {services?.totalServices?.toLocaleString("vi-VN")} VNĐ</p>
      </div>
    </div>
  );
};

export default BookingVehicleDetails;
