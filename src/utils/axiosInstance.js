import axios from "axios";

/* 
    create an instance of axios
*/
const instance = axios.create({
  baseURL: "https://tiny-ecommerce.onrender.com/api",
  withCredentials: true,
});

export default instance;
