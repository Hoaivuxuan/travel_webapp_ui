"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { vehicles } from "@/data/fakeData";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";
import VehicleInfo from "./VehicleInfo";

type DetailsParams = {
  id: string;
};

const VehicleDetail = () => {
  const router = useRouter();
  const detailsParams = useSearchParams();
  const params: DetailsParams = {
    id: detailsParams.get("id") || "",
  };
  
  const [pickupInfo, setPickupInfo] = useState({ date: "", location: "" });
  const [dropoffInfo, setDropoffInfo] = useState({ date: "", location: "" });
  const [services, setServices] = useState({
    childSeat: 0,
    gps: 0,
  });
  const introduction = [
    "Đánh giá của khách hàng: 8,6 / 10",
    "Chính sách nhiên liệu phổ biến nhất",
    "Không phải chờ đợi lâu",
    "Quầy thanh toán dễ tìm",
    "Nhân viên quầy thanh toán sẵn sàng hỗ trợ",
    "Hủy đặt thuê miễn phí"
  ];
  const policy = [
    "Miễn phí hủy tối đa 48 giờ trước khi nhận xe",
    "Bảo hiểm hư hại do va chạm với mức miễn thường bằng 0 VNĐ",
    "Bảo hiểm Mất trộm với mức miễn thường bằng 0 VNĐ",
    "Số kilômét không giới hạn",
  ];

  useEffect(() => {
    const storedValues = localStorage.getItem("rentalSearchFormValues");
    if (storedValues) {
      const { dates, location } = JSON.parse(storedValues);
      setPickupInfo({
        date: new Date(dates.startDate).toLocaleDateString("vi-VN"),
        location,
      });
      setDropoffInfo({
        date: new Date(dates.endDate).toLocaleDateString("vi-VN"),
        location,
      });
    }

    const storedServices = localStorage.getItem("rentalServices");
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rentalServices", JSON.stringify(services));
  }, [services]);

  const rentalItem = vehicles.find((item) => item.id === Number(params.id));
  if (!rentalItem) {
    return notFound();
  }

  const MAX_SERVICES = {
    childSeat: 2,
    gps: 1,
  };

  const handleServiceChange = (service: string, amount: number) => {
    setServices((prev) => {
      const newValue = prev[service as keyof typeof services] + amount;
      return {
        ...prev,
        [service as keyof typeof services]: Math.max(
          0,
          Math.min(
            newValue,
            MAX_SERVICES[service as keyof typeof MAX_SERVICES],
          ),
        ),
      };
    });
  };

  const serviceCost = 300000;
  const totalServiceCost = (services.childSeat + services.gps) * serviceCost;

  return (
    <div>
      <div className="p-6 !pb-2 mx-auto max-w-7xl">
        <a
          href="#"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-gray-400 transition duration-150"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Quay lại trang trước
        </a>
      </div>
      <section className="p-6 !pt-2 mx-auto max-w-7xl grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 p-4 bg-white border rounded-lg">
          <div className="p-4 bg-white">
            <div className="grid grid-cols-2 gap-4 my-4 pb-4">
              <div className="h-[300px]">
                <Image
                  src={`https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg`}
                  alt={`Image of ${rentalItem.id}`}
                  className="rounded-l-lg h-full w-auto"
                  width={300}
                  height={300}
                />
              </div>
              <div>
                <div className="pb-4">
                  <h1 className="text-2xl font-bold">{rentalItem.model}</h1>
                  <p className="text-gray-500 text-sm">
                    Cung cấp bởi Mioto Ho Chi Minh City
                  </p>
                </div>
                <div className="px-2 space-y-2">
                  <VehicleInfo type={rentalItem.type} details={rentalItem.details} />
                </div>
              </div>
            </div>
          </div>

          <hr className="my-2" />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Lựa chọn tuyệt vời!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {introduction.map((text, index) => (
                <div className="flex items-start space-x-2" key={index}>
                  <span className="text-green-600">✔</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-2" />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Giá đã bao gồm:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {policy.map((text, index) => (
                <div className="flex items-start space-x-2" key={index}>
                  <span className="text-green-600">✔</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {rentalItem.type === "car" && (
            <>
              <hr className="my-2" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-4">Dịch vụ phụ</h3>
                <div className="space-y-1">
                  {(["childSeat", "gps"] as Array<keyof typeof services>).map(
                    (service) => (
                      <div
                        key={service}
                        className="flex justify-between items-center"
                      >
                        <span className="capitalize">
                          {service === "childSeat" ? "Ghế trẻ em" : "GPS"}
                        </span>
                        <div className="flex items-center border border-gray-200">
                          <button
                            className={`p-2 ${services[service] === 0 ? "bg-gray-200" : "bg-blue-200"}`}
                            onClick={() => handleServiceChange(service, -1)}
                            disabled={services[service] === 0}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <div className="w-[30px] text-center">
                            {services[service]}
                          </div>
                          <button
                            className={`p-2 ${services[service] >= MAX_SERVICES[service] ? "bg-gray-200" : "bg-blue-200"}`}
                            onClick={() => handleServiceChange(service, 1)}
                            disabled={
                              services[service] >=
                              MAX_SERVICES[service as keyof typeof MAX_SERVICES]
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="col-span-1">
          <div className="space-y-4 sticky top-10 p-4 bg-white border rounded-lg">
            <div className="flex justify-between">
              <span className="text-lg font-bold">Tổng tiền</span>
              <span className="text-xl font-semibold">
                {rentalItem.price} VND
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Dịch vụ phụ</span>
              <span className="text-sm">
                {totalServiceCost} VND
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Thuế</span>
              <span className="text-sm">0 VNĐ</span>
            </div>

            <div className="flex justify-between border-t pt-4">
              <span className="text-lg font-bold">Tổng cộng</span>
              <span className="text-xl font-semibold">
                {(rentalItem.price + totalServiceCost)} VND
              </span>
            </div>

            <button
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VehicleDetail;
