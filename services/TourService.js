import axios from "axios";

const bearerToken = localStorage.getItem("token");

const TourService = {
  getById: (id) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tours/${id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  },
};

export default TourService;
