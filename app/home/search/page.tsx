"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/home/SearchForm";
import { notFound } from "next/navigation";
import { listHotels, type_hotel } from "@/data/typeHotel";
import HotelItem from "./HotelItem";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { StarFilled, StarOutlined } from "@ant-design/icons";

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
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (searchParams.location) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              searchParams.location,
            )}`,
          );
          const data = await response.json();
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      }
    };
    fetchCoordinates();
  }, [searchParams.location]);

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

  const handleStarClick = (star: number) => {
    if (selectedRating === star - 0.5) {
      setSelectedRating(star);
    } else {
      setSelectedRating(star - 0.5);
    }
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
      selectedRating === null || item.reviews.average_rating >= selectedRating;

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
              {searchParams.location}, từ {searchParams.checkin} đến{" "}
              {searchParams.checkout} ({filteredResults.length} kết quả)
            </p>
          </h2>

          <hr className="mb-5" />
          <div className="grid grid-cols-5 gap-4">
            <aside className="col-span-1 p-4 border rounded-lg sticky top-6 h-fit">
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
                <h4 className="font-semibold mb-2">Đánh giá của khách hàng</h4>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="relative cursor-pointer">
                      <StarOutlined
                        className={`text-2xl ${
                          selectedRating && selectedRating >= star - 0.5
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                        onClick={() => handleStarClick(star)}
                      />
                      {selectedRating && selectedRating >= star && (
                        <StarFilled
                          className="absolute top-0 left-0 text-yellow-400 text-2xl"
                          onClick={() => handleStarClick(star)}
                        />
                      )}
                    </div>
                  ))}
                </div>
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
                  <HotelItem key={item.id} id={item.id.toString()} />
                ))}
              </div>

              {filteredResults.length > itemsToShow && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setItemsToShow(itemsToShow + 10)}
                    className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-600 transition-colors duration-200"
                  >
                    Xem thêm
                  </button>
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
