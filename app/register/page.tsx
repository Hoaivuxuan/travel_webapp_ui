"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Notification from "@/components/Notification";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility
  const router = useRouter();

  const { notifySuccess, notifyWarning } = Notification();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notifyWarning("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      date_of_birth: dateOfBirth,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/users/register", {
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
        notifyWarning(errorResponse.message || "Đã xảy ra lỗi trong quá trình đăng ký!");
      }
    } catch (error) {
      notifyWarning("Đã xảy ra lỗi trong quá trình đăng ký!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f0f4f8]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-100"
      >
        <h2 className="text-2xl mb-6 text-center">Đăng Ký</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label className="block mb-2">Họ</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tên</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2 mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2 mb-4 relative">
            <label className="block mb-2">Mật Khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
          <div className="col-span-2 mb-4 relative">
            <label className="block mb-2">Xác Nhận Mật Khẩu</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showConfirmPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-[#013B94] text-white p-2 rounded"
          >
            Đăng Ký
          </button>
          <p className="mt-2 text-center">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-blue-600">
              Đăng nhập ở đây
            </a>
          </p>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
