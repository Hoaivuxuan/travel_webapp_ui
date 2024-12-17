"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineDropbox, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { FaRegClock, FaStar, FaRegStar } from "react-icons/fa";
import { Radio, Input, Space, Button, Modal, Select, AutoComplete, Rate } from "antd";
import { importantInfo, policies, requirements } from "@/data/defaultValues";
import Image from "next/image";
import VehicleDetailInfo from "./VehicleInfo";
import { decodeToJWT, encodeToJWT } from "@/utils/JWT";

const VehicleDetail = () => {
  const router = useRouter();
  const [pickupOption, setPickupOption] = useState("other");
  const [returnOption, setReturnOption] = useState("other");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [listOffice, setListOffice] = useState<any>([]);
  const [listAttraction, setListAttraction] = useState<any>([]);
  const [listAccessory, setListAccessory] = useState<any>([]);
  const [services, setServices] = useState<Record<string, number>>({});
  const [pickupSuggestions, setPickupSuggestions] = useState<any>([]);
  const [returnSuggestions, setReturnSuggestions] = useState<any>([]);
  const [isViewReviewModalVisible, setIsViewReviewModalVisible] = useState(false);
  const [isSendReviewModalVisible, setIsSendReviewModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const params = useSearchParams();
  const rentalVehicle = decodeToJWT(params.get("rentalVehicle") || "");
  const facilityId = Number(params.get("facility") || "");
  const vehicleItem: any = rentalVehicle?.vehicle;
  const facility: any = vehicleItem?.facilities?.find((item: any) => item.id === facilityId);

  const search = localStorage.getItem("searchVehicle");
  const searchObject = search ? JSON.parse(search) : null;

  useEffect(() => {
    const fetchOffice = async () => {
      const bearerToken = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/attraction/office?city=${rentalVehicle.location.id}&rental=${facilityId}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        const data = await response.json();
        setListOffice(data);
      } catch (error) {
        console.error("Error fetching office data:", error);
      }
    };

    const fetchAttraction = async () => {
      const bearerToken = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/attraction/not-office?city=${rentalVehicle.location.id}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        const data = await response.json();
        setListAttraction(data);
      } catch (error) {
        console.error("Error fetching attraction data:", error);
      }
    };

    const fetchAccessory = async () => {
      const bearerToken = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/accessory?type=${vehicleItem.type}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        const data = await response.json();
        setListAccessory(data);
      } catch (error) {
        console.error("Error fetching accessory data:", error);
      }
    };

    fetchOffice();
    fetchAttraction();
    fetchAccessory();
  }, [facilityId, rentalVehicle.location.id, vehicleItem.type]);

  useEffect(() => {
    if (listAccessory.length > 0) {
      setServices(
        listAccessory.reduce((acc: Record<string, number>, accessory: any) => {
          acc[accessory.name] = 0;
          return acc;
        }, {})
      );
    }
  }, [listAccessory]);

  const handlePickupSearch = (value: string) => {
    setPickupLocation(value);
    if (value && listAttraction.length > 0) {
      const filteredSuggestions = listAttraction.filter((attraction: any) =>
        attraction.name.toLowerCase().includes(value.toLowerCase())
      );
      setPickupSuggestions(filteredSuggestions);
    } else {
      setPickupSuggestions([]);
    }
  };

  const handleReturnSearch = (value: string) => {
    setReturnLocation(value);
    if (value && listAttraction.length > 0) {
      const filteredSuggestions = listAttraction.filter((attraction: any) =>
        attraction.name.toLowerCase().includes(value.toLowerCase())
      );
      setReturnSuggestions(filteredSuggestions);
    } else {
      setReturnSuggestions([]);
    }
  };

  const handleServiceChange = (serviceName: string, amount: number) => {
    setServices((prev) => {
      const currentCount = prev[serviceName] || 0;
      const maxLimit = listAccessory.find((s: any) => s.name === serviceName)?.max || Infinity;
      const newCount = Math.max(0, Math.min(currentCount + amount, maxLimit));
      return {
        ...prev,
        [serviceName]: newCount,
      };
    });
  };

  const handleOpenViewReviewModal = () => {
    setIsViewReviewModalVisible(true);
  };

  const handleCloseViewReviewModal = () => {
    setIsViewReviewModalVisible(false);
  };

  const handleOpenSendReviewModal = () => {
    setIsSendReviewModalVisible(true);
  };

  const handleCloseSendReviewModal = () => {
    setIsSendReviewModalVisible(false);
    setRating(0);
    setComment("");
  };

  const handleSendReviewModal = () => {
    console.log(`Đánh giá: ${rating}, Nhận xét: ${comment}`);
    setRating(0);
    setComment("");
  };

  const bonusServices = listAccessory
    .map((service: any) => ({
      name: service.name,
      count: Number(services[service.name] || 0),
      cost: Number((services[service.name] || 0) * service.price),
    }))
    .filter((service: any) => service.count > 0);
  
  const totalServiceCost = bonusServices.reduce(
    (sum: number, service: { cost: number }) => sum + (service.cost || 0),
    0
  );

  const handleBookingClick = () => {
    const booking = {
      pickup: {
        location: pickupLocation,
        date: format(searchObject.dateRange.pickupDate, "yyyy-MM-dd"),
      },
      return: {
        location: returnLocation,
        date: format(searchObject.dateRange.returnDate, "yyyy-MM-dd"),
      },
      bonusServices,
      totalServiceCost,
    };

    const { facilities, ...vehicle } = vehicleItem;
    const bookingVehicle = { vehicle, facility, booking };
    router.push(`/rental/booking?rental=${encodeToJWT(bookingVehicle)}`);
  };

  return (
    <div>
      <div className="p-6 !pb-2 mx-auto max-w-7xl">
        <Button
          type="primary"
          className="bg-blue-600"
          onClick={() => { router.back() }}
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
                    alt={`Image of VEHICLE`}
                    className="rounded-l-lg h-full w-auto"
                    width={300}
                    height={300}
                  />
                </div>
                <div>
                  <div className="pb-4">
                    <h1 className="text-2xl font-bold">{vehicleItem.model}</h1>
                    <p className="text-gray-500 text-sm">
                      Cung cấp bởi {facility.name}
                    </p>
                  </div>
                  <VehicleDetailInfo type={vehicleItem.type} details={vehicleItem.details} />
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

          <div className="p-4 bg-white border rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <AiOutlineDropbox className="text-[20px] text-blue-600" />
              <h2 className="text-lg font-bold">Dịch vụ bổ sung</h2>
            </div>
            <div className="space-y-2">
              {listAccessory.map((service: any) => (
                <div key={service.name} className="flex justify-between items-center">
                  <span className="text-sm">{service.name}</span>
                  <div className="flex items-center">
                    <Button
                      icon={<AiOutlineMinus className="text-lg" />}
                      onClick={() => handleServiceChange(service.name, -1)}
                      disabled={services[service.name] === 0}
                    />
                    <div className="w-[35px] text-center">{services[service.name]}</div>
                    <Button
                      icon={<AiOutlinePlus className="text-lg" />}
                      onClick={() => handleServiceChange(service.name, 1)}
                      disabled={services[service.name] >= service.max_value}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <IoLocationOutline className="text-[20px] text-blue-600" />
              <h2 className="text-lg font-bold">Điểm nhận xe</h2>
            </div>
            <div className="mb-4">
              <Radio.Group
                value={pickupOption}
                onChange={(e) => {
                  const value = e.target.value;
                  setPickupOption(value);
                  setPickupLocation("");
                }}
              >
                <Space direction="vertical">
                  <Radio value="office">Văn phòng thuê xe</Radio>
                  <Radio value="other">Địa điểm khác</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div className="mb-4">
            {pickupOption === "office" ? (
              <Select
                value={pickupLocation}
                className="w-full"
                onChange={(value) => setPickupLocation(value)}
                placeholder="Chọn văn phòng"
                options={listOffice.map((office: any) => ({
                  value: office.name,
                  label: office.name,
                }))}
              />
            ) : (
              <AutoComplete
                value={pickupLocation}
                className="w-full"
                onSearch={handlePickupSearch}
                onChange={handlePickupSearch}
                options={pickupSuggestions.map((suggestion: any) => ({
                  value: suggestion.name,
                }))}
              >
                <Input
                  value={pickupLocation}
                  className="w-full"
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Tìm địa điểm..."
                  prefix={<FaSearch className="text-xl pr-2" />}
                />
              </AutoComplete>
            )}
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <IoLocationOutline className="text-[20px] text-blue-600" />
              <h2 className="text-lg font-bold">Điểm trả xe</h2>
            </div>
            <div className="mb-4">
              <Radio.Group
                value={returnOption}
                onChange={(e) => {
                  const value = e.target.value;
                  setReturnOption(value);
                  setReturnLocation("");
                }}
              >
                <Space direction="vertical">
                  <Radio value="office">Văn phòng thuê xe</Radio>
                  <Radio value="other">Địa điểm khác</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div className="mb-4">
              {returnOption === "office" ? (
                <Select
                  value={returnLocation}
                  className="w-full"
                  onChange={(value) => setReturnLocation(value)}
                  placeholder="Chọn văn phòng"
                  options={listOffice.map((office: any) => ({
                    value: office.name,
                    label: office.name,
                  }))}
                />
              ) : (
                <AutoComplete
                  value={returnLocation}
                  className="w-full"
                  onSearch={handleReturnSearch}
                  onChange={(value) => handleReturnSearch(value)}
                  options={returnSuggestions.map((suggestion: any) => ({
                    value: suggestion.name,
                  }))}
                >
                  <Input
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                    placeholder="Tìm địa điểm..."
                    prefix={<FaSearch className="text-xl pr-2" />}
                  />
                </AutoComplete>
              )}
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <FaRegClock className="text-[20px] text-blue-600" />
              <h2 className="text-lg font-bold">Thời gian thuê xe</h2>
            </div>
            <div className="grid grid-cols-3 my-4">
              <div className="mr-auto text-left">
                <p className="font-bold">Nhận xe</p>
                <p className="text-sm">
                  {format(searchObject.dateRange.pickupDate, "dd/MM/yyyy")}
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
                  {format(searchObject.dateRange.returnDate, "dd/MM/yyyy")}
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
            <div className="p-4 bg-white border rounded-lg flex flex-col">
              <div className="flex items-center justify-center">
                <p className="mb-2 flex items-center justify-center flex-shrink-0 w-[60px] h-[60px] text-3xl font-bold text-white bg-blue-600 rounded-sm">
                  {facility.name.charAt(0).toUpperCase()}
                </p>
              </div>
              <div className="text-sm pb-3">{`Bởi ${facility.name}`}</div>
              <div className="flex items-center space-x-2 my-2">
                <p className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-600 rounded-lg">
                  {facility.reviewResponse.average_rating.toFixed(1) || "N/A"}
                </p>
                <p className="text-xs">{facility.reviewResponse.total_reviews} lượt đánh giá</p>
              </div>
              <div className="mt-auto">
                <h3 className="font-semibold mt-8 mb-2">Top Reviews</h3>
                <div
                  className="py-2"
                  onClick={handleOpenViewReviewModal}
                >
                  {facility.reviewResponse.comments.slice(-2).map((comment: any, index: number) => (
                    <div
                      key={index}
                      className={`py-2 border-t min-h-[100px] ${index === facility.reviewResponse.comments.slice(-2).length - 1 ? 'border-b' : ''}`}
                    >
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-semibold">{comment.user}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, starIndex) => (
                            <span key={starIndex} className="mr-1">
                              {starIndex < comment.rating ? (
                                <FaStar className="text-yellow-300" />
                              ) : (
                                <FaRegStar className="text-yellow-300" />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{comment.comment}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2" onClick={handleOpenSendReviewModal}>
                  <Input placeholder="Đánh giá của bạn" readOnly />
                  <Button type="primary" className="bg-blue-600">
                    Viết đánh giá
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 p-4 bg-white border rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm font-bold">Giá thuê cơ bản</span>
                <span className="text-sm font-semibold">
                  {facility?.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                </span>
              </div>
              <div className="space-y-2">
                {bonusServices.map((service: any, index: number) => (
                  service.count > 0 && (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{service.count} x {service.name}</span>
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
                  {((facility?.price + totalServiceCost)).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                </span>
              </div>

              <Button type="primary" className="w-full bg-blue-600" onClick={handleBookingClick}>
                Tiếp tục
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Modal
        title="Top Reviews"
        visible={isViewReviewModalVisible}
        onCancel={handleCloseViewReviewModal}
        footer={null}
        centered
      >
        <div className="py-2 max-h-[400px] overflow-y-auto">
          {facility.reviewResponse.comments.map((comment: any, index: number) => (
            <div
              key={index}
              className={`py-2 border-t min-h-[100px] ${index === facility.reviewResponse.comments.length - 1 ? 'border-b' : ''}`}
            >
              <div className="flex justify-between mb-2">
                <p className="font-semibold">{comment.user}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, starIndex) => (
                    <span key={starIndex} className="mr-1">
                      {starIndex < comment.rating ? (
                        <FaStar className="text-yellow-300" />
                      ) : (
                        <FaRegStar className="text-yellow-300" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm">{comment.comment}</p>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        title="Đánh giá"
        visible={isSendReviewModalVisible}
        onCancel={handleCloseSendReviewModal}
        centered
        footer={[
          <Button key="cancel" onClick={handleCloseSendReviewModal}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" className="bg-green-600" onClick={handleSendReviewModal}>
            Gửi đánh giá
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <Rate
            value={rating}
            onChange={setRating}
            className="text-xl"
          />
          <Input.TextArea
            placeholder="Nhập nội dung nhận xét..."
            rows={4}
            className="w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default VehicleDetail;
