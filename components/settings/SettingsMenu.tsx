import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faCreditCard } from "@fortawesome/free-solid-svg-icons";

const SettingsMenu = () => {
  return (
    <div className="bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <ul className="divide-y">
        <li className="p-4 flex items-center hover:bg-gray-100 cursor-pointer transition">
          <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-600" />
          <span className="font-semibold text-blue-500">Thông tin cá nhân</span>
        </li>
        <li className="p-4 flex items-center hover:bg-gray-100 cursor-pointer transition">
          <FontAwesomeIcon icon={faCog} className="mr-2 text-gray-600" />
          <span>Cài đặt chung</span>
        </li>
        <li className="p-4 flex items-center hover:bg-gray-100 cursor-pointer transition">
          <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-gray-600" />
          <span>Phương thức thanh toán</span>
        </li>
      </ul>
    </div>
  );
};

export default SettingsMenu;
