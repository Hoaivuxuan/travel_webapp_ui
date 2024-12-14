"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ratingLabel } from "@/data/typeHotel";
import { Carousel, Modal } from "antd";
import { GiPositionMarker } from "react-icons/gi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { decodeToJWT } from "@/utils/JWT";
import FAQSection from "@/components/home/FAQs";
import AvailableRoomsTable from "./AvailableRoomsTable";
import Image from "next/image";
import PolicySection from "@/components/home/Policy";

const HotelDetailPage = () => {
  const router = useRouter();
  const detailsParams = useSearchParams();
  const hotelToken = detailsParams.get("token");
  const hotel = decodeToJWT(hotelToken || "");
  const minPrice = Math.min(...(hotel.rooms ?? []).map((room: any) => room.price));

  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  const handleOpenReviewModal = () => {
    setIsReviewModalVisible(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalVisible(false);
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
                <div className="border p-4 rounded-lg">
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
                  <div className="pt-8">
                    <h3 className="font-semibold text-lg mb-2">Top reviews</h3>
                    <div
                      className="py-2 max-h-[400px] overflow-y-auto cursor-pointer"
                      onClick={handleOpenReviewModal}
                    >
                      {hotel.reviews.recent_reviews.slice(-2).map((comment: any, index: number) => (
                        <div
                          key={index}
                          className={`py-2 border-t min-h-[100px] ${
                            index === hotel.reviews.recent_reviews.slice(-2).length - 1 ? "border-b" : ""
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
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-2">
                  <div className="col-span-2 border p-4 rounded-lg">
                    <h4 className="mb-2">{hotel.description}</h4>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-4">
                      <GiPositionMarker className="text-[20px] text-blue-600" />
                      <h4 className="text-lg font-semibold">Trong khu vực</h4>
                    </div>
                    <div className="relative group h-[300px] overflow-hidden">
                      <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                          hotel.hotel_name,
                        )}&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Map"
                      />
                    </div>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Tiện ích chính</h4>
                    <ul className="list-disc pl-5">
                      {hotel.amenities.map((amenity: any, index: number) => (
                        <li key={index} className="text-gray-600">
                          {amenity}
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
          <AvailableRoomsTable hotel={hotel} rooms={hotel?.rooms} />
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
        visible={isReviewModalVisible}
        onCancel={handleCloseReviewModal}
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
    </div>
  );
};

export default HotelDetailPage;
