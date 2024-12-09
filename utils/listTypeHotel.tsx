export const fetchHotelTypes = async () => {
  try {
    const response = await fetch("http://localhost:8080/hotels?noRooms=0&keyword");
    const data = await response.json();
    const types = Array.from(new Set<string>(data.hotels.map((hotel: any) => hotel.type)))
      .sort((a, b) => a.localeCompare(b))
      .map((type, id) => ({ id: id, name: type }));

    return types;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu loại khách sạn:", error);
    return [];
  }
};