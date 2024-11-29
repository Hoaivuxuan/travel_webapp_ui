"use client";

import React, { useRef } from "react";
import SearchForm from "@/components/home/SearchForm";
import { destination } from "@/data/fakeData";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Home() {
  const trendingDestinations = destination.slice(0, 5);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        <section className="bg-[#472f91] p-6 mx-auto h-[300px] max-w-7xl">
          <h2 className="text-5xl font-bold text-white">
            Tìm Kiếm Chỗ Ở Tiếp Theo
          </h2>
          <h3 className="py-5 text-xl text-white">
            Tìm giá thấp trên khách sạn, nhà và nhiều hơn nữa...
          </h3>
        </section>
      </div>

      <section className="py-6 px-2 m-4 -mt-[5rem] -mb-14 lg:px-4">
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
            <div key={item.id} className="cursor-pointer">
              <Image
                className="object-cover rounded-lg w-full h-72"
                src={item.src}
                alt={item.title}
                width={540}
                height={405}
              />
              <div className="pt-3">
                <p className="font-bold">{item.title}</p>
                <p className="">{item.location}</p>
                <p className="text-sm font-light">{item.description}</p>
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
          <button
            onClick={scrollLeft}
            className="absolute -left-[20px] w-[40px] z-10 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center items-center"
          >
            <LeftOutlined />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex py-5 space-x-4 overflow-x-hidden scroll-smooth"
          >
            {destination.map((item) => (
              <div
                key={item.id}
                className="space-y-1 cursor-pointer shrink-0 w-[233.59px]"
              >
                <Image
                  className="object-cover rounded-lg w-80 h-72"
                  src={item.src}
                  alt={item.title}
                  width={540}
                  height={405}
                />
                <div className="pt-3">
                  <p className="font-bold">{item.title}</p>
                  <p className="">{item.location}</p>
                  <p className="text-sm font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute -right-[20px] w-[40px] z-10 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center items-center"
          >
            <RightOutlined />
          </button>
        </div>
      </section>
    </main>
  );
}
