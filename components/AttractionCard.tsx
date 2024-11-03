// components/activities/ActivityCard.tsx
import React from "react";

interface ActivityCardProps {
  title: string;
  location: string;
  isBestSeller: boolean;
  rating: number;
  reviews: number;
  price: string;
  imageUrl: string;
  cancellationPolicy?: string;
  availableDate?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  location,
  isBestSeller,
  rating,
  reviews,
  price,
  imageUrl,
  cancellationPolicy = "Có lựa chọn hủy miễn phí",
  availableDate = "Mở cửa từ 5 tháng 11",
}) => {
  return (
    <div  className="flex border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 max-w">
      <img src={imageUrl} alt={title} className="w-1/3 h-full object-cover" />
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>
        
        {isBestSeller && (
          <span className="text-xs text-white bg-blue-600 rounded-full px-2 py-1 inline-block mt-2">
            #1 Bán chạy nhất
          </span>
        )}

        <p className="mt-2 text-sm text-gray-700">{`Vé xem biểu diễn tại nhà hát múa rối nước Thăng Long, ${location}`}</p>

        <div className="mt-2 flex items-center text-green-600">
          <span className="text-yellow-500">⭐ {rating}</span>
          <span className="ml-1">- Tuyệt vời</span>
          <span className="ml-1 text-gray-500">({reviews} đánh giá)</span>
        </div>

        <p className="text-sm mt-2 text-green-600 flex items-center">
          <span>✔</span> <span className="ml-1">{cancellationPolicy}</span>
        </p>

        <p className="mt-2 text-blue-500 font-bold">{price}</p>
        <p className="text-sm text-gray-500">{availableDate}</p>

        <button className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition duration-200">
          Xem chỗ trống
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
