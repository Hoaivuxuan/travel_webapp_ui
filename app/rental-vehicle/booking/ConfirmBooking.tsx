import React, { useState } from "react";
import { Checkbox, Button, message } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";
import { BookingVehicleService } from "@/services/BookingService";
import { PaymentService } from "@/services/CommonService";

interface ConfirmBookingProps {
  params: any;
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({params}) => {
  const router = useRouter();
  const bookingVehicle = JSON.parse(localStorage.getItem("rentalVehicle") || "{}");
  const bearerToken = localStorage.getItem("token");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyWarning } = Notification();

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handlePayment = async () => {
    const price = params.facility.price + params.totalServiceCost;
    const payment = (await PaymentService.paymentByVNPay(price)).data;
    window.open(`${payment.paymentUrl}`, "_blank");
    setLoading(true);
    setTimeout(() => {
      handleConfirm();
    }, 15000);
  };

  const handleConfirm = async () => {
    if(!bookingVehicle || !bearerToken) return;
    const booking = {
      user: bookingVehicle.user,
      vehicle: bookingVehicle.vehicle,
      facility: bookingVehicle.facility,
      pickup: bookingVehicle.pickup,
      return: bookingVehicle.return,
      accessory_booking: bookingVehicle.accessory_booking,
      customerInfo: bookingVehicle.customerInfo,
      driverInfo: bookingVehicle.driverInfo,
      status: (bookingVehicle.payment === "none" ? 1 : 0),
    };

    try {
      setLoading(true);
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
          {bookingVehicle.payment === "none" ? (
            <div className="col-span-6">
              <h3 className="font-bold mb-2">Không yêu cầu thông tin thanh toán</h3>
              <p className="text-sm text-gray-500">
                Thanh toán của bạn sẽ do xử lý, nên bạn không cần nhập thông tin thanh toán cho đơn đặt này.
              </p>
            </div>
          ) : (
            <div className="col-span-7">
              <p className="text-sm text-gray-500">
                Thanh toán của bạn sẽ ghi nhận vào hệ thống.
              </p>
            </div>
          )}
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
          onClick={bookingVehicle.payment === "none" ? handleConfirm : handlePayment}
          disabled={!isChecked}
          loading={loading}
        >
          THANH TOÁN & HOÀN TẤT
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConfirmBooking;
