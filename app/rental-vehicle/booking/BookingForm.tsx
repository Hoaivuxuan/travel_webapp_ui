import React, { useState } from "react";
import listCountries from "@/data/SelectCountry.json";
import paymentMethods from "@/data/SelectPayment.json";
import Image from "next/image";
import { Form, Input, Select, Button, Radio } from "antd";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

type BookingFormProps = {
  params: any;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BookingForm: React.FC<BookingFormProps> = ({ params, step, setStep }) => {
  const [form] = Form.useForm();
  const [addDriversCount, setAddDriversCount] = useState(0);

  const initialValues = {
    additionalDrivers: Array.from({ length: addDriversCount }).map(() => ({ title: '', fullName: '', phone: '' })),
    payment: "none",
    country: "Vietnam",
  };

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
      status: 0,
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
    setAddDriversCount((prev) => prev + 1);
    const currentDrivers = form.getFieldValue("additionalDrivers") || [];
    form.setFieldsValue({
      additionalDrivers: [...currentDrivers, { title: '', fullName: '', phone: '' }],
    });
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
        <Button
          type="primary"
          onClick={handleNextStep}
          className="bg-blue-600 text-white w-1/2 py-2 rounded"
        >
          Tiếp theo
        </Button>
      </div>
    </Form>
  );
};

export default BookingForm;