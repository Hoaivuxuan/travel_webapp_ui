"use client";

import { useState } from "react";
import { rentalFacilities, vehicles } from "@/data/fakeData";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Radio, Input, Space, Button } from "antd";
import { importantInfo, policies, requirements } from "@/data/defaultValues";
import Image from "next/image";
import VehicleInfo from "./VehicleInfo";

const availableServices = [
  { key: "bonusDriver", name: "Tài xế phụ", max: 3 },
  { key: "babySeat", name: "Ghế em bé", max: 2 },
  { key: "childSeat", name: "Ghế trẻ em", max: 2 },
  { key: "gps", name: "GPS", max: 1 },
] as const;

type ServiceKeys = typeof availableServices[number]["key"];
type Services = Record<ServiceKeys, number>;

const VehicleDetail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "";
  const facilityId = params.get("facility") || "";
  const [services, setServices] = useState<Services>(() =>
    Object.fromEntries(availableServices.map((service) => [service.key, 0])) as Services
  );

  const [pickupLocation, setPickupLocation] = useState("other");
  const [returnLocation, setReturnLocation] = useState("other");
  const [pickupAddress, setPickupAddress] = useState("");
  const [returnAddress, setReturnAddress] = useState("");

  const rentalItem = vehicles.find((item) => item.id === Number(id));
  const facilityItem = rentalFacilities.find((item) => item.id === Number(facilityId));
  if (!rentalItem || !facilityItem) {
    return notFound();
  }

  const rentalFacility = rentalItem.rentalFacility.find((facility) => facility.id === Number(facilityId)) || undefined;
  const totalServiceCost = Object.values(services).reduce((sum, count) => sum + count * 300000, 0);
  const search = localStorage.getItem("searchVehicle");
  const searchObject = search ? JSON.parse(search) : null;

  const servicesJson = availableServices.map((service) => ({
    name: service.name,
    quantity: services[service.key],
    cost: services[service.key] * 300000,
  }));

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
    const query = new URLSearchParams({
      id: id.toString(),
      facility: facilityId.toString(),
      location: searchObject.location,
      pickup: format(searchObject.dateRange.pickupDate, "yyyy-MM-dd"),
      return: format(searchObject.dateRange.returnDate, "yyyy-MM-dd"),
    });

    router.push(`/rental/booking?url=2&${query.toString()}`);
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

            <div className="p-4 bg-white border-t space-y-4">
              <h3 className="text-lg font-bold mb-2">Chính sách thuê xe</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {policies.map((policy, index) => (
                  <li key={index}>{policy}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white border-t space-y-4">
              <h3 className="text-lg font-bold mb-2">Yêu cầu thuê xe</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white border-t space-y-4">
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
              <div className="flex items-center space-x-2 mb-4">
                <AppstoreAddOutlined className="text-[20px] text-blue-600" />
                <h2 className="text-lg font-bold">Dịch vụ bổ sung</h2>
              </div>
              <div className="space-y-2">
                {availableServices.map((service) => (
                  <div key={service.key} className="flex justify-between items-center">
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
              <EnvironmentOutlined className="text-[20px] text-blue-600" />
              <h2 className="text-lg font-bold">Điểm nhận xe</h2>
            </div>
            <div className="mb-4">
              <Radio.Group
                value={pickupLocation}
                onChange={(e) => {
                  const value = e.target.value;
                  setPickupLocation(value);
                  setPickupAddress(value === "office" ? facilityItem.headquarters : "");
                }}
              >
                <Space direction="vertical">
                  <Radio value="office">Văn phòng thuê xe</Radio>
                  <Radio value="other">Địa điểm khác</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div className="mb-4">
              <Input
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Tìm địa điểm..."
                prefix={
                  <SearchOutlined className="pr-2" />
                }
                readOnly={pickupLocation === "office"}
              />
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <EnvironmentOutlined className="text-[20px] text-blue-600" />
              <h2 className="text-lg font-bold">Điểm trả xe</h2>
            </div>
            <div className="mb-4">
              <Radio.Group
                value={returnLocation}
                onChange={(e) => {
                  const value = e.target.value;
                  setReturnLocation(value);
                  setReturnAddress(value === "office" ? facilityItem.headquarters : "");
                }}
              >
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
                placeholder="Tìm địa điểm..."
                prefix={
                  <SearchOutlined className="pr-2" />
                }
                readOnly={returnLocation === "office"}
              />
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <ClockCircleOutlined className="text-[20px] text-blue-600" />
              <h2 className="text-lg font-bold">Thời gian thuê xe</h2>
            </div>
            <div className="grid grid-cols-3 my-4">
              <div className="mr-auto text-left">
                <p className="font-bold">Nhận xe</p>
                <p className="text-sm">
                  {format(searchObject.dateRange.pickupDate, "dd-MM-yyyy")}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <p className="w-auto inline-block bg-blue-200 text-blue-600 rounded-lg px-3 py-1 text-sm">
                  6 ngày
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-bold">Trả xe</p>
                <p className="text-sm">
                  {format(searchObject.dateRange.returnDate, "dd-MM-yyyy")}
                </p>
              </div>
            </div>
          </div>

          <Button type="primary" className="w-full bg-blue-600" onClick={handleBookingClick}>
            Tiếp tục
          </Button>
        </div>

        <div className="col-span-1">
          <div className="space-y-4 sticky top-5">
            <div className="p-4 bg-white border rounded-lg">
              {`Bởi ${facilityItem.name}`}
              <div className="flex items-center space-x-2 my-2">
                <p className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-600 rounded-lg">
                  {facilityItem.reviews.averageRating.toFixed(1) || "N/A"}
                </p>
                <p className="text-xs">{facilityItem.reviews.total} lượt đánh giá</p>
              </div>
              <h3 className="font-semibold mt-8 mb-2">Top Reviews</h3>
              <div className="py-2">
                {facilityItem.reviews.comments.slice(-2).map((comment, index) => (
                  <div
                    key={index}
                    className={`py-2 border-t min-h-[100px] ${index === facilityItem.reviews.comments.slice(-2).length - 1 ? 'border-b' : ''}`}
                  >
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
                <span className="text-sm font-semibold">
                  {rentalFacility?.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                </span>
              </div>
              <div className="space-y-2">
                {servicesJson.map((service, index) => (
                  service.quantity > 0 && (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{service.quantity} x {service.name}</span>
                      <span className="text-sm">
                        {service.cost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </span>
                    </div>
                  )
                ))}
              </div>

              <div className="flex justify-between border-t pt-4">
                <span className="text-lg font-bold">Tổng giá tiền</span>
                <span className="text-xl font-semibold">
                  {((rentalFacility?.price || 0) + totalServiceCost)
                    .toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                </span>
              </div>

              <Button type="primary" className="w-full bg-blue-600" onClick={handleBookingClick}>
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
