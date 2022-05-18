import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    accessToken: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
    },

    setAccessToken(state, payload) {
      state.accessToken = payload.accessToken;
    },
  },
  actions: {
    SET_USER: ({ commit }, payload) => {
      commit("setUser", payload);
    },

    SET_ACCESS_TOKEN: ({ commit }, payload) => {
      commit("setAccessToken", payload);
    },
  },
});
