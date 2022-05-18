<template>
  <RouterView />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "./axios/axiosConfig";

const store = useStore();
const useroute = useRoute();
const interval = ref(null);
const router = useRouter();

onMounted(() => {
  setInterval(async () => {
    const result = await axios.get("/refresh");
    if (store.state.user !== result.data.user) {
      store.dispatch("SET_USER", result.data);
    }
    if (result.data.user === null) {
      if(useroute.path != '/detail' || useroute.path != '/' )
      router.replace("/");
    }
    store.dispatch("SET_ACCESS_TOKEN", result.data);
  }, 600000);
});
</script>
