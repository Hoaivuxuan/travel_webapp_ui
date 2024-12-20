import React, { useState } from "react";
import { Checkbox, Button, message } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";

interface ConfirmBookingProps {
  ticket: any;
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({ ticket }) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyWarning } = Notification();

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handleConfirm = async () => {
    const bookingTicket = JSON.parse(
      localStorage.getItem("bookingTicket") || "{}"
    );
    const booking = {
      user_id: bookingTicket.user,
      full_name: bookingTicket.customerInfo.fullName,
      email: bookingTicket.customerInfo.email,
      phone: bookingTicket.customerInfo.phone,
      country: bookingTicket.customerInfo.country,
      check_in_date: bookingTicket.checkinDate,
      check_out_date: bookingTicket.checkoutDate,
      adults: bookingTicket.adults,
      children: bookingTicket.children,
      booked_rooms: bookingTicket.roomSelection.bookingRooms.map(
        (room: any) => ({
          room_id: room.room_id,
          amount: room.count,
        })
      ),
      special_request: bookingTicket.specialRequest,
      arrival_time: bookingTicket.arrivalTime,
      totalPrice: bookingTicket.roomSelection.totalPrice,
      status: bookingTicket.status,
    };

    try {
      setLoading(true);
      const bearerToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/bookingRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        notifyWarning("Đặt vé thất bại. Vui lòng thử lại.");
      }

      const result = await response.json();
      notifySuccess("Đặt vé thành công!");
      router.push(`/home/bookingDetails?id=${result.id}`);
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
          <div className="col-span-6">
            <h3 className="font-bold mb-2">
              Không yêu cầu thông tin thanh toán
            </h3>
            <p className="text-sm text-gray-500">
              {/* {`Thanh toán của bạn sẽ do ${ticket.ticket_name} xử lý, nên bạn không cần nhập thông tin thanh toán cho đơn đặt này.`} */}
            </p>
          </div>
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
          onClick={handleConfirm}
          disabled={!isChecked}
          loading={loading} // Hiển thị trạng thái tải
        >
          HOÀN TẤT
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConfirmBooking;
