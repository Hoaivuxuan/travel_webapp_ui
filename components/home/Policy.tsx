import React from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaInfoCircle,
  FaUsers,
  FaSmoking,
  FaUtensils,
  FaMicrophoneSlash,
  FaDog,
  FaUser,
} from "react-icons/fa";

const PolicySection = () => {
  return (
    <section className="bg-white p-4 w-full border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-4">
        <div className="grid grid-cols-4 items-center pb-4 border-b">
          <div className="flex items-center space-x-3">
            <FaArrowRight className="text-lg text-blue-600" />
            <h4 className="font-medium">Nhận phòng</h4>
          </div>
          <div className="col-span-3 text-sm text-gray-500">
            <p>Từ 14:00 - 23:30</p>
            <p>Trước đó bạn sẽ cần cho chỗ nghỉ biết giờ bạn sẽ đến nơi.</p>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center pb-4 border-b">
          <div className="flex items-center space-x-3">
            <FaArrowLeft className="text-lg text-blue-600" />
            <h4 className="font-medium">Trả phòng</h4>
          </div>
          <p className="col-span-3 text-sm text-gray-500">Từ 00:00 - 12:00</p>
        </div>
        <div className="grid grid-cols-4 items-center pb-4 border-b">
          <div className="flex items-center space-x-3">
            <FaInfoCircle className="text-lg text-blue-600" />
            <h4 className="font-medium">Hủy đặt phòng/Trả trước</h4>
          </div>
          <div className="col-span-3"></div>
        </div>
        <div className="grid grid-cols-4 items-center pb-4 border-b">
          <div className="flex items-center space-x-3">
            <FaUsers className="text-lg text-blue-600" />
            <h4 className="font-medium">Trẻ em và giường</h4>
          </div>
          <div className="col-span-3"></div>
        </div>
        <div className="grid grid-cols-4 items-center pb-4 border-b">
          <div className="flex items-center space-x-3">
            <FaUser className="text-lg text-blue-600" />
            <h4 className="font-medium">Giới hạn độ tuổi</h4>
          </div>
          <p className="col-span-3 text-sm text-gray-500">
            Độ tuổi tối thiểu để nhận phòng là 18
          </p>
        </div>
        <div className="grid grid-cols-4 items-center pb-4 border-b">
          <div className="flex items-center space-x-3">
            <FaSmoking className="text-lg text-blue-600" />
            <h4 className="font-medium">Hút thuốc</h4>
          </div>
          <p className="col-span-3 text-sm text-gray-500">Không cho phép hút thuốc</p>
        </div>
        <div className="grid grid-cols-4 items-center pb-4 border-b">
          <div className="flex items-center space-x-3">
            <FaUtensils className="text-lg text-blue-600" />
            <h4 className="font-medium">Tiệc tùng</h4>
          </div>
          <p className="col-span-3 text-sm text-gray-500">
            Không cho phép tiệc tùng/sự kiện
          </p>
        </div>
        <div className="grid grid-cols-4 items-center pb-4 border-b">
          <div className="flex items-center space-x-3">
            <FaMicrophoneSlash className="text-lg text-blue-600" />
            <h4 className="font-medium">Thời gian yên lặng</h4>
          </div>
          <p className="col-span-3 text-sm text-gray-500">
            Khách cần giữ yên lặng từ 22:00 đến 06:00
          </p>
        </div>
        <div className="grid grid-cols-4 items-center">
          <div className="flex items-center space-x-3">
            <FaDog className="text-lg text-blue-600" />
            <h4 className="font-medium">Vật nuôi</h4>
          </div>
          <p className="col-span-3 text-sm text-gray-500">Vật nuôi không được phép</p>
        </div>
      </div>
    </section>
  );
};

export default PolicySection;
