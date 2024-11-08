"use client";

import SearchForm from "@/components/activities/SearchForm";
import { useEffect } from "react";
import { activities } from "@/data/fakeData";
import Image from "next/image";
import "./style.css";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export default function Activities({ params }: { params: { id: string } }) {
  const trendingActivities = activities.slice(0, 4);
  const nearbyDestinations = activities.slice(2, 5);

  useEffect(() => {
    if (params) {
      fetchDestinationDetails(params);
    }
  }, [params]);

  const fetchDestinationDetails = async (params: any) => {
    try {
      console.log("check params:", params);
    } catch (error) {
      console.error("Failed to fetch destination details:", error);
    }
  };

  return (
    <main className="bg-white">
      <div className="bg-[#013B94] py-2">
        <section className="bg-[#013B94] grid grid-cols-2 gap-2 p-6 mx-auto h-[300px] max-w-7xl">
          <div className="col-span-1">
            <h2 className="text-4xl font-bold text-white">
              Địa điểm tham quan, hoạt động và trải nghiệm
            </h2>
            <h3 className="py-5 text-sm text-white">
              Khám phá các hoạt động và địa điểm tham quan mới theo sở thích và
              gu du lịch của bạn
            </h3>
          </div>
        </section>
      </div>

      <section className="py-6 px-2 mx-4 -my-16 lg:px-4">
        <SearchForm />
      </section>

      <section className="p-6 mx-auto mt-10 bg-white rounded-t-lg max-w-7xl">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Được gợi ý ở Hà Nội</h3>
          <p className="font-light">
            Những trải nghiệm hàng đầu ở Hà Nội để bạn bắt đầu
          </p>
          <button className="text-blue-500 hover:underline focus:outline-none">
            Xem tất cả
          </button>
        </div>

        <div className="py-5 grid grid-cols-4 gap-4">
          {trendingActivities.map((item) => (
            <div key={item.id} className="cursor-pointer activity-container">
              <Image
                className="activity-image h-72"
                src={item.src}
                alt={item.title}
                width={540}
                height={405}
              />
              <div className="activity-title">{item.title}</div>
            </div>
          ))}
        </div>

        <div className="pt-5">
          <h3 className="text-xl font-bold">Tìm hoạt động vui chơi ở Hà Nội</h3>
        </div>

        <div className="py-5 grid grid-cols-4 gap-4">
          {trendingActivities.map((item) => (
            <div key={item.id} className="cursor-pointer activity-container">
              <Image
                className="activity-image h-72"
                src={item.src}
                alt={item.title}
                width={540}
                height={405}
              />
              <div className="activity-title">{item.title}</div>
            </div>
          ))}
        </div>

        <div className="pt-5">
          <h3 className="text-xl font-bold">Điểm đến lân cận</h3>
        </div>
        <div className="py-5 grid grid-cols-3 gap-4">
          {nearbyDestinations.map((item) => (
            <div key={item.id} className="cursor-pointer">
              <Image
                className="object-cover rounded-xl w-full h-72"
                src={item.src}
                alt={item.title}
                width={540}
                height={405}
              />
              <div className="pt-3">
                <p className="">{item.location}</p>
              </div>
            </div>
          ))}
          {nearbyDestinations.map((item) => (
            <div key={item.id} className="cursor-pointer">
              <Image
                className="object-cover rounded-xl w-full h-72"
                src={item.src}
                alt={item.title}
                width={540}
                height={405}
              />
              <div className="pt-3">
                <p className="">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}