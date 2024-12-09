"use client";

import Link from "next/link";
import React, { useState } from "react";

const settingMenu = [
  { name: "personal", title: "Thông tin chung", href: "personal" },
  { name: "resetPassword", title: "Đổi mật khẩu", href: "resetPassword" },
  { name: "other", title: "Cài đặt khác", href: "personal" },
];

const SettingsMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="bg-white text-sm border rounded-t-lg hover:shadow-lg transition-shadow duration-200">
      <div className="flex divide-x px-2">
        {settingMenu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={handleLinkClick}
            className="flex items-center text-sm text-[#472f91] font-semibold px-4 py-2"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingsMenu;