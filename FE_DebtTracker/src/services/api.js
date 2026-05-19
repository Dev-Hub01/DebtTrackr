import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8989" // your Spring Boot URL
});

export default API;