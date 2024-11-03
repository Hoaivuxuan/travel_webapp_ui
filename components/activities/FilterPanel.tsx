// components/activities/FilterPanel.tsx
import React from "react";

const FilterPanel = () => {
  return (
    <aside className="w-64 p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Lọc theo:</h2>

      {/* Địa điểm */}
      <div className="mb-4">
        <h3 className="font-medium">Địa điểm</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Hà Nội (3969)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Hà Đông (2)
          </label>
        </div>
      </div>

      {/* Hạng mục */}
      <div className="mb-4">
        <h3 className="font-medium">Hạng mục</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Tour (218)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Thiên nhiên & ngoài trời (114)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Bảo tàng, nghệ thuật & văn hóa (81)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Hoạt động giải trí & vé (50)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Ăn uống (41)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Lớp học & workshop (9)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Dịch vụ & cho thuê (1)
          </label>
        </div>
      </div>

      {/* Tiêu chí đi kèm */}
      <div className="mb-4">
        <h3 className="font-medium">Tiêu chí đi kèm</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Ưu đãi & giảm giá (74)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Miễn phí huỷ (316)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Không phải xếp hàng (17)
          </label>
        </div>
      </div>

      {/* Điểm đánh giá */}
      <div className="mb-4">
        <h3 className="font-medium">Điểm đánh giá</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Từ 4.5 trở lên (97)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Từ 4 trở lên (127)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Từ 3.5 trở lên (136)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Từ 3 trở lên (143)
          </label>
        </div>
      </div>

      {/* Giờ trong ngày */}
      <div className="mb-4">
        <h3 className="font-medium">Giờ trong ngày</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Buổi sáng (3390)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Buổi trưa (700)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Buổi tối (525)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Bắt đầu sau 18:00 (181)
          </label>
        </div>
      </div>

      {/* Ngôn ngữ */}
      <div>
        <h3 className="font-medium">Ngôn ngữ</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Tiếng Anh (199)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Tiếng Việt (12)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Tiếng Pháp (6)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Tiếng Nga (4)
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
