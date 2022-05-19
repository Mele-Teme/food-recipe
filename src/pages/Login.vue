<template lang="">
  <div
    class="min-h-full w-full flex items-center justify-center  bg-[url(https://ibb.co/8zWgNYH)] bg-no-repeat bg-cover bg-center"
  >
    <div class="w-full min-h-screen flex justify-center items-center bg-white/80">
      <SignUp v-if="!toggleLogPage" @log="toggleLogIn" />
      <LogIn v-else @sign="toggleLogIn" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const toggleLogPage = ref(true);
function toggleLogIn() {
  toggleLogPage.value = !toggleLogPage.value;
}
</script>
<style></style>
