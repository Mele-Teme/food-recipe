import axios from "../axios/axiosConfig";
import store from "../store/store";
const RefreshTpken = () => {
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    if (response.data.success) {
      store.dispatch("SET_USER", response.data);
      store.dispatch("SET_ACCESS_TOKEN", response.data);
    } else {
      store.dispatch("SET_USER", { user: null });
    }

    return response.data;
  };

  return refresh;
};
export default RefreshTpken;