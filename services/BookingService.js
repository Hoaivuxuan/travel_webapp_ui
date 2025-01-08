import axios from "axios";

const bearerToken = localStorage.getItem("token");

export const BookingHotelService = {
  getBookingByUser: (id) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookingRoom/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  getDetails: (id) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookingRoom/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  postBooking: (booking) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bookingRoom`, booking, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  cancelBooking: (id) => {
    const data = { status: "2" };
    return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/bookingRoom/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};

export const BookingVehicleService = {
  getBookingByUser: (id) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookingVehicle/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  getDetails: (id) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookingVehicle/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  postBooking: (bookingVehicle) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bookingVehicle`, bookingVehicle, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};