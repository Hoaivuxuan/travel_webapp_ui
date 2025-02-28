"use client";

import RentalSearchForm from "@/components/rental/RentalSearchForm";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { destination } from "@/data/fakeData";
import { Button } from "antd";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import RentalFacilityService from "@/services/RentalFacilityService";

const RentalPage = () => {
  const [rentalFacility, setRentalFacility] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {  
    const fetchFilter = async () => {
      try {
        const data = (await RentalFacilityService.getAll()).data;
        setRentalFacility(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilter();
  }, []);

  const scrollLeft = () => {
    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      (scrollContainer as HTMLElement).scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      (scrollContainer as HTMLElement).scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-white">
      <div className="bg-[#472f91] py-2">
        <section className="grid grid-cols-2 gap-2 p-6 mx-auto h-[300px] max-w-7xl">
          <div className="col-span-1">
            <h2 className="text-4xl font-bold text-white">
              Dịch vụ cho thuê xe ô tô và xe máy tự lái giá rẻ tại Hanoitravel.vn
            </h2>
            <h3 className="py-5 text-sm text-white">
              Tìm và đặt ngay dịch vụ cho thuê xe ô tô và xe máy tự lái giá rẻ
              tại Hanoitravel.vn - nền tảng du lịch cung cấp dịch vụ cho thuê xe
              giá rẻ trên khắp Việt Nam
            </h3>
          </div>
        </section>
      </div>

      <section className="py-6 px-2 mx-4 -my-16 lg:px-4">
        <RentalSearchForm />
      </section>

      <section className="px-6 py-2 mx-auto mt-10 bg-white rounded-t-lg max-w-7xl">
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
            className="scroll-container flex py-5 space-x-4 overflow-x-hidden scroll-smooth"
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
      </section>

      <section className="px-6 py-2 mx-auto bg-white rounded-t-lg max-w-7xl">
        <div>
          <h3 className="text-xl font-bold">Các cơ sở cho thuê xe</h3>
          <p className="font-light">
            Những cơ sở cho thuê xe với mức giá phù hợp
          </p>
        </div>
        <div className="relative flex items-center">
          <Button
            icon={<AiFillCaretLeft className="text-lg" />}
            onClick={scrollLeft}
            className="absolute -left-[20px] w-[40px] z-10 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600"
          />
          <div
            className="scroll-container flex py-5 space-x-4 overflow-x-hidden scroll-smooth"
          >
            {rentalFacility.map((item: any) => (
              <div key={item.id} className="relative cursor-pointer group space-y-1 shrink-0 w-[233.59px]">
                <Image
                  className="object-cover rounded-lg w-60 h-40"
                  src="https://firebasestorage.googleapis.com/v0/b/travel-web-7b510.appspot.com/o/car%2Fdefault_lrg.jpg?alt=media&token=bc8c6c9b-a920-436c-8bf6-38e35f62d331"
                  alt="RENTAL"
                  width={600}
                  height={400}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-3 rounded-b-lg">
                  <p className="text-sm font-bold">{item.name}</p>
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
      </section>
    </main>
  );
};

export default RentalPage;
