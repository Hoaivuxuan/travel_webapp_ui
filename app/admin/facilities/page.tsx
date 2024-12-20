"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import { Table, Space, Button, Menu, Dropdown } from "antd";
import { AiOutlineBars, AiOutlineShop } from "react-icons/ai";
import ListVehicleModal from "./ListVehicle";

export default function UserAdmin() {
  const [listRentalFacility, setListRentalFacility] = useState<any>([]);
  const [selectedRentalFacility, setSelectedRentalFacility] = useState<any>(null);
  const [isListVehicleVisible, setIsListVehicleVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      const bearerToken = localStorage.getItem("token");
      try {
        if (!bearerToken) return;
        const response = await fetch("http://localhost:8080/rental", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setListRentalFacility(data);
      } catch (error) {
        console.error("Error fetching rental facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleListVehicle = (record: any) => {
    setSelectedRentalFacility(record);
    setIsListVehicleVisible(true);
  };

  const handleListVehicleModalClose = () => {
    setSelectedRentalFacility(null);
    setIsListVehicleVisible(false);
  };

  const rentalMenu = (record: any) => (
    <Menu>
      <Menu.Item key="1">
        <div className="flex items-center">
          <AiOutlineShop className="mr-2" /> Danh sách văn phòng
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="flex items-center" onClick={() => handleListVehicle(record)}>
          <AiOutlineBars className="mr-2" /> Danh sách phương tiện
        </div>
      </Menu.Item>
    </Menu>
  );

  const rentalColumns = [
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, record: any) => (
        <Space className="flex items-center justify-center">
          <Dropdown overlay={rentalMenu(record)} trigger={['click']}>
            <Button type="link" icon={<AiOutlineBars className="text-lg" />} />
          </Dropdown>
        </Space>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
      render: (id: number) => id.toString().padStart(6, "0"),
    },
    {
      title: "Tên cơ sở",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hotline",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <main className="h-screen">
      <section className="p-6 bg-white rounded-t-lg">
        <h3 className="mb-2 text-xl font-bold">Hệ thống nơi lưu trú</h3>
        <Table
          bordered
          dataSource={listRentalFacility}
          columns={rentalColumns}
          loading={loading}
          size="middle"
          rowClassName="editable-row"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }}
        />
      </section>
      <ListVehicleModal
        data={selectedRentalFacility?.vehicles}
        visible={isListVehicleVisible}
        onClose={handleListVehicleModalClose}
      />
    </main>
  );
}
