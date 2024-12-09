"use client";

import React, { useEffect } from "react";
import { destination } from "@/data/fakeData";
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const trendingDestinations = destination.slice(0, 5);
  const users = [
    { email: "hanghonghach2910@gmail.com", password: "29102002", confirm_password: "29102002" },
    { email: "daoquangduy441@gmail.com", password: "wnwbovwyeehvobdz", confirm_password: "wnwbovwyeehvobdz" },
    { email: "ddthumonky0810@gmail.com", password: "08102002", confirm_password: "08102002" },
  ];

  const registerUser = async (user: { email: string; password: string; confirm_password: string }) => {
    try {
      await axios.post("http://localhost:8080/users/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
    }
  };

  useEffect(() => {
    users.forEach((user) => {
      registerUser(user);
    });
  }, []);

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

      <section className="p-6 mx-auto mt-10 bg-white rounded-t-lg max-w-7xl">
        <div className="py-4">
          <h3 className="text-2xl font-bold text-[#472f91] pb-2">SIÊU SALE DU LỊCH 12.12</h3>
          <Image
            className="object-cover rounded-lg w-full h-auto"
            src="https://res.cloudinary.com/df42yelwi/image/upload/v1733369821/1732691096926-2c8f2d5f03f51a565b130e5c6e75b532_zq4izw.webp"
            alt="SIÊU SALE DU LỊCH 12.12"
            width={1280}
            height={160}
          />
        </div>
        <div className="py-4">
          <h3 className="text-2xl font-bold text-[#472f91] pb-2">CẨM NANG DU LỊCH</h3>
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
        </div>
      </section>
    </main>
  );
}
