import { FaCar, FaMotorcycle, FaUsers, FaLuggageCart, FaGasPump } from 'react-icons/fa';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Radio, Tag } from "antd";
import { encodeToJWT } from '@/utils/JWT';
import { typeVehicleTags } from '@/data/defaultValues';

const calculateDaysBetween = (s1: string, s2: string): number => {
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const date1 = parseDate(s1);
  const date2 = parseDate(s2);
  const diffInMilliseconds = date2.getTime() - date1.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return diffInDays;
};

const handleDetailClick = (
  router: ReturnType<typeof useRouter>,
  vehicle: any,
  facility: number | null
) => {
  const search = localStorage.getItem("searchVehicle");
  if ((facility && search)) {
    try {
      const searchObject = JSON.parse(search);
      const rentalVehicle = {...searchObject, vehicle}
      const query = new URLSearchParams({
        facility: facility.toString(),
        rentalVehicle: encodeToJWT(rentalVehicle),
      });

      router.push(`/rental-vehicle/vehicle?url=2&${query.toString()}`);
    } catch (error) {
    }
  }
};

export function VehicleItem({
  params, vehicle, isFacilityVisible, onFacilityToggle,
} : {
  params: any;
  vehicle: any;
  isFacilityVisible: boolean;
  onFacilityToggle: () => void;
}) {
  const router = useRouter();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const rentalMinPrice = Math.min(...vehicle.facilities.map((facility: any) => facility.price));

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
            src={vehicle.image_url}
            alt={`Vehicle ${vehicle.id}`}
            className="rounded-l-lg h-full w-auto"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col justify-between col-span-3 py-4">
          <div>
            <div className="mb-3">
              <div className="flex items-center">
                {typeVehicleTags.filter(tag => tag.type === vehicle.type).map(tag => (
                  <Tag color={tag.color} key={tag.type} className="text-sm">
                    <tag.icon className="my-1" />
                  </Tag>
                ))}
                <Tag color={"blue"} className="text-sm">
                  {vehicle.details.brand}
                </Tag>
                <p className="font-bold text-blue-600 text-lg">{vehicle.model}</p>
              </div>
            </div>
            {(vehicle.type === "car") ? (
              <div className="w-1/2 grid grid-cols-2 gap-1">
                <p className="text-sm flex items-center text-gray-600">
                  <FaCar className="mx-2 w-4" />
                  {vehicle.details.transmission}
                </p>
                <p className="text-sm flex items-center text-gray-600">
                  <FaUsers className="mx-2 w-4" />
                  {vehicle.details.seats} ghế
                </p>
                <p className="text-sm flex items-center text-gray-600">
                  <FaLuggageCart className="mx-2 w-4" />
                  {vehicle.details.baggage_capacity} hành lý
                </p>
                <p className="text-sm flex items-center text-gray-600">
                  <FaGasPump className="mx-2 w-4" />
                  {vehicle.details.fuel}
                </p>
              </div>
            ) : (
              <div className="w-1/2 grid grid-cols-2 gap-1">
                <p className="text-sm flex items-center text-gray-600">
                  <FaMotorcycle className="mx-2 w-4" />
                  {vehicle.details.engine} phân khối
                </p>
                <p className="text-sm flex items-center text-gray-600">
                  <FaGasPump className="mx-2 w-4" />
                  {vehicle.details.fuel}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-end col-span-1 h-full">
          <div className="flex flex-col justify-end items-end mt-2">
            <p className="text-sm">
              Giá cho {calculateDaysBetween(params?.pickup, params?.return)} ngày
            </p>
            <p className="text-lg font-bold text-blue-600 text-right">
               từ {rentalMinPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
            </p>
            {(isFacilityVisible && selectedFacilityId) && (
              <Button
                onClick={() => {
                  handleDetailClick(router, vehicle, selectedFacilityId);
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
            {vehicle.facilities.map((facility: any) => (
              <Radio
                key={facility.id}
                value={facility.id}
                className={`w-full p-2 border-t border-b ${
                  selectedFacilityId === facility.id ? "bg-blue-100" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="mr-2 flex items-center justify-center flex-shrink-0 w-10 h-10 text-lg font-bold text-white bg-blue-600 rounded-sm">
                    {facility.name.charAt(0).toUpperCase()}
                  </p>
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
