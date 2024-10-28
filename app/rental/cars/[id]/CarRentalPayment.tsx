import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faGasPump,
  faLocationDot,
  faSuitcase,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { listings } from "@/data/fakeData";
import countries from "@/data/listCountry.json"; // Import danh sách quốc gia

export type RentalItemProps = {
  id: string;
};

interface CarRentalPaymentProps extends RentalItemProps {
  onBack: () => void;
}

const CarRentalPayment = ({ id, onBack }: CarRentalPaymentProps) => {
  const item = listings.content.listCars.find(
    (car) => car.id.toString() === id,
  );

  if (!item) {
    return <div>Không tìm thấy thông tin xe.</div>;
  }

  const [pickupInfo, setPickupInfo] = useState({ date: "", location: "" });
  const [dropoffInfo, setDropoffInfo] = useState({ date: "", location: "" });
  const [driverInfo, setDriverInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDriverInfo((prevInfo) => ({ ...prevInfo, country: value }));
  };

  return (
    <section className="p-6 !pt-2 mx-auto max-w-7xl grid grid-cols-3 gap-4 mb-6">
      <div className="col-span-2">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-2 gap-4 my-4 pb-4">
            <div className="h-[300px]">
              <img
                src={getImageUrl(item.model, item.token)}
                alt={`Car ${item.id}`}
                className="rounded-lg w-full h-auto mx-auto"
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
                  Cung cấp bởi Mioto Ho Chi Minh City
                </p>
              </div>
              <div className="px-2 space-y-2">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUserFriends} className="mr-4 w-4" />
                  <span>{item.details.seats} chỗ ngồi</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCar} className="mr-4 w-4" />
                  <span>{item.details.transmission}</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faSuitcase} className="mr-4 w-4" />
                  <span>{item.details.baggage_capacity} hành lý</span>
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
          <h3 className="text-xl font-bold mb-4">
            Thông tin người lái xe chính
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Tên</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={driverInfo.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Tên"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Họ</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={driverInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Họ"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={driverInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Điện thoại</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={driverInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="+84"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Quốc gia</label>
                <select
                  id="country"
                  name="country"
                  value={driverInfo.country}
                  onChange={handleCountryChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Chọn quốc gia</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-2" />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Thông tin người lái xe</h3>
        </div>
      </div>

      <div className="col-span-1 space-y-4">
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
          <h3 className="text-lg font-bold mb-4">Lựa chọn tuyệt vời!</h3>
          <div className="grid grid-cols-1 gap-4">
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
      </div>

      <div className="col-span-1">
        <button
          className="bg-[#018DF3] text-white py-2 rounded mt-4 w-full"
          onClick={onBack}
        >
          QUAY LẠI
        </button>
      </div>
      <div className="col-span-1">
        <button className="bg-[#018DF3] text-white py-2 rounded mt-4 w-full">
          THANH TOÁN
        </button>
      </div>
    </section>
  );
};

export default CarRentalPayment;
