import React, { useState } from "react";
import listCountries from "@/data/SelectCountry.json";
import paymentMethods from "@/data/SelectPayment.json";
import Image from "next/image";
import { Form, Input, Select, Button, Radio, Modal } from "antd";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

type BookingFormProps = {
  params: any;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BookingForm: React.FC<BookingFormProps> = ({ params, step, setStep }) => {
  const [form] = Form.useForm();
  const [addDriversCount, setAddDriversCount] = useState(0);

  const initialValues = {
    additionalDrivers: Array.from({ length: addDriversCount }).map(() => ({ 
      title: '',
      fullName: ('').toUpperCase(),
      phone: '' 
    })),
    payment: "none",
    country: "Vietnam",
  };
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState(initialValues?.payment);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveRentalVehicle = (values: any) => {
    const userId = Number(localStorage.getItem("userId"));
    if(!userId) return;
    
    const rentalVehicle = {
      user: userId,
      vehicle: params.vehicle.id,
      facility: params.facility.id,
      pickup: {
        location: params.pickupLocation,
        date: params.pickupDate,
      },
      return: {
        location: params.returnLocation,
        date: params.returnDate,
      },
      accessory_booking: params.bonusServices.map((service: any) => {
        const { name, ...rest } = service;
        return rest;
      }),
      customerInfo: {
        fullName: values.fullName.toUpperCase(),
        email: values.email,
        phone: values.customerPhone,
        country: listCountries.find((item) => item.name === (values.country || "Vietnam"))?.code,
      },
      driverInfo: [
        {
          title: Number(values.driverTitle),
          fullName: values.driverFullName.toUpperCase(),
          phone: values.driverPhone,
        },
        ...(values.additionalDrivers || []),
      ],
      payment: values.payment,
    };

    localStorage.setItem("rentalVehicle", JSON.stringify(rentalVehicle));
  };

  const handleNextStep = () => {
    form
      .validateFields()
      .then((values) => {
        saveRentalVehicle(values);
        setStep((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const addAdditionalDriver = () => {
    if(addDriversCount < 3){
      setAddDriversCount((prev) => prev + 1);
      const currentDrivers = form.getFieldValue("additionalDrivers") || [];
      form.setFieldsValue({
        additionalDrivers: [...currentDrivers, { title: '', fullName: '', phone: '' }],
      });
    }
  };

  const removeAdditionalDriver = (index: number) => {
    if (index === addDriversCount - 1) {
      setAddDriversCount((prev) => prev - 1);
      const currentDrivers = form.getFieldValue("additionalDrivers") || [];
      form.setFieldsValue({
        additionalDrivers: currentDrivers.filter((_: any, i: number) => i !== index),
      });
    }
  };

  const showVNPayModal = () => {
    window.open(
      `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1200000&vnp_Command=pay&vnp_CreateDate=20250107104109&vnp_CurrCode=VND&vnp_ExpireDate=20250107105609&vnp_IpAddr=0%3A0%3A0%3A0%3A0%3A0%3A0%3A1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang%3A42475329&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A8080%2Fpayment%2Fvn-pay-callback&vnp_TmnCode=4ROYBF62&vnp_TxnRef=30799294&vnp_Version=2.1.0&vnp_SecureHash=840a46712063623c6b607ee2d247cb9b9758024acbee733fbfeb7767234022242d2bb50b1186894fff99eb4a791a28295df6d6b3c17d8e3ddc25c24a9905418b`,
      '_blank'
    );
    setIsModalVisible(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleNextStep();
    }, 15000);
  };

  const handleVNPayModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} className="space-y-6">
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">THÔNG TIN KHÁCH HÀNG</h2>
        <div className="grid grid-cols-2 gap-2">
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
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input
              placeholder="ví dụ: Nguyễn Văn A"
              style={{ textTransform: 'uppercase' }}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
            />
          </Form.Item>
          <Form.Item
            label="Điện thoại"
            name="customerPhone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ!" },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Quốc gia"
            name="country"
          >
            <Select placeholder="Chọn quốc gia">
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
        <h2 className="text-xl font-bold mb-4">THÔNG TIN LÁI XE</h2>
        <div className="flex space-x-2">
          <Form.Item
            label="Danh xưng"
            name="driverTitle"
            className="w-1/4"
          >
            <Select placeholder="Chọn">
              <Select.Option value="1">Ông</Select.Option>
              <Select.Option value="0">Bà</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Họ tên"
            name="driverFullName"
            className="w-1/2"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input
              placeholder="ví dụ: Nguyễn Văn A"
              style={{ textTransform: 'uppercase' }}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
            />
          </Form.Item>
          <Form.Item
            label="Điện thoại"
            className="w-1/4"
            name="driverPhone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ!" },
            ]}
          >
            <Input placeholder="Số điện thoại"  />
          </Form.Item>
        </div>

        {Array.from({ length: addDriversCount }).map((_, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <Form.Item
              label="Danh xưng"
              name={["additionalDrivers", index, "title"]}
              className="w-1/4"
            >
              <Select placeholder="Chọn">
                <Select.Option value="1">Ông</Select.Option>
                <Select.Option value="0">Bà</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Họ tên"
              className="w-1/2"
              name={["additionalDrivers", index, "fullName"]}
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input
                placeholder="ví dụ: Nguyễn Văn A"
                style={{ textTransform: 'uppercase' }}
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                }}
              />
            </Form.Item>
            <Form.Item
              label="Điện thoại"
              className="w-1/4"
              name={["additionalDrivers", index, "phone"]}
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ!" },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </div>
        ))}

        <div className="flex justify-end space-x-2 mb-4">
          <Button type="dashed" onClick={() => removeAdditionalDriver(addDriversCount - 1)}>
            <AiOutlineDelete className="text-sm" /> Loại bỏ
          </Button>
          <Button type="dashed" onClick={addAdditionalDriver}>
            <AiOutlinePlusCircle className="text-sm" />Thêm lái xe
          </Button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        {selectedPayment === "none" ? (
          <Button
            type="primary"
            onClick={handleNextStep}
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
        <div className="space-y-2 mt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Phí thuê xe</span>
            <span className="text-gray-700">
              {params?.facility?.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Dịch vụ khác</span>
            <span className="text-gray-700">
              {params?.totalServiceCost.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
            </span>
          </div>

          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span className="text-gray-700">Giá cho 4 ngày</span>
            <span className="text-gray-700">
              {((params?.facility?.price + params?.totalServiceCost) || 0)
                .toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
            </span>
          </div>
        </div>
        <Button
          type="primary"
          loading={loading}
          className="bg-blue-600 text-white w-full mt-4 py-2 rounded"
        >
          Đang xử lý thanh toán
        </Button>
      </Modal>
    </Form>
  );
};

export default BookingForm;