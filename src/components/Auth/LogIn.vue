<template>
  <div
    class="max-w-md w-full mx-10 space-y-8 bg-black/20 rounded-md"
  >
    <div class="p-5 rounded-2xl">
      <div>
        <img class="mx-auto h-40" src="/src/assets/logo.png" alt="Logo" />
        <h2
          class="mt-5 text-center text-3xl font-bold text-lime-700 font-serif"
        >
          LogIn To Account
        </h2>
      </div>
      <form class="mt-4" @submit="submit" autocomplete="off">
        <div class="rounded-md shadow-sm">
          <InputField
            placeholder="Email address"
            name="email"
            type="email"
            :error="emailError"
            v-model="emailValue"
            class="mb-6"
          />
          <InputField
            placeholder="Password"
            name="password"
            type="password"
            :error="passError"
            v-model="passValue"
            class="mb-6"
          />
        </div>

        <span
          v-if="logInError"
          class="py-2 font-semibold text-red-600 text-sm text-center w-full block"
          >{{ logInError }}</span
        >
        <Loading v-if="loading"/>
        <div class="flex">
          <button
            type="submit"
            :disabled="loading"
            class="group disabled:bg-black/50 relative w-fit flex m-auto justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black/80 hover:text-white focus:outline-none"
          >
            Log In
          </button>
          <div
            type="submit"
            class="group relative w-fit flex m-auto justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lime-500 hover:bg-white hover:text-black focus:outline-none cursor-pointer"
            @click="home"
          >
            Back To Home
          </div>
        </div>
        <div>
          <span
            class="group relative w-full flex m-auto justify-center py-2 px-4 text-sm font-medium text-lime-900 font-serif"
            >Dont have Account ?<span
              class="text-orange-500 underline font-extrabold cursor-pointer"
              v-on:click="signUp"
              >_SignUp</span
            ></span
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "../../axios/axiosConfig";
import { watch } from "@vue/runtime-core";
import { ref } from "vue";
const logInError = ref("");
const loading = ref(false);
watch(logInError, (data, prev) => {
  if (data) {
    setTimeout(() => {
      logInError.value = "";
    }, 3000);
  }
});
const store = useStore();
const emits = defineEmits(["sign"]);

function signUp() {
  emits("sign");
}
const router = useRouter();
function home() {
  router.push("/");
}
const schema = {
  email(value) {
    if (!value) {
      return "email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return "email format is not valid";
    }
    return true;
  },
  password(value) {
    if (!value) {
      return "password is required";
    } else if (value.trim().length < 8) {
      return "password must be greater than eight character";
    }
    return true;
  },
};
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: emailValue, errorMessage: emailError } = useField("email");
const { value: passValue, errorMessage: passError } = useField("password");
const submit = handleSubmit(
  async (value) => {
    loading.value = true;
    try {
      const response = await axios.post("/login", {
        email: value.email,
        password: value.password,
      });
      if (response.data.success) {
        store.dispatch("SET_USER", response.data);
        store.dispatch("SET_ACCESS_TOKEN", response.data);
        router.push("/");
      } else {
        logInError.value = response.data.error;
      }
    } catch (err) {
      logInError.value = "something went wrong";
    }
    loading.value = false;
  },
  async (error) => {
  }
);
</script>

