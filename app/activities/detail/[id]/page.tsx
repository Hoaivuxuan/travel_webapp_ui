"use client";

import React, { useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import Image from "next/image";

const ActivitiesDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState("CN 3 Tháng 11");
    const [selectedTime, setSelectedTime] = useState("16:10");
    const tickets = [
        {
            type: "Deluxe Ticket",
            price: "€6.90",
            cancelPolicy:
                "Hủy miễn phí trước 20:00 18 tháng 11 để được hoàn tiền đầy đủ",
        },
        {
            type: "VIP Ticket",
            price: "€9.15",
            cancelPolicy:
                "Hủy miễn phí trước 20:00 18 tháng 11 để được hoàn tiền đầy đủ",
        },
        {
            type: "Show Ticket + Multilingual Audio Guide",
            price: "€9.89",
            cancelPolicy:
                "Hủy miễn phí trước 20:00 18 tháng 11 để được hoàn tiền đầy đủ",
        },
    ];

    return (
        <div className="pb-6">
            <div className="p-6 !pb-3 mx-auto max-w-7xl">
                <a
                    href="#"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400 transition duration-150"
                    onClick={(e) => {
                        e.preventDefault();
                        router.back();
                    }}
                >
                    Quay lại trang trước
                </a>
            </div>
            <div className="p-6 mx-auto max-w-7xl">
                <div className="text-gray-500">
                    <a href="#" className="hover:underline">
                        Trang chủ
                    </a>{" "}
                    {">"}
                    <a href="#" className="hover:underline">
                        Các địa điểm tham quan
                    </a>{" "}
                    {">"}
                    Buổi biểu diễn múa rối nước Thăng Long
                </div>

                <h1 className="text-3xl font-bold mt-2">
                    Buổi biểu diễn múa rối nước Thăng Long
                </h1>
                <p className="text-blue-600 mt-1">Bán chạy #1 ở Hà Nội</p>

                <div className="flex mt-6">
                    <div className="w-2/3">
                        <Image
                            src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153554304.jpg?k=c4f7d09fa35799ed21178297bd8c6c0bf349d0002eefaec21aff476e3b8012f3&o="
                            alt="Water Puppet Show"
                            className="w-full rounded"
                        />
                    </div>

                    <div className="w-1/3 flex flex-col space-y-2 ml-4">
                        <Image
                            src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153554304.jpg?k=c4f7d09fa35799ed21178297bd8c6c0bf349d0002eefaec21aff476e3b8012f3&o="
                            alt="Thumbnail 1"
                            className="w-full rounded"
                        />
                        <Image
                            src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153554304.jpg?k=c4f7d09fa35799ed21178297bd8c6c0bf349d0002eefaec21aff476e3b8012f3&o="
                            alt="Thumbnail 2"
                            className="w-full rounded"
                        />
                        <Image
                            src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153554304.jpg?k=c4f7d09fa35799ed21178297bd8c6c0bf349d0002eefaec21aff476e3b8012f3&o="
                            alt="Thumbnail 3"
                            className="w-full rounded"
                        />
                    </div>
                </div>
                <div className="text-sm col-span-8 bg-white rounded-lg mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">Bạn cần đến nhận vé</h2>
                            <p className="text-gray-700 mt-2">
                                Trải nghiệm này sẽ mang đến cho bạn cơ hội khám phá nghệ thuật
                                múa rối nước xa xưa ở Hà Nội. Bạn sẽ ghé thăm nhà hát múa rối
                                nước Thăng Long...
                            </p>
                            <p className="mt-4 text-gray-500">
                                Vui lòng có mặt ít nhất 15 phút trước khi hoạt động bắt đầu.
                            </p>
                            <h2 className="text-xl font-semibold mt-10">
                                Đánh giá của khách hàng
                            </h2>
                            <div className="text-lg font-semibold">
                                4.5 - Tuyệt vời (970 đánh giá)
                            </div>
                            <div className="space-y-2 mt-4">
                                {[
                                    "Đáng giá tiền",
                                    "Chất lượng dịch vụ",
                                    "Tiện nghi",
                                    "Dễ tiếp cận",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        <span className="w-1/3">{item}</span>
                                        <div className="w-2/3 bg-gray-200 rounded-full h-2.5 relative">
                                            <div
                                                className="absolute bg-yellow-500 h-2.5 rounded-full"
                                                style={{
                                                    width: `${[4.6, 4.5, 4.5, 4.7][index] * 20}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="ml-2">{[4.6, 4.5, 4.5, 4.7][index]}</span>
                                    </div>
                                ))}
                            </div>
                            <h2 className="text-xl font-semibold mt-10">
                                Điều khách yêu thích nhất
                            </h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        user: "Hong - Việt Nam",
                                        comment:
                                            "Độc đáo, thú vị, là nơi có thể đưa bạn bè người thân giải trí cuối tuần",
                                        date: "06 tháng 3, 2024",
                                    },
                                    {
                                        user: "Ny - Việt Nam",
                                        comment:
                                            "Mình đến muộn vì tắc đường nhưng vẫn được các bạn hỗ trợ nhiệt tình...",
                                        date: "16 tháng 3, 2023",
                                    },
                                ].map((review, index) => (
                                    <div key={index} className="p-4 bg-gray-100 rounded shadow">
                                        <div className="font-bold">{review.user}</div>
                                        <p className="text-gray-700">{review.comment}</p>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Quy định */}
                            <h2 className="text-xl font-semibold mt-10">Quy định</h2>
                            <ul className="list-disc pl-6 text-gray-700">
                                <li>
                                    Vui lòng có mặt ít nhất 15 phút trước khi hoạt động bắt đầu.
                                </li>
                            </ul>

                            {/* Thông tin thêm */}
                            <h2 className="text-xl font-semibold mt-10">Thông tin thêm</h2>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                <li>Vui lòng mang theo vé đến điểm tham quan.</li>
                                <li>
                                    Lưu ý rằng nhà cung cấp có thể hủy vì những lý do không biết
                                    trước.
                                </li>
                                <li>Bạn cần phải từ 18 tuổi trở lên để đặt chỗ.</li>
                                <li>Điều hành bởi Klook.</li>
                            </ul>
                        </div>
                        {/*  */}
                        <div className="bg-white p-4 rounded shadow">
                            <div className="">
                                <h2 className="text-xl font-semibold">Vé và giá</h2>
                                <h3 className="text-lg font-medium">Chọn ngày giờ</h3>
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        className={`py-2 px-4 rounded ${selectedDate === "CN 3 Tháng 11" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                        onClick={() => setSelectedDate("CN 3 Tháng 11")}
                                    >
                                        CN 3 Tháng 11
                                    </button>
                                    <button
                                        className={`py-2 px-4 rounded ${selectedDate === "Th 3 5 Tháng 11" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                        onClick={() => setSelectedDate("Th 3 5 Tháng 11")}
                                    >
                                        Th 3 5 Tháng 11
                                    </button>
                                </div>

                                <div className="flex space-x-2 mt-4">
                                    <button
                                        className={`py-2 px-4 rounded ${selectedTime === "16:10" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                        onClick={() => setSelectedTime("16:10")}
                                    >
                                        16:10
                                    </button>
                                    <button
                                        className={`py-2 px-4 rounded ${selectedTime === "17:20" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                        onClick={() => setSelectedTime("17:20")}
                                    >
                                        17:20
                                    </button>
                                    <button
                                        className={`py-2 px-4 rounded ${selectedTime === "18:30" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                        onClick={() => setSelectedTime("18:30")}
                                    >
                                        18:30
                                    </button>
                                </div>
                                {tickets.map((ticket, index) => (
                                    <div
                                        key={index}
                                        className="border p-4 rounded-lg shadow mt-10"
                                    >
                                        <h3 className="text-lg font-bold">{ticket.type}</h3>
                                        <p className="text-green-600 font-semibold">
                                            {ticket.cancelPolicy}
                                        </p>
                                        <p className="text-gray-700 mt-2">
                                            Từ <span className="font-bold">{ticket.price}</span>
                                        </p>
                                        <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">
                                            Chọn
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivitiesDetailPage;
