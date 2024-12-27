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

export const AccessoryService = {
  getByType: (type) => {
    return axios.get(`${API_URL}/accessory?type=${type}`, {
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
  register: (data) => {
    return axios.post(`${API_URL}/users/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  becomeAdmin: (data) => {
    return axios.post(`${API_URL}/users/createAdmin`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  login: (data) => {
    return axios.post(`${API_URL}/users/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
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
  updateUserInfo: (data) => {
    return axios.put(`${API_URL}/users`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
  resetPassword: (input) => {
    return axios.post(`${API_URL}/users/change-password`, input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  }
};