import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        404 - Không Tìm Thấy Trang
      </h1>
      <p className="text-gray-700 mb-8">
        Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
      </p>
      <Link href="/">
        <a className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-[#472f91] transition duration-300">
          Quay lại trang chủ
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
