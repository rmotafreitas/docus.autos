import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "https://docusautos-production.up.railway.app",
  headers: {
    Authorization: `Bearer ${Cookies.get("hanko")}`,
  },
});
