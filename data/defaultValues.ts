import { FaCar, FaMotorcycle } from "react-icons/fa";

export const policies = [
  "Sử dụng tới 24 giờ mỗi ngày thuê",
  "Trả xe với cùng mức nhiên liệu khi nhận",
];

export const requirements = [
  "Thẻ căn cước công dân còn hiệu lực (Chứng minh nhân dân hoặc Hộ chiếu)",
  "Giấy phép lái xe/Giấy phép lái xe quốc tế còn hiệu lực",
];

export const importantInfo = {
  beforeBooking: [
    "Đảm bảo đọc tất cả các yêu cầu cho thuê",
  ],
  afterBooking: [
    "Nhà cung cấp dịch vụ cho thuê sẽ liên hệ với tài xế thông qua WhatsApp để yêu cầu chụp ảnh các tài liệu cần thiết.",
  ],
  duringRental: [
    "Mang theo CMND, bằng lái xe và các giấy tờ khác theo yêu cầu của nhà cung cấp dịch vụ cho thuê.",
    "Khi bàn giao nhân viên cho thuê, hãy cùng nhân viên kiểm tra tình trạng xe.",
    "Sau đó, đọc và ký vào hợp đồng thuê.",
  ],
};

export const hotelOptions = [
  "Bao gồm bữa sáng tuyệt vời",
  "Không hoàn tiền",
  "Thanh toán cho chỗ nghỉ trước khi đến",
];

export const statusTags = [
  { id: 0, text: "DONE", color: "green" },
  { id: 1, text: "PENDING", color: "orange" },
  { id: 2, text: "CANCEL", color: "red" },
];

export const roleTags = [
  { role: "ADMIN", color: "red" },
  { role: "USER", color: "blue" },
];

export const typeVehicleTags = [
  { type: "car", color: "red", icon: FaCar },
  { type: "motor", color: "green", icon: FaMotorcycle },
];