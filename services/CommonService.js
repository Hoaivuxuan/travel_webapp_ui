import axios from "axios";

const API_URL = "http://localhost:8080";
const bearerToken = localStorage.getItem("token");

export const AttractionService = {
  getAttraction: (city) => {
    return axios.get(`${API_URL}/attraction/not-office?city=${city}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  getOffice: (city, rental) => {
    return axios.get(`${API_URL}/attraction/office?city=${city}&rental=${rental}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};

export const CityService = {
  getAll: () => {
    return axios.get(`${API_URL}/city`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};

export const UserService = {
  getAllUsers: () => {
    return axios.get(`${API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  getById: (id) => {
    return axios.get(`${API_URL}/users/details?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};