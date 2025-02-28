import React, { useEffect, useState } from "react";
import { Modal, Descriptions, Tag } from "antd";
import { statusTags } from "@/data/defaultValues";
import { BookingHotelService } from "@/services/BookingService";

interface BookingDetailsModalProps {
  booking: any;
  visible: boolean;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  visible,
  onClose,
}) => {
  const [bookingHotel, setBookingHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!booking) return;
      setLoading(true);
      try {
        const data = (await BookingHotelService.getDetails(booking.id)).data;
        setBookingHotel(data);
      } catch (error) {
        console.error(error || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [booking]);

  return (
    <Modal
      title="Booking Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      centered
    >
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="ID">
          {bookingHotel?.id.toUpperCase()}
        </Descriptions.Item>
        <Descriptions.Item label="Khách sạn">
          {bookingHotel?.hotel.hotel_name}
        </Descriptions.Item>
        <Descriptions.Item label="Khách hàng">{bookingHotel?.customerInfo?.fullname}</Descriptions.Item>
        <Descriptions.Item label="Email">{bookingHotel?.customerInfo.email}</Descriptions.Item>
        <Descriptions.Item label="Điện thoại">{bookingHotel?.customerInfo.phone}</Descriptions.Item>
        <Descriptions.Item label="Thời gian lưu trú">
          {bookingHotel?.checkin_date} đến {bookingHotel?.checkout_date}
        </Descriptions.Item>
        <Descriptions.Item label="Số phòng">
          {bookingHotel?.room_selection?.selected_rooms.map((option: any, index: number) => (
            <div key={index}>{option.count} x {option.name}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Số khách">
          {`${bookingHotel?.no_adult} người lớn, ${bookingHotel?.no_children} trẻ em`}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng chi phí">
          {`${bookingHotel?.totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}`}
        </Descriptions.Item>
        <Descriptions.Item label="Đã thanh toán">
          {`${bookingHotel?.payed_money.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}) || 0}`}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {statusTags
            .filter(tag => tag.id === Number(bookingHotel?.status))
            .map(tag =>
              <Tag color={tag.color} key={tag.id}>{tag.text}</Tag>
            )
          }
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default BookingDetailsModal;
