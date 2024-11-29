"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Notification from "@/components/Notification";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Input, Button } from "antd";

const BecomeAdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const { notifySuccess, notifyWarning } = Notification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notifyWarning("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    const registrationData = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await fetch("http://localhost:8080/users/createAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        notifySuccess("Bạn đã đăng ký thành công!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        const errorResponse = await response.json();
        notifyWarning(
          errorResponse.message || "Đã xảy ra lỗi trong quá trình đăng ký!"
        );
      }
    } catch (error) {
      notifyWarning("Đã xảy ra lỗi trong quá trình đăng ký!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f0f4f8]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[20%]"
      >
        <h2 className="text-2xl mb-6 text-center">Đăng Ký</h2>
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
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[60%] transform text-gray-500"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <div className="mb-4 relative">
          <label className="block mb-2">Xác Nhận Mật Khẩu</label>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-[60%] transform text-gray-500"
          >
            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <div className="mt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#472f91] text-white p-2 rounded"
          >
            Đăng Ký
          </Button>
          <p className="mt-2 text-center">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-blue-600">
              Đăng nhập
            </a>
          </p>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default BecomeAdminPage;
