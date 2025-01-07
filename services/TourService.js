import axios from "axios";

const API_TOUR_URL = "http://localhost:8080/tours";
const bearerToken = localStorage.getItem("token");

export const TourService = {
  getById: (id) => {
    return axios.get(`${API_TOUR_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  },
  search: (location = "", date = "") => {
    const url = `${API_TOUR_URL}?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`;

    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  },
};

export const TicketService = {
  createBookingTicket: (bookingData) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/bookingTicket`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  },
  getBookingByUser: (id) => {
    return axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/bookingTicket/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  },
};
