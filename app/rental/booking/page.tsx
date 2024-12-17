"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import BookingSteps from "./BookingStep";
import ConfirmBooking from "@/app/rental/booking/ConfirmBooking";
import BookingForm from "./BookingForm";
import { decodeToJWT } from "@/utils/JWT";

export type BookingParams = {
  vehicle: any;
  facility: any;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  bonusServices: any;
  totalServiceCost: number;
  noDriver: number;
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

  const rentalVehicle = decodeToJWT(searchParams.get("rental") || "");
  const params: BookingParams = {
    vehicle: rentalVehicle?.vehicle,
    facility: rentalVehicle?.facility,
    pickupLocation: rentalVehicle?.booking?.pickup.location,
    returnLocation: rentalVehicle?.booking?.return.location,
    pickupDate: rentalVehicle?.booking?.pickup.date,
    returnDate: rentalVehicle?.booking?.return.date,
    bonusServices: rentalVehicle?.booking.bonusServices,
    totalServiceCost: rentalVehicle?.booking.totalServiceCost,
    noDriver: rentalVehicle?.booking.noDriver,
  };

  useEffect(() => {
    setWindowLoaded(true);
  }, []);

  return (
    <div className="p-6 !pt-2 mx-auto max-w-7xl ">
      <BookingSteps step={step} />
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-1">
          <div className="space-y-4">
            <div className="p-4 bg-white border rounded-lg">
              <div>
                <div className="pb-2">
                  <div className="mb-2">
                    <p className="text-xs text-green-600 bg-green-200 rounded-sm mb-2 px-2 py-1 inline-block">
                      {params?.vehicle?.details.brand}
                    </p>
                    <p className="text-xl font-semibold">{params?.vehicle?.model}</p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Cung cấp bởi {params?.facility?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border rounded-lg">
              <h3 className="text-lg font-bold mb-4">Nhận xe và trả xe</h3>
              <div className="my-4 text-sm">
                <div className="pb-4">
                  <p className="font-bold">Ngày bắt đầu</p>
                  <p>{formatDate(params?.pickupDate)}</p>
                </div>
                <div className="pb-4">
                  <p className="font-bold">Điểm nhận xe</p>
                  <p>{params?.pickupLocation}</p>
                </div>
                <div className="pt-4">
                  <p className="font-bold">Ngày kết thúc</p>
                  <p>{formatDate(params.returnDate)}</p>
                </div>
                <div className="pt-4">
                  <p className="font-bold">Điểm trả xe</p>
                  <p>{params?.returnLocation}</p>
                </div>
              </div>
              <span 
                className="text-sm text-blue-500 mt-4 underline hover:no-underline cursor-pointer" 
                onClick={handleGoBack}
              >
                Đổi lựa chọn của bạn
              </span>
            </div>
            <div className="p-4 bg-white border rounded-lg">
              <h3 className="text-lg font-bold mb-4">Chi tiết giá cả</h3>
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Phí thuê xe</span>
                  <span className="text-gray-700">
                    {params?.facility?.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Dịch vụ khác</span>
                  <span className="text-gray-700">
                    {params?.totalServiceCost.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                  </span>
                </div>

                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span className="text-gray-700">Giá cho 4 ngày</span>
                  <span className="text-gray-700">
                    {((params?.facility?.price + params?.totalServiceCost) || 0)
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
