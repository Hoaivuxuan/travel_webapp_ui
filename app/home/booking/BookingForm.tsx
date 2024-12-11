import React from "react";
import countries from "@/data/SelectCountry.json";
import paymentMethods from "@/data/SelectPayment.json";
import { Form, Input, Select, Radio, Checkbox, Button } from "antd";
import { AiOutlineCheckCircle } from "react-icons/ai";

type BookingFormProps = {
  params: any;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BookingForm: React.FC<BookingFormProps> = ({ params, step, setStep }) => {
  const [form] = Form.useForm();

  const saveBookingHotel = (values: any) => {
    const bookingHotel = {
      user: params.bookingHotel?.user?.id,
      hotel: {
        name: params.bookingHotel?.hotel?.hotel_name,
        city: params.bookingHotel?.hotel?.city.name,
      },
      customerInfo: {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        country: values.country || "Vietnam",
      },
      checkinDate: params.bookingHotel?.booking?.dateRange.startDate,
      checkoutDate: params.bookingHotel?.booking?.dateRange.endDate,
      adults: Number(params.bookingHotel?.booking?.adults),
      children: Number(params.bookingHotel?.booking?.children),
      roomSelection: params.roomSelection,
      specialRequest: values.specialRequest || "",
      arrivalTime: values.arrivalTime || null,
      status: 0,
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

  return (
    <Form
      form={form}
      layout="vertical"
      className="space-y-4"
      initialValues={{
        country: "Vietnam",
        whoBooking: "self",
        payment: "none",
        nearbyRooms: false,
      }}
    >
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Nhập thông tin chi tiết của bạn</h2>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Họ tên" name="fullName" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}>
            <Input placeholder="ví dụ: Nguyễn Văn A" />
          </Form.Item>
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
          <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item label="Quốc gia" name="country" rules={[{ required: true }]}>
            <Select>
              {countries.map((country, index) => (
                <Select.Option key={index} value={country.name}>
                  {country.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <hr className="mb-4"></hr>
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
          <Radio.Group>
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
        <Button
          type="primary"
          onClick={handleConfirm}
          className="bg-blue-600 text-white w-1/2 py-2 rounded"
        >
          Tiếp theo
        </Button>
      </div>
    </Form>
  );
};

export default BookingForm;
