"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/activities/SearchForm";
import ActivityCard from "@/components/AttractionCard";
import FilterPanel from "@/components/activities/FilterPanel";
import { useRouter } from "next/navigation";
import { activitiesSearch } from "@/data/fakeData";
import { TourService } from "@/services/TourService";
import "./style.css";
import { Slider, Checkbox, Button, Radio } from "antd";

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
    const fetchFilter = async () => {
      try {
        const locationFromParam = (searchParams.location || "")
          .trim()
          .replace(/\s+/g, "")
          .toLowerCase();
        const data = (
          await TourService.search(removeAccent(locationFromParam), "")
        ).data.responses;
        const typeTicket = Array.from(
          new Map(
            data
              .flatMap((item: any) =>
                item.tour_schedule_responses.flatMap((response: any) =>
                  response.dailyTicketAvailabilities.map((ticket: any) => ({
                    id: ticket.id,
                    name: ticket.name,
                  }))
                )
              )
              .map((ticket: any) => [ticket.name, ticket])
          ).values()
        );
        console.log("Check typeTicket:", typeTicket);
        setListType(typeTicket);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

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
        setActivities(data);
      } catch (error) {
        setLoading(false);
      }
    };
    console.log("check searchParams:", searchParams);
    fetchFilter();
    fetchActivities();
  }, [searchParams.location]);

  const handleTypeSelection = (checkedValues: number[]) => {
    setSelectedTypes(checkedValues);
  };

  const filteredResults = activities.filter((item: any) => {
    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some(
        (rating) =>
          item.review?.average_rating !== undefined &&
          item.review.average_rating >= rating
      );
    return matchesRating;
  });

  return (
    <section>
      <div className="py-6 mx-auto max-w-7xl">
        <div className="pb-4">
          <SearchForm />
        </div>
        <div className="max-w-7xl mx-auto py-20 px-4 flex">
          <aside className="w-64 p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Lọc theo:</h2>

            {/* Địa điểm */}
            {/* <div className="mb-4">
              <h3 className="font-medium">Địa điểm</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Hà Nội
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Hồ Chí Minh
                </label>
              </div>
            </div> */}

            <div className="text-sm border-t py-4">
              <h4 className="font-semibold mb-2">Đánh giá của khách hàng</h4>
              <Radio.Group
                value={selectedRatings[0]}
                onChange={(e) => setSelectedRatings([e.target.value])}
              >
                {[2.5, 3, 3.5, 4, 4.5].map((rating) => (
                  <Radio key={rating} value={rating} className="mb-1 w-full">
                    <div className="flex items-center">{`≥ ${rating} sao`}</div>
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div className="text-sm border-t py-4">
              <h4 className="font-semibold mb-2">Loại vé</h4>
              <Checkbox.Group
                value={selectedTypes}
                onChange={handleTypeSelection}
              >
                {Array.isArray(listType) &&
                  listType.length > 0 &&
                  listType.map((type: any) => (
                    <Checkbox
                      key={type.id}
                      value={type.name}
                      className="mb-1 w-full"
                    >
                      {type.name}
                    </Checkbox>
                  ))}
              </Checkbox.Group>
            </div>
          </aside>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 ml-6">
            {filteredResults.map((item: any) => (
              <ActivityCard key={item.id} id={item.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
