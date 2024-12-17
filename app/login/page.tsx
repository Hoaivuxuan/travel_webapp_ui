"use client";

import { useState } from "react";
import { useAuth } from "@/app/login/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input, Button } from "antd";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { notifySuccess, notifyWarning } = Notification();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();

          if (data) {
            console.log(data);
            notifySuccess("Đăng nhập thành công!");
            login(data.id, data.token);
            setTimeout(() => {
              if (data.role === "USER") window.location.href = "/home";
              if (data.role === "ADMIN") window.location.href = "/admin";
            }, 3000);
          }
        } else {
          notifyWarning("Email hoặc mật khẩu không đúng!");
        }
      } catch (error) {
        notifyWarning("Đã xảy ra lỗi trong quá trình đăng nhập!");
      }
    } else {
      notifyWarning("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f0f4f8]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-6 text-center">Đăng Nhập</h2>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-2">Mật Khẩu</label>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            visibilityToggle={{ visible: showPassword, onVisibleChange: setShowPassword }}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#472f91] text-white p-2 rounded"
          >
            Đăng Nhập
          </Button>
          <p className="mt-2 text-center">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-blue-600">
              Đăng ký ở đây
            </a>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
