import axios from "axios";

// Function to create Axios instance
const Axios = (
  baseURL = `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/`,
  additionalHeaders = {}
) => {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...additionalHeaders, // Merge any additional headers
    },
  });
};

export default Axios;
