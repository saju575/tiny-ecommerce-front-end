import axios from "../axiosInstance";

/* 
  create  products
*/
export const getData = async (url) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
