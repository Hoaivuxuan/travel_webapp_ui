"use client";

import React, { useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { listings } from "@/data/fakeData";

const ActivitiesDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState("CN 3 Tháng 11");
    const [selectedTime, setSelectedTime] = useState("16:10");

    return (
        <div className="bg-gray-100 pb-6">
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
                    <a href="#" className="hover:underline">Trang chủ</a> {'>'}
                    <a href="#" className="hover:underline">Các địa điểm tham quan</a> {'>'}
                    Buổi biểu diễn múa rối nước Thăng Long
                </div>

                <h1 className="text-3xl font-bold mt-2">Buổi biểu diễn múa rối nước Thăng Long</h1>
                <p className="text-blue-600 mt-1">Bán chạy #1 ở Hà Nội</p>

                <div className="flex mt-6">
                    <div className="w-2/3">
                        <img
                            src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153554304.jpg?k=c4f7d09fa35799ed21178297bd8c6c0bf349d0002eefaec21aff476e3b8012f3&o="
                            alt="Water Puppet Show"
                            className="w-full rounded"
                        />
                    </div>

                    <div className="w-1/3 flex flex-col space-y-2 ml-4">
                        <img src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153554304.jpg?k=c4f7d09fa35799ed21178297bd8c6c0bf349d0002eefaec21aff476e3b8012f3&o=" alt="Thumbnail 1" className="w-full rounded" />
                        <img src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153554304.jpg?k=c4f7d09fa35799ed21178297bd8c6c0bf349d0002eefaec21aff476e3b8012f3&o=" alt="Thumbnail 2" className="w-full rounded" />
                        <img src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153554304.jpg?k=c4f7d09fa35799ed21178297bd8c6c0bf349d0002eefaec21aff476e3b8012f3&o=" alt="Thumbnail 3" className="w-full rounded" />
                    </div>
                </div>

                <div className="mt-6 bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Bạn cần đến nhận vé</h2>
                    <p className="text-gray-700 mt-2">
                        Trải nghiệm này sẽ mang đến cho bạn cơ hội khám phá nghệ thuật múa rối nước xa xưa ở Hà Nội.
                        Bạn sẽ ghé thăm nhà hát múa rối nước Thăng Long...
                    </p>

                    <div className="mt-4">
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
                    </div>

                    <p className="mt-4 text-gray-500">Vui lòng có mặt ít nhất 15 phút trước khi hoạt động bắt đầu.</p>
                </div>
            </div>
        </div>
    );
};

export default ActivitiesDetailPage;
