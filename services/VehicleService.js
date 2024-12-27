import axios from "axios";

const bearerToken = localStorage.getItem("token");

const VehicleService = {
  getByCity: (id) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vehicles?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};

export default VehicleService;