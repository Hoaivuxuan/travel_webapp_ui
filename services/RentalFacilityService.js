import axios from "axios";

const bearerToken = localStorage.getItem("token");

const RentalFacilityService = {
  getAll: () => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rental`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  },
};

export default RentalFacilityService;