import React from "react";

type BookingStepsProps = {
  step: number;
};

const BookingSteps: React.FC<BookingStepsProps> = ({ step }) => {
  return (
    <div className="my-4">
      <div className="flex space-x-4">
        <div className={`w-1/3 text-center ${step >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
          <span className="font-bold">Bước 1</span>
          <p>Chọn khách sạn</p>
        </div>
        <div className={`w-1/3 text-center ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
          <span className="font-bold">Bước 2</span>
          <p>Nhập thông tin</p>
        </div>
        <div className={`w-1/3 text-center ${step >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>
          <span className="font-bold">Bước 3</span>
          <p>Thanh toán và xác nhận</p>
        </div>
      </div>
      <div className="w-full h-1 bg-gray-200 mt-2">
        <div
          className={`h-full bg-blue-600 transition-all duration-500`}
          style={{ width: `${(step) * 33.33}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BookingSteps;
