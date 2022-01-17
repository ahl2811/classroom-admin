import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../environment";

export const getToken = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return user?.accessToken || "";
};

export const getAuthorization = () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getToken(),
  };
  return { headers };
};

export const request = axios.create({
  baseURL: `${SERVER_URL}`,
});

export const toastError = (error, altMessage = "Something were wrong!") => {
  if (!error.response?.data?.message) {
    toast.error(altMessage);
    return;
  }
  const { message } = error.response.data;
  toast.error(`${message}`, {
    position: "top-center",
    autoClose: 3000,
  });
};
