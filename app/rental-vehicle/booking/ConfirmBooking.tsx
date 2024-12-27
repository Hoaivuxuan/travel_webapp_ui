import React, { useState } from "react";
import { Checkbox, Button, message } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";
import { BookingVehicleService } from "@/services/BookingService";

const ConfirmBooking = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyWarning } = Notification();

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handleConfirm = async () => {
    const booking = JSON.parse(localStorage.getItem("rentalVehicle") || "{}");
    const bearerToken = localStorage.getItem("token");
    if(!booking || !bearerToken) return;

    try {
      setLoading(true);;
      const result = (await BookingVehicleService.postBooking(booking)).data;
      notifySuccess("Đặt xe thành công!");
      router.push(`/rental-vehicle/details?id=${result.id}`);
    } catch (error: any) {
      notifyWarning("Đặt xe thất bại, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-4 bg-white border rounded-lg">
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-6">
            <h3 className="font-bold mb-2">Không yêu cầu thông tin thanh toán</h3>
            <p className="text-sm text-gray-500">
              {`Thanh toán của bạn sẽ do xử lý, nên bạn không cần nhập thông tin thanh toán cho đơn đặt này.`}
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
      <div className="mt-4 flex justify-end">
        <Button
          type="primary"
          className="bg-blue-600 text-white w-1/2 py-2 rounded"
          onClick={handleConfirm}
          disabled={!isChecked}
          loading={loading}
        >
          HOÀN TẤT
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConfirmBooking;
