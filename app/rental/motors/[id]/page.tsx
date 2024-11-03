"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import { listings } from "@/data/fakeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGasPump,
  faLocationDot,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MotorRentalDetail from "./MotorRentalDetail";
import MotorRentalPayment from "./MotorRentalPayment";

const RentalDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const rentalItem = listings.content.listMotors.find(
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