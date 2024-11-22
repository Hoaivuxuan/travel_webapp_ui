import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faLocationDot, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { vehicles } from "@/data/fakeData";
import { useEffect, useState } from "react";
import Image from "next/image";
import NotFound from "@/components/NotFound";
import { notFound } from "next/navigation";

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
  const [pickupInfo, setPickupInfo] = useState({ date: "", location: "" });
  const [dropoffInfo, setDropoffInfo] = useState({ date: "", location: "" });

  const item = vehicles.find((vehicle) => vehicle.id.toString() === id);
  const services = [
    "Đánh giá của khách hàng: 8,6 / 10",
    "Chính sách nhiên liệu phổ biến nhất",
    "Không phải chờ đợi lâu",
    "Quầy thanh toán dễ tìm",
    "Nhân viên quầy thanh toán sẵn sàng hỗ trợ",
    "Hủy đặt thuê miễn phí"
  ];
  const policy = [
    "Miễn phí hủy tối đa 48 giờ trước khi nhận xe",
    "Bảo hiểm hư hại do va chạm với mức miễn thường bằng 0 VNĐ",
    "Bảo hiểm Mất trộm với mức miễn thường bằng 0 VNĐ",
    "Số kilômét không giới hạn",
  ];

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

  if (!item) {
    return notFound();
  }

  return (
    <section className="p-6 !pt-2 mx-auto max-w-7xl grid grid-cols-3 gap-4 mb-6">
      <div className="col-span-2">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-2 gap-4 my-4 pb-4">
            <div className="h-[300px]">
              <Image
                src={`https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg`}
                alt={`Image of ${item.model}`}
                className="rounded-l-lg h-full w-auto"
                width={300}
                height={300}
              />
            </div>
            <div>
              <div className="pb-4">
                <h1 className="text-2xl font-bold">{item.model}</h1>
                <p className="text-gray-500 text-sm">Cung cấp bởi Motor Hanoi</p>
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
            {services.map((text, index) => (
              <div className="flex items-start space-x-2" key={index}>
                <span className="text-green-600">✔</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-2" />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">Giá đã bao gồm:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policy.map((text, index) => (
              <div className="flex items-start space-x-2" key={index}>
                <span className="text-green-600">✔</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-1 space-y-4">
        <div className="p-4 bg-white border rounded-lg">
          <h3 className="text-lg font-bold mb-4">Nhận xe và trả xe</h3>
          <div className="space-y-6 relative">
            <div className="h-[74px] absolute left-2 top-6 bottom-6 border border-blue-300"></div>
            {[pickupInfo, dropoffInfo].map((info, index) => (
              <div className="flex items-start space-x-2" key={index}>
                <div className="flex-none">
                  <FontAwesomeIcon icon={faLocationDot} className="w-5 text-blue-600" />
                </div>
                <div className="flex-grow px-1">
                  <div className="mb-1 text-gray-700">{info.date}</div>
                  <div className="font-bold">{info.location}</div>
                  <a href="#" className="text-blue-600 hover:underline">
                    {index === 0 ? "Xem hướng dẫn nhận xe" : "Xem hướng dẫn trả xe"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white border rounded-lg">
          <h3 className="text-lg font-bold mb-4">Chi tiết giá cả</h3>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Phí thuê xe</span>
              <span className="text-gray-700">{item.price} VNĐ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Dịch vụ khác</span>
              <span className="text-gray-700">0 VNĐ</span>
            </div>

            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span className="text-gray-700">Giá cho 4 ngày</span>
              <span className="text-gray-700">{item.price} VNĐ</span>
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
