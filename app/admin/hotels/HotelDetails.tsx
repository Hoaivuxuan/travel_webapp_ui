"use client";

import React, { useEffect, useState } from "react";
import { Modal, Descriptions, Image, Button, Row, Col, Spin } from "antd";
import Link from "next/link";

interface HotelDetailModalProps {
  hotel: any;
  visible: boolean;
  onClose: () => void;
}

const HotelDetailModal: React.FC<HotelDetailModalProps> = ({ visible, hotel, onClose }) => {
  const [hotelInfo, setHotelInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`http://localhost:8080/hotels/${hotel.id}`);
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
  }, [hotel.id]);

  if (loading) {
    return <Spin size="large" className="flex justify-center" />;
  }

  if (error || !hotel) {
    return <div>Không tìm thấy thông tin khách sạn.</div>;
  }

  return (
    <Modal
      title={hotel.hotel_name}
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={1000}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Image
            src={hotelInfo?.images[0]}
            alt={hotel.hotel_name}
            width="100%"
            height={300}
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col span={12}>
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="ID">{hotel.id}</Descriptions.Item>
            <Descriptions.Item label="Type">{hotel.type}</Descriptions.Item>
            <Descriptions.Item label="City">{hotel.city?.name}</Descriptions.Item>
            <Descriptions.Item label="Address">
              <Link
                href={`https://www.google.com/maps?q=${hotel.location?.latitude},${hotel.location?.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hotel.address}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="Total Reviews">{hotel.reviews?.total_reviews}</Descriptions.Item>
            <Descriptions.Item label="Average Rating">{hotel.reviews?.average_rating}</Descriptions.Item>
            <Descriptions.Item label="Description">{hotelInfo?.description || "No description available"}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <div className="mt-4 flex justify-center">
        <Button type="primary" href={hotel.website} target="_blank" rel="noopener noreferrer">
          Visit Website
        </Button>
      </div>
    </Modal>
  );
};

export default HotelDetailModal;
