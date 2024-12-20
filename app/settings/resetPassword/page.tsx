"use client";

import { Button, Input } from "antd";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Notification from "@/components/Notification";
import "react-toastify/dist/ReactToastify.css";

const { notifySuccess, notifyWarning } = Notification();

const ResetPasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      notifyWarning("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const bearerToken = localStorage.getItem("token");
      const userId = Number(localStorage.getItem("userId"));
      if(!userId || ! !bearerToken) return;

      const response = await fetch("http://localhost:8080/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          confirm_new_password: confirmPassword,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đã xảy ra lỗi");
      }

      notifySuccess("Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      notifyWarning("Đổi mật khẩu không thành công!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-4 bg-white border rounded-b-lg hover:shadow-lg transition-shadow duration-200">
        <form className="w-2/5 py-4 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Mật khẩu cũ</label>
            <Input.Password
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              visibilityToggle={{ visible: showOldPassword, onVisibleChange: setShowOldPassword }}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Mật Khẩu mới</label>
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              visibilityToggle={{ visible: showNewPassword, onVisibleChange: setShowNewPassword }}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Xác Nhận Mật Khẩu</label>
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              visibilityToggle={{ visible: showConfirmNewPassword, onVisibleChange: setShowConfirmPassword }}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mt-4">
            <Button type="primary" htmlType="submit" className="w-full bg-[#472f91] text-white p-2 rounded">
              Cập nhập
            </Button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
