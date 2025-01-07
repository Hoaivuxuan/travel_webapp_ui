import React, { useState } from "react";
import Image from "next/image";
import listCountries from "@/data/SelectCountry.json";
import paymentMethods from "@/data/SelectPayment.json";
import { Form, Input, Select, Radio, Checkbox, Button, Modal } from "antd";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PaymentService } from "@/services/CommonService";

type BookingFormProps = {
  paramsBookingTicket: any;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BookingForm: React.FC<BookingFormProps> = ({
  paramsBookingTicket,
  step,
  setStep,
}) => {
  const [form] = Form.useForm();
  const [selectedPayment, setSelectedPayment] = useState("none");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    whoBooking: "self",
    payment: "none",
    nearbyRooms: false,
    country: "Vietnam",
  };

  const showVNPayModal = async (price: any) => {
    const res = (await PaymentService.paymentByVNPay(price)).data;
    window.open(`${res.paymentUrl}`, "_blank");
    setIsModalVisible(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleConfirm();
    }, 15000);
  };

  const saveBookingTicket = (formValues: any, paramsBookingTicket: any) => {
    const bookingTicket = {
      user: paramsBookingTicket.user,
      full_name: formValues.fullName,
      email: formValues.email,
      phone: formValues.phone,
      country: formValues.country,
      booked_tickets: paramsBookingTicket.booked_tickets,
      totalPrice: Math.round(
        Number(paramsBookingTicket.booked_tickets_detail.price) *
          Number(paramsBookingTicket.booked_tickets[0].quantity) *
          1.1
      ),
    };
    localStorage.setItem("bookingTicket", JSON.stringify(bookingTicket));
  };

  const handleConfirm = () => {
    form.validateFields().then((values) => {
      saveBookingTicket(values, paramsBookingTicket);
      handleNextStep();
    });
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePaymentChange = (e: any) => {
    setSelectedPayment(e.target.value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      className="space-y-4"
    >
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          Nhập thông tin chi tiết của bạn
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
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
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Quốc gia"
            name="country"
            rules={[{ required: true }]}
          >
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
        <Form.Item label="Bạn muốn thanh toán bằng cách nào?" name="payment">
          <Radio.Group onChange={handlePaymentChange} value={selectedPayment}>
            {paymentMethods.map((method) => (
              <Radio key={method.value} value={method.value} className="block">
                <span>{method.text}</span>
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
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
