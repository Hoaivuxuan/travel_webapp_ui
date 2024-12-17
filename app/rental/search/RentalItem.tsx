import { FaCar, FaMotorcycle, FaUsers, FaLuggageCart, FaGasPump } from 'react-icons/fa';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Radio } from "antd";
import { encodeToJWT } from '@/utils/JWT';

const bearerToken = localStorage.getItem("token");

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

      router.push(`/rental/detail?url=2&${query.toString()}`);
    } catch (error) {
    }
  }
};

export function VehicleItem({
  vehicle, isFacilityVisible, onFacilityToggle,
} : {
  vehicle: any;
  isFacilityVisible: boolean;
  onFacilityToggle: () => void;
}) {
  const router = useRouter();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);

  // useEffect(() => {
  //   const fetchVehicle = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`http://localhost:8080/vehicles/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${bearerToken}`,
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error("Không thể lấy thông tin phương tiện");
  //       }
  //       const data = await response.json();
  //       setVehicle(data);
  //     } catch (err: any) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchVehicle();
  // }, [id]);

  // if (loading) {
  //   return <div>Đang tải thông tin phương tiện...</div>;
  // }
  // if (error || !vehicle) {
  //   return <div>Không tìm thấy thông tin phương tiện.</div>;
  // }

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
            src={`https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg`}
            alt={`Vehicle ${vehicle.id}`}
            className="rounded-l-lg h-full w-auto"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-col justify-between col-span-3">
          <div>
            <div className="mb-4">
              <p className="mb-1 text-xs text-green-600 bg-green-200 rounded-sm px-2 py-1 inline-block">
                {vehicle.details.brand}
              </p>
              <p className="font-bold text-blue-600 text-lg">{vehicle.model}</p>
            </div>
            { vehicle.type === "car" ? (
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
            <p className="text-sm">Giá cho 3 ngày</p>
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
