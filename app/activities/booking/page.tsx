"use client";

import { useState, useEffect } from "react";
// import { ratingLabel } from "@/data/typeActivity";
import { useRouter, useSearchParams } from "next/navigation";
import BookingSteps from "./BookingStep";
import BookingForm from "./BookingForm";
import ConfirmBooking from "./ConfirmBooking";
import { decodeToJWT } from "@/utils/JWT";
import { format } from "date-fns";

export type BookingParams = {
  url: string;
  ticket: any;
};

const formatDate = (date: string): string => {
  const dateString = format(date, "yyyy-MM-dd");
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

const BookingActivity = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const [step, setStep] = useState(2);
  const [windowLoaded, setWindowLoaded] = useState(false);

  const searchParams = useSearchParams();
  const params: any = {
    url: windowLoaded ? window.location.href : "",
    bookingTicket: decodeToJWT(searchParams.get("bookingTicket") || ""),
  };
  const paramsBookingTicket = {
    user: params.bookingTicket.id,
    full_name: params.bookingTicket.full_name,
    email: params.bookingTicket.email,
    phone: params.bookingTicket.phone_number,
    country: params.bookingTicket.country,
    booked_tickets_detail: JSON.parse(
      params.bookingTicket.booked_tickets_detail
    ),
    booked_tickets: JSON.parse(params.bookingTicket.booked_tickets),
  };

  useEffect(() => {
    setWindowLoaded(true);
    console.log("check paramsBookingTicket:", paramsBookingTicket);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <BookingSteps step={step} />
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-white border rounded-lg">
            <div className="mb-4">
              {/* <p className="text-sm text-gray-500">{paramsBookingTicket.type}</p>
              <h3 className="text-lg font-bold">{paramsBookingTicket.type}</h3>
              <p className="text-sm text-gray-500">{paramsBookingTicket.type}</p> */}
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <p className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-600 rounded-lg">
                {/* {paramsBookingTicket.reviews.average_rating.toFixed(1) || "N/A"} */}
              </p>
              <div>
                <p className="text-blue-600 text-sm font-bold">
                  {/* {ratingLabel.find(
                    (r) => paramsBookingTicket.reviews.average_rating >= r.min
                  )?.label || "Đánh giá"} */}
                </p>
                <p className="text-xs">
                  {/* {paramsBookingTicket.reviews.total_reviews} lượt đánh giá */}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-bold mb-4">Chi tiết đặt vé của bạn</h3>
            <div className="grid grid-cols-2 mt-4"></div>
            <hr className="my-4 border-t-2 border-gray-200" />
            <div className="mt-4">
              <p className="font-bold">Bạn đã chọn:</p>
              <p className="font-bold text-sm my-2">
                <div className="border p-4 rounded-lg shadow">
                  <h3 className="text-lg font-bold">
                    {paramsBookingTicket.booked_tickets_detail.name}
                  </h3>
                  <p className="text-gray-700 mt-2">
                    <span className="font-bold">
                      {new Intl.NumberFormat("vi-VN").format(
                        Number(paramsBookingTicket.booked_tickets_detail.price)
                      )}{" "}
                      VND
                    </span>
                  </p>
                </div>
              </p>
            </div>
            <span
              className="text-sm text-blue-500 mt-4 underline hover:no-underline cursor-pointer"
              onClick={handleGoBack}
            >
              Đổi lựa chọn của bạn
            </span>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <div className="grid grid-cols-3 gap-2 text-sm my-2">
              <p className="col-span-2 font-bold">Loại vé:</p>
              <span>{paramsBookingTicket.booked_tickets_detail.name}</span>
              <p className="col-span-2 font-bold">Giá vé:</p>
              <span>
                {new Intl.NumberFormat("vi-VN").format(
                  Number(paramsBookingTicket.booked_tickets_detail.price)
                )}{" "}
                VND
              </span>
              <p className="col-span-2 font-bold"> Số lượng:</p>
              <span>{paramsBookingTicket.booked_tickets[0].quantity} vé</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm my-2">
              <p className="col-span-2 font-bold">Thuế và phí(VAT 10%):</p>
              <span>
                {new Intl.NumberFormat("vi-VN").format(
                  Number(paramsBookingTicket.booked_tickets_detail.price) *
                    Number(paramsBookingTicket.booked_tickets[0].quantity) *
                    0.1
                )}{" "}
                VND
              </span>
            </div>
            <hr className="my-1 border border-gray-200" />
            <div className="grid grid-cols-3 gap-2 text-sm my-2">
              <p className="col-span-2 font-bold">Tổng cộng</p>
              <span>
                {new Intl.NumberFormat("vi-VN").format(
                  Number(paramsBookingTicket.booked_tickets_detail.price) *
                    Number(paramsBookingTicket.booked_tickets[0].quantity) *
                    1.1
                )}{" "}
                VND
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          {step === 2 ? (
            <BookingForm
              paramsBookingTicket={paramsBookingTicket}
              step={step}
              setStep={setStep}
            />
          ) : step === 3 ? (
            <ConfirmBooking ticket={paramsBookingTicket.user} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookingActivity;
