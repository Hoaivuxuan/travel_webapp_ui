// RentalDetailSection.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faGasPump,
  faLocationDot,
  faMotorcycle,
  faSuitcase,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { listings } from "@/data/fakeData";
import { useEffect, useState } from "react";

export type RentalItemProps = {
  id: string;
};

interface MotorRentalDetailProps extends RentalItemProps {
  onContinue: () => void;
}

const MotorRentalDetail: React.FC<MotorRentalDetailProps> = ({
  id,
  onContinue,
}) => {
  const item = listings.content.listMotors.find(
    (motor) => motor.id.toString() === id,
  );

  if (!item) {
    return <div>Không tìm thấy thông tin xe.</div>;
  }

  const [pickupInfo, setPickupInfo] = useState({ date: "", location: "" });
  const [dropoffInfo, setDropoffInfo] = useState({ date: "", location: "" });

  useEffect(() => {
    const storedValues = localStorage.getItem("rentalSearchFormValues");
    if (storedValues) {
      const { dates, location } = JSON.parse(storedValues);
      setPickupInfo({
        date: new Date(dates.startDate).toLocaleDateString("vi-VN"),
        location,
      });
      setDropoffInfo({
        date: new Date(dates.endDate).toLocaleDateString("vi-VN"),
        location,
      });
    }
  }, []);

  const getImageUrl = (model: string, token: string) => {
    const img_model = model.replaceAll(" ", "-").toLowerCase();
    return `https://firebasestorage.googleapis.com/v0/b/travel-web-32360.appspot.com/o/${img_model}.jpg?alt=media&token=${token}`;
  };

  return (
    <section className="p-6 !pt-2 mx-auto max-w-7xl grid grid-cols-3 gap-4 mb-6">
      <div className="col-span-2">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-2 gap-4 my-4 pb-4">
            <div className="h-[300px]">
              <img
                src={getImageUrl(item.model, item.token)}
                alt={`Motor ${item.id}`}
                className="rounded-lg w-full h-auto max-h-[280px] mx-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg";
                }}
              />
            </div>
            <div>
              <div className="pb-4">
                <h1 className="text-2xl font-bold">{item.model}</h1>
                <p className="text-gray-500 text-sm">
                  Cung cấp bởi Motor Hanoi
                </p>
              </div>
              <div className="px-2 space-y-2">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faMotorcycle} className="mr-4 w-4" />
                  <span>{item.details.engine} phân khối</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faGasPump} className="mr-4 w-4" />
                  <span>{item.details.fuel_type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-2" />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">Lựa chọn tuyệt vời!</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>Đánh giá của khách hàng: 8,6 / 10</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>Chính sách nhiên liệu phổ biến nhất</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>Không phải chờ đợi lâu</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>Quầy thanh toán dễ tìm</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>Nhân viên quầy thanh toán sẵn sàng hỗ trợ</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>Hủy đặt thuê miễn phí</span>
            </div>
          </div>
        </div>

        <hr className="my-2" />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">Giá đã bao gồm:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>Miễn phí hủy tối đa 48 giờ trước khi nhận xe</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>
                Bảo hiểm hư hại do va chạm với mức miễn thường bằng 0 VNĐ
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>Bảo hiểm Mất trộm với mức miễn thường bằng 0 VNĐ</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600">✔</span>
              <span>Số kilômét không giới hạn</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1 grid grid-cols-1 gap-4">
        <div className="p-4 bg-white border rounded-lg">
          <h3 className="text-lg font-bold mb-4">Nhận xe và trả xe</h3>
          <div className="space-y-6 relative">
            <div className="h-[74px] absolute left-2 top-6 bottom-6 border border-blue-300"></div>
            <div className="flex items-start space-x-2">
              <div className="flex-none">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="w-5 text-blue-600"
                />
              </div>
              <div className="flex-grow px-1">
                <div className="mb-1 text-gray-700">{pickupInfo.date}</div>
                <div className="font-bold">{pickupInfo.location}</div>
                <a href="#" className="text-blue-600 hover:underline">
                  Xem hướng dẫn nhận xe
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="flex-none">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="w-5 text-blue-600"
                />
              </div>
              <div className="flex-grow px-1">
                <div className="mb-1 text-gray-700">{dropoffInfo.date}</div>
                <div className="font-bold">{dropoffInfo.location}</div>
                <a href="#" className="text-blue-600 hover:underline">
                  Xem hướng dẫn trả xe
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-lg">
          <h3 className="text-lg font-bold mb-4">Chi tiết giá cả</h3>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Phí thuê xe</span>
              <span className="text-gray-700">
                {item.price.toLocaleString()} VNĐ
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Dịch vụ khác</span>
              <span className="text-gray-700">0 VNĐ</span>
            </div>

            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span className="text-gray-700">Giá cho 4 ngày</span>
              <span className="text-gray-700">
                {item.price.toLocaleString()} VNĐ
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border rounded-lg">
          <h3 className="text-lg font-bold mb-4">Thông tin thêm</h3>
        </div>
      </div>

      <div className="col-span-1"></div>
      <div className="col-span-1">
        <button
          className="bg-[#018DF3] text-white py-2 rounded mt-4 w-full"
          onClick={onContinue}
        >
          ĐẾN BƯỚC THANH TOÁN
        </button>
      </div>
    </section>
  );
};

export default MotorRentalDetail;
