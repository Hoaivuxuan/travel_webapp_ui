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
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  location,
  isBestSeller,
  rating,
  reviews,
  price,
  imageUrl,
}) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>
        {isBestSeller && (
          <span className="text-xs text-white bg-red-500 rounded px-2 py-1 inline-block mt-2">
            🔥 Bán chạy nhất
          </span>
        )}
        <p className="mt-2 text-sm text-gray-500">
          ⭐ {rating} - {reviews} đánh giá
        </p>
        <p className="mt-2 text-blue-500 font-bold">{price}</p>
        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
