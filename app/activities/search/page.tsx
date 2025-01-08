"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/activities/SearchForm";
import ActivityCard from "@/components/AttractionCard";
import FilterPanel from "@/components/activities/FilterPanel";
import { useRouter } from "next/navigation";
import { activitiesSearch } from "@/data/fakeData";
import { TourService } from "@/services/TourService";
import "./style.css";

type Props = {
  searchParams: SearchParams;
};

export type SearchParams = {
  url: URL;
  location: string;
  startDate: string;
  endDate: string;
};

const removeAccent = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function Search({ searchParams }: Props) {
  const [activities, setActivities] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [listType, setListType] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const locationFromParam = (searchParams.location || "")
          .trim()
          .replace(/\s+/g, "")
          .toLowerCase();

        console.log(
          "Check removeAccent(locationFromParam):",
          removeAccent(locationFromParam)
        );
        const data = (
          await TourService.search(removeAccent(locationFromParam), "")
        ).data.responses;
        console.log("Check data:", data);
        setActivities(data);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [searchParams.location]);

  return (
    <section>
      <div className="py-6 mx-auto max-w-7xl">
        <div className="pb-4">
          <SearchForm />
        </div>
        <h2 className="py-4">
          <span className="ml-2">
            {`${searchParams.location}, từ ${searchParams.startDate} đến ${searchParams.endDate}`}
          </span>
        </h2>
        <hr className="mb-5" />
        <div className="mx-auto flex">
          <FilterPanel />
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 ml-6">
            {activities.map((item: any) => (
              <ActivityCard key={item.id} id={item.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
