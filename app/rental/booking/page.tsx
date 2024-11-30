"use client";

import { vehicles } from "@/data/fakeData";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import BookingSteps from "./BookingStep";
import ConfirmBooking from "@/app/rental/booking/ConfirmBooking";
import BookingForm from "./BookingForm";

export type BookingParams = {
  url: string;
  id: string;
  facilityId: string;
  pickupDate: string;
  pickupLocation: string;
  returnDate: string;
  returnLocation: string;
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

  const params: BookingParams = {
    url: windowLoaded ? window.location.href : "",
    id: searchParams.get("id") || "",
    facilityId: searchParams.get("facility") || "",
    pickupDate: searchParams.get("pickup") || "",
    pickupLocation: searchParams.get("location") || "",
    returnDate: searchParams.get("return") || "",
    returnLocation: searchParams.get("location") || "",
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
              <div className="my-4 text-sm">
                <div className="pb-4">
                  <p className="font-bold">Ngày bắt đầu</p>
                  <p>{formatDate(params.pickupDate)}</p>
                </div>
                <div className="pb-4">
                  <p className="font-bold">Điểm nhận xe</p>
                  <p>{params.pickupLocation}</p>
                </div>
                <div className="pt-4">
                  <p className="font-bold">Ngày kết thúc</p>
                  <p>{formatDate(params.returnDate)}</p>
                </div>
                <div className="pt-4">
                  <p className="font-bold">Điểm trả xe</p>
                  <p>{params.returnLocation}</p>
                </div>
              </div>
              { step === 2 && (
                <span className="text-blue-500 mt-4" onClick={handleGoBack}>
                  Đổi lựa chọn của bạn
                </span>
              )}
            </div>
            <div className="p-4 bg-white border rounded-lg">
              <h3 className="text-lg font-bold mb-4">Chi tiết giá cả</h3>
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Phí thuê xe</span>
                  <span className="text-gray-700">
                    {rentalFacility?.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Dịch vụ khác</span>
                  <span className="text-gray-700">0 ₫</span>
                </div>

                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span className="text-gray-700">Giá cho 4 ngày</span>
                  <span className="text-gray-700">
                    {((rentalFacility?.price || 0) + 0)
                      .toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          {step === 2 ? (
            <BookingForm
              params={params}
              step={step}
              setStep={setStep}
            />
          ) : step === 3 ? (
            <ConfirmBooking />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookingVehicle;
