"use client";

import SearchForm from "@/components/home/SearchForm";
import { destination } from "@/data/fakeData";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Hotel() {
  const trendingDestinations = destination.slice(0, 5);
  const router = useRouter();

  return (
    <main className="bg-white">
      <section className="py-4 px-2 m-4 mt-0 -mb-14 lg:px-4">
        <SearchForm />
      </section>

      <section className="p-6 mx-auto mt-10 bg-white rounded-t-lg max-w-7xl">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Điểm đến đang thịnh hành</h3>
          <p className="font-light">
            Du khách tìm kiếm về Việt Nam cũng đặt chỗ ở những nơi này
          </p>
        </div>

        <div className="py-5 grid grid-cols-5 gap-4">
          {trendingDestinations.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => router.push(`/hotel/search/${item.id}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  router.push(`/hotel/search/${item.id}`);
                }
              }}
            >
              <Image
                className="object-cover rounded-lg w-full h-72"
                src={item.src}
                alt={`Image of ${item.title}`}
                width={300}
                height={300}
                priority
              />
              <div className="pt-3">
                <p className="font-bold">{item.title}</p>
                <p>{item.location}</p>
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

        <div className="flex py-5 space-x-4 overflow-x-scroll">
          {destination.map((item) => (
            <div
              key={item.id}
              className="space-y-1 cursor-pointer shrink-0"
              onClick={() => router.push(`/hotel/search/${item.id}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  router.push(`/hotel/search/${item.id}`);
                }
              }}
            >
              <Image
                className="object-cover rounded-lg w-80 h-72"
                src={item.src}
                alt={`Image of ${item.title}`}
                width={320}
                height={320}
                priority
              />
              <div className="pt-3">
                <p className="font-bold">{item.title}</p>
                <p>{item.location}</p>
                <p className="text-sm font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
