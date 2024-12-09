import { listHotels } from "@/data/typeHotel";
import React, { useState } from "react";
import { Checkbox, Button } from "antd";

interface ConfirmBookingProps {
  hotel: any;
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({ hotel }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handleConfirm = () => {
    const invoice = localStorage.getItem("bookingHotel");
    console.log(JSON.parse(invoice || ""));
  };

  return (
    <div>
      <div className="p-4 bg-white border rounded-lg">
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-6">
            <h3 className="font-bold mb-2">Không yêu cầu thông tin thanh toán</h3>
            <p className="text-sm text-gray-500">
              {`Thanh toán của bạn sẽ do ${hotel.hotel_name} xử lý, nên bạn không cần nhập thông tin thanh toán cho đơn đặt này.`}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start my-4">
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="text-blue-600"
        >
          Tôi đồng ý nhận email marketing từ Booking.com, bao gồm khuyến mãi, đề xuất được cá nhân hóa, tặng thưởng, trải nghiệm du lịch và cập nhật về các sản phẩm và dịch vụ của Booking.com.
        </Checkbox>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          {`Đặt phòng của bạn sẽ tiếp tục được ${hotel.name} và bạn đồng ý với điều kiện đặt phòng, điều khoản chung và chính sách bảo mật.`}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          type="primary"
          className="bg-blue-600 text-white w-1/2 py-2 rounded"
          onClick={handleConfirm}
        >
          Hoàn tất đặt chỗ
        </Button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
