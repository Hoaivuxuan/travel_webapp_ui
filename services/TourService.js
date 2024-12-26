import axios from "axios";

const HOST = "http://localhost:8080";
const TOUR_URL = `${HOST}/tours`;

const bearerToken = localStorage.getItem("token");

const TourService = {
  getById: (id) => {
    return axios.get(`${TOUR_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  },
};

export default TourService;
