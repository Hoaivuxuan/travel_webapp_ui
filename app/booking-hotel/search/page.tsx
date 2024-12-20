"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/home/SearchForm";
import { notFound } from "next/navigation";
import { Slider, Checkbox, Button, Radio } from "antd";
import HotelItem from "./HotelItem";

type Props = {
  searchParams: SearchParams;
};

export type SearchParams = {
  url: URL;
  location: string;
  startDate: string;
  endDate: string;
  adults: string;
  children: string;
  rooms: string;
};

const removeAccent = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

function SearchPage({ searchParams }: Props) {
  const [hotels, setHotels] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [listType, setListType] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bearerToken = localStorage.getItem("token");
    if(!bearerToken) return;

    const fetchFilter = async () => {
      try {
        const response = await fetch("http://localhost:8080/hotels?noRooms=0&keyword", {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const type = Array.from(new Set<string>(data.hotels.map((hotel: any) => hotel.type)))
          .sort((a, b) => a.localeCompare(b))
          .map((type, id) => ({ id: id, name: type }));
        setListType(type);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const fetchHotels = async () => {
      try {
        const keyword = (searchParams.location || "")
          .trim()
          .replace(/\s+/g, "")
          .toLowerCase();
        
        const response = await fetch(`http://localhost:8080/hotels?noRooms=0&keyword=${removeAccent(keyword)}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        const minPrice = Math.min(
          ...data.hotels.map((hotel: any) => Math.min(...hotel.rooms.map((room: any) => room.price))),
        );
        const maxPrice = Math.max(
          ...data.hotels.map((hotel: any) => Math.max(...hotel.rooms.map((room: any) => room.price))),
        );

        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setPriceRange([minPrice, maxPrice]);
        setHotels(data.hotels);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchFilter();
    fetchHotels();

  }, [searchParams.location]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) setPriceRange([value[0], value[1]]);
  };

  const handleTypeSelection = (checkedValues: number[]) => {
    setSelectedTypes(checkedValues);
  };

  const filteredResults = hotels.filter((item: any) => {
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.some((typeId) => typeId === item.type);

    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((rating) => item.reviews.average_rating >= rating);

    const hotelMinPrice = Math.min(...item.rooms.map((room: any) => room.price));
    const matchesPrice =
      hotelMinPrice >= priceRange[0] && hotelMinPrice <= priceRange[1];

    return matchesType && matchesRating && matchesPrice;
  });

  return (
    <section>
      {!searchParams.url ? (
        notFound()
      ) : (
        <div className="py-6 mx-auto max-w-7xl">
          <div className="pb-4">
            <SearchForm />
          </div>

          <h2 className="py-4">
            <p className="ml-2">
              {searchParams.location},{" "}
              từ {searchParams.startDate} đến {searchParams.endDate} ({filteredResults.length} kết quả)
            </p>
          </h2>

          <hr className="mb-5" />
          <div className="grid grid-cols-5 gap-4">
            <aside className="col-span-1 p-4 border rounded-lg sticky top-6 h-fit">
              <h3 className="text-sm font-bold pb-3">Bộ lọc</h3>
              <div className="text-sm border-t py-4">
                <h4 className="font-semibold mb-2">Giá mỗi đêm (₫)</h4>
                <Slider
                  range
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange}
                  onChange={handlePriceChange}
                  trackStyle={[{ backgroundColor: "#1D4ED8" }]}
                  handleStyle={[
                    { borderColor: "#1D4ED8" },
                    { borderColor: "#1D4ED8" },
                  ]}
                />
                <div className="flex justify-between mt-2 text-xs">
                  <span>
                    {priceRange[0].toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                  </span>
                  <span>
                    {priceRange[1].toLocaleString("vi-VN", {style: "currency", currency: "VND"})}
                  </span>
                </div>
              </div>
              <div className="text-sm border-t py-4">
                <h4 className="font-semibold mb-2">Đánh giá của khách hàng</h4>
                <Radio.Group value={selectedRatings[0]} onChange={(e) => setSelectedRatings([e.target.value])}>
                  {[2.5, 3, 3.5, 4, 4.5].map((rating) => (
                    <Radio key={rating} value={rating} className="mb-1 w-full">
                      <div className="flex items-center">
                        {`≥ ${rating} sao`}
                      </div>
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
              <div className="text-sm border-t py-4">
                <h4 className="font-semibold mb-2">Loại chỗ ở</h4>
                <Checkbox.Group value={selectedTypes} onChange={handleTypeSelection}>
                  {(Array.isArray(listType) && listType.length > 0) && (
                    listType.map((type: any) => (
                      <Checkbox key={type.id} value={type.name} className="mb-1 w-full">
                        {type.name}
                      </Checkbox>
                    ))
                  )}
                </Checkbox.Group>
              </div>
            </aside>

            <div className="col-span-4">
              {loading ? (
                <div>Đang tải dữ liệu...</div>
              ) : (
                <div className="space-y-3">
                  {filteredResults.map((item: any) => (
                    <HotelItem key={item.id} id={item.id.toString()} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SearchPage;
