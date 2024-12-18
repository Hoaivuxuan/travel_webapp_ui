"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { encodeToJWT } from "@/utils/JWT";
import { Button } from "antd";

type HotelItemProps = {
  id: string;
};

const HotelItem: React.FC<HotelItemProps> = ({ id }) => {
  const router = useRouter();
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/hotels/${id}`);
        if (!response.ok) {
          throw new Error("Không thể lấy thông tin khách sạn");
        }
        const data = await response.json();
        setHotel(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  if (loading) {
    return <div>Đang tải thông tin khách sạn...</div>;
  }
  if (error || !hotel) {
    return <div>Không tìm thấy thông tin khách sạn.</div>;
  }

  const minPrice = Math.min(...hotel.rooms.map((room: any) => room.price));
  const handleDetailClick = () => {
    const token = encodeToJWT(hotel);
    router.push(`/home/detail?token=${token}`);
  };

  return (
    <div className="grid grid-cols-4 gap-2 border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-center items-center">
        <Image
          src={hotel.images[0]}
          alt={`Image of ${hotel.name}`}
          className="rounded-l-lg h-full w-auto"
          width={300}
          height={300}
        />
      </div>
      <div className="col-span-3 p-4">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-3">
            <p className="mt-2 text-blue-600 text-lg font-bold">{hotel.hotel_name}</p>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.city)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-blue-600 text-xs underline">{hotel.city.name}</p>
            </Link>
            <p className="mt-4 text-blue-600 text-xs bg-blue-200 rounded-lg px-2 py-1 inline-block">
              {hotel.type}
            </p>
          </div>
          <div className="flex flex-col items-end h-full">
            <div className="flex items-center space-x-2 text-right mt-2">
              <div>
                <p className="text-blue-600 text-sm font-bold">
                  {
                    hotel.reviews.average_rating >= 4 ? "Tuyệt vời"
                    : hotel.reviews.average_rating >= 3 ? "Tốt"
                    : "Trung bình"
                  }
                </p>
                <p className="text-xs">
                  {hotel.reviews.total_reviews} lượt đánh giá
                </p>
              </div>
              <p className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-600 rounded-lg">
                {hotel.reviews.average_rating.toFixed(1) || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-2 mt-2 relative">
          {hotel.amenities.slice(0, 3).map((amenity: string, index: number) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-600 rounded-lg px-2 py-1 my-1 text-xs flex items-center"
            >
              {amenity}
            </div>
          ))}
          {hotel.amenities.length > 3 && (
            <div className="bg-gray-200 text-gray-600 rounded-lg px-2 py-1 my-1 text-xs flex items-center relative group">
              {hotel.amenities.length - 3}+
              <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white p-4 rounded-lg text-xs w-max">
                Cơ sở lưu trú này có:
                <ul className="list-disc pl-5">
                  {hotel.amenities.map((amenity: string, index: number) => (
                    <li key={index} className="text-white">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-row justify-between col-span-1 h-full">
            <div className="border-l border-gray-300 h-full mx-2"></div>
            <div className="flex flex-col justify-end items-end mt-2">
              từ
              <p className="text-lg font-bold text-blue-600 text-right">
                {minPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
                /đêm
              </p>
              <Button
                type="primary"
                onClick={handleDetailClick}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
              >
                Chọn phòng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelItem;
