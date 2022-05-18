import axios from "axios";

// const baseURL = "https://morning-ravine-10562.herokuapp.com/";
const baseURL = " https://rocky-shelf-17953.herokuapp.com/";

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
