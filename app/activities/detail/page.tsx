"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Table, Select, Button } from "antd";
import {
  useParams,
  notFound,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { encodeToJWT, decodeToJWT } from "@/utils/JWT";
import Image from "next/image";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const ActivitiesDetailPage = () => {
  const router = useRouter();
  const detailsParams = useSearchParams();
  const activityToken = detailsParams.get("token");
  const activityItem = decodeToJWT(activityToken || "");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTime, setSelectedTime] = useState("16:10");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [directionsUrl, setDirectionsUrl] = useState("");
  const [dateRange, setDateRange] = useState<dayjs.Dayjs | null>(null);
  const [bookingTickets, setBookingTickets] = useState<
    { ticket_class_id: number; quantity: number }[]
  >([]);

  const reviewBreakdown = Object.values({
    star_1: activityItem.review.review_breakdown["1_star"],
    star_2: activityItem.review.review_breakdown["2_star"],
    star_3: activityItem.review.review_breakdown["3_star"],
    star_4: activityItem.review.review_breakdown["4_star"],
    star_5: activityItem.review.review_breakdown["5_star"],
  }) as number[];

  if (!activityItem) return notFound();
  const activityAddress = encodeURIComponent(`${activityItem.address}`);
  //
  useEffect(() => {
    console.log("check activityItem:", activityItem);
  }, [dateRange]);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const handleDateChange = (dates: dayjs.Dayjs | null) => {
    if (dates) {
      console.log("check dates:", dates?.toDate() ?? today);
      setDateRange(dates);
      const formattedDate = dates.format("YYYY-MM-DD");
      const dailyTickets =
        activityItem.tour_schedule_responses[0]?.dailyTicketAvailabilities ||
        [];
      const filteredTickets = dailyTickets.filter(
        (ticket: any) => ticket.happen_date === formattedDate
      );
      setFilteredTickets(filteredTickets);
      setBookingTickets([]);
      console.log("check filteredTickets:", filteredTickets);
    }
  };

  const handleTicketSelect = (ticket_class_id: number, quantity: number) => {
    const updatedSelection = [{ ticket_class_id, quantity }];
    console.log("check ticket_class_id:", ticket_class_id);
    setBookingTickets(updatedSelection);
    console.log("check updatedSelection:", updatedSelection);
  };

  const handleBookingClick = async (ticket: any) => {
    console.log("check ticket:", ticket);
    if (selectedTicketId === ticket.id) {
      setSelectedTicketId(null);
    } else {
      setSelectedTicketId(ticket.id);
    }
    //
    if (ticket.id == bookingTickets[0]?.ticket_class_id) {
      let userData: string | null = localStorage.getItem("user");
      if (!userData) {
        console.error("User data not found in localStorage.");
        return;
      }
      const parsedUserData = JSON.parse(userData);
      const bookingTicket = {
        user: parsedUserData.id,
        full_name: `${parsedUserData.first_name} ${parsedUserData.last_name}`,
        email: parsedUserData.email,
        phone: parsedUserData.phone_number,
        country: parsedUserData.country,
        booked_tickets_detail: JSON.stringify(ticket),
        booked_tickets: JSON.stringify(bookingTickets),
      };

      const query: any = new URLSearchParams({
        bookingTicket: encodeToJWT(bookingTicket),
      });
      console.log("check userData:", userData);
      console.log("check bookingTicket:", bookingTicket);
      router.push(`/activities/booking?url=1&${query.toString()}`);
    }
  };

  return (
    <div className="pb-6">
      <div className="p-6 !pb-3 mx-auto max-w-7xl">
        <a
          href="#"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400 transition duration-150"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Quay lại trang trước
        </a>
      </div>
      <div className="p-6 mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mt-2">{activityItem.name}</h1>
        <p className="text-blue-600 mt-1">Bán chạy #1 ở {activityItem.city}</p>

        <div className="flex mt-6">
          <div className="w-2/3">
            <Image
              src={activityItem.images[0].url}
              alt="Water Puppet Show"
              width={800}
              height={600}
              className="w-full rounded"
            />
          </div>

          <div className="w-1/3 flex flex-col space-y-2 ml-4">
            <Image
              src={activityItem.images[1].url}
              alt="Thumbnail 1"
              width={800}
              height={600}
              className="w-full rounded"
            />
            <Image
              src={activityItem.images[2].url}
              alt="Thumbnail 2"
              width={800}
              height={600}
              className="w-full rounded"
            />
          </div>
        </div>
        <div className="text-sm col-span-8 bg-white rounded-lg mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow col-span-2">
              <h2 className="text-xl font-semibold">Bạn cần đến nhận vé</h2>
              <p className="mt-4 text-gray-500">
                Vui lòng có mặt ít nhất 15 phút trước khi hoạt động bắt đầu.
              </p>
              <p className="text-gray-700 mt-2">{activityItem.description}</p>
              <h2 className="text-xl font-semibold mt-10 mb-5">
                Đánh giá của khách hàng
              </h2>
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>{activityItem.review.average_rating}⭐ - Tuyệt vời</span>
                <span className="text-sm text-gray-600">Mức độ hài lòng</span>
                <span className="text-sm text-gray-600">Số lượt</span>
              </div>
              <div className="space-y-2 mt-4">
                {[
                  "Lượt đánh giá 1⭐",
                  "Lượt đánh giá 2⭐",
                  "Lượt đánh giá 3⭐",
                  "Lượt đánh giá 4⭐",
                  "Lượt đánh giá 5⭐",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-1/3">{item}</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5 relative">
                      <div
                        className="absolute bg-yellow-500 h-2.5 rounded-full"
                        style={{
                          width: `${[1, 2, 3, 4, 5][index] * 20}%`,
                        }}
                      ></div>
                    </div>
                    <span className="ml-2">{reviewBreakdown[index]}</span>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-semibold mt-10 mb-5">
                Điều khách yêu thích nhất
              </h2>
              <div className="space-y-4">
                {activityItem?.review?.recent_reviews?.map(
                  (review: any, index: any) => (
                    <div key={index} className="p-4 bg-gray-100 rounded shadow">
                      <div className="text-lg font-semibold">
                        {review.rating}⭐
                      </div>
                      <div className="font-bold">{review.user}</div>
                      <p className="text-gray-700">{review.comment}</p>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  )
                )}
              </div>
              {/* Quy định */}
              <h2 className="text-xl font-semibold mt-10 mb-5">Quy định</h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li>
                  Vui lòng có mặt ít nhất 15 phút trước khi hoạt động bắt đầu.
                </li>
              </ul>

              {/* Thông tin thêm */}
              <h2 className="text-xl font-semibold mt-10 mb-5">
                Thông tin thêm
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Không có vé giảm giá cho tour này. Tất cả người tham gia cần
                  phải mua vé.
                </li>
                <li>
                  Vui lòng tuân thủ các hướng dẫn và quy định phòng dịch
                  COVID-19 ở địa phương khi tham gia tour.
                </li>
                <li>Vui lòng mang theo vé đến điểm tham quan.</li>
                <li>
                  Lưu ý rằng nhà cung cấp có thể hủy vì những lý do không biết
                  trước.
                </li>
                <li>Bạn cần phải từ 18 tuổi trở lên để đặt chỗ.</li>
              </ul>
              {/*  */}
              <h2 className="text-xl font-semibold mt-10 mb-5">Vị trí</h2>
              <div
                className="relative group"
                style={{ height: "300px", overflow: "hidden" }}
              >
                <iframe
                  src={`https://www.google.com/maps?q=${activityAddress}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Hotel Location"
                />
                <button className="absolute bottom-4 right-4 bg-blue-600 text-white py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Tìm đường đi
                </button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <h2 className="text-lg font-semibold">
                    Chỉ đường đến khách sạn
                  </h2>
                  <div className="mt-4">
                    <iframe
                      width="600"
                      height="450"
                      src={directionsUrl}
                      frameBorder="0"
                      style={{ border: 0 }}
                      allowFullScreen
                      title="Google Maps Directions"
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Đóng
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
            {/*  */}
            <div className="bg-white p-4 rounded shadow">
              <div className="">
                <h2 className="text-xl font-semibold my-5">Chọn ngày giờ</h2>
                <div className="flex space-x-2 mt-2">
                  <DatePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                    format="DD/MM/YYYY"
                  />
                </div>

                <div className="flex space-x-2 mt-4">
                  {activityItem.tour_schedule_responses.map(
                    (ticket: any, index: any) => (
                      <>
                        <button
                          className={`py-2 px-4 rounded ${selectedTime === `${ticket.start_time}` ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                          onClick={() =>
                            setSelectedTime(`${ticket.start_time}`)
                          }
                        >
                          {ticket.start_time}
                        </button>
                      </>
                    )
                  )}
                </div>
                <h2 className="text-xl font-semibold my-5">Chọn vé</h2>
                {filteredTickets.map((ticket: any, index: any) => (
                  <div key={index} className="border p-4 rounded-lg shadow">
                    <h3 className="text-lg font-bold">{ticket.name}</h3>
                    <p className="text-gray-700 mt-2">
                      Từ{" "}
                      <span className="font-bold">
                        {new Intl.NumberFormat("vi-VN").format(
                          Number(ticket.price)
                        )}{" "}
                        VND
                      </span>
                    </p>
                    <p className="text-gray-700 mt-2">
                      Còn lại{" "}
                      <span className="font-bold">
                        {new Intl.NumberFormat("vi-VN").format(
                          Number(ticket.available_ticket)
                        )}{" "}
                        vé
                      </span>
                    </p>
                    {selectedTicketId === ticket.id && (
                      <>
                        <Select
                          // value={bookingTickets[index].ticket_class_id}
                          onChange={(value: number) =>
                            handleTicketSelect(ticket.id, value)
                          }
                          className="w-1/2 mt-2"
                        >
                          {Array.from(
                            { length: ticket.available_ticket + 1 },
                            (_, i) => (
                              <Select.Option key={i + 1} value={i + 1}>
                                {i + 1}
                              </Select.Option>
                            )
                          )}
                        </Select>
                      </>
                    )}
                    <br></br>
                    <button
                      onClick={() => handleBookingClick(ticket)}
                      className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
                    >
                      Chọn
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDetailPage;
