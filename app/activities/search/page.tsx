"use client";

import SearchForm from "@/components/activities/SearchForm";
import ActivityCard from "@/components/AttractionCard";
import FilterPanel from "@/components/activities/FilterPanel";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { activitiesSearch } from "@/data/fakeData";
import "./style.css";

export default function Search({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleCardClick = (index: number) => {
    router.push(`/activities/detail/${index}`);
  };
  return (
    <main className="bg-white">
      <div className="bg-[#472f91] py-2">
        <section className="bg-[#472f91] grid grid-cols-2 gap-2 p-6 mx-auto h-[300px] max-w-7xl">
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

      <section className="max-w-7xl mx-auto py-20 px-4 flex">
        <FilterPanel />

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 ml-6">
          {activitiesSearch.map((activity, index) => (
            <div key={index} onClick={() => handleCardClick(index)}>
              <ActivityCard {...activity} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
