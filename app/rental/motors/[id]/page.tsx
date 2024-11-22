"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { vehicles } from "@/data/fakeData";
import { useState } from "react";
import MotorRentalDetail from "./MotorRentalDetail";
import MotorRentalPayment from "./MotorRentalPayment";
import NotFound from "@/components/NotFound";

const RentalDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  const rentalItem = vehicles.find((item) => item.id === Number(id));
  if (!rentalItem) {
    return notFound();
  }

  return (
    <div>
      <div className="p-6 !pb-2 mx-auto max-w-7xl">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-gray-400 transition duration-150"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Quay lại trang trước
        </button>
      </div>

      <div>
        {!isPaymentVisible ? (
          <MotorRentalDetail
            id={rentalItem.id.toString()}
            onContinue={() => setIsPaymentVisible(true)}
          />
        ) : (
          <MotorRentalPayment
            id={rentalItem.id.toString()}
            onBack={() => setIsPaymentVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default RentalDetailPage;
