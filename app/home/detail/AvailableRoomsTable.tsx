import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Table, Select } from "antd";
import { format } from "date-fns";
import { hotelOptions } from "@/data/defaultValues";
import { encodeToJWT } from "@/utils/JWT";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";

interface Room {
  name: string;
  max_guests: number;
  price: number;
  amenities: string[];
  available_rooms: number;
}

interface AvailableRoomsTableProps {
  hotel: any;
  rooms: Room[];
}

const AvailableRoomsTable: React.FC<AvailableRoomsTableProps> = ({ hotel, rooms }) => {
  const initialSelection = {
    selectedRooms: Array(rooms.length).fill(0),
    totalRooms: 0,
    totalPrice: 0,
  };

  const [selectedRooms, setSelectedRooms] = useState<number[]>(initialSelection.selectedRooms);
  const [totalRooms, setTotalRooms] = useState<number>(initialSelection.totalRooms);
  const [totalPrice, setTotalPrice] = useState<number>(initialSelection.totalPrice);
  const router = useRouter();
  const { notifyWarning } = Notification();

  useEffect(() => {
    const newTotalRooms = selectedRooms.reduce((sum, count) => sum + count, 0);
    const newTotalPrice = selectedRooms.reduce(
      (sum, count, index) => sum + count * rooms[index].price,
      0
    );
    setTotalRooms(newTotalRooms);
    setTotalPrice(newTotalPrice);
  }, [selectedRooms, rooms, hotel]);

  const handleRoomSelect = (index: number, value: number) => {
    const updatedSelection = [...selectedRooms];
    updatedSelection[index] = value;
    setSelectedRooms(updatedSelection);
  };

  const handleBookingClick = () => {
    const search = localStorage.getItem("searchHotel");
    const user = localStorage.getItem("user");
    const roomSelection = {
      selectedRooms: selectedRooms
        .map((count, index) => ({
          type: rooms[index].name,
          count,
          price: rooms[index].price,
        }))
        .filter((room) => room.count > 0),
      totalRooms,
      totalPrice,
    };

    if (search && user) {
      const booking = JSON.parse(search);
      const bookingHotel = {
        user: JSON.parse(user),
        hotel,
        booking: JSON.parse(search),
      }

      if (roomSelection.totalRooms === 0) {
        notifyWarning("Vui lòng chọn ít nhất một phòng trước khi tiếp tục!");
        return;
      }
      if (roomSelection.totalRooms > booking.rooms) {
        notifyWarning("Số phòng bạn chọn vượt quá số lượng phòng bạn muốn đặt!");
        return;
      }

      const query = new URLSearchParams({
        bookingHotel: encodeToJWT(bookingHotel),
        roomSelection: encodeToJWT(roomSelection),
      });
      router.push(`/home/booking?url=1&${query.toString()}`);
    }
  };

  const columns = [
    {
      title: "Loại chỗ ở",
      dataIndex: "name",
      width: "30%",
      key: "type",
    },
    {
      title: "Số lượng khách",
      dataIndex: "max_guests",
      key: "max_guests",
      render: (maxGuests: number) => (
        <span>
          {maxGuests} x <UserOutlined className="mx-2" />
        </span>
      ),
    },
    {
      title: "Giá phòng",
      dataIndex: "price",
      key: "price",
      render: (price: number) => 
        `${price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}`,
    },
    {
      title: "Các lựa chọn",
      dataIndex: "amenities",
      key: "amenities",
      width: "30%",
      render: () => (
        <ul className="list-disc pl-5 text-sm space-y-1">
          {hotelOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Chọn số lượng",
      dataIndex: "select",
      key: "select",
      width: "10%",
      render: (_: any, record: any, index: number) => (
        <Select
          value={selectedRooms[index]}
          onChange={(value: number) => handleRoomSelect(index, value)}
          className="w-full"
        >
          {Array.from({ length: record.available_rooms + 1 }, (_, i) => (
            <Select.Option key={i} value={i}>
              {i}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ];

  const data = rooms.map((room, index) => ({
    key: index,
    name: room.name,
    max_guests: room.max_guests,
    price: room.price,
    amenities: room.amenities,
    available_rooms: room.available_rooms,
  }));

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName="hover:bg-gray-100"
      />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <button
            onClick={handleBookingClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-green-400 text-sm font-semibold"
          >
            Chọn phòng
          </button>
        </div>
        {totalRooms > 0 && (
          <div>
            <p className="text-sm font-semibold">
              <p className="text-blue-600">{totalRooms} phòng tổng giá:</p>
              <p className="text-green-600">
                {totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
              </p>
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AvailableRoomsTable;
