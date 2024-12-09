"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/home/SearchForm";
import { notFound } from "next/navigation";
import { Slider, Checkbox, Button } from "antd";
import { fetchHotelTypes } from "@/utils/listTypeHotel";
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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [listType, setListType] = useState<any>();
  const [itemsToShow, setItemsToShow] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const keyword = (searchParams.location || "")
          .trim()
          .replace(/\s+/g, "")
          .toLowerCase();

        const response = await fetch(`http://localhost:8080/hotels?noRooms=0&keyword=${removeAccent(keyword)}`);
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
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      }
    };

    const fetchFilter = async () => {
      const types = await fetchHotelTypes();
      setListType(types);
    };

    fetchHotels();
    fetchFilter();
  }, [searchParams.location]);

  const handleTypeSelection = (checkedValues: number[]) => {
    setSelectedTypes(checkedValues);
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) setPriceRange([value[0], value[1]]);
  };

  const filteredResults = hotels.filter((item: any) => {
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.some((typeId) => typeId === item.type);

    const hotelMinPrice = Math.min(...item.rooms.map((room: any) => room.price));
    const matchesPrice =
      hotelMinPrice >= priceRange[0] && hotelMinPrice <= priceRange[1];

    return matchesType && matchesPrice;
  });

  const displayedResults = filteredResults.slice(0, itemsToShow);

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
                  handleStyle={[{ borderColor: "#1D4ED8" }, { borderColor: "#1D4ED8" }]}
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
                  {displayedResults.map((item: any) => (
                    <HotelItem key={item.id} id={item.id.toString()} />
                  ))}
                </div>
              )}

              {filteredResults.length > itemsToShow && (
                <div className="mt-4 text-center">
                  <Button
                    type="primary"
                    onClick={() => setItemsToShow(itemsToShow + 10)}
                    className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-600 transition-colors duration-200"
                  >
                    Xem thêm
                  </Button>
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
