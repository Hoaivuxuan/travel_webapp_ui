import axios from "axios";

const API_FACILITY_URL = "http://localhost:8080/rental";
const bearerToken = localStorage.getItem("token");

const RentalFacilityService = {
  getAll: () => {
    return axios.get(`${API_FACILITY_URL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};

export default RentalFacilityService;