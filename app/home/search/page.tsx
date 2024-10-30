"use client";

import React, { useState } from "react";
import SearchForm from "@/components/home/SearchForm";
import { notFound } from "next/navigation";
import { listings } from "@/data/fakeData";
import { type_hotel } from "@/data/typeHotel";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import HotelItem from "./HotelItem";

type Props = {
  searchParams: SearchParams;
};

export type SearchParams = {
  url: URL;
  location: string;
  adults: string;
  children: string;
  rooms: string;
  checkin: string;
  checkout: string;
};

function SearchPage({ searchParams }: Props) {
  if (!searchParams.url) return notFound();

  const minPrice = Math.min(
    ...listings.content.listHotels.map((hotel) => hotel.price),
  );
  const maxPrice = Math.max(
    ...listings.content.listHotels.map((hotel) => hotel.price),
  );
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  const [itemsToShow, setItemsToShow] = useState(10);

  const handleTypeSelection = (id: number) => {
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id],
    );
  };

  const handleRatingSelection = (rating: number) => {
    setSelectedRatings((prevSelected) =>
      prevSelected.includes(rating)
        ? prevSelected.filter((rat) => rat !== rating)
        : [...prevSelected, rating],
    );
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const filteredResults = listings.content.listHotels.filter((item) => {
    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.some((typeId) =>
        type_hotel.find(
          (hotel) => hotel.id === typeId && hotel.name === item.type,
        ),
      );

    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((rating) => {
        if (rating === 9) return item.rating >= 9.0;
        if (rating === 8) return item.rating >= 8.0;
        if (rating === 7) return item.rating >= 7.0;
        if (rating === 6) return item.rating >= 6.0;
        return false;
      });

    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];

    return matchesType && matchesRating && matchesPrice;
  });

  const displayedResults = filteredResults.slice(0, itemsToShow);

  return (
    <section>
      <div className="py-6 mx-auto max-w-7xl">
        <div className="pb-4">
          <SearchForm />
        </div>

        <h2 className="py-4">
          <span className="ml-2">
            {searchParams.location}, từ {searchParams.checkin} đến{" "}
            {searchParams.checkout} ({filteredResults.length} kết quả)
          </span>
        </h2>

        <hr className="mb-5" />
        <div className="grid grid-cols-5 gap-4">
          <aside className="col-span-1 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h3 className="font-bold text-sm mb-3">Chọn lọc theo:</h3>

            <hr className="my-2" />
            <div className="mb-6 text-sm">
              <h4 className="font-semibold mb-2">Giá mỗi đêm (VNĐ)</h4>
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                defaultValue={priceRange}
                onChange={handlePriceChange}
                trackStyle={[{ backgroundColor: "#1D4ED8" }]}
                handleStyle={[
                  { borderColor: "#1D4ED8" },
                  { borderColor: "#1D4ED8" },
                ]}
              />
              <div className="flex justify-between mt-2 text-xs">
                <span>{priceRange[0].toLocaleString("vi-VN")} VNĐ</span>
                <span>{priceRange[1].toLocaleString("vi-VN")} VNĐ</span>
              </div>
            </div>

            <hr className="my-2" />
            <div className="mb-6 text-sm">
              <h4 className="font-semibold mb-2">Điểm đánh giá của khách</h4>
              <ul>
                <li className="mb-1 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    id="rating1"
                    checked={selectedRatings.includes(9)}
                    onChange={() => handleRatingSelection(9)}
                  />
                  <label htmlFor="rating1" className="flex-grow">
                    Tuyệt hảo: ≥ 9.0
                  </label>
                </li>
                <li className="mb-1 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    id="rating2"
                    checked={selectedRatings.includes(8)}
                    onChange={() => handleRatingSelection(8)}
                  />
                  <label htmlFor="rating2" className="flex-grow">
                    Rất tốt: ≥ 8.0
                  </label>
                </li>
                <li className="mb-1 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    id="rating3"
                    checked={selectedRatings.includes(7)}
                    onChange={() => handleRatingSelection(7)}
                  />
                  <label htmlFor="rating3" className="flex-grow">
                    Tốt: ≥ 7.0
                  </label>
                </li>
                <li className="mb-1 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    id="rating4"
                    checked={selectedRatings.includes(6)}
                    onChange={() => handleRatingSelection(6)}
                  />
                  <label htmlFor="rating4" className="flex-grow">
                    Dễ chịu: ≥ 6.0
                  </label>
                </li>
              </ul>
            </div>

            <hr className="my-2" />
            <div className="mb-6 text-sm">
              <h4 className="font-semibold mb-2">Loại chỗ ở</h4>
              <ul>
                {type_hotel.map((type) => (
                  <li key={type.id} className="mb-1 flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      id={`type-${type.id}`}
                      checked={selectedTypes.includes(type.id)}
                      onChange={() => handleTypeSelection(type.id)}
                    />
                    <label htmlFor={`type-${type.id}`} className="flex-grow">
                      {type.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="col-span-4">
            <div className="space-y-3">
              {displayedResults.map((item) => (
                <HotelItem key={item.id} id={item.id} />
              ))}
            </div>

            {filteredResults.length > itemsToShow && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setItemsToShow(itemsToShow + 10)}
                  className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors duration-200"
                >
                  Xem thêm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
