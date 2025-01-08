"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import { Table, Switch, Space, Button, Menu, Dropdown } from "antd";
import { AiOutlineEye, AiOutlineBars } from "react-icons/ai";
import listCountries from "@/data/SelectCountry.json"
import UserDetailsModal from "./UserDatails";
import UserBookingModal from "./UserBooking";
import { UserService } from "@/services/CommonService";

export default function UserAdmin() {
  const [listUser, setListUser] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsVisible, setIsUserDetailsVisible] = useState(false);
  const [isUserBookingVisible, setIsUserBookingVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = (await UserService.getAllUsers()).data;
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
  };

  const handleUserDetailsModalClose = () => {
    setSelectedUser(null);
    setIsUserDetailsVisible(false);
  };

  const handleViewBooking = (record: any) => {
    setSelectedUser(record);
    setIsUserBookingVisible(true);
  };

  const handleUserBookingModalClose = () => {
    setSelectedUser(null);
    setIsUserBookingVisible(false);
  };

  const userMenu = (record: any) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleViewDetails(record)}>
        <div className="flex items-center">
          <AiOutlineEye className="mr-2" /> Xem chi tiết
        </div>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleViewBooking(record)}>
        <div className="flex items-center">
          <AiOutlineBars className="mr-2" /> Xem đặt phòng
        </div>
      </Menu.Item>
    </Menu>
  );

  const userColumns = [
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, record: any) => (
        <Space className="flex items-center justify-center">
          <Dropdown overlay={userMenu(record)} trigger={['click']}>
            <Button type="link" icon={<AiOutlineBars className="text-lg" />} />
          </Dropdown>
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
      title: "Country",
      dataIndex: "country",
      width: 200,
      render: (country: string) => listCountries.find((item) => item.code === country)?.name || "N/A",
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
      width: 350,
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
      width: 200,
      render: (country: string) => listCountries.find((item) => item.code === country)?.name || "N/A",
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
          loading={loading}
          size="middle"
          rowClassName="editable-row"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1500 }}
        />
        <h3 className="mb-2 text-xl font-bold">Danh sách Quản trị viên</h3>
        <Table
          bordered
          dataSource={listUser.filter((user: any) => user.role === "ADMIN")}
          columns={adminColumns}
          loading={loading}
          size="middle"
          rowClassName="editable-row"
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
