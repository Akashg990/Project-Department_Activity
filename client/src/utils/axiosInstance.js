import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
 baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("user");

      toast.error(
        "Session expired. Please login again."
      );

      window.location.href = "/login";

    }

    return Promise.reject(error);

  }

);

export default axiosInstance;