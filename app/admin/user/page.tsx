"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import { Table, Switch, Space, Button } from "antd";
import { AiOutlineEye, AiOutlineBars, AiOutlineDelete } from "react-icons/ai";
import UserDetailsModal from "./UserDatails";
import UserBookingModal from "./UserBooking";

export default function UserAdmin() {
  const [listUser, setListUser] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsVisible, setIsUserDetailsVisible] = useState(false);
  const [isUserBookingVisible, setIsUserBookingVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setCurrentUserId(storedUserId ? Number(storedUserId) : null);
    }

    const fetchUsers = async () => {
      try {
        const bearerToken = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/users", {
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
        setListUser(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleActiveChange = (value: boolean, record: any) => {
    const newListUser = listUser.map((user: any) =>
      user.id === record.id ? { ...user, active: value } : user,
    );
    setListUser(newListUser);
  };

  const handleViewDetails = (record: any) => {
    setSelectedUser(record);
    setIsUserDetailsVisible(true);
    console.log(selectedUser);
  };

  const handleUserDetailsModalClose = () => {
    setSelectedUser(null);
    setIsUserDetailsVisible(false);
  };

  const handleViewBooking = (record: any) => {
    setSelectedUser(record);
    setIsUserBookingVisible(true);
    console.log(selectedUser);
  };

  const handleUserBookingModalClose = () => {
    setSelectedUser(null);
    setIsUserBookingVisible(false);
  };

  const userColumns = [
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, record: any) => (
        <Space className="flex items-center justify-center">
          <Button
            type="link"
            icon={<AiOutlineEye className="text-lg" />}
            onClick={() => handleViewDetails(record)}
          />
          <Button
            type="link"
            icon={<AiOutlineBars className="text-lg" />}
            onClick={() => handleViewBooking(record)}
          />
          <Button
            type="link"
            icon={<AiOutlineDelete className="text-lg" />}
          />
        </Space>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      render: (id: number) => id.toString().padStart(6, "0"),
    },
    {
      title: "Username",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Full Name",
      width: 200,
      render: (_: any, record: any) =>
        (record.first_name && record.last_name)
          ? `${record.first_name} ${record.last_name}`
          : `USER ${record.id}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      width: 120,
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Active",
      width: 50,
      render: (_: any, record: any) =>
        <Switch
          checked={record.active}
          size="small"
          onChange={(value) => handleActiveChange(value, record)}
          style={{
            backgroundColor: record.active ? "#52c41a" : "#f5222d",
            borderColor: record.active ? "#52c41a" : "#f5222d",
          }}
          disabled
        />
    },
  ];

  const adminColumns = [
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, record: any) => (
        <Space className="flex items-center justify-center">
          <Button
            type="link"
            icon={<AiOutlineEye className="text-xl" />}
            onClick={() => handleViewDetails(record)}
          />
        </Space>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      render: (id: number) => id.toString().padStart(6, "0"),
    },
    {
      title: "Username",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Full Name",
      width: 200,
      render: (_: any, record: any) =>
        (record.first_name && record.last_name)
          ? `${record.first_name} ${record.last_name}`
          : `ADMIN ${record.id}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      width: 120,
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  return (
    <main className="h-screen">
      <section className="p-6 bg-white rounded-t-lg">
        <h3 className="mb-2 text-xl font-bold">Quản trị người dùng</h3>
        <Table
          bordered
          dataSource={listUser.filter((user: any) => user.role === "USER")}
          columns={userColumns}
          rowClassName="editable-row"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }}
        />
        <h3 className="mb-2 text-xl font-bold">Quản trị viên</h3>
        <Table
          bordered
          dataSource={listUser.filter((user: any) => user.role === "ADMIN")}
          columns={adminColumns}
          rowClassName="editable-row"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }}
        />
      </section>
      <UserDetailsModal
        user={selectedUser}
        visible={isUserDetailsVisible}
        onClose={handleUserDetailsModalClose}
      />
      <UserBookingModal
        user={selectedUser}
        visible={isUserBookingVisible}
        onClose={handleUserBookingModalClose}
      />
    </main>
  );
}
