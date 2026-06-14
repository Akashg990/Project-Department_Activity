import axios from "../utils/axiosInstance";

// REGISTER
export const registerUser = async (userData) => {
  const response = await axios.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// LOGIN
export const loginUser = async (userData) => {
  const response = await axios.post(
    "/auth/login",
    userData
  );

  return response.data;
};