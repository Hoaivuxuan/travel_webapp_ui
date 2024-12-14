"use client";

import React, { useState, useEffect } from "react";
import { Layout, Table, Card, Col, Row, Statistic, Spin } from "antd";
import { bookingHotel } from "@/data/fakeData";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [bookingsData, setBookingsData] = useState<any[]>([]);

  // Dummy data for testing, replace it with an API call if necessary
  useEffect(() => {
    setLoading(true);
    try {
      // Calculate revenue data
      setRevenueData([
        { month: 'Jan', revenue: 12000 },
        { month: 'Feb', revenue: 15000 },
        { month: 'Mar', revenue: 18000 },
        { month: 'Apr', revenue: 20000 },
        { month: 'May', revenue: 25000 },
        { month: 'Jun', revenue: 30000 },
        { month: 'Jul', revenue: 35000 },
      ]);

      const bookingsByDate: Record<string, number> = {};

      bookingHotel.forEach((booking) => {
        const createdDate = format(new Date(booking.createdDate), "yyyy-MM-dd");
        bookingsByDate[createdDate] = (bookingsByDate[createdDate] || 0) + 1;
      });

      const formattedBookingsData = Object.keys(bookingsByDate).map((date) => ({
        date,
        bookings: bookingsByDate[date],
      }));

      setBookingsData(formattedBookingsData);
      setLoading(false);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu.");
      setLoading(false);
    }
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id: number) => id.toString().padStart(8, "0"),
    },
    {
      title: "Hotel",
      dataIndex: ["hotel", "id"],
      key: "hotelName",
    },
    {
      title: "Customer",
      dataIndex: ["customerInfo", "fullName"],
      key: "customerName",
    },
    {
      title: "Time",
      key: "time",
      render: (_: any, record: any) => {
        const checkin = format(new Date(record.checkinDate), "dd/MM/yyyy");
        const checkout = format(new Date(record.checkoutDate), "dd/MM/yyyy");
        return `${checkin} - ${checkout}`;
      },
    },
    {
      title: "Price",
      dataIndex: ["roomSelection", "totalPrice"],
      key: "totalPrice",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Layout className="site-layout">
        <Content className="p-4">
          {loading ? (
            <Spin size="large" />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <Row gutter={16}>
                <Col span={8}>
                  <Card className="shadow-lg">
                    <Statistic title="Total Bookings" value={bookingHotel.length} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="shadow-lg">
                    <Statistic title="Total Revenue" value={bookingHotel.reduce((total, booking) => total + booking.roomSelection.totalPrice, 0)} precision={0} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="shadow-lg">
                    <Statistic title="Pending Bookings" value={bookingHotel.filter((item) => item.status === 0).length} />
                  </Card>
                </Col>
              </Row>

              <Row gutter={16} className="mt-5">
                <Col span={12}>
                  <Card title="Revenue per Month" className="shadow-lg">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>

                <Col span={12}>
                  <Card title="Biến động số đơn đặt khách sạn" className="shadow-lg">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={bookingsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="bookings" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>

              <div className="mt-5">
                <Card title="Recent Bookings" className="shadow-lg">
                  <Table
                    dataSource={bookingHotel}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                  />
                </Card>
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
