import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faCog,
} from "@fortawesome/free-solid-svg-icons"; // import các icon FontAwesome

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-[#2c3e50] text-white p-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Admin Panel</h2>
        <ul className="space-y-6">
          <li>
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-2 text-xl"
            >
              <span>Bảng điều khiển</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/user"
              className="flex items-center space-x-2 text-xl"
            >
              <span>Quản lý người dùng</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-2 text-xl"
            >
              <span>Cài đặt</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6 bg-white">
        <h1 className="text-3xl font-semibold">
          Chào mừng đến với trang quản trị
        </h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
