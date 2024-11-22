"use client";

import { notFound } from "next/navigation";
import { useState, useEffect ,useMemo } from "react";
import { vehicles } from "@/data/fakeData";
import { CarItem, MotorItem } from "./RentalItem";
import RentalSearchForm from "@/components/rental/RentalSearchForm";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type Props = {
  searchParams: RentalSearchParams;
};

export type RentalSearchParams = {
  url: URL;
  location: string;
  checkin: string;
  checkout: string;
  type: string;
};


const RentalSearchPage: React.FC<Props> = ({ searchParams }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["car", "motor"]);
  const [itemsToShow, setItemsToShow] = useState(10);

  const searchResult = useMemo(() => {
    return vehicles.sort((a, b) => a.model.localeCompare(b.model));
  }, []);

  const minPrice = Math.min(...vehicles.map((item) => item.price));
  const maxPrice = Math.max(...vehicles.map((item) => item.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const filteredResults = useMemo(() => {
    return searchResult.filter(
      (item) =>
        selectedTypes.includes(item.type) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    );
  }, [searchResult, selectedTypes, priceRange]);

  const displayedResults = filteredResults.slice(0, itemsToShow);

  const handleCheckboxChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  useEffect(() => {
    if (!searchParams.url) {
      notFound();
    }
  }, [searchParams.url]);

  if (!searchParams.url) {
    return (
      <div className="text-center py-4">
        <h2 className="text-xl font-semibold">
          Không có kết quả nào cho tìm kiếm của bạn.
        </h2>
      </div>
    );
  }

  return (
    <section>
      <div className="py-6 mx-auto max-w-7xl">
        <div className="py-4">
          <RentalSearchForm />
        </div>

        <h2 className="py-4">
          <span className="ml-2">
            {searchParams.location}, từ {searchParams.checkin} đến{" "}
            {searchParams.checkout} ({filteredResults.length} kết quả)
          </span>
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
                value={priceRange}
                min={minPrice}
                max={maxPrice}
                onChange={handlePriceChange}
                trackStyle={[{ backgroundColor: "#1D4ED8" }]} // Màu sắc thanh trượt
                handleStyle={[
                  { borderColor: "#1D4ED8" }, // Màu nút trượt trái
                  { borderColor: "#1D4ED8" }, // Màu nút trượt phải
                ]}
              />
              <div className="flex justify-between mt-2 text-xs">
                <span>{priceRange[0].toLocaleString("vi-VN")} VNĐ</span>
                <span>{priceRange[1].toLocaleString("vi-VN")} VNĐ</span>
              </div>
            </div>

            <hr className="my-2" />
            <div className="mb-6 text-sm">
              <h4 className="font-semibold mb-2">Loại phương tiện</h4>
              <ul>
                <li className="mb-1 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedTypes.includes("car")}
                    onChange={() => handleCheckboxChange("car")}
                  />
                  <label className="flex-grow">Ô tô</label>
                </li>
                <li className="mb-1 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedTypes.includes("motor")}
                    onChange={() => handleCheckboxChange("motor")}
                  />
                  <label className="flex-grow">Mô tô</label>
                </li>
              </ul>
            </div>
          </aside>

          <div className="col-span-4">
            <div className="space-y-4">
              {displayedResults.map((item) =>
                item.type === "car" ? (
                  <CarItem key={item.id} id={item.id.toString()} />
                ) : (
                  <MotorItem key={item.id} id={item.id.toString()} />
                ),
              )}
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
    </section>
  );
}

export default RentalSearchPage;
