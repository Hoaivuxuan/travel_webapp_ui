"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchForm from "@/components/home/SearchForm";
import { destination } from "@/data/fakeData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { encodeToJWT } from "@/utils/JWT";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default function Home() {
  const router = useRouter();
  const trendingDestinations = destination.slice(0, 5);
  const [listHotels, setListHotels] = useState([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hotels?noRooms=0&keyword=`);
        const data = await response.json();
        setListHotels(data.hotels);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchHotels();
  });

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-white">
      <div className="bg-[#472f91] py-2">
        <section className="bg-[#472f91] grid grid-cols-2 gap-2 p-6 mx-auto h-[300px] max-w-7xl">
          <div className="col-span-1">
            <h2 className="text-4xl font-bold text-white">
              Tìm & đặt nơi lưu trú chi phí giá rẻ chỉ với những bước đơn giản!
            </h2>
            <h3 className="py-5 text-sm text-white">
              Tìm giá thấp trên khách sạn, nhà và nhiều hơn nữa...
            </h3>
          </div>
        </section>
      </div>

      <section className="py-6 px-2 mx-4 -my-16 lg:px-4">
        <SearchForm />
      </section>

      <section className="p-6 mx-auto mt-10 bg-white rounded-t-lg max-w-7xl">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Điểm Đến Đang Thịnh Hành</h3>
          <p className="font-light">
            Du khách tìm kiếm về Việt Nam cũng đặt chỗ ở những nơi này
          </p>
        </div>
        <div className="py-5 grid grid-cols-5 gap-4">
          {trendingDestinations.map((item) => (
            <div key={item.id} className="relative cursor-pointer group">
              <Image
                className="object-cover rounded-lg w-full h-72"
                src={item.src}
                alt={item.title}
                width={540}
                height={405}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-3 rounded-b-lg">
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-xs">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5">
          <h3 className="text-xl font-bold">Khám Phá Việt Nam</h3>
          <p className="font-light">
            Các điểm đến phổ biến này có nhiều điều chờ đón bạn
          </p>
        </div>
        <div className="relative flex items-center">
          <Button
            icon={<AiFillCaretLeft className="text-lg" />}
            onClick={scrollLeft}
            className="absolute -left-[20px] w-[40px] z-10 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600"
          />
          <div
            ref={scrollContainerRef}
            className="flex py-5 space-x-4 overflow-x-hidden scroll-smooth"
          >
            {destination.map((item) => (
              <div key={item.id} className="relative cursor-pointer group space-y-1 shrink-0 w-[233.59px]">
                <Image
                  className="object-cover rounded-lg w-80 h-72"
                  src={item.src}
                  alt={item.title}
                  width={540}
                  height={405}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-3 rounded-b-lg">
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="text-xs">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            icon={<AiFillCaretRight className="text-lg" />}
            onClick={scrollRight}
            className="absolute -right-[20px] w-[40px] z-10 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600"
          />
        </div>

        <div className="pt-5">
          <h3 className="text-xl font-bold">Top Nơi Lưu Trú Nổi Bật</h3>
          <p className="font-light">Top 5 nơi lưu trú được đánh giá nhiều nhất</p>
        </div>
        <div className="py-5 grid grid-cols-5 gap-4">
          {Array.isArray(listHotels) &&
            listHotels.slice(0, 5).map((item: any) => (
              <div
                key={item.id}
                className="relative cursor-pointer group"
                onClick={() => router.push(`/home/detail?token=${encodeToJWT(item)}`)}
              >
                <Image
                  className="object-cover rounded-lg w-full h-72"
                  src={item.images[0]}
                  alt={`Hotel ${item.id}`}
                  width={540}
                  height={405}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-3 rounded-b-lg">
                  <p className="text-sm font-bold">{item.hotel_name}</p>
                  <p className="text-xs">{item.city.name}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
