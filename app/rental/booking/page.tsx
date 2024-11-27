"use client";

import { vehicles } from "@/data/fakeData";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import countries from "@/data/listCountry.json";
import BookingSteps from "./BookingStep";
import { Input, Select } from "antd";

export type BookingParams = {
  url: string;
  id: string;
  facilityId: string;
  location: string;
  checkin: string;
  checkout: string;
};

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-").map(Number);
  return `${day} tháng ${month}, ${year}`;
};

const BookingVehicle = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(2);
  const [windowLoaded, setWindowLoaded] = useState(false);
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  
  useEffect(() => {
    setWindowLoaded(true);
  }, []);

  const introduction = [
    "Đánh giá của khách hàng: 8,6 / 10",
    "Chính sách nhiên liệu phổ biến nhất",
    "Không phải chờ đợi lâu",
    "Quầy thanh toán dễ tìm",
    "Nhân viên quầy thanh toán sẵn sàng hỗ trợ",
    "Hủy đặt thuê miễn phí",
  ];

  const params: BookingParams = {
    url: windowLoaded ? window.location.href : "",
    id: searchParams.get("id") || "",
    facilityId: searchParams.get("facility") || "",
    location: searchParams.get("location") || "",
    checkin: searchParams.get("checkin") || "",
    checkout: searchParams.get("checkout") || "",
  };

  const item = vehicles.find((vehicle) => vehicle.id === Number(params.id));
  if (!item) return null;
  const rentalFacility = item.rentalFacility.find((facility) => facility.id === Number(params.facilityId)) || undefined;

  return (
    <div className="p-6 !pt-2 mx-auto max-w-7xl ">
      <BookingSteps step={step} />
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-1">
          <div className="space-y-4">
            <div className="p-4 bg-white border rounded-lg">
              <div>
                <div className="pb-4">
                  <h1 className="text-2xl font-bold">{item.model}</h1>
                  <p className="text-gray-500 text-sm">
                    Cung cấp bởi Mioto Ho Chi Minh City
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border rounded-lg">
              <h3 className="text-lg font-bold mb-4">Nhận xe và trả xe</h3>
              <div className="grid grid-cols-2 my-4">
                <div className="pr-4 border-r border-blue-200">
                  <p className="font-bold">Nhận phòng</p>
                  <p>{formatDate(params.checkin)}</p>
                </div>
                <div className="pl-4 border-l border-blue-200">
                  <p className="font-bold">Trả phòng</p>
                  <p>{formatDate(params.checkout)}</p>
                </div>
              </div>
              <span className="text-blue-500 mt-4" onClick={handleGoBack}>
                Đổi lựa chọn của bạn
              </span>
            </div>
            <div className="p-4 bg-white border rounded-lg">
              <h3 className="text-lg font-bold mb-4">Chi tiết giá cả</h3>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Phí thuê xe</span>
                  <span className="text-gray-700">{rentalFacility?.price} ₫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Dịch vụ khác</span>
                  <span className="text-gray-700">0 ₫</span>
                </div>

                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span className="text-gray-700">Giá cho 4 ngày</span>
                  <span className="text-gray-700">
                    {(rentalFacility?.price || 0) + 0} ₫
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border rounded-lg">
              <h3 className="text-lg font-bold mb-4">Lựa chọn tuyệt vời!</h3>
              <div>
                {introduction.map((text, index) => (
                  <div className="flex items-start space-x-2" key={index}>
                    <span className="text-green-600">✔</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">
              Thông tin người lái xe chính
            </h3>
            <div className="mb-4">Theo đúng những gì được ghi trên bằng lái</div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block mb-1">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    required
                  />
                  <label className="block ml-1 mt-2 text-sm text-gray-500">
                    Để chúng tôi có thể gửi email xác nhận và voucher
                  </label>
                </div>
                <div>
                  <label className="block mb-1">Họ</label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="ví dụ: Nguyễn"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Tên</label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="ví dụ: Văn A"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Điện thoại liên lạc</label>
                  <Input
                    type="tel"
                    name="phone"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Quốc gia cư trú</label>
                  <Select
                    className="w-full"
                    placeholder="Chọn quốc gia"
                  >
                    {countries.map((country) => (
                      <Select.Option key={country.code} value={country.code}>
                        {country.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingVehicle;
