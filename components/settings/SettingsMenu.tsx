import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faCreditCard } from "@fortawesome/free-solid-svg-icons";

const SettingsMenu = () => {
  return (
    <div className="bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <ul className="divide-y">
        <li className="p-4 flex items-center hover:bg-gray-100 cursor-pointer transition">
          <span className="font-semibold text-blue-500">Thông tin cá nhân</span>
        </li>
        <li className="p-4 flex items-center hover:bg-gray-100 cursor-pointer transition">
          <span className="font-semibold text-blue-500">Đổi mật khẩu</span>
        </li>
        <li className="p-4 flex items-center hover:bg-gray-100 cursor-pointer transition">
          <span className="font-semibold text-blue-500">Cài đặt chung</span>
        </li>
      </ul>
    </div>
  );
};

export default SettingsMenu;
