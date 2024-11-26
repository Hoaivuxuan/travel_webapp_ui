"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { vehicles } from "@/data/fakeData";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import VehicleInfo from "./VehicleInfo";
import { format } from "date-fns";

const availableServices = [
  { key: "bonusDriver", name: "Tài xế phụ", max: 2 },
  { key: "childSeat", name: "Ghế trẻ em", max: 2 },
  { key: "gps", name: "GPS", max: 1 },
] as const;

type ServiceKeys = typeof availableServices[number]["key"];
type Services = Record<ServiceKeys, number>;

const VehicleDetail = () => {
  const router = useRouter();
  const detailsParams = useSearchParams();
  const id = detailsParams.get("id") || "";

  const [services, setServices] = useState<Services>(() =>
    Object.fromEntries(availableServices.map((service) => [service.key, 0])) as Services
  );

  const rentalItem = vehicles.find((item) => item.id === Number(id));
  if (!rentalItem) {
    return notFound();
  }

  const introduction = [
    "Đánh giá của khách hàng: 8,6 / 10",
    "Chính sách nhiên liệu phổ biến nhất",
    "Không phải chờ đợi lâu",
    "Quầy thanh toán dễ tìm",
    "Nhân viên quầy thanh toán sẵn sàng hỗ trợ",
    "Hủy đặt thuê miễn phí",
  ];

  const policy = [
    "Miễn phí hủy tối đa 48 giờ trước khi nhận xe",
    "Bảo hiểm hư hại do va chạm với mức miễn thường bằng 0 ₫",
    "Bảo hiểm Mất trộm với mức miễn thường bằng 0 ₫",
    "Số kilômét không giới hạn",
  ];

  const serviceCost = 300000;
  const totalServiceCost = Object.values(services).reduce(
    (sum, count) => sum + count * serviceCost,
    0
  );

  const handleServiceChange = (service: ServiceKeys, amount: number) => {
    setServices((prev) => {
      const newValue = prev[service] + amount;
      const maxLimit = availableServices.find((s) => s.key === service)?.max || 0;
      return {
        ...prev,
        [service]: Math.max(0, Math.min(newValue, maxLimit)),
      };
    });
  };

  const handleBookingClick = () => {
    const search = localStorage.getItem("searchRental");
    const url = new URL("https://booking.html");
    if (search) {
      const searchObject = JSON.parse(search);
      url.searchParams.set("rental", "true");
      url.searchParams.set("id", id);
      url.searchParams.set("location", searchObject.location);
      url.searchParams.set("checkin", format(searchObject.checkin.date, "yyyy-MM-dd"));
      url.searchParams.set("checkout", format(searchObject.checkout.date, "yyyy-MM-dd"));
    }

    router.push(`/rental/booking?url=${url.search}`);
  };

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
                  {availableServices.map((service) => (
                    <div
                      key={service.key}
                      className="flex justify-between items-center"
                    >
                      <span>{service.name}</span>
                      <div className="flex items-center border border-gray-200">
                        <button
                          className={`p-2 ${services[service.key] === 0 ? "bg-gray-200" : "bg-blue-200"}`}
                          onClick={() => handleServiceChange(service.key, -1)}
                          disabled={services[service.key] === 0}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <div className="w-[30px] text-center">{services[service.key]}</div>
                        <button
                          className={`p-2 ${services[service.key] >= service.max ? "bg-gray-200" : "bg-blue-200"}`}
                          onClick={() => handleServiceChange(service.key, 1)}
                          disabled={services[service.key] >= service.max}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="col-span-1">
          <div className="space-y-4 sticky top-10 p-4 bg-white border rounded-lg">
            <div className="flex justify-between">
              <span className="text-lg font-bold">Tổng tiền</span>
              <span className="text-xl font-semibold">{rentalItem.price} ₫</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Dịch vụ phụ</span>
              <span className="text-sm">{totalServiceCost} ₫</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Thuế</span>
              <span className="text-sm">0 ₫</span>
            </div>

            <div className="flex justify-between border-t pt-4">
              <span className="text-lg font-bold">Tổng cộng</span>
              <span className="text-xl font-semibold">
                {rentalItem.price + totalServiceCost} ₫
              </span>
            </div>

            <button
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150"
              onClick={handleBookingClick}
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
