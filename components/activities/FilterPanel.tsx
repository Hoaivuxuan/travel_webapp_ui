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
            Hạ Long (2)
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
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
