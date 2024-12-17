import React, { useEffect, useState } from "react";
import { Modal, Descriptions } from "antd";
import Link from "next/link";

interface HotelDetailsModalProps {
  hotel: any;
  visible: boolean;
  onClose: () => void;
}

const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({ hotel, visible, onClose }) => {
  const [hotelInfo, setHotelInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hotels/${hotel?.id}`);
        if (!response.ok) {
          throw new Error("Không thể lấy thông tin khách sạn");
        }
        const data = await response.json();
        setHotelInfo(data);
      } catch (err: any) {
        setError("Không thể tải thông tin khách sạn.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [hotel?.id]);

  if (!hotel) return null;
  
  return (
    <Modal
      title={hotel.hotel_name}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      centered
    >
      <div className="flex space-x-1">
        <div className="w-1/3 relative group overflow-hidden">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(hotelInfo?.hotel_name)}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Hotel Location"
          />
        </div>
        <Descriptions column={1} bordered size="middle" className="w-2/3">
          <Descriptions.Item label="ID">
            {hotelInfo?.id.toString().padStart(6, "0")}
          </Descriptions.Item>
          <Descriptions.Item label="Type">
            {hotelInfo?.type}
          </Descriptions.Item>
          <Descriptions.Item label="City">
            {hotelInfo?.city.name}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {hotelInfo?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Total Reviews">
            {hotelInfo?.reviews.total_reviews}
          </Descriptions.Item>
          <Descriptions.Item label="Average Rating">
            {hotelInfo?.reviews.average_rating}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {hotelInfo?.description || "No description available"}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default HotelDetailsModal;
