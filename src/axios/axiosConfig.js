import axios from "axios";

const baseURL = "https://rocky-journey-92122.herokuapp.com/";

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
