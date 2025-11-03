import axios from "axios";
const apiurl=import.meta.env.VITE_API_KEY

const API = axios.create({
  baseURL: apiurl,
});

// Add token automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
