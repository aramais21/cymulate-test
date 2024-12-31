import axiosInstance from "./axiosConfig";

export const getPhishingAttempts = async () => {
  const response = await axiosInstance.get("/attempt");
  return response.data;
};

export const sendPhishingEmail = async (email: string) => {
  const response = await axiosInstance.post("/attempt", { email });
  return response.data;
};
