import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faGasPump,
  faSuitcase,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { vehicles } from "@/data/fakeData";
import countries from "@/data/listCountry.json";
import Image from "next/image";
import NotFound from "@/components/NotFound";

export type RentalItemProps = {
  id: string;
};

interface CarRentalPaymentProps extends RentalItemProps {
  onBack: () => void;
}

const CarRentalPayment = ({ id, onBack }: CarRentalPaymentProps) => {
  const item = vehicles.find((vehicle) => vehicle.id.toString() === id);

  const [pickupInfo, setPickupInfo] = useState({ date: "", location: "" });
  const [dropoffInfo, setDropoffInfo] = useState({ date: "", location: "" });
  const [driverInfo, setDriverInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCountry: "",
    country: "",
  });

  const [paymentAddress, setPaymentAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    phoneCountry: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const [services, setServices] = useState({
    childSeat: 0,
    gps: 0,
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

    const storedServices = localStorage.getItem("rentalServices");
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }

    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setDriverInfo((prevInfo) => ({ ...prevInfo, email: userEmail }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleDriverInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setDriverInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePaymentAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPaymentAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const serviceCost = 300000;
  const totalServiceCost = (services.childSeat + services.gps) * serviceCost;

  if (!item) {
    return <NotFound />;
  }

  return (
    <section className="p-6 !pt-2 mx-auto max-w-7xl grid grid-cols-3 gap-4 mb-6">
      <div className="col-span-2">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-2 gap-4 my-4 pb-4">
            <div className="h-[300px]">
              <Image
                src={`https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg`}
                alt={`Image of ${item.id}`}
                className="rounded-l-lg h-full w-auto"
                width={300}
                height={300}
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
          <h3 className="text-xl font-bold mb-2">
            Thông tin người lái xe chính
          </h3>
          <div className="mb-4">Theo đúng những gì được ghi trên bằng lái</div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={driverInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Nhập email"
                  required
                />
                <label className="block ml-1 mt-2 text-sm text-gray-500">
                  Để chúng tôi có thể gửi email xác nhận và voucher
                </label>
              </div>
              <div>
                <label className="block mb-1">Tên</label>
                <input
                  type="text"
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
                  name="lastName"
                  value={driverInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Họ"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Điện thoại liên lạc</label>
                <div className="grid grid-cols-5 gap-1">
                  <select
                    name="phoneCountry"
                    value={driverInfo.phoneCountry}
                    onChange={handleDriverInfoChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag}
                      </option>
                    ))}
                  </select>
                  <div className="col-span-4 flex">
                    <input
                      type="tel"
                      name="phone"
                      value={driverInfo.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1">Quốc gia cư trú</label>
                <select
                  name="country"
                  value={driverInfo.country}
                  onChange={handleDriverInfoChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
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
          <h3 className="text-xl font-bold mb-4">Địa chỉ thanh toán</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Tên</label>
                <input
                  type="text"
                  name="firstName"
                  value={paymentAddress.firstName}
                  onChange={handlePaymentAddressChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Tên"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Họ</label>
                <input
                  type="text"
                  name="lastName"
                  value={paymentAddress.lastName}
                  onChange={handlePaymentAddressChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Họ"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Điện thoại liên lạc</label>
                <div className="grid grid-cols-5 gap-1">
                  <select
                    name="phoneCountry"
                    value={paymentAddress.phoneCountry}
                    onChange={handlePaymentAddressChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag}
                      </option>
                    ))}
                  </select>
                  <div className="col-span-4 flex">
                    <input
                      type="tel"
                      name="phone"
                      value={paymentAddress.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1">Quốc gia</label>
                <select
                  name="country"
                  value={paymentAddress.country}
                  onChange={handlePaymentAddressChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Thành phố</label>
                <input
                  type="text"
                  name="city"
                  value={paymentAddress.city}
                  onChange={handlePaymentAddressChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Mã bưu điện</label>
                <input
                  type="text"
                  name="postalCode"
                  value={paymentAddress.postalCode}
                  onChange={handlePaymentAddressChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Mã bưu điện"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-2" />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">
            Bạn muốn thanh toán bằng cách nào?
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block mb-1">Tên chủ thẻ</label>
                <input
                  type="text"
                  name="cardholder-name"
                  value={paymentInfo.cardholderName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Nhập tên chủ thẻ"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1">Số thẻ</label>
                <input
                  type="text"
                  name="card-number"
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Nhập số thẻ"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Ngày hết hạn</label>
                <input
                  type="text"
                  name="expiration-date"
                  value={paymentInfo.expirationDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={paymentInfo.cvc}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="CVC"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="space-y-4 sticky top-4">
          <div className="p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-bold mb-4">Chi tiết giá cả</h3>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Phí thuê xe</span>
                <span className="text-gray-700">{item.price} VNĐ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Dịch vụ khác</span>
                <span className="text-gray-700">{totalServiceCost} VNĐ</span>
              </div>

              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span className="text-gray-700">Giá cho 4 ngày</span>
                <span className="text-gray-700">
                  {item.price + totalServiceCost} VNĐ
                </span>
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
          ĐẶT NGAY
        </button>
      </div>
    </section>
  );
};

export default CarRentalPayment;
