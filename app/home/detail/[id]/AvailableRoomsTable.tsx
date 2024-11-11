import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface Room {
  type: string;
  guests: number;
  price: number;
  options: string[];
  bedChoice: string;
}

interface AvailableRoomsTableProps {
  rooms: Room[];
}

const AvailableRoomsTable: React.FC<AvailableRoomsTableProps> = ({ rooms }) => {
  const [selectedRooms, setSelectedRooms] = useState<number[]>(Array(rooms.length).fill(0));

  const handleRoomSelect = (index: number, value: number) => {
    const updatedSelection = [...selectedRooms];
    updatedSelection[index] = value;
    setSelectedRooms(updatedSelection);
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-5 bg-gray-200 text-gray-700 font-semibold">
        <div className="px-6 py-3 border-b">Loại chỗ ở</div>
        <div className="px-6 py-3 border-b">Số lượng khách</div>
        <div className="px-6 py-3 border-b">Giá cho 10 đêm</div>
        <div className="px-6 py-3 border-b">Các lựa chọn</div>
        <div className="px-6 py-3 border-b">Chọn giường</div>
      </div>
      <div className="grid gap-y-4">
        {rooms.map((room, index) => (
          <React.Fragment key={index}>
            <div className="grid grid-cols-5 text-gray-700 border-b">
              <div className="px-6 py-4">{room.type}</div>
              <div className="px-6 py-4">
                {room.guests} x 
                <FontAwesomeIcon icon={faUser} className="mx-2" />
              </div>
              <div className="px-6 py-4">{room.price.toLocaleString("en-GB")} VNĐ</div>
              <div className="px-6 py-4">
                <ul className="list-disc pl-5">
                  {room.options.map((option, i) => (
                    <li key={i} className="text-green-600 text-sm">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4">
                <select
                  value={selectedRooms[index]}
                  onChange={(e) => handleRoomSelect(index, Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {Array.from({ length: 11 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AvailableRoomsTable;