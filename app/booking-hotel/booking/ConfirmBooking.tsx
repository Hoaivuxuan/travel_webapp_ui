import React, { useState } from "react";
import { Checkbox, Button, message } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";
import { BookingHotelService } from "@/services/BookingService";
import { PaymentService } from "@/services/CommonService";

interface ConfirmBookingProps {
  hotel: any;
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({ hotel }) => {
  const router = useRouter();
  const bookingHotel = JSON.parse(localStorage.getItem("bookingHotel") || "{}");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyWarning } = Notification();

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handlePayment = async () => {
    const payment = (
      await PaymentService.paymentByVNPay(bookingHotel.roomSelection.totalPrice)
    ).data;
    window.open(`${payment.paymentUrl}`, "_blank");
    setLoading(true);
    setTimeout(() => {
      handleConfirm();
    }, 15000);
  };

  const handleConfirm = async () => {
    if (!bookingHotel) return;
    const booking = {
      user_id: bookingHotel.user,
      full_name: bookingHotel.customerInfo.fullName,
      email: bookingHotel.customerInfo.email,
      phone: bookingHotel.customerInfo.phone,
      country: bookingHotel.customerInfo.country,
      check_in_date: bookingHotel.checkinDate,
      check_out_date: bookingHotel.checkoutDate,
      adults: bookingHotel.adults,
      children: bookingHotel.children,
      booked_rooms: bookingHotel.roomSelection.bookingRooms.map(
        (room: any) => ({
          room_id: room.room_id,
          amount: room.count,
        })
      ),
      special_request: bookingHotel.specialRequest,
      arrival_time: bookingHotel.arrivalTime,
      totalPrice: bookingHotel.roomSelection.totalPrice,
      status: (bookingHotel.payment === "none" ? 1 : 0),
    };

    try {
      setLoading(true);
      const result = (await BookingHotelService.postBooking(booking)).data;
      notifySuccess("Đặt phòng thành công!");
      router.push(`/booking-hotel/details?id=${result.id}`);
    } catch (error: any) {
      notifyWarning("Đặt phòng thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-4 bg-white border rounded-lg">
        <div className="grid grid-cols-7 gap-2">
          {bookingHotel.payment === "none" ? (
            <div className="col-span-6">
              <h3 className="font-bold mb-2">
                Không yêu cầu thông tin thanh toán
              </h3>
              <p className="text-sm text-gray-500">
                {`Thanh toán của bạn sẽ do ${hotel.hotel_name} xử lý, nên bạn không cần nhập thông tin thanh toán cho đơn đặt này.`}
              </p>
            </div>
          ) : (
            <div className="col-span-7">
              {/* <h3 className="font-bold mb-2">Bạn sẽ thanh toán thành công đơn đặt phòng</h3> */}
              <p className="text-sm text-gray-500">
              {`Thanh toán của bạn sẽ được hệ thống ${hotel.hotel_name} ghi nhận thông tin.`}
            </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start my-4">
        <Checkbox
          className="text-blue-600"
          checked={isChecked}
          onChange={handleCheckboxChange}
        >
          Tôi đồng ý nhận email marketing từ Booking.com, bao gồm khuyến mãi, đề
          xuất được cá nhân hóa, tặng thưởng, trải nghiệm du lịch và cập nhật về
          các sản phẩm và dịch vụ của Booking.com.
        </Checkbox>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-gray-500 ml-6">
          {`Đặt phòng của bạn sẽ tiếp tục được ${hotel.hotel_name} và bạn đồng ý với điều kiện đặt phòng, điều khoản chung và chính sách bảo mật.`}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          type="primary"
          className="bg-blue-600 text-white w-1/2 py-2 rounded"
          onClick={bookingHotel.payment === "none" ? handleConfirm : handlePayment}
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
