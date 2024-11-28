import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons"; // Import the Ant Design icon
import { useRouter } from "next/navigation";
import { Table, Select } from "antd";
import { format } from "date-fns";

interface Room {
  type: string;
  max_guests: number;
  price: number;
  amenities: string[];
}

interface AvailableRoomsTableProps {
  id: number;
  rooms: Room[];
}

const AvailableRoomsTable: React.FC<AvailableRoomsTableProps> = ({ id, rooms }) => {
  const initialSelection = {
    selectedRooms: Array(rooms.length).fill(0),
    totalRooms: 0,
    totalPrice: 0,
  };

  const [selectedRooms, setSelectedRooms] = useState<number[]>(initialSelection.selectedRooms);
  const [totalRooms, setTotalRooms] = useState<number>(initialSelection.totalRooms);
  const [totalPrice, setTotalPrice] = useState<number>(initialSelection.totalPrice);
  const router = useRouter();

  useEffect(() => {
    const newTotalRooms = selectedRooms.reduce((sum, count) => sum + count, 0);
    const newTotalPrice = selectedRooms.reduce(
      (sum, count, index) => sum + count * rooms[index].price,
      0
    );
    setTotalRooms(newTotalRooms);
    setTotalPrice(newTotalPrice);
  }, [selectedRooms, rooms, id]);

  const handleRoomSelect = (index: number, value: number) => {
    const updatedSelection = [...selectedRooms];
    updatedSelection[index] = value;
    setSelectedRooms(updatedSelection);
  };

  const handleBookingClick = () => {
    const search = localStorage.getItem("searchHotel");
    const url = new URL("https://booking.html");
    if (search) {
      const searchObject = JSON.parse(search);
      url.searchParams.set("booking", "true");
      url.searchParams.set("id", id.toString());
      url.searchParams.set("checkin", format(searchObject.dateRange.from, "yyyy-MM-dd"));
      url.searchParams.set("checkout", format(searchObject.dateRange.to, "yyyy-MM-dd"));
      url.searchParams.set("adults", searchObject.adults.toString());
      url.searchParams.set("children", searchObject.children.toString());
      url.searchParams.set("rooms", searchObject.rooms.toString());
      const roomSelection = JSON.stringify({
        selectedRooms: selectedRooms
          .map((count, index) => ({
            type: rooms[index].type,
            count,
            price: rooms[index].price,
          }))
          .filter((room) => room.count > 0),
        totalRooms,
        totalPrice,
      });
      url.searchParams.set("roomSelection", encodeURIComponent(roomSelection));
    }

    router.push(`/home/booking?url=${url.search}`);
  };

  const columns = [
    {
      title: "Loại chỗ ở",
      dataIndex: "type",
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
      render: (price: number) => `${price.toLocaleString("en-GB")} ₫`,
    },
    {
      title: "Các lựa chọn",
      dataIndex: "amenities",
      key: "amenities",
      width: "30%",
      render: (amenities: string[]) => (
        <div className="flex flex-wrap gap-2">
          {amenities.map((option, i) => (
            <div key={i} className="w-auto inline-block bg-green-200 text-green-600 rounded-full px-4 py-1 text-xs">
              <span>{option}</span>
            </div>
          ))}
        </div>
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
          {Array.from({ length: 11 }, (_, i) => (
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
    type: room.type,
    max_guests: room.max_guests,
    price: room.price,
    amenities: room.amenities,
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
              <p className="text-green-600">{totalPrice.toLocaleString("en-GB")} ₫</p>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableRoomsTable;
