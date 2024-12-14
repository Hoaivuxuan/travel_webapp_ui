import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, Select } from "antd";
import { hotelOptions } from "@/data/defaultValues";
import { encodeToJWT } from "@/utils/JWT";
import { ToastContainer } from "react-toastify";
import { BsDoorOpen, BsFillPersonFill } from "react-icons/bs";
import { RxRulerSquare } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
import Notification from "@/components/Notification";

interface Room {
  name: string;
  type: string;
  size: number;
  max_guests: number;
  type_bed_1: string;
  no_bed_1: number;
  type_bed_2: string;
  no_bed_2: number | null;
  price: number;
  available_rooms: number;
  amenities_for_rooms: string[];
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
      (sum, count, index) => sum + count * rooms[index].price, 0
    );
    setTotalRooms(newTotalRooms);
    setTotalPrice(newTotalPrice);
  }, [selectedRooms, rooms]);

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
      render: (_: any, record: any) => (
        <div className="space-y-1">
          <p className="font-bold mb-2">{record.name}</p>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <span className="flex">
                <BsDoorOpen className="text-lg mr-2" /> {record.type}
              </span>
              <span className="flex">
                <RxRulerSquare className="text-lg mr-2" /> {record.size} m²
              </span>
            </div>
            <hr />
            <p>{record.no_bed_1} x {record.type_bed_1}</p>
            <p>{record.type_bed_2 && `${record.no_bed_2} x ${record.type_bed_2}`}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng khách",
      dataIndex: "max_guests",
      key: "max_guests",
      render: (maxGuests: number) => (
        <div className="flex items-center">
          {maxGuests} x <BsFillPersonFill className="text-lg mx-2" />
        </div>
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
    type: room.type,
    size: room.size,
    type_bed_1: room.type_bed_1,
    no_bed_1: room.no_bed_1,
    type_bed_2: room.type_bed_2,
    no_bed_2: room.no_bed_2,
    max_guests: room.max_guests,
    price: room.price,
    amenities: room.amenities_for_rooms,
    available_rooms: room.available_rooms,
  }));

  return (
    <div className="overflow-x-auto">
      <Table
        bordered
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
