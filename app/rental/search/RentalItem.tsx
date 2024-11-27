import {
  DashboardOutlined,
  TeamOutlined,
  CarryOutOutlined,
  FireOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { vehicles } from "@/data/fakeData";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type RentalItemProps = {
  id: string;
};

const handleDetailClick = (
  router: ReturnType<typeof useRouter>,
  id: number,
  facilityId: number | null
) => {
  if (id && facilityId) router.push(`/rental/detail?id=${id.toString().padStart(6, "0")}&facility=${facilityId}`);
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
      <div className="grid grid-cols-5 gap-4" onClick={onFacilityToggle}>
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
            <p className="text-sm text-gray-700 flex items-center">
              <DashboardOutlined className="mx-2 w-4" />
              {item.details.transmission}
            </p>
            <p className="text-sm flex items-center text-gray-600">
              <TeamOutlined className="mx-2 w-4" />
              {item.details.seats} ghế
            </p>
            <p className="text-sm flex items-center text-gray-600">
              <CarryOutOutlined className="mx-2 w-4" />
              {item.details.baggage_capacity} hành lý
            </p>
            <p className="text-sm flex items-center text-gray-600">
              <FireOutlined className="mx-2 w-4" />
              {item.details.fuel}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-end col-span-1 h-full">
          <div className="flex flex-col justify-end items-end mt-2">
            <p className="text-lg font-bold text-blue-600 text-right">
               từ {rentalMinPrice.toLocaleString("vi-VN")} ₫
            </p>
            <button
              onClick={() => handleDetailClick(router, item.id, selectedFacilityId)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
      {isFacilityVisible && (
        <div className="mt-4 py-4 border-t">
          <ul className="space-y-2">
            {item.rentalFacility.map((facility) => (
              <li
                key={facility.id}
                className={`flex justify-between p-2 border rounded-md hover:bg-gray-100 ${selectedFacilityId === facility.id ? "bg-blue-100 border-blue-500" : ""}`}
                onClick={() => setSelectedFacilityId(facility.id)}
              >
                <span>Cơ sở {facility.id}</span>
              </li>
            ))}
          </ul>
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
      <div className="grid grid-cols-5 gap-4" onClick={onFacilityToggle}>
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
            <p className="text-sm text-gray-700 flex items-center">
              <ThunderboltOutlined className="mx-2 w-4" />
              {item.details.engine} phân khối
            </p>
            <p className="text-sm flex items-center text-gray-600">
              <FireOutlined className="mx-2 w-4" />
              {item.details.fuel}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-end col-span-1 h-full">
          <div className="flex flex-col justify-end items-end mt-2">
            <p className="text-lg font-bold text-blue-600 text-right">
               từ {rentalMinPrice.toLocaleString("vi-VN")} ₫
            </p>
            <button
              onClick={() => handleDetailClick(router, item.id, selectedFacilityId)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
      {isFacilityVisible && (
        <div className="mt-4 py-4 border-t">
          <ul className="space-y-2">
            {item.rentalFacility.map((facility) => (
              <li
                key={facility.id}
                className={`flex justify-between p-2 border rounded-md hover:bg-gray-100 ${selectedFacilityId === facility.id ? "bg-blue-100 border-blue-500" : ""}`}
                onClick={() => setSelectedFacilityId(facility.id)}
              >
                <span>Cơ sở {facility.id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
