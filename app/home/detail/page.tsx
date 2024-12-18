"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ratingLabel } from "@/data/typeHotel";
import { Button, Carousel, Input, Modal, Rate } from "antd";
import { FaStar, FaRegStar } from "react-icons/fa";
import { decodeToJWT } from "@/utils/JWT";
import FAQSection from "@/components/home/FAQs";
import AvailableRoomsTable from "./AvailableRoomsTable";
import Image from "next/image";
import PolicySection from "@/components/home/Policy";
import { amenityIcons, typeIcons } from "@/data/selectIcon";

const HotelDetailPage = () => {
  const router = useRouter();
  const detailsParams = useSearchParams();
  const hotelToken = detailsParams.get("token");
  const hotel = decodeToJWT(hotelToken || "");
  const booking = JSON.parse(localStorage.getItem("searchHotel") || "{}");
  const minPrice = Math.min(...(hotel.rooms ?? []).map((room: any) => room.price));

  const [isViewReviewModalVisible, setIsViewReviewModalVisible] = useState(false);
  const [isSendReviewModalVisible, setIsSendReviewModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
  if (!booking) return;

  const handleOpenViewReviewModal = () => {
    setIsViewReviewModalVisible(true);
  };

  const handleCloseViewReviewModal = () => {
    setIsViewReviewModalVisible(false);
  };

  const handleOpenSendReviewModal = () => {
    setIsSendReviewModalVisible(true);
  };

  const handleCloseSendReviewModal = () => {
    setIsSendReviewModalVisible(false);
    setRating(0);
    setComment("");
  };

  const handleSendReviewModal = () => {
    console.log(`Đánh giá: ${rating}, Nhận xét: ${comment}`);
    setRating(0);
    setComment("");
  };

  const calculateNights = (str1: string, str2: string): number => {
    const date1 = new Date(str1);
    const date2 = new Date(str2);
    const diffInMilliseconds = date2.getTime() - date1.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.max(diffInDays, 0);
  };

  return (
    <div className="pb-6">
      <div className="p-6 !pb-3 mx-auto max-w-7xl">
        <a
          href="#"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-gray-400 transition duration-150"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Quay lại trang trước
        </a>
      </div>

      <div className="px-6 pt-2 mx-auto -mb-4 max-w-7xl">
        <Carousel autoplay dotPosition="bottom" effect="fade">
          {hotel.images.map((image: string, index: number) => (
            <div key={index}>
              <div className="h-[418px] relative rounded-lg">
                <Image
                  src={image}
                  alt={`Gallery ${index}`}
                  className="object-cover"
                  layout="fill"
                  priority
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <section className="px-6 py-2 mx-auto max-w-7xl grid grid-cols-4 gap-4">
        <div className="col-span-4 p-4 bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200">
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-3 pb-4">
              <h1 className="text-2xl font-bold mt-2">{hotel.hotel_name}</h1>
              <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
              <div className="flex items-center">
                <span className="bg-blue-200 text-blue-600 rounded-lg px-4 py-1 text-sm inline-block mt-2">
                  {hotel.type}
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-end items-center h-full">
              <p className="text-xl font-bold text-blue-600 text-right mt-2">
                từ {minPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/đêm
              </p>
            </div>

            <div className="text-sm col-span-4 bg-white rounded-lg mt-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col border p-4 rounded-lg">
                  <div className="flex items-center pb-8">
                    <p className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white bg-blue-600 rounded-lg">
                      {hotel.reviews.average_rating.toFixed(1) || "N/A"}
                    </p>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">
                        {ratingLabel.find(
                          (r) => hotel.reviews.average_rating >= r.min,
                        )?.label || "Đánh giá"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {hotel.reviews.total_reviews} đánh giá
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-semibold text-lg mb-2">Top reviews</h3>
                    <div
                      className="py-2 max-h-[400px] overflow-y-auto cursor-pointer"
                      onClick={handleOpenViewReviewModal}
                    >
                      {hotel.reviews.recent_reviews.slice(-3).map((comment: any, index: number) => (
                        <div
                          key={index}
                          className={`py-2 border-t min-h-[100px] ${
                            index === hotel.reviews.recent_reviews.slice(-3).length - 1 ? "border-b" : ""
                          }`}
                        >
                          <div className="flex justify-between mb-2">
                            <p className="font-semibold">{comment.user}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, starIndex) => (
                                <span key={starIndex} className="mr-1">
                                  {starIndex < comment.rating ? (
                                    <FaStar className="text-yellow-300" />
                                  ) : (
                                    <FaRegStar className="text-yellow-300" />
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p>{comment.comment}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center mt-2 space-x-2" onClick={handleOpenSendReviewModal}>
                      <Input placeholder="Đánh giá của bạn" readOnly />
                      <Button type="primary" className="bg-blue-600">
                        Viết đánh giá
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-5 gap-2">
                  <div className="col-span-5 border p-4 rounded-lg">
                    <h4 className="mb-2">{hotel.description}</h4>
                  </div>
                  <div className="col-span-3 border p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Trong khu vực</h4>
                    <div className="mt-2">
                      <ul className="space-y-2">
                        {hotel.location.nearby_attractions
                          ?.sort((a: any, b: any) => parseFloat(a.distance) - parseFloat(b.distance))
                          .slice(0, 3)
                          .map((attraction: any, index: number) => (
                            <li key={index} className="flex items-center space-x-4 py-2">
                              <div className="w-full flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className="bg-blue-500 text-white text-lg p-1 rounded-sm mr-2">
                                    {typeIcons[attraction.type]}
                                  </span>
                                  <p className="font-semibold">{attraction.name}</p>
                                </div>
                                <p className="text-sm text-gray-600">{attraction.distance} km</p>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="mt-2 relative group h-[300px] overflow-hidden">
                      <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(hotel.hotel_name)}&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Map"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 border p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Tiện ích chính</h4>
                    <ul className="space-y-2">
                      {hotel.amenities.map((amenity: any, index: number) => (
                        <li key={index} className="text-gray-600">
                          <div className="flex items-center">
                            <span className="bg-blue-500 text-white text-sm p-1 rounded-sm mr-2">{amenityIcons[amenity]}</span>
                            <p className="text-sm">{amenity}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="px-6 py-4 mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold px-2 pb-2">Phòng còn trống tại {hotel.hotel_name}</h2>
        <div className="bg-white p-4 w-full border rounded-lg hover:shadow-lg transition-shadow duration-200">
          <AvailableRoomsTable
            hotel={hotel}
            rooms={hotel?.rooms}
            night={calculateNights(booking?.dateRange.startDate, booking?.dateRange.endDate)}
          />
        </div>
      </div>
      <div className="px-6 py-4 mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold px-2 pb-2">Quy tắc chung ở {hotel.hotel_name}</h2>
        <PolicySection />
      </div>
      <div className="px-6 py-4 mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold px-2 pb-2">Câu hỏi thường gặp về {hotel.hotel_name}</h2>
        <FAQSection hotel={hotel} />
      </div>
      <Modal
        title={`Top reviews for ${hotel.hotel_name}`}
        visible={isViewReviewModalVisible}
        onCancel={handleCloseViewReviewModal}
        footer={null}
        width={1000}
        centered
      >
        <div className="py-2 max-h-[400px] overflow-y-auto">
          {hotel.reviews.recent_reviews.map((comment: any, index: number) => (
            <div key={index} className="py-2 border-t">
              <div className="flex justify-between mb-2">
                <p className="font-semibold">{comment.user}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, starIndex) => (
                    <span key={starIndex} className="mr-1">
                      {starIndex < comment.rating ? (
                        <FaStar className="text-yellow-300" />
                      ) : (
                        <FaRegStar className="text-yellow-300" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        title="Đánh giá"
        visible={isSendReviewModalVisible}
        onCancel={handleCloseSendReviewModal}
        centered
        footer={[
          <Button key="cancel" onClick={handleCloseSendReviewModal}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" className="bg-green-600" onClick={handleSendReviewModal}>
            Gửi đánh giá
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <Rate
            value={rating}
            onChange={setRating}
            className="text-xl"
          />
          <Input.TextArea
            placeholder="Nhập nội dung nhận xét..."
            rows={4}
            className="w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default HotelDetailPage;
