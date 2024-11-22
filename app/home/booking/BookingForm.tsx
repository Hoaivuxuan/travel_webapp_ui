import React, { useState, useEffect } from "react";
import countries from "@/data/listCountry.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { BookingParams } from "./page";

type BookingFormProps = {
  params: BookingParams;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BookingForm: React.FC<BookingFormProps> = ({params, step, setStep}) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });

  const [radioStates, setRadioStates] = useState({ whoBooking: "self" });

  const saveBookingHotel = () => {
    const bookingHotel = {
      hotel: params.id,
      checkinDate: params.checkin,
      checkoutDate: params.checkout,
      adults: params.adults,
      children: params.children,
      roomSelection: params.roomSelection,
      totalPrice: params.roomSelection.totalPrice,
      customerInfo: {
        fullName: `${userInfo.firstName} ${userInfo.lastName}`,
        email: userInfo.email,
        phone: userInfo.phone,
        country: userInfo.country || "Vietnam",
      },
    };
  
    localStorage.setItem("bookingDetails", JSON.stringify(bookingHotel));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedUserInfo = { ...userInfo, [name]: value };
    setUserInfo(updatedUserInfo);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedRadioStates = { ...radioStates, [name]: value };
    setRadioStates(updatedRadioStates);
  };

  const handleConfirm = () => {
    saveBookingHotel();
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <form className="space-y-4">
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Nhập thông tin chi tiết của bạn</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-4">
            <label className="block mb-2 font-medium">Họ</label>
            <input
              type="text"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="ví dụ: Nguyễn"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Tên</label>
            <input
              type="text"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="ví dụ: Văn A"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Số điện thoại"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Quốc gia</label>
            <select
              name="country"
              value={userInfo.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="my-4 border border-gray-200" />
        <div className="mb-4">
          <p className="font-medium">
            Bạn đặt phòng cho ai?
            <span className="text-gray-500"> (không bắt buộc)</span>
          </p>
          <div className="flex flex-col space-y-2 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="whoBooking"
                value="self"
                checked={radioStates.whoBooking === "self"}
                onChange={handleRadioChange}
                className="form-radio text-blue-600"
              />
              <span>Tôi là khách lưu trú chính</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="whoBooking"
                value="other"
                checked={radioStates.whoBooking === "other"}
                onChange={handleRadioChange}
                className="form-radio text-blue-600"
              />
              <span>Đặt phòng này là cho người khác</span>
            </label>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Các yêu cầu đặc biệt</h2>
        <p className="text-gray-600 mb-4">
          Các yêu cầu đặc biệt không đảm bảo sẽ được đáp ứng – tuy nhiên, chỗ nghỉ sẽ cố gắng hết sức để thực hiện.
          Bạn luôn có thể gửi yêu cầu đặc biệt sau khi hoàn tất đặt phòng của mình!
        </p>
        <label className="block mb-2 font-medium">
          Vui lòng ghi yêu cầu của bạn tại đây. <span className="text-gray-500">(không bắt buộc)</span>
        </label>
        <textarea
          name="specialRequest"
          rows={3}
          className="w-full p-2 border rounded"
          placeholder="Ví dụ: Yêu cầu phòng gần nhau, ăn chay..."
        ></textarea>
        <label className="flex items-center mt-4 space-x-2">
          <input
            type="checkbox"
            name="nearbyRooms"
            className="form-checkbox text-blue-600"
          />
          <span>Tôi muốn các phòng ở gần nhau (nếu có thể)</span>
        </label>
      </div>
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Thời gian đến của bạn</h2>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mr-2" />
          <p className="text-gray-700">Các phòng của bạn sẽ sẵn sàng để nhận trong khoảng từ 14:00 đến 00:00</p>
        </div>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faHeadset} className="text-green-600 mr-2" />
          <p className="text-gray-700">Lễ tân 24 giờ - Luôn có trợ giúp mỗi khi bạn cần!</p>
        </div>
        <label className="block mb-2 font-medium">
          Thêm thời gian đến dự kiến của bạn <span className="text-gray-500">(không bắt buộc)</span>
        </label>
        <select
          name="arrivalTime"
          className="w-full p-2 border rounded bg-gray-50"
        >
          <option value="">Vui lòng chọn</option>
          <option value="14:00-15:00">14:00 - 15:00</option>
          <option value="15:00-16:00">15:00 - 16:00</option>
          <option value="16:00-17:00">16:00 - 17:00</option>
          <option value="17:00-18:00">17:00 - 18:00</option>
          <option value="18:00-19:00">18:00 - 19:00</option>
          <option value="19:00-20:00">19:00 - 20:00</option>
          <option value="20:00-21:00">20:00 - 21:00</option>
        </select>
        <p className="text-sm text-gray-500 mt-2">Thời gian theo múi giờ của Hà Nội</p>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => {
            handleConfirm();
            handleNextStep();
          }}
          className="bg-blue-600 text-white w-1/2 py-2 rounded"
        >
          Tiếp theo
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
