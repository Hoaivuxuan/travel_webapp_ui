"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import { Table, Switch } from "antd";

interface DataType {
  key: string;
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address: string;
  date_of_birth: string | null;
  active: boolean;
  role: string;
}

export default function UserAdmin() {
  const [listUser, setListUser] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const handleRoleChange = (value: boolean, record: DataType) => {
    const newRole = value ? "USER" : "ADMIN";
    const newListUser = listUser.map((user) =>
      user.id === record.id ? { ...user, role: newRole } : user,
    );
    setListUser(newListUser);
  };

  const handleActiveChange = (value: boolean, record: DataType) => {
    const newListUser = listUser.map((user) =>
      user.id === record.id ? { ...user, active: value } : user,
    );
    setListUser(newListUser);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Full Name",
      render: (text: any, record: DataType) =>
        `${record.first_name} ${record.last_name}` || "",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Role",
      render: (text: any, record: DataType) => (
        <Switch
          checked={record.role === "USER"}
          checkedChildren="USER"
          unCheckedChildren="ADMIN"
          onChange={(value) => handleRoleChange(value, record)}
          style={{
            backgroundColor: record.role === "USER" ? "#1890ff" : "#f5222d",
            borderColor: record.role === "USER" ? "#1890ff" : "#f5222d",
          }}
          disabled={
            record.role === "ADMIN" &&
            record.id !== Number(localStorage.getItem("userId"))
          }
        />
      ),
      width: "10%",
    },
    {
      title: "Active",
      render: (text: any, record: DataType) => {
        const isSwitchVisible = !(record.role === "ADMIN");
        return isSwitchVisible ? (
          <Switch
            checked={record.active}
            onChange={(value) => handleActiveChange(value, record)}
            style={{
              backgroundColor: record.active ? "#52c41a" : "#f5222d",
              borderColor: record.active ? "#52c41a" : "#f5222d",
            }}
          />
        ) : null;
      },
    },
  ];

  return (
    <main className="py-6 mx-auto max-w-7xl">
      <section className="p-6 bg-white rounded-t-lg">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Quản trị người dùng</h3>
        </div>
      </section>
      <Table<DataType>
        bordered
        dataSource={listUser}
        columns={columns}
        rowClassName="editable-row"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </main>
  );
}
