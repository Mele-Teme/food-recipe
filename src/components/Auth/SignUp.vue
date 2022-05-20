<template>
  <div class="max-w-md w-full mx-10 s bg-black/20 px-6 py-2 rounded-md">
    <div>
      <h2
        class="mt-2 text-center text-3xl font-bold font-serif text-lime-700 underline mb-3"
      >
        Welcome
      </h2>
      <h2
        class="mt-2 text-center text-3xl font-bold text-lime-600 font-serif mb-3"
      >
        Create New Account
      </h2>
    </div>
    <form class="" @submit="submit" autocomplete="off">
      <div class="rounded-md shadow-sm">
        <InputField
          placeholder="User Name"
          name="username"
          type="text"
          :error="userError"
          v-model="userValue"
          class="mb-6"
        />
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
        <InputField
          placeholder="Confirm Password"
          name="Cpassword"
          type="password"
          :error="CpassError"
          v-model="CpassValue"
          class="mb-6"
        />
      </div>
      <span
        v-if="signUpError"
        class="py-2 font-semibold text-red-600 text-sm text-center w-full block"
        >{{ signUpError }}</span
      >
      <Loading v-if="loading" />
      <div>
        <button
          type="submit"
          :disabled="loading"
          class="group disabled:bg-black/50 relative w-1/2 flex m-auto justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-black/80 hover:text-white focus:outline-none font-serif"
        >
          Sign Up
        </button>
      </div>
      <div>
        <span
          class="group relative w-full flex m-auto justify-center py-2 px-4 text-sm font-medium text-lime-800"
          >Already Have Account ?<span
            class="text-orange-500 underline font-extrabold cursor-pointer"
            v-on:click="logIn"
            >_LogIn</span
          ></span
        >
      </div>
    </form>
  </div>
</template>
<script setup>
import { useField, useForm } from "vee-validate";
import axios from "../../axios/axiosConfig";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const signUpError = ref("");
const loading = ref(false);
watch(signUpError, (data, prev) => {
  if (data) {
    setTimeout(() => {
      signUpError.value = "";
    }, 3000);
  }
});
const emits = defineEmits(["log"]);

function logIn() {
  emits("log");
}
const schema = {
  username(value) {
    if (!value) {
      return "User name is required";
    }
    return true;
  },
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
  Cpassword(value) {
    if (!value) {
      return "please Confirm password";
    } else if (passValue.value != value) {
      return "password is not match";
    }
    return true;
  },
};
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: userValue, errorMessage: userError } = useField("username");
const { value: emailValue, errorMessage: emailError } = useField("email");
const { value: passValue, errorMessage: passError } = useField("password");
const { value: CpassValue, errorMessage: CpassError } = useField("Cpassword");
const submit = handleSubmit(
  async (value) => {
    loading.value = true;
    try {
      const res = await axios.post("/register", {
        username: value.username,
        email: value.email,
        password: value.password,
      });
      if (res.data.success) {
        store.dispatch("SET_USER", res.data);
        store.dispatch("SET_ACCESS_TOKEN", res.data);
        router.push("/");
      } else {
        if (res.data.error[0].message.includes("email"))
          signUpError.value = "email already taken create with another email";
        else {
          signUpError.value = "something went wrong please try again";
        }
      }
    } catch (err) {
      signUpError.value = "connection error";
    }
    loading.value = false;
  },
  async (error) => {}
);
</script>
