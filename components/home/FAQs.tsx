"use client";

import React, { useState } from "react";

interface FAQSectionProps {
  hotel: any;
}

const FAQSection: React.FC<FAQSectionProps> = ({ hotel }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      question: `Chi phí lưu trú tại ${hotel?.hotel_name} là bao nhiêu?`,
      answer: `Giá cả tại ${hotel?.hotel_name} có thể thay đổi tùy thuộc vào thời gian lưu trú của bạn (ví dụ: ngày bạn chọn, chính sách của khách sạn, v.v.). Hãy xem giá bằng cách nhập ngày bạn lưu trú.`,
    },
    {
      question: `${hotel?.hotel_name} cách trung tâm ${hotel?.city.name} bao xa?`,
      answer: `${hotel?.hotel_name} nằm cách trung tâm ${hotel?.city.name} khoảng 10 km.`,
    },
    {
      question: `Tôi có thể đặt loại phòng nào tại ${hotel?.hotel_name}?`,
      answer: `Phòng tại ${hotel?.hotel_name} bao gồm các lựa chọn tiêu chuẩn, cao cấp và hạng sang.`,
    },
    {
      question: `Có những hoạt động nào tại ${hotel?.hotel_name}?`,
      answer: `Khách lưu trú tại ${hotel?.hotel_name} có thể thưởng thức nhà hàng tại chỗ, các tiện ích spa, và tham quan các điểm đến gần đó.`,
    },
    {
      question: `Thời gian check-in và check-out tại ${hotel?.hotel_name} là khi nào?`,
      answer: `Thời gian check-in tại ${hotel?.hotel_name} bắt đầu từ ${hotel?.checkIn_time} và thời gian check-out là trước ${hotel?.checkOut_time}.`,
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-4 w-full border rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 focus:outline-none"
            >
              <span className="font-semibold">{faq.question}</span>
              <span className="float-right">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 border-t">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
