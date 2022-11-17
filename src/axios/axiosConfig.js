import axios from "axios";

const baseURL = "https://food-recipe-api-y521.onrender.com";

const app = axios.create({
  baseURL,
  withCredentials: true,
});

app.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.warn("error.message");
    return Promise.reject(error);
  }
);

export default app;
