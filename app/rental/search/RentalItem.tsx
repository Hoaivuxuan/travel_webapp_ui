import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faUserFriends,
  faCar,
  faMotorcycle,
  faGasPump,
} from "@fortawesome/free-solid-svg-icons";
import { listings } from "@/data/fakeData";
import ImageComponent from "@/components/GetImage";
import { useRouter } from "next/navigation";

export type RentalItemProps = {
  id: string;
};

export function CarItem({ id }: RentalItemProps) {
  const router = useRouter();
  const item = listings.content.listCars.find(
    (car) => car.id.toString() === id,
  );

  if (!item) {
    return <div>Không tìm thấy thông tin xe.</div>;
  }

  const handleDetailClick = () => {
    router.push(`/rental/cars/${item.id.toString().padStart(6, "0")}`);
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="col-span-1 flex justify-center items-center h-[200px]">
        <ImageComponent
          folder="car"
          id={item.id}
          token={item.token}
          className="rounded-lg w-full h-auto max-h-[280px] mx-auto"
        />
      </div>
      <div className="flex flex-col justify-between col-span-3">
        <div>
          <p className="mb-4 font-bold text-blue-600 text-lg">{item.model}</p>
          <p className="text-sm text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faCar} className="mx-2 w-4" />
            {item.details.transmission}
          </p>
          <p className="text-sm flex items-center text-gray-600">
            <FontAwesomeIcon icon={faUserFriends} className="mx-2 w-4" />
            {item.details.seats} ghế
          </p>
          <p className="text-sm flex items-center text-gray-600">
            <FontAwesomeIcon icon={faSuitcase} className="mx-2 w-4" />
            {item.details.baggage_capacity} hành lý
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-end col-span-1 h-full">
        <div className="flex flex-col justify-end items-end mt-2">
          <p className="text-lg font-bold text-blue-600 text-right">
            {item.price.toLocaleString("vi-VN")} VNĐ
          </p>
          <button
            onClick={handleDetailClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

export function MotorItem({ id }: RentalItemProps) {
  const router = useRouter();
  const item = listings.content.listMotors.find(
    (motor) => motor.id.toString() === id,
  );

  if (!item) {
    return <div>Không tìm thấy thông tin xe.</div>;
  }

  const handleDetailClick = () => {
    router.push(`/rental/motors/${item.id.toString().padStart(6, "0")}`);
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="col-span-1 flex justify-center items-center h-[200px]">
        <ImageComponent
          folder="motor"
          id={item.id}
          token={item.token}
          className="rounded-lg w-full h-auto max-h-[280px] mx-auto"
        />
      </div>
      <div className="flex flex-col justify-between col-span-3">
        <div>
          <p className="mb-4 font-bold text-blue-600 text-lg">{item.model}</p>
          <p className="text-sm text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faMotorcycle} className="mx-2 w-4" />
            {item.details.engine} phân khối
          </p>
          <p className="text-sm flex items-center text-gray-600">
            <FontAwesomeIcon icon={faGasPump} className="mx-2 w-4" />
            {item.details.fuel_type}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-end col-span-1 h-full">
        <div className="flex flex-col justify-end items-end mt-2">
          <p className="text-lg font-bold text-blue-600 text-right">
            {item.price.toLocaleString("vi-VN")} VNĐ
          </p>
          <button
            onClick={handleDetailClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
