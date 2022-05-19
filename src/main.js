import { createApp, provide, h } from "vue";
import App from "./App.vue";
import store from "./store/store";
import "./index.css";
import router from "./router";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import {
  DefaultApolloClient,
} from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "https://online-food-recipe-app.herokuapp.com/v1/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = store.state.accessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
import Refresh from "./refresh";
const cache = new InMemoryCache();
const refresh = Refresh();
refresh().then((res) => {
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: true,
  });
  store.dispatch("SET_USER", res);
  store.dispatch("SET_ACCESS_TOKEN", res);

  const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },

    render: () => h(App),
  });

  app.use(router).use(store);
  app.mount("#app");
});
