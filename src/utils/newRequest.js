import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://workhub-backend.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
