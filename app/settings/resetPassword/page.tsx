"use client";

import { Button, Input } from "antd";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-4 bg-white border rounded-b-lg hover:shadow-lg transition-shadow duration-200">
        <form className="w-2/5 py-4 mx-auto">
          <div className="mb-4">
            <label className="block mb-2">Mật khẩu cũ</label>
            <Input
              type="oldPassword"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-2">Mật Khẩu mới</label>
            <Input
              type="newPassword"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2">Xác Nhận Mật Khẩu</label>
            <Input
              type="confirmPassword"
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
      </div>
    </div>
  );
};

export default ResetPasswordPage;
