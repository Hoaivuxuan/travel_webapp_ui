"use client";

import { notFound } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { vehicles } from "@/data/fakeData";
import { CarItem, MotorItem } from "./RentalItem";
import RentalSearchForm from "@/components/rental/RentalSearchForm";
import { Slider, Checkbox, Button } from "antd";

type Props = {
  searchParams: RentalSearchParams;
};

export type RentalSearchParams = {
  url: URL;
  location: string;
  pickup: string;
  return: string;
};

const RentalSearchPage: React.FC<Props> = ({ searchParams }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["car", "motor"]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [itemsToShow, setItemsToShow] = useState(10);

  const searchResult = useMemo(() => {
    return vehicles.sort((a, b) => a.model.localeCompare(b.model));
  }, []);

  const minPrice = Math.min(
    ...vehicles.map((item) =>
      Math.min(...item.rentalFacility.map((facility) => facility.price)),
    ),
  );
  const maxPrice = Math.max(
    ...vehicles.map((item) =>
      Math.max(...item.rentalFacility.map((facility) => facility.price)),
    ),
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value as [number, number]);
    }
  };

  const filteredResults = useMemo(() => {
    return searchResult.filter(
      (item) =>
        selectedTypes.includes(item.type) &&
        Math.min(...item.rentalFacility.map((facility) => facility.price)) >= priceRange[0] &&
        Math.min(...item.rentalFacility.map((facility) => facility.price)) <= priceRange[1]
    );
  }, [searchResult, selectedTypes, priceRange]);

  const displayedResults = filteredResults.slice(0, itemsToShow);

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
            {searchParams.location},{" "}
            từ {searchParams.pickup} đến {searchParams.return} ({filteredResults.length} kết quả)
          </span>
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
                value={priceRange}
                min={minPrice}
                max={maxPrice}
                onChange={handlePriceChange}
                trackStyle={[{ backgroundColor: "#1D4ED8" }]}
                handleStyle={[
                  { borderColor: "#1D4ED8" },
                  { borderColor: "#1D4ED8" },
                ]}
              />
              <div className="flex justify-between mt-2 text-xs">
                <span>{priceRange[0].toLocaleString("vi-VN")} ₫</span>
                <span>{priceRange[1].toLocaleString("vi-VN")} ₫</span>
              </div>
            </div>

            <hr className="my-2" />
            <div className="mb-6 text-sm">
              <h4 className="font-semibold mb-2">Loại phương tiện</h4>
              <Checkbox.Group value={selectedTypes} onChange={setSelectedTypes}>
                <Checkbox value="car" className="mb-1 w-full">
                  Ô tô
                </Checkbox>
                <Checkbox value="motor" className="mb-1 w-full">
                  Mô tô
                </Checkbox>
              </Checkbox.Group>
            </div>
          </aside>

          <div className="col-span-4">
            <div className="space-y-4">
              {displayedResults.map((item) =>
                item.type === "car" ? (
                  <CarItem
                    key={item.id}
                    id={item.id.toString()}
                    isFacilityVisible={selectedItemId === item.id.toString()}
                    onFacilityToggle={() => setSelectedItemId(selectedItemId === item.id.toString() ? null : item.id.toString())}
                  />
                ) : (
                  <MotorItem
                    key={item.id}
                    id={item.id.toString()}
                    isFacilityVisible={selectedItemId === item.id.toString()}
                    onFacilityToggle={() => setSelectedItemId(selectedItemId === item.id.toString() ? null : item.id.toString())}
                  />
                )
              )}
            </div>

            {filteredResults.length > itemsToShow && (
              <div className="mt-4 text-center">
                <Button
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
    </section>
  );
};

export default RentalSearchPage;
