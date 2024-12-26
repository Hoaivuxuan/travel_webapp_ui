import axios from "axios";

const API_HOTEL_URL = "http://localhost:8080/hotels";
const bearerToken = localStorage.getItem("token");

const HotelService = {
  getByCity: (key) => {
    return axios.get(`${API_HOTEL_URL}?noRooms=0&keyword=${key}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  getById: (id) => {
    return axios.get(`${API_HOTEL_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default HotelService;