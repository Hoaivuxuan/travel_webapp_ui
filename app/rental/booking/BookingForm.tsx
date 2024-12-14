import React from "react";
import countries from "@/data/SelectCountry.json";
import { Form, Input, Select, Button } from "antd";
import { encodeToJWT } from "@/utils/JWT";

type BookingFormProps = {
  params: any;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const BookingForm: React.FC<BookingFormProps> = ({ params, step, setStep }) => {
  const [form] = Form.useForm();

  const saveRentalVehicle = (values: any) => {
    const rentalVehicle = {
      vehicle: params.vehicle,
      facility: {
        id: params.facility.id,
        name: params.facility.name,
      },
      pickup: {
        location: params.pickupLocation,
        date: params.pickupDate,
      },
      return: {
        location: params.returnLocation,
        date: params.returnDate,
      },
      customerInfo: {
        fullName: values.fullName,
        email: values.email,
        phone: values.customerPhone,
        country: values.country || "Vietnam",
      },
      driverInfo: {
        fullName: values.driverFullName,
        phone: values.driverPhone,
      },
    };

    localStorage.setItem("rentalVehicle", JSON.stringify(rentalVehicle));
    localStorage.setItem("rentalVehicleToken", encodeToJWT(rentalVehicle));
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

  return (
    <Form form={form} layout="vertical" className="space-y-6">
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Thông tin liên hệ</h2>
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
            <Input placeholder="ví dụ: Nguyễn Văn A" />
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
            initialValue="Vietnam"
          >
            <Select placeholder="Chọn quốc gia">
              {countries.map((country, index) => (
                <Select.Option key={index} value={country.name}>
                  {country.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="p-4 bg-white border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Thông tin người lái xe chính</h2>
        <Form.Item
          label="Họ tên"
          name="driverFullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input placeholder="ví dụ: Nguyễn Văn A" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="driverPhone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ!" },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
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
