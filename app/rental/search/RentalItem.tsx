import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faUserFriends,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { listings } from "@/data/fakeData";

export type RentalItemProps = {
  id: string;
};

const getImageUrl = (model: string, token: string) => {
  const img_model = model.replaceAll(" ", "-").toLowerCase();
  return `https://firebasestorage.googleapis.com/v0/b/travel-web-32360.appspot.com/o/${img_model}.jpg?alt=media&token=${token}`;
};

const defaultImage =
  "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg";

export function CarItem({ id }: RentalItemProps) {
  const item = listings.content.listCars.find(
    (car) => car.id.toString() === id,
  );

  if (!item) {
    return <div>Không tìm thấy thông tin xe.</div>;
  }

  return (
    <div className="grid grid-cols-5 gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="col-span-1 flex justify-center items-center h-[200px]">
        <img
          src={getImageUrl(item.model, item.token)}
          alt={`Image of ${item.model}`}
          className="rounded-lg w-full h-auto"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
      </div>
      <div className="flex flex-col justify-between col-span-3">
        <div>
          <p className="mb-4 font-bold text-blue-600 text-lg">{item.model}</p>
          <p className="text-sm text-gray-700 flex items-center">
            <FontAwesomeIcon icon={faCar} className="mr-2 w-4" />
            {item.details.transmission.toUpperCase()}
          </p>
          <p className="text-sm flex items-center text-gray-600">
            <FontAwesomeIcon icon={faUserFriends} className="mr-2 w-4" />
            {item.details.seats} ghế
          </p>
          <p className="text-sm flex items-center text-gray-600">
            <FontAwesomeIcon icon={faSuitcase} className="mr-2 w-4" />
            {item.details.baggage_capacity} hành lý
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-end col-span-1 h-full">
        <div className="flex flex-col justify-end items-end mt-2">
          <p className="text-lg font-bold text-blue-600 text-right">
            {item.price.toLocaleString("vi-VN")} VNĐ
          </p>
          <Link
            href={`/rental/cars/${item.id}`}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

export function MotorItem({ id }: RentalItemProps) {
  const item = listings.content.listMotors.find(
    (motor) => motor.id.toString() === id,
  );

  if (!item) {
    return <div>Không tìm thấy thông tin xe máy.</div>;
  }

  return (
    <div className="grid grid-cols-5 gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="col-span-1 flex justify-center items-center h-[200px]">
        <img
          src={getImageUrl(item.model, item.token)}
          alt={`Image of ${item.model}`}
          className="rounded-lg w-full h-auto"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
      </div>
      <div className="flex flex-col justify-between col-span-3">
        <div>
          <p className="mb-4 font-bold text-blue-600 text-lg">{item.model}</p>
          <p className="text-sm flex items-center text-gray-600">
            <FontAwesomeIcon icon={faUserFriends} className="mr-2 w-4" />
            {item.details.seats} ghế
          </p>
          <p className="text-sm flex items-center text-gray-600">
            <FontAwesomeIcon icon={faSuitcase} className="mr-2 w-4" />
            {item.details.baggage_capacity} hành lý
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-end col-span-1 h-full">
        <div className="flex flex-col justify-end items-end mt-2">
          <p className="text-lg font-bold text-blue-600 text-right">
            {item.price.toLocaleString("vi-VN")} VNĐ
          </p>
          <Link
            href={`/rental/motors/${item.id}`}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-semibold mt-2"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
