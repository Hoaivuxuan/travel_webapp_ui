"use client";

import { notFound } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { VehicleItem } from "./RentalItem";
import { Slider, Checkbox, Button } from "antd";
import RentalSearchForm from "@/components/rental/RentalSearchForm";
import VehicleService from "@/services/VehicleService";

type Props = {
  searchParams: RentalSearchParams;
};

export type RentalSearchParams = {
  url: URL;
  location: string;
  city: number;
  pickup: string;
  return: string;
};

const RentalSearchPage: React.FC<Props> = ({ searchParams }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState([]);
  const [listBrand, setListBrand] = useState<any>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {  
    const fetchFilter = async () => {
      try {
        const data = (await VehicleService.getByCity(0)).data;
        const brands = Array.from(new Set<string>(data.vehicles.map((vehicle: any) => vehicle.details.brand)))
          .sort((a, b) => a.localeCompare(b))
          .map((brand, id) => ({ id, name: brand }));
  
        setListBrand(brands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchVehicles = async () => {
      try {
        const data = (await VehicleService.getByCity(searchParams.city)).data;
        const listData = data.vehicles.sort((a: any, b: any) => a.model.localeCompare(b.model));
  
        const minPrice = Math.min(
          ...listData.map((vehicle: any) => Math.min(...vehicle.facilities.map((facility: any) => facility.price)))
        );
        const maxPrice = Math.max(
          ...listData.map((vehicle: any) => Math.min(...vehicle.facilities.map((facility: any) => facility.price)))
        );
  
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setPriceRange([minPrice, maxPrice]);
        setVehicles(listData);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (!searchParams.url) return;
    
    fetchFilter();
    fetchVehicles();
  }, [searchParams]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) setPriceRange(value as [number, number]);
  };

  const filteredResults = useMemo(() => {
    return vehicles.filter((item: any) =>
      (selectedTypes.length === 0 || selectedTypes.includes(item.type)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(item.details.brand)) &&
      Math.min(...item.facilities.map((facility: any) => facility.price)) >= priceRange[0] &&
      Math.min(...item.facilities.map((facility: any) => facility.price)) <= priceRange[1]
    );
  }, [vehicles, selectedTypes, selectedBrands, priceRange]);

  if (!searchParams.url) return;

  return (
    <section>
      <div className="py-6 mx-auto max-w-7xl">
        <div className="py-4">
          <RentalSearchForm />
        </div>

        <h2 className="py-4">
          <span className="ml-2">
            {`${searchParams.location}, từ ${searchParams.pickup} đến ${searchParams.return} (${filteredResults.length} kết quả)`}
          </span>
        </h2>
        <hr className="mb-5" />

        <div className="grid grid-cols-5 gap-4">
          <aside className="col-span-1 p-4 border rounded-lg sticky top-6 h-fit">
            <h3 className="font-bold text-sm mb-3">Chọn lọc theo:</h3>
            <div className="text-sm border-t py-4">
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
                <span>
                  {priceRange[0].toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                </span>
                <span>
                  {priceRange[1].toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                </span>
              </div>
            </div>
            <div className="text-sm border-t py-4">
              <h4 className="font-semibold mb-2">Loại phương tiện</h4>
              <Checkbox.Group value={selectedTypes} onChange={setSelectedTypes}>
                <Checkbox value="car" className="mb-1 w-full"> Ô TÔ </Checkbox>
                <Checkbox value="motor" className="mb-1 w-full"> XE MÁY </Checkbox>
              </Checkbox.Group>
            </div>
            <div className="text-sm border-t py-4">
              <h4 className="font-semibold mb-2">Thương hiệu</h4>
              <Checkbox.Group
                value={selectedBrands}
                onChange={(values) => setSelectedBrands(values as string[])}
              >
                {(Array.isArray(listBrand) && listBrand.length > 0) && (
                  listBrand.map((type: any) => (
                    <Checkbox key={type.id} value={type.name} className="mb-1 w-full">
                      {type.name}
                    </Checkbox>
                  ))
                )}
              </Checkbox.Group>
            </div>
          </aside>

          <div className="col-span-4">
            <div className="space-y-4">
              {filteredResults.map((item: any) =>
                <VehicleItem
                  key={item.id}
                  params={searchParams}
                  vehicle={item}
                  isFacilityVisible={selectedItemId === item.id.toString()}
                  onFacilityToggle={() => setSelectedItemId(selectedItemId === item.id.toString() ? null : item.id.toString())}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalSearchPage;
