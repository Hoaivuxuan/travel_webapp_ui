"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CarOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/app/login/AuthContext";
import { useState, useRef, useEffect } from "react";

const mainMenu = [
  {
    name: "hotel",
    title: "TÌM NƠI LƯU TRÚ",
    href: "/home",
    icon: <HomeOutlined className="text-lg" />,
  },
  {
    name: "rental",
    title: "CHO THUÊ XE",
    href: "/rental",
    icon: <CarOutlined className="text-lg" />,
  },
  {
    name: "activities",
    title: "HOẠT ĐỘNG & VUI CHƠI",
    href: "/activities",
    icon: <CameraOutlined className="text-lg" />,
  },
];

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { isLoggedIn, user, logout } = useAuth();
  const username = user?.name;
  const avatar = user?.avatar;
  const role = user?.role;

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#472f91]">
      <nav className="grid grid-cols-6 items-center p-6 mx-auto max-w-7xl">
        <div className="col-span-1">
          <Link
            href="/home"
            className="flex items-center"
            onClick={handleLinkClick}
          >
            <span className="sr-only">HANOI</span>
            <Image
              src="https://res.cloudinary.com/df42yelwi/image/upload/v1732781066/HANOI_fwj9na.png"
              alt="Logo"
              width={150}
              height={50}
              className="h-12"
            />
          </Link>
        </div>

        <div className="col-span-4 flex justify-center">
          <div className="flex justify-center flex-grow">
            {isLoggedIn &&
              role === "USER" &&
              mainMenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center text-sm font-semibold mx-4 p-2 rounded-lg
                    ${pathname === item.href ? "text-yellow-400" : "text-white"}`
                  }
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
          </div>
        </div>

        <div
          className="col-span-1 relative flex items-center justify-end space-x-2"
          ref={dropdownRef}
        >
          {isLoggedIn ? (
            <>
              <Image
                src={avatar || ""}
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
                <div className="absolute right-0 top-10 mt-2 w-48 bg-white shadow-lg">
                  <Link
                    href="/settings/personal"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={handleLinkClick}
                  >
                    <UserOutlined className="mr-2" />
                    Quản lý tài khoản
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <LogoutOutlined className="mr-2" />
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
