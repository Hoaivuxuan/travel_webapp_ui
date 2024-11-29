"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/home/SearchForm";
import { notFound } from "next/navigation";
import { listHotels, type_hotel } from "@/data/typeHotel";
import HotelItem from "./HotelItem";
import { Slider, Rate, Checkbox, Button } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";

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

function SearchPage({ searchParams }: Props) {
  const minPrice = Math.min(
    ...listHotels.map((hotel) =>
      Math.min(...hotel.rooms.map((room) => room.price)),
    ),
  );
  const maxPrice = Math.max(
    ...listHotels.map((hotel) =>
      Math.max(...hotel.rooms.map((room) => room.price)),
    ),
  );

  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [itemsToShow, setItemsToShow] = useState(10);

  const handleTypeSelection = (checkedValues: number[]) => {
    setSelectedTypes(checkedValues);
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const filteredResults = listHotels.filter((item) => {
    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.some((typeId) =>
        type_hotel.find(
          (hotel) => hotel.id === typeId && hotel.name === item.type,
        ),
      );

    const matchesRating =
      selectedRating === null || item.reviews.averageRating >= selectedRating;

    const hotelMinPrice = Math.min(...item.rooms.map((room) => room.price));

    const matchesPrice =
      hotelMinPrice >= priceRange[0] && hotelMinPrice <= priceRange[1];

    return matchesType && matchesRating && matchesPrice;
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
              <h3 className="font-bold text-sm mb-3">Chọn lọc theo:</h3>

              <hr className="my-2" />
              <div className="mb-6 text-sm">
                <h4 className="font-semibold mb-2">Giá mỗi đêm (₫)</h4>
                <Slider
                  range
                  min={minPrice}
                  max={maxPrice}
                  defaultValue={priceRange}
                  onChange={handlePriceChange}
                  trackStyle={[{ backgroundColor: "#1D4ED8" }]}
                  handleStyle={[{ borderColor: "#1D4ED8" }, { borderColor: "#1D4ED8" }]}
                />
                <div className="flex justify-between mt-2 text-xs">
                  <span>
                    {priceRange[0].toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                  </span>
                  <span>
                    {priceRange[1].toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                  </span>
                </div>
              </div>

              <hr className="my-2" />
              <div className="mb-6 text-sm">
                <h4 className="font-semibold mb-2">Đánh giá của khách hàng</h4>
                <Rate
                  value={selectedRating || 0}
                  onChange={setSelectedRating}
                  count={5}
                  character={({ index }) =>
                    selectedRating && selectedRating >= (index ?? 0) + 1
                      ? <StarFilled />
                      : <StarOutlined />
                  }
                />
              </div>

              <hr className="my-2" />
              <div className="mb-6 text-sm">
                <h4 className="font-semibold mb-2">Loại chỗ ở</h4>
                <Checkbox.Group
                  value={selectedTypes}
                  onChange={handleTypeSelection}
                >
                  {type_hotel.map((type) => (
                    <Checkbox key={type.id} value={type.id} className="mb-1 w-full">
                      {type.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            </aside>

            <div className="col-span-4">
              <div className="space-y-3">
                {displayedResults.map((item) => (
                  <HotelItem key={item.id} id={item.id.toString()} />
                ))}
              </div>

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
