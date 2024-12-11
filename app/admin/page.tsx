import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100">
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
