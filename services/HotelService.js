import axios from "axios";

const bearerToken = localStorage.getItem("token");

const HotelService = {
  getByCity: (key) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hotels?noRooms=0&keyword=${key}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  getById: (id) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hotels/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default HotelService;