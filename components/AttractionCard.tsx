"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { encodeToJWT } from "@/utils/JWT";
import { TourService } from "@/services/TourService";
interface ActivityCardProps {
  id: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ id }) => {
  const router = useRouter();
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = (await TourService.getById(id)).data;
        if (!response) {
          throw new Error("Không thể lấy thông tin khách sạn");
        }
        console.log("check:", response);
        setActivity(response);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, [id]);

  if (loading) {
    return <div>Đang tải thông tin khách sạn...</div>;
  }
  if (error || !activity) {
    return <div>Không tìm thấy thông tin khách sạn.</div>;
  }

  const handleDetailClick = () => {
    setLoading(true);
    const token = encodeToJWT(activity);
    router.push(`/activities/detail?token=${token}`);
    setLoading(false);
    // router.push(`/activities/detail/${index}`);
  };

  return (
    <article className="flex border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 max-w">
      <Image
        src={activity.images[0].url}
        alt={`Hình ảnh của ${name}`}
        className="w-1/3 h-full object-cover"
        width={300}
        height={200}
      />
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold">{activity.name}</h3>
        <p className="text-sm text-gray-500">{activity.city}</p>

        {activity.isBestSeller && (
          <span className="text-xs text-white bg-blue-600 rounded-full px-2 py-1 inline-block mt-2">
            #1 Bán chạy nhất
          </span>
        )}

        <p className="mt-2 text-sm text-gray-700">{`${activity.address}`}</p>

        <div className="mt-2 flex items-center text-green-600">
          <span className="text-yellow-500">⭐ {activity.rating}</span>
          <span className="ml-1">- Tuyệt vời</span>
          <span className="ml-1 text-gray-500">
            ({activity.review.total_reviews} đánh giá)
          </span>
        </div>

        {activity.cancellationPolicy === 1 && (
          <p className="text-sm mt-2 text-green-600 flex items-center">
            <span>✔</span>{" "}
            <span className="ml-1">Có lựa chọn hủy miễn phí</span>
          </p>
        )}

        <p className="mt-2 text-blue-500 font-bold">
          {new Intl.NumberFormat("vi-VN").format(
            Number(
              activity.tour_schedule_responses[0].dailyTicketAvailabilities[0]
                .price
            )
          )}{" "}
          VND
        </p>

        <p className="text-sm text-gray-500">{activity.availableDate}</p>

        <button
          onClick={handleDetailClick}
          className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition duration-200"
          aria-label={`Xem chỗ trống cho ${activity.name}`}
        >
          Xem chỗ trống
        </button>
      </div>
    </article>
  );
};

export default ActivityCard;
