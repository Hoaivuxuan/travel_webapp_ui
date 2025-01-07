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

  // const saveBookingHotel = (values: any) => {
  //   const bookingHotel = {
  //     user: params.bookingHotel?.user?.id,
  //     hotel: params.bookingHotel?.hotel?.id,
  //     customerInfo: {
  //       fullName: values.fullName,
  //       email: values.email,
  //       phone: values.phone,
  //       country: listCountries.find(
  //         (item) => item.name === (values.country || "Vietnam")
  //       )?.code,
  //     },
  //     checkinDate: params.bookingHotel?.booking?.dateRange.startDate,
  //     checkoutDate: params.bookingHotel?.booking?.dateRange.endDate,
  //     adults: Number(params.bookingHotel?.booking?.adults),
  //     children: Number(params.bookingHotel?.booking?.children),
  //     roomSelection: params.roomSelection,
  //     specialRequest: values.specialRequest || "",
  //     arrivalTime: values.arrivalTime || null,
  //     status: 0,
  //   };

  //   localStorage.setItem("bookingHotel", JSON.stringify(bookingHotel));
  // };

  const showVNPayModal = async (price: any) => {
    const res = (await PaymentService.paymentByVNPay(price)).data;
    console.log("check res:", res);
    window.open(`${res.paymentUrl}`, "_blank");
    setIsModalVisible(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleConfirm();
    }, 15000);
  };

  const handleVNPayModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    form.validateFields().then((values) => {
      // saveBookingHotel(values);
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
    <>
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
                <Radio
                  key={method.value}
                  value={method.value}
                  className="block"
                >
                  <span>{method.text}</span>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="mt-4 flex justify-end">
          {selectedPayment === "vnpay" ? (
            <Button
              type="primary"
              onClick={() =>
                showVNPayModal(
                  Math.round(
                    Number(paramsBookingTicket.booked_tickets_detail.price) *
                      Number(paramsBookingTicket.booked_tickets[0].quantity) *
                      1.1
                  )
                )
              }
              className="bg-blue-600 text-white w-1/2 py-2 rounded"
            >
              Thanh toán
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleConfirm}
              className="bg-blue-600 text-white w-1/2 py-2 rounded"
            >
              Tiếp theo
            </Button>
          )}
        </div>
      </Form>
      <Modal
        title="THÔNG TIN THANH TOÁN"
        visible={isModalVisible}
        onCancel={handleVNPayModalCancel}
        footer={null}
        width={500}
        centered
      >
        <div className="space-y-4">
          <div className="p-4 bg-white border rounded-lg">
            <div className="grid grid-cols-3 gap-2 text-sm my-2">
              <p className="col-span-2 font-bold">Loại vé:</p>
              <span>{paramsBookingTicket.booked_tickets_detail.name}</span>
              <p className="col-span-2 font-bold">Giá vé:</p>
              <span>
                {new Intl.NumberFormat("vi-VN").format(
                  Number(paramsBookingTicket.booked_tickets_detail.price)
                )}{" "}
                VND
              </span>
              <p className="col-span-2 font-bold"> Số lượng:</p>
              <span>{paramsBookingTicket.booked_tickets[0].quantity} vé</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm my-2">
              <p className="col-span-2 font-bold">Thuế và phí(VAT 10%):</p>
              <span>
                {new Intl.NumberFormat("vi-VN").format(
                  Number(paramsBookingTicket.booked_tickets_detail.price) *
                    Number(paramsBookingTicket.booked_tickets[0].quantity) *
                    0.1
                )}{" "}
                VND
              </span>
            </div>
            <hr className="my-1 border border-gray-200" />
            <div className="grid grid-cols-3 gap-2 text-sm my-2">
              <p className="col-span-2 font-bold">Tổng cộng</p>
              <span>
                {new Intl.NumberFormat("vi-VN").format(
                  Number(paramsBookingTicket.booked_tickets_detail.price) *
                    Number(paramsBookingTicket.booked_tickets[0].quantity) *
                    1.1
                )}{" "}
                VND
              </span>
            </div>
          </div>
          <Button
            type="primary"
            loading={isLoading}
            className="bg-blue-600 text-white w-full mt-4 py-2 rounded"
          >
            Đang xử lý thanh toán
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default BookingForm;
