"use client";

import Link from "next/link";
import { ratingLabel } from "@/data/typeHotel";
import { listings } from "@/data/fakeData";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Next.js Image component

type HotelItemProps = {
  id: string;
};

const HotelItem: React.FC<HotelItemProps> = ({ id }) => {
  const router = useRouter();
  const item = listings.content.listHotels.find(
    (hotel) => hotel.id.toString() === id
  );

  if (!item) {
    return <div>Không tìm thấy thông tin khách sạn.</div>;
  }

  const handleDetailClick = () => {
    router.push(`/home/detail/${item.id.toString().padStart(6, "0")}`);
  };

  return (
    <div className="grid grid-cols-5 gap-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="col-span-1 flex justify-center items-center">
        <Image 
          src={item.url}
          alt={`Image of ${item.name}`}
          className="rounded-l-lg h-full w-auto" 
          width={300} 
          height={300} 
        />
      </div>

      <div className="col-span-4 p-4">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-3">
            <p className="mt-2 text-blue-600 text-lg font-bold">{item.name}</p>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.city)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-blue-600 text-xs underline">{item.city}</p>
            </Link>
            <p className="mt-4 text-blue-600 text-xs bg-blue-200 rounded-lg px-2 py-1 inline-block">
              {item.type}
            </p>
          </div>
          <div className="flex flex-col items-end h-full">
            <div className="flex items-center space-x-2 text-right mt-2">
              <div>
                <p className="text-blue-600 text-sm font-bold">
                  {ratingLabel.find((r) => item.rating >= r.min)?.label || "Đánh giá"}
                </p>
                <p className="text-xs">{item.reviewCount} lượt đánh giá</p>
              </div>
              <p className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-600 rounded-lg">
                {item.rating.toFixed(1) || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-2 mt-2 relative">
          {item.amenities.length > 3 ? (
            <>
              {item.amenities.slice(0, 3).map((amenity, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-gray-600 rounded-lg px-2 py-1 my-1 text-xs flex items-center"
                >
                  {amenity}
                </div>
              ))}
              <div className="bg-gray-200 text-gray-600 rounded-lg px-2 py-1 my-1 text-xs flex items-center relative group">
                {item.amenities.length - 3}+
                <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white p-4 rounded-lg text-xs w-max">
                  Cơ sở lưu trú này có:
                  <ul className="list-disc pl-5">
                    {item.amenities.map((amenity, index) => (
                      <li key={index} className="text-white">
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            item.amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-600 rounded-lg px-2 py-1 my-1 text-xs flex items-center"
              >
                {amenity}
              </div>
            ))
          )}
        </div>
        <div>
          <div className="flex flex-row justify-between col-span-1 h-full">
            <div className="border-l border-gray-300 h-full mx-2"></div>
            <div className="flex flex-col justify-end items-end mt-2">
              <p className="text-lg font-bold text-blue-600 text-right">
                {item.price.toLocaleString("vi-VN")} VNĐ/đêm
              </p>
              <button
                onClick={handleDetailClick}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
              >
                Chọn phòng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelItem;
