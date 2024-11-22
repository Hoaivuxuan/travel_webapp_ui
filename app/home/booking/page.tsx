"use client";

import { useState, useEffect } from "react";
import { listHotels, ratingLabel } from "@/data/typeHotel";
import NotFound from "@/components/NotFound";
import { useRouter, useSearchParams } from "next/navigation";
import BookingSteps from "@/app/home/booking/BookingStep";
import BookingForm from "./BookingForm";
import ConfirmBooking from "./ConfirmBooking";

export type BookingParams = {
  url: string;
  id: string;
  checkin: string;
  checkout: string;
  adults: string;
  children: string;
  rooms: string;
  roomSelection: any | null;
};

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-").map(Number);
  return `${day} tháng ${month}, ${year}`;
};

const calculateNights = (s1: string, s2: string): number => {
  const date1 = new Date(s1);
  const date2 = new Date(s2);
  const diffInMilliseconds = date2.getTime() - date1.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.max(diffInDays, 0);
};

const BookingHotel = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const [step, setStep] = useState(2);
  const [windowLoaded, setWindowLoaded] = useState(false);
  
  useEffect(() => {
    setWindowLoaded(true);
  }, []);

  const searchParams = useSearchParams();

  const params: BookingParams = {
    url: windowLoaded ? window.location.href : "",
    id: searchParams.get("id") || "",
    checkin: searchParams.get("checkin") || "",
    checkout: searchParams.get("checkout") || "",
    adults: searchParams.get("adults") || "0",
    children: searchParams.get("children") || "0",
    rooms: searchParams.get("rooms") || "0",
    roomSelection: JSON.parse(decodeURIComponent(searchParams.get("roomSelection") || "") || ""),
  };

  const hotel = listHotels.find((item) => item.id === Number(params.id)) || undefined;

  if (!hotel) return <NotFound />;

  return (
    <div className="container mx-auto p-6">
      <BookingSteps step={step} />

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-white border rounded-lg">
            <div className="mb-4">
              <p className="text-sm text-gray-500">{hotel.type}</p>
              <h3 className="text-lg font-bold">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.address}</p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <p className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-600 rounded-lg">
                {hotel.reviews.average_rating.toFixed(1) || "N/A"}
              </p>
              <div>
                <p className="text-blue-600 text-sm font-bold">
                  {ratingLabel.find((r) => hotel.reviews.average_rating >= r.min)?.label || "Đánh giá"}
                </p>
                <p className="text-xs">{hotel.reviews.total_reviews} lượt đánh giá</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-bold mb-4">Chi tiết đặt phòng của bạn</h3>
            <div className="grid grid-cols-2 mt-4">
              <div className="pr-4 border-r border-blue-200">
                <p className="font-bold">Nhận phòng</p>
                <p>{formatDate(params.checkin)}</p>
              </div>
              <div className="pl-4 border-l border-blue-200">
                <p className="font-bold">Trả phòng</p>
                <p>{formatDate(params.checkout)}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold">Tổng thời gian lưu trú:</p>
              <p>{`${calculateNights(params.checkin, params.checkout)} đêm`}</p>
            </div>
            <hr className="my-4 border-t-2 border-gray-200" />
            <div className="mt-4">
              <p className="font-bold">Bạn đã chọn:</p>
              <p className="font-bold my-2">
                {`${params.roomSelection.totalRooms} phòng cho ${params.adults} người lớn, ${params.children} trẻ em`}
              </p>
              <div className="py-2">
                {params?.roomSelection?.selectedRooms?.map((room: any, index: any) => (
                  <div key={index} className="flex justify-between">
                    <span>{room.count} x {room.type}</span>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-blue-500 mt-2" onClick={handleGoBack}>
              Đổi lựa chọn của bạn
            </span>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-bold mb-4">Tóm tắt giá</h3>
            <div className="grid grid-cols-3 gap-2 my-2">
              <p className="col-span-2 font-bold">Giá phòng</p>
              <p>
                {`${params.roomSelection.totalPrice.toLocaleString("vi-VN")} VND`}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 my-2">
              <p className="col-span-2 font-bold">Thuế và phí</p>
              <p>
                {`${params.roomSelection.totalPrice.toLocaleString("vi-VN")} VND`}
              </p>
            </div>
            <hr className="my-1 border border-gray-200" />
            <div className="grid grid-cols-3 gap-2 my-2">
              <p className="col-span-2 font-bold">Tổng cộng</p>
              <p>
                {`${params.roomSelection.totalPrice.toLocaleString("vi-VN")} VND`}
              </p>
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
            <ConfirmBooking id={hotel.id}/>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookingHotel;
