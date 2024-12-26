import axios from "axios";

const API_VEHICLE_URL = "http://localhost:8080/vehicles";
const bearerToken = localStorage.getItem("token");

const VehicleService = {
  getByCity: (id) => {
    return axios.get(`${API_VEHICLE_URL}?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};

export default VehicleService;