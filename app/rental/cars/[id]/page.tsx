"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import { listings } from "@/data/fakeData";
import { useState } from "react";
import CarRentalDetail from "./CarRentalDetail";
import CarRentalPayment from "./CarRentalPayment";

const CarRentalDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const rentalItem = listings.content.listCars.find(
    (item) => item.id.toString() === id,
  );
  if (!rentalItem) return notFound();

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  return (
    <div>
      <div className="p-6 !pb-2 mx-auto max-w-7xl">
        <a
          href="#"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400 transition duration-150"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Quay lại trang trước
        </a>
      </div>
      <div>
        {!isPaymentVisible ? (
          <CarRentalDetail
            id={rentalItem.id.toString()}
            onContinue={() => setIsPaymentVisible(true)}
          />
        ) : (
          <CarRentalPayment
            id={rentalItem.id.toString()}
            onBack={() => setIsPaymentVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CarRentalDetailPage;
