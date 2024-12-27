import axios from "axios";

const API_URL = "http://localhost:8080";
const bearerToken = localStorage.getItem("token");

export const BookingHotelService = {
  getBookingByUser: (id) => {
    return axios.get(`${API_URL}/bookingRoom/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  getDetails: (id) => {
    return axios.get(`${API_URL}/bookingRoom/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  postBooking: (booking) => {
    return axios.post(`${API_URL}/bookingRoom`, booking, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};

export const BookingVehicleService = {
  getBookingByUser: (id) => {
    return axios.get(`${API_URL}/bookingVehicle/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  getDetails: (id) => {
    return axios.get(`${API_URL}/bookingVehicle/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  postBooking: (bookingVehicle) => {
    return axios.post(`${API_URL}/bookingVehicle`, bookingVehicle, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};