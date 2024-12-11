import { FaCar, FaMotorcycle, FaUsers, FaLuggageCart, FaGasPump } from 'react-icons/fa';
import Image from "next/image";
import jwt from "jwt-simple";
import { rentalFacilities, vehicles } from "@/data/fakeData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Radio } from "antd";

const SECRET_KEY = "4e6f7274682072616e646f6d20736563726574206b65792e";

const handleDetailClick = (
  router: ReturnType<typeof useRouter>,
  id: number,
  facility: number | null
) => {
  const search = localStorage.getItem("searchVehicle");
  let searchObject;
  if ((id && facility && search)) {
    try {
      searchObject = JSON.parse(search);
      const token = jwt.encode(searchObject, SECRET_KEY);
      const query = new URLSearchParams({
        id: id.toString().padStart(6, "0"),
        facility: facility.toString(),
        token: token,
      });
      router.push(`/rental/detail?url=2&${query.toString()}`);
    } catch (error) {
      searchObject = null;
    }
  }
};

export function CarItem({
  id,
  isFacilityVisible,
  onFacilityToggle,
}: {
  id: string;
  isFacilityVisible: boolean;
  onFacilityToggle: () => void;
}) {
  const router = useRouter();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const item = vehicles.find((vehicle) => vehicle.id.toString() === id && vehicle.type === "car");
  if (!item) {
    return <div>Không tìm thấy thông tin ô tô.</div>;
  }

  const rentalMinPrice = Math.min(...item.rentalFacility.map((facility) => facility.price));

  return (
    <div className="p-4 border rounded-lg">
      <div
        className="grid grid-cols-5 gap-4"
        onClick={() => {
          onFacilityToggle();
          setSelectedFacilityId(null);
        }}
      >
        <div className="col-span-1 flex justify-center items-center h-[200px]">
          <Image
            src={`https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg`}
            alt={`Image of ${item.id}`}
            className="rounded-l-lg h-full w-auto"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col justify-between col-span-3">
          <div>
            <p className="mb-4 font-bold text-blue-600 text-lg">{item.model}</p>
            <div className="space-y-1">
              <p className="text-sm flex items-center text-gray-600">
                <FaCar className="mx-2 w-4" />
                {item.details.transmission}
              </p>
              <p className="text-sm flex items-center text-gray-600">
                <FaUsers className="mx-2 w-4" />
                {item.details.seats} ghế
              </p>
              <p className="text-sm flex items-center text-gray-600">
                <FaLuggageCart className="mx-2 w-4" />
                {item.details.baggage_capacity} hành lý
              </p>
              <p className="text-sm flex items-center text-gray-600">
                <FaGasPump className="mx-2 w-4" />
                {item.details.fuel}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end col-span-1 h-full">
          <div className="flex flex-col justify-end items-end mt-2">
            <p className="text-sm">Giá cho 3 ngày</p>
            <p className="text-lg font-bold text-blue-600 text-right">
               từ {rentalMinPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
            </p>
            {(isFacilityVisible && selectedFacilityId) && (
              <Button
                onClick={() => {
                  handleDetailClick(router, item.id, selectedFacilityId);
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
              >
                Xem chi tiết
              </Button>
            )}
          </div>
        </div>
      </div>
      {isFacilityVisible && (
        <div className="mt-4 py-4">
          <Radio.Group
            onChange={(e) => setSelectedFacilityId(e.target.value)}
            value={selectedFacilityId}
            className="w-full space-y-2"
          >
            {rentalFacilities.map((facility) => (
              <Radio
                key={facility.id}
                value={facility.id}
                className={`w-full p-2 border-t border-b ${
                  selectedFacilityId === facility.id ? "bg-blue-100" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <p>{facility.name}</p>
                </div>
              </Radio>
            ))}
          </Radio.Group>
        </div>
      )}
    </div>
  );
}

export function MotorItem({
  id,
  isFacilityVisible,
  onFacilityToggle,
}: {
  id: string;
  isFacilityVisible: boolean;
  onFacilityToggle: () => void;
}) {
  const router = useRouter();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const item = vehicles.find((vehicle) => vehicle.id.toString() === id && vehicle.type === "motor");
  if (!item) {
    return <div>Không tìm thấy thông tin xe máy.</div>;
  }

  const rentalMinPrice = Math.min(...item.rentalFacility.map((facility) => facility.price));

  return (
    <div className="p-4 border rounded-lg">
      <div
        className="grid grid-cols-5 gap-4"
        onClick={() => {
          onFacilityToggle();
          setSelectedFacilityId(null);
        }}
      >
        <div className="col-span-1 flex justify-center items-center h-[200px]">
          <Image
            src={`https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg`}
            alt={`Image of ${item.id}`}
            className="rounded-l-lg h-full w-auto"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col justify-between col-span-3">
          <div>
            <p className="mb-4 font-bold text-blue-600 text-lg">{item.model}</p>
            <div className='space-y-1'>
              <p className="text-sm text-gray-700 flex items-center">
                <FaMotorcycle className="mx-2 w-4" />
                {item.details.engine} phân khối
              </p>
              <p className="text-sm flex items-center text-gray-600">
                <FaGasPump className="mx-2 w-4" />
                {item.details.fuel}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end col-span-1 h-full">
          <div className="flex flex-col justify-end items-end mt-2">
            <p className="text-sm">Giá cho 3 ngày</p>
            <p className="text-lg font-bold text-blue-600 text-right">
               từ {rentalMinPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
            </p>
            {(isFacilityVisible && selectedFacilityId) && (
              <Button
                onClick={() => {
                  handleDetailClick(router, item.id, selectedFacilityId);
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
              >
                Xem chi tiết
              </Button>
            )}
          </div>
        </div>
      </div>
      {isFacilityVisible && (
        <div className="mt-4 py-4">
          <Radio.Group
            onChange={(e) => setSelectedFacilityId(e.target.value)}
            value={selectedFacilityId}
            className="w-full space-y-2"
          >
            {rentalFacilities.map((facility) => (
              <Radio
                key={facility.id}
                value={facility.id}
                className={`w-full p-2 border-t border-b ${
                  selectedFacilityId === facility.id ? "bg-blue-100" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="mr-2">{facility.name}</p>
                </div>
              </Radio>
            ))}
          </Radio.Group>
        </div>
      )}
    </div>
  );
}
