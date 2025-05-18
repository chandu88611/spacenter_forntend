import axios from "axios";

// Create Axios instance with default configuration
const axiosInstance = axios.create({
  // baseURL: `http://localhost:5000/api/v1`,
  baseURL: `https://97.74.87.147/api/v1`,

  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

let interceptorsSet = false;

// Function to set up interceptors
const setUpInterceptors = () => {
  if (interceptorsSet) return;

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  interceptorsSet = true;
};

// Axios Base Query for RTK Query
const axiosBaseQuery = async ({
  url,
  method = "GET",
  body,
  params,
  headers,
}) => {
  setUpInterceptors();

  try {
    const response = await axiosInstance({
      url,
      method,
      data: body, // Body for POST/PUT
      params, // Params for GET/DELETE
      headers,
    });

    return { data: response.data };
  } catch (error) {
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || error.message,
      },
    };
  }
};

export default axiosBaseQuery;
