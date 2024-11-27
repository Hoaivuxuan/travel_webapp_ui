"use client";

import { useState } from "react";
import Image from "next/image";
import { rentalFacilities, vehicles } from "@/data/fakeData";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import VehicleInfo from "./VehicleInfo";
import { format } from "date-fns";
import {
  EnvironmentOutlined,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Radio, Input, Space, Button } from "antd";
import { importantInfo, policies, requirements } from "@/data/defaultValues";

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
  const facilityId = detailsParams.get("facility") || "";

  const [services, setServices] = useState<Services>(() =>
    Object.fromEntries(availableServices.map((service) => [service.key, 0])) as Services
  );

  const [pickupLocation, setPickupLocation] = useState("office");
  const [returnLocation, setReturnLocation] = useState("office");
  const [pickupAddress, setPickupAddress] = useState("");
  const [returnAddress, setReturnAddress] = useState("");

  const rentalItem = vehicles.find((item) => item.id === Number(id));
  const facilityItem = rentalFacilities.find((item) => item.id === Number(facilityId));
  if (!rentalItem || !facilityItem) {
    return notFound();
  }

  const rentalFacility = rentalItem.rentalFacility.find((facility) => facility.id === Number(facilityId)) || undefined;
  const serviceCost = 300000;
  const totalServiceCost = Object.values(services).reduce(
    (sum, count) => sum + count * serviceCost,
    0
  );

  const handleLocationChange = (e: any) => {
    setReturnLocation(e.target.value);
  };

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
      url.searchParams.set("facility", facilityId);
      url.searchParams.set("location", searchObject.location);
      url.searchParams.set("checkin", format(searchObject.checkin.date, "yyyy-MM-dd"));
      url.searchParams.set("checkout", format(searchObject.checkout.date, "yyyy-MM-dd"));
    }

    router.push(`/rental/booking?url=${url.search}`);
  };

  return (
    <div>
      <div className="p-6 !pb-2 mx-auto max-w-7xl">
        <Button
          type="primary"
          className="bg-blue-600"
          onClick={() => {
            router.back();
          }}
        >
          Quay lại trang trước
        </Button>
      </div>
      <section className="p-6 !pt-2 mx-auto max-w-7xl grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 space-y-4">
          <div className="p-4 bg-white border rounded-lg space-y-4">
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
                  <VehicleInfo type={rentalItem.type} details={rentalItem.details} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border rounded-lg space-y-4">
              <h3 className="text-lg font-bold mb-2">Chính sách thuê xe</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {policies.map((policy, index) => (
                  <li key={index}>{policy}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white border rounded-lg space-y-4">
              <h3 className="text-lg font-bold mb-2">Yêu cầu thuê xe</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white border rounded-lg space-y-4">
              <h3 className="text-lg font-bold mb-2">Thông tin quan trọng</h3>
              <div>
                <h4 className="font-semibold mb-1">Trước khi đặt xe</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {importantInfo.beforeBooking.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Sau khi đặt xe</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {importantInfo.afterBooking.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Trong khi nhận xe</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {importantInfo.duringRental.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {rentalItem.type === "car" && (
            <div className="p-4 bg-white border rounded-lg">
              <h3 className="text-lg font-bold mb-4">Dịch vụ phụ</h3>
              <div className="space-y-2">
                {availableServices.map((service) => (
                  <div
                    key={service.key}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{service.name}</span>
                    <div className="flex items-center">
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() => handleServiceChange(service.key, -1)}
                        disabled={services[service.key] === 0}
                      />
                      <div className="w-[35px] text-center">{services[service.key]}</div>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleServiceChange(service.key, 1)}
                        disabled={services[service.key] >= service.max}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-white border rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <EnvironmentOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
              <h2 className="text-lg font-bold">Điểm nhận xe</h2>
            </div>
            <div className="mb-4">
              <Radio.Group value={pickupLocation}>
                <Space direction="vertical">
                  <Radio value="office">Văn phòng thuê xe</Radio>
                  <Radio value="other">Địa điểm khác</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div className="mb-4">
              <Input
                value={returnAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Nhập địa chỉ"
                prefix={<SearchOutlined />}
              />
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <EnvironmentOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
              <h2 className="text-lg font-bold">Điểm trả xe</h2>
            </div>

            <div className="mb-4">
              <Radio.Group value={returnLocation}>
                <Space direction="vertical">
                  <Radio value="office">Văn phòng thuê xe</Radio>
                  <Radio value="other">Địa điểm khác</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div className="mb-4">
              <Input
                value={returnAddress}
                onChange={(e) => setReturnAddress(e.target.value)}
                placeholder="Nhập địa chỉ"
                prefix={<SearchOutlined />}
              />
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <div className="grid grid-cols-3 my-4">
              <div className="flex justify-start items-center">
                <p className="font-bold">Nhận xe</p>
              </div>
              
              <div></div>
              
              <div className="flex justify-end items-center">
                <p className="font-bold">Trả xe</p>
              </div>
            </div>
          </div>

          <Button
            type="primary"
            className="w-full bg-blue-600"
            onClick={handleBookingClick}
          >
            Tiếp tục
          </Button>
        </div>

        <div className="col-span-1">
          <div className="space-y-4">
            <div className="p-4 bg-white border rounded-lg">
              {`Bởi ${facilityItem.name}`}
              <div className="flex items-center space-x-2 my-2">
                <p className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-600 rounded-lg">
                  {facilityItem.reviews.average_rating.toFixed(1) || "N/A"}
                </p>
                <p className="text-xs">{facilityItem.reviews.total} lượt đánh giá</p>
              </div>
              <h3 className="font-semibold mt-4 mb-2">Top Reviews</h3>
              <div className="space-y-2">
                {facilityItem.reviews.comments.slice(0, 2).map((comment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">{comment.user}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, starIndex) => (
                          <span key={starIndex} className="mr-1">
                            {starIndex < comment.rating ? (
                              <StarFilled className="text-yellow-300" />
                            ) : (
                              <StarOutlined className="text-yellow-300" />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 p-4 bg-white border rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm font-bold">Giá thuê cơ bản</span>
                <span className="text-sm font-semibold">{rentalFacility?.price} ₫</span>
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
                <span className="text-lg font-bold">Tổng giá tiền</span>
                <span className="text-xl font-semibold">
                  {(rentalFacility?.price || 0) + totalServiceCost} ₫
                </span>
              </div>

              <Button
                type="primary"
                className="w-full bg-blue-600"
                onClick={handleBookingClick}
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VehicleDetail;
