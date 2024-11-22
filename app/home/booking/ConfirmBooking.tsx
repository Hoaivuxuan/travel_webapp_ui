import { listHotels } from "@/data/typeHotel";
import React, { useState } from "react";

interface ConfirmBookingProps {
  id: number;
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({ id }) => {
  const [isChecked, setIsChecked] = useState(false);
  
  const hotel = listHotels.find((item) => item.id === id) || undefined;
  if (!hotel) return null;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div className="p-4 bg-white border rounded-lg">
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-6">
            <h3 className="font-bold mb-2">Không yêu cầu thông tin thanh toán</h3>
            <p className="text-sm text-gray-500">
              {`Thanh toán của bạn sẽ do ${hotel.name} xử lý, nên bạn không cần nhập thông tin thanh toán cho đơn đặt này.`}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start my-4">
        <input
          type="checkbox"
          id="marketing"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="marketing" className="ml-2 text-sm text-gray-700">
          Tôi đồng ý nhận email marketing từ Booking.com, bao gồm khuyến mãi, đề xuất được cá nhân hóa, tặng thưởng, trải nghiệm du lịch và cập nhật về các sản phẩm và dịch vụ của Booking.com.
        </label>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          {`Đặt phòng của bạn sẽ tiếp tục được ${hotel.name} và bạn đồng ý với điều kiện đặt phòng, điều khoản chung và chính sách bảo mật.`}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="bg-blue-600 text-white w-1/2 py-2 rounded"
        >
          Hoàn tất đặt chỗ
        </button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
