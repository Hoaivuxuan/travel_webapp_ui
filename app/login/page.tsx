"use client";

import { useState } from "react";
import { useAuth } from "@/app/login/AuthContext";
import { ToastContainer } from "react-toastify";
import Notification from "@/components/Notification";
import "react-toastify/dist/ReactToastify.css";
import { decodeJwt } from "jose";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { notifySuccess, notifyWarning } = Notification();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
            notifySuccess("Đăng nhập thành công!");
            login(data.id, data.token);
            setTimeout(() => {
              window.location.href = "/home";
            }, 3000);
          } else {
            notifyWarning("Đã xảy ra lỗi trong quá trình đăng nhập!");
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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mật Khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-[#013B94] text-white p-2 rounded"
          >
            Đăng Nhập
          </button>
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
