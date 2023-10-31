import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "https://docus-api.onrender.com",
  headers: {
    Authorization: `Bearer ${Cookies.get("hanko")}`,
  },
});
