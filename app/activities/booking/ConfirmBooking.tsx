import React, { useState } from "react";
import { Checkbox, Button, message } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";
import { PaymentService } from "@/services/CommonService";
import { TicketService } from "@/services/TourService";

interface ConfirmBookingProps {
  ticket: any;
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({ ticket }) => {
  const router = useRouter();
  const bookingTicket = JSON.parse(
    localStorage.getItem("bookingTicket") || "{}"
  );
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyWarning } = Notification();

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handlePayment = async () => {
    const payment = (
      await PaymentService.paymentByVNPay(bookingTicket.totalPrice)
    ).data;
    window.open(`${payment.paymentUrl}`, "_blank");
    setLoading(true);
    setTimeout(() => {
      handleConfirm();
    }, 15000);
  };

  const handleConfirm = async () => {
    const booking = {
      user: bookingTicket.user,
      full_name: bookingTicket.full_name,
      email: bookingTicket.email,
      phone: bookingTicket.phone,
      country: bookingTicket.country,
      booked_tickets: bookingTicket.booked_tickets,
    };
    console.log("check booking: ", booking);
    try {
      const result = (await TicketService.createBookingTicket(booking)).data;
      console.log("check result: ", result);
      notifySuccess("Đặt vé thành công!");
      router.push(`/activities/details?id=${bookingTicket.user}`);
    } catch (error: any) {
      notifyWarning("Đặt vé thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-4 bg-white border rounded-lg">
        <div className="grid grid-cols-7 gap-2">
          {bookingTicket.payment === "none" ? (
            <div className="col-span-6">
              <h3 className="font-bold mb-2">
                Không yêu cầu thông tin thanh toán
              </h3>
              <p className="text-sm text-gray-500">
                {`Thanh toán của bạn sẽ do đơn vị xử lý, bạn không cần nhập thông tin thanh toán cho đơn đặt này.`}
              </p>
            </div>
          ) : (
            <div className="col-span-7">
              {/* <h3 className="font-bold mb-2">
                Bạn đã thanh toán thành công đơn đặt phòng
              </h3> */}
              <p className="text-sm text-gray-500">
                {`Thanh toán của bạn đã được hệ thống ghi nhận thông tin.`}
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
          {/* {`Đặt vé của bạn sẽ tiếp tục được ${ticket.ticket_name} và bạn đồng ý với điều kiện đặt vé, điều khoản chung và chính sách bảo mật.`} */}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          type="primary"
          className="bg-blue-600 text-white w-1/2 py-2 rounded"
          onClick={handlePayment}
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
