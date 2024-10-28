"use client";

import { notFound } from "next/navigation";
import { listings } from "@/data/fakeData";
import { CarItem, MotorItem } from "./RentalItem";
import RentalSearchForm from "@/components/rental/RentalSearchForm";

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
  if (!searchParams.url) return notFound();

  let results = listings;

  const searchResults = [
    ...results.content.listCars.map((item) => ({ ...item, type: "car" })),
    ...results.content.listMotors.map((item) => ({ ...item, type: "motor" })),
  ].sort((a, b) => a.model.localeCompare(b.model));

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
            {searchParams.checkout} ({searchResults.length} kết quả)
          </span>
        </h2>

        <hr className="mb-5" />

        <div className="grid grid-cols-5 gap-4">
          <aside className="col-span-1 p-4 border rounded-lg">
            <h3 className="font-bold text-sm mb-3">Chọn lọc theo:</h3>
            <hr className="my-2" />
          </aside>
          <div className="col-span-4">
            <div className="space-y-4">
              {searchResults.map((item) =>
                item.type === "car" ? (
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
