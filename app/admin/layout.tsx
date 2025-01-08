import React from 'react';
import { FaTachometerAlt, FaUsers, FaHotel, FaBuilding, FaGlobeAmericas } from 'react-icons/fa';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-800 text-white">
        <ul className="space-y-4 p-6">
          <li className="flex items-center space-x-2">
            <FaTachometerAlt className="mr-2" />
            <a href="/admin" className="text-white hover:text-gray-400">Trang chủ</a>
          </li>
          <li className="flex items-center space-x-2">
            <FaUsers className="mr-2" />
            <a href="/admin/user" className="text-white hover:text-gray-400">Quản lý tài khoản</a>
          </li>
          <li className="flex items-center space-x-2">
            <FaHotel className="mr-2" />
            <a href="/admin/hotels" className="text-white hover:text-gray-400">Quản lý khách sạn</a>
          </li>
          <li className="flex items-center space-x-2">
            <FaBuilding className="mr-2" />
            <a href="/admin/facilities" className="text-white hover:text-gray-400">Quản lý cơ sở thuê xe</a>
          </li>
          <li className="flex items-center space-x-2">
            <FaGlobeAmericas className="mr-2" />
            <a href="#" className="text-white hover:text-gray-400">Quản lý tour</a>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
