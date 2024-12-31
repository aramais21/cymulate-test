import axiosInstance from "./axiosConfig";

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/log-in", { usernameOrEmail: email, password });
  return response.data;
};

export const register = async (
  email: string,
  password: string,
  name: string,
  username: string,
) => {
  const response = await axiosInstance.post("/auth/sign-up", {
    email,
    password,
    name,
    username
  });
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await axiosInstance.post("/auth/email-verify", { token });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (
  token: string,
  password: string,
) => {
  const response = await axiosInstance.post("/auth/reset-password", {
    token,
    password,
  });
  return response.data;
};
