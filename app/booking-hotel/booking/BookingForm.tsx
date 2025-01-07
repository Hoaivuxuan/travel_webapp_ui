import React, { useState } from "react";
import Image from "next/image";
import listCountries from "@/data/SelectCountry.json"
import paymentMethods from "@/data/SelectPayment.json";
import { Form, Input, Select, Radio, Checkbox, Button, Modal } from "antd";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { format } from "date-fns";

type BookingFormProps = {
  params: any;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BookingForm: React.FC<BookingFormProps> = ({ params, step, setStep }) => {
  const [form] = Form.useForm();

  const initialValues = {
    whoBooking: "self",
    payment: "none",
    nearbyRooms: false,
    country: "Vietnam",
  };
  const [selectedPayment, setSelectedPayment] = useState(initialValues?.payment);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const saveBookingHotel = (values: any) => {
    const bookingHotel = {
      user: params.bookingHotel?.user?.id,
      hotel: params.bookingHotel?.hotel?.id,
      customerInfo: {
        fullName: values.fullName.toUpperCase(),
        email: values.email,
        phone: values.phone,
        country: listCountries.find((item) => item.name === (values.country || "Vietnam"))?.code,
      },
      checkinDate: format(new Date(params.bookingHotel?.booking?.dateRange.startDate), "yyyy-MM-dd"),
      checkoutDate: format(new Date (params.bookingHotel?.booking?.dateRange.endDate), "yyyy-MM-dd"),
      adults: Number(params.bookingHotel?.booking?.adults),
      children: Number(params.bookingHotel?.booking?.children),
      roomSelection: params.roomSelection,
      specialRequest: values.specialRequest || "",
      arrivalTime: values.arrivalTime || null,
      payment: values.payment,
    };

    localStorage.setItem("bookingHotel", JSON.stringify(bookingHotel));
  };

  const handleConfirm = () => {
    form.validateFields().then((values) => {
      saveBookingHotel(values);
      handleNextStep();
    });
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const showVNPayModal = () => {
    window.open(
      `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1200000&vnp_Command=pay&vnp_CreateDate=20250107104109&vnp_CurrCode=VND&vnp_ExpireDate=20250107105609&vnp_IpAddr=0%3A0%3A0%3A0%3A0%3A0%3A0%3A1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang%3A42475329&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A8080%2Fpayment%2Fvn-pay-callback&vnp_TmnCode=4ROYBF62&vnp_TxnRef=30799294&vnp_Version=2.1.0&vnp_SecureHash=840a46712063623c6b607ee2d247cb9b9758024acbee733fbfeb7767234022242d2bb50b1186894fff99eb4a791a28295df6d6b3c17d8e3ddc25c24a9905418b`,
      '_blank'
    );
    setIsModalVisible(true);
  };

  const handleVNPayModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} className="space-y-4">
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Nhập thông tin chi tiết của bạn</h2>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>
          <Form.Item label="Họ tên" name="fullName" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}>
            <Input
              placeholder="ví dụ: Nguyễn Văn A"
              style={{ textTransform: 'uppercase' }}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item label="Quốc gia" name="country" rules={[{ required: true }]}>
            <Select>
              {listCountries.map((country, index) => (
                <Select.Option key={index} value={country.name}>
                  <div className="flex items-center">
                    <Image
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                      alt={country.code}
                      width={24}
                      height={16}
                      className="mr-2 h-[16px] w-[24px]"
                    />
                    {country.name}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <hr className="mb-4" />
        <Form.Item label="Bạn đặt phòng cho ai?" name="whoBooking">
          <Radio.Group>
            <Radio value="self" className="block">
              Tôi là khách lưu trú chính
            </Radio>
            <Radio value="other" className="block">
              Đặt phòng này là cho người khác
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Bạn muốn thanh toán bằng cách nào?" name="payment">
          <Radio.Group onChange={(e) => setSelectedPayment(e.target.value)}>
            {paymentMethods.map((method) => (
              <Radio key={method.value} value={method.value} className="block">
                <span>{method.text}</span>
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </div>
      
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Các yêu cầu đặc biệt</h2>
        <Form.Item label="Yêu cầu đặc biệt (không bắt buộc)" name="specialRequest">
          <Input.TextArea rows={3} placeholder="Ví dụ: Yêu cầu phòng gần nhau, ăn chay..." />
        </Form.Item>
        <Form.Item name="nearbyRooms" valuePropName="checked">
          <Checkbox>Tôi muốn các phòng ở gần nhau (nếu có thể)</Checkbox>
        </Form.Item>
      </div>
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Thời gian đến của bạn</h2>
        <div className="flex items-center mb-2">
          <AiOutlineCheckCircle className="text-green-600 text-lg mr-2" />
          <p className="text-gray-700">
            Các phòng của bạn sẽ sẵn sàng để nhận trong khoảng từ 14:00 đến 00:00
          </p>
        </div>
        <Form.Item
          label="Thêm thời gian đến dự kiến của bạn (không bắt buộc)"
          name="arrivalTime"
        >
          <Select placeholder="Vui lòng chọn">
            <Select.Option value="14:00-15:00">14:00 - 15:00</Select.Option>
            <Select.Option value="15:00-16:00">15:00 - 16:00</Select.Option>
            <Select.Option value="16:00-17:00">16:00 - 17:00</Select.Option>
            <Select.Option value="17:00-18:00">17:00 - 18:00</Select.Option>
            <Select.Option value="18:00-19:00">18:00 - 19:00</Select.Option>
            <Select.Option value="19:00-20:00">19:00 - 20:00</Select.Option>
            <Select.Option value="20:00-21:00">20:00 - 21:00</Select.Option>
          </Select>
        </Form.Item>
        <p className="text-sm text-gray-500">Thời gian theo múi giờ của Hà Nội</p>
      </div>
      <div className="mt-4 flex justify-end">
        {selectedPayment === "none" ? (
          <Button
            type="primary"
            onClick={handleConfirm}
            className="bg-blue-600 text-white w-1/2 py-2 rounded"
          >
            Tiếp theo
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={showVNPayModal}
            className="bg-blue-600 text-white w-1/2 py-2 rounded"
          >
            Thanh toán
          </Button>
        )}
      </div>
      <Modal
        title="THÔNG TIN THANH TOÁN"
        visible={isModalVisible}
        onCancel={handleVNPayModalCancel}
        footer={null}
        width={500}
        centered
      >
        <div className="p-4 bg-white border rounded-lg">
          <h3 className="text-lg font-bold mb-4">Tóm tắt giá</h3>
          <div className="grid grid-cols-3 gap-2 text-sm my-2">
            <p className="col-span-2 font-bold">Giá phòng</p>
            <p>
              {`${params.roomSelection.totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}`}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm my-2">
            <p className="col-span-2 font-bold">Thuế và phí</p>
            <p>
              {`${params.tax.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}`}
            </p>
          </div>
          <hr className="my-1 border border-gray-200" />
          <div className="grid grid-cols-3 gap-2 text-sm my-2">
            <p className="col-span-2 font-bold">Tổng cộng</p>
            <p>
              {`${(params.roomSelection.totalPrice + params.tax).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}`}
            </p>
          </div>
        </div>
      </Modal>
    </Form>
  );
};

export default BookingForm;
