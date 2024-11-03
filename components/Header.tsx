"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCar,
  faTheaterMasks,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/app/login/AuthContext";
import { useState, SetStateAction } from "react";

const products = [
  { name: "hotel", title: "TÌM NƠI LƯU TRÚ", href: "/home", icon: faHome },
  { name: "rental", title: "CHO THUÊ XE", href: "/rental", icon: faCar },
  {
    name: "activities",
    title: "HOẠT ĐỘNG & VUI CHƠI",
    href: "/activities",
    icon: faTheaterMasks,
  },
];

const Header = () => {
  const [activeItem, setActiveItem] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const { isLoggedIn, email, logout } = useAuth();
  const username = email ? email.split("@")[0] : "User";

  const handleLinkClick = (name: SetStateAction<string>, href: string) => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    } else {
      setActiveItem(name);
      setDropdownOpen(false);
    }
  };

  const handleLogoClick = () => {
    setActiveItem("hotel");
    setDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <header className="bg-[#013B94]">
      <nav className="grid grid-cols-6 items-center p-6 mx-auto max-w-7xl">
        <div className="col-span-1">
          <Link
            href="/home"
            className="flex items-center"
            onClick={handleLogoClick}
          >
            <span className="sr-only">Booking.com</span>
            <Image
              src="https://static1.squarespace.com/static/5bde0f00c3c16aa95581e2e2/62b4cb1add9d257dd43bb03d/62b653fedc7c895918d19b24/1656116254983/booking+logo+white.png?format=1500w"
              alt="Logo"
              width={150}
              height={50}
              className="h-12"
            />
          </Link>
        </div>

        <div className="col-span-4 flex justify-center">
          <div className="flex justify-center flex-grow">
            {products.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleLinkClick(item.name, item.href)}
                className={`flex items-center text-sm font-semibold text-white mx-4 ${
                  item.href !== "#" && item.name === activeItem
                    ? "bg-blue-600 rounded-lg p-2"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="h-5 w-5 mr-2"
                  aria-hidden="true"
                />
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-1 relative flex items-center justify-end space-x-2">
          {isLoggedIn ? (
            <>
              <Image
                src="https://bizweb.dktcdn.net/100/438/408/files/anh-luffy-yody-vn-67.jpg?v=1688806271889"
                alt={`${username}'s avatar`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              <span
                className="font-bold text-white cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {username}
              </span>

              {dropdownOpen && (
                <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <Link
                    href="/settings/personal"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={() => setActiveItem("")}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Quản lý tài khoản
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              href="/login"
              className="text-white font-semibold bg-blue-600 rounded-lg px-4 py-2"
            >
              Đăng Nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
