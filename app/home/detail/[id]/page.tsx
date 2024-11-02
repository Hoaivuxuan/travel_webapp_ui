"use client";

import React, { useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { listings } from "@/data/fakeData";
import { ratingLabel } from "@/data/typeHotel";
import Link from "next/link";
import FAQSection from "@/components/home/FAQs";
import Modal from "@/components/Modal";

const HotelDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const hotelItem =
    listings.content.listHotels.find((item) => item.id === Number(id)) ||
    undefined;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [directionsUrl, setDirectionsUrl] = useState("");

  if (!hotelItem) return notFound();
  const hotelAddress = encodeURIComponent(`${hotelItem.address}`);

  return (
    <div className="bg-gray-100 pb-6">
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
      <div className="px-6 pt-2 mx-auto -mb-4 max-w-7xl grid grid-cols-2 gap-2">
        <div className="h-[418px]">
          <img
            src={hotelItem.url}
            alt={`Hotel ${hotelItem.id}`}
            className="w-full h-[418px]"
          />
        </div>
        <div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <img
                key={index}
                src={hotelItem.url}
                alt={`Gallery ${index}`}
                className="h-[205px]"
              />
            ))}
          </div>
        </div>
      </div>
      <section className="px-6 py-2 mx-auto max-w-7xl grid grid-cols-4 gap-4">
        <div className="col-span-4 p-4 bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200">
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-6 pb-4">
              <h1 className="text-2xl font-bold mb-2">{hotelItem.name}</h1>
              <div className="flex items-center">
                <span className="bg-blue-200 text-blue-600 rounded-lg px-2 py-1 text-sm inline-block mt-2">
                  {hotelItem.type}
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-end col-span-2 h-full">
              <div className="flex flex-col justify-end items-end mt-2">
                <p className="text-xl font-bold text-blue-600 text-right">
                  {hotelItem.price} VNĐ/đêm
                </p>
                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-green-400 text-sm font-semibold mt-2">
                  Chọn phòng
                </button>
              </div>
            </div>

            <div className="text-sm col-span-8 bg-white rounded-lg mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="border p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <p className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white bg-blue-600 rounded-lg">
                      {hotelItem.rating.toFixed(1) || "N/A"}
                    </p>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">
                        {ratingLabel.find((r) => hotelItem.rating >= r.min)?.label || "Đánh giá"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {hotelItem.reviewCount} đánh giá
                      </p>
                    </div>
                  </div>
                  <h4 className="mb-2">{hotelItem.description}</h4>
                </div>

                <div className="border p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Trong khu vực</h4>
                  <p className="text-gray-600 mb-4">{hotelItem.address}</p>
                  <div
                    className="relative group"
                    style={{ height: "300px", overflow: "hidden" }}
                  >
                    <iframe
                      src={`https://www.google.com/maps?q=${hotelAddress}&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Hotel Location"
                    />
                    <button
                      className="absolute bottom-4 right-4 bg-blue-600 text-white py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      Tìm đường đi
                    </button>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                      <h2 className="text-lg font-semibold">Chỉ đường đến khách sạn</h2>
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

                <div className="border p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Tiện ích chính</h4>
                  <ul className="list-disc pl-5">
                    {hotelItem.amenities.map((amenity, index) => (
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
      </section>
      <div className="px-6 py-2 mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold px-2 pb-2">
          Những phòng còn trống tại {hotelItem.name}
        </h2>
        <div className="bg-white p-4 w-full border rounded-lg hover:shadow-lg transition-shadow duration-200"></div>
      </div>
      <div className="px-6 py-2 mx-auto max-w-7xl">
        <h2 className="text-xl font-semibold px-2 pb-2">
          Những câu hỏi thường gặp về {hotelItem.name}
        </h2>
        <FAQSection hotelId={hotelItem.id} />
      </div>
    </div>
  );
};

export default HotelDetailPage;
