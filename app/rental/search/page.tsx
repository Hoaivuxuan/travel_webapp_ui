"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { listings } from "@/data/fakeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faUserFriends,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import RentalSearchForm from "@/components/rental/RentalSearchForm";
import { CarItem, MotorItem } from "./RentalItem";

type Props = {
  searchParams: RentalSearchParams;
};

export type RentalSearchParams = {
  url: URL;
  location: string;
  checkin: string;
  checkout: string;
  type: string;
};

const getImageUrl = (model: string, token: string) => {
  const img_model = model.replaceAll(" ", "-").toLowerCase();
  return `https://firebasestorage.googleapis.com/v0/b/travel-web-32360.appspot.com/o/${img_model}.jpg?alt=media&token=${token}`;
};

async function RentalSearchPage({ searchParams }: Props) {
  // Kiểm tra nếu không có url, trả về notFound
  if (!searchParams.url) return notFound();

  let results = listings; // Lấy danh sách từ fakeData

  // Lấy danh sách theo loại
  const searchResults =
    searchParams.type === "cars"
      ? results.content.listCars
      : results.content.listMotors;

  // Nếu không có kết quả, có thể trả về thông báo không tìm thấy
  if (searchResults.length === 0) {
    return (
      <div className="text-center py-4">
        <h2 className="text-xl font-semibold">
          Không có kết quả nào cho tìm kiếm của bạn.
        </h2>
      </div>
    );
  }

  return (
    <section>
      <div className="py-6 mx-auto max-w-7xl">
        <div className="py-4">
          <RentalSearchForm />
        </div>

        <h2 className="py-4">
          <span className="ml-2">
            {searchParams.location}, từ {searchParams.checkin} đến{" "}
            {searchParams.checkout}
          </span>
        </h2>

        <hr className="mb-5" />

        <div className="grid grid-cols-5 gap-4">
          <aside className="col-span-1 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h3 className="font-bold text-sm mb-3">Chọn lọc theo:</h3>
            <hr className="my-2" />
          </aside>
          <div className="col-span-4">
            <div className="space-y-4">
              {searchResults.map((item) =>
                searchParams.type === "cars" ? (
                  <CarItem key={item.id} id={item.id.toString()} />
                ) : (
                  <MotorItem key={item.id} id={item.id.toString()} />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentalSearchPage;
