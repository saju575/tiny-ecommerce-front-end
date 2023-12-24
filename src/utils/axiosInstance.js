import axios from "axios";

/* 
    create an instance of axios
*/
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default instance;
