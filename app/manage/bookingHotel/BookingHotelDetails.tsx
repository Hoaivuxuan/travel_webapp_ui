import React from "react";
import { Modal, Descriptions, Tag } from "antd";
import { statusTags } from "@/data/defaultValues";
import { format } from "date-fns";

interface Booking {
  id: number;
  hotel: {
    name: string;
    city: string;
  };
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
  };
  checkinDate: string;
  checkoutDate: string;
  roomSelection: {
    selectedRooms: any;
    totalRooms: number;
    totalPrice: number;
  };
  status: number;
  specialRequest: string | null;
}

interface BookingDetailsModalProps {
  booking: Booking | null;
  visible: boolean;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  visible,
  onClose,
}) => {
  if (!booking) return null;

  return (
    <Modal
      title="Booking Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="ID">
          {booking.id.toString().padStart(8, "0")}
        </Descriptions.Item>
        <Descriptions.Item label="Hotel">
          {booking.hotel.name}
        </Descriptions.Item>
        <Descriptions.Item label="Customer">{booking.customerInfo.fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{booking.customerInfo.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{booking.customerInfo.phone}</Descriptions.Item>
        <Descriptions.Item label="Checkin">
          {format(booking.checkinDate, "dd/MM/yyyy")}
        </Descriptions.Item>
        <Descriptions.Item label="Checkout">
          {format(booking.checkoutDate, "dd/MM/yyyy")}
        </Descriptions.Item>
        <Descriptions.Item label="Rooms">
          {booking.roomSelection.selectedRooms.map((option: any, index: number) => (
            <div key={index}>{option.count} x {option.type}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          {`${booking.roomSelection.totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}`}
        </Descriptions.Item>
        { booking.specialRequest &&
          <Descriptions.Item label="Special Requests">
            {booking.specialRequest}
          </Descriptions.Item>
        }
        <Descriptions.Item label="Status">
          {statusTags
            .filter(tag => tag.id === booking.status)
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
