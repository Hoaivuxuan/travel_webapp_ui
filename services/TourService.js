import axios from "axios";

const API_TOUR_URL = "http://localhost:8080/tours";
const bearerToken = localStorage.getItem("token");

const TourService = {
  getById: (id) => {
    return axios.get(`${API_TOUR_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  },
};

export default TourService;
