<template lang="">
  <div
    @click="goTop"
    ref="GOTOP"
    id="go_up"
    class="fixed bottom-3 text-sm right-5 w-fit h-fit cursor-pointer rounded-full scale-0 transition-all duration-500 bg-black text-white z-10 px-3 py-1"
  >
    Go Up
  </div>
  <div
    v-if="user"
    class="main z-20 fixed min-h-fit w-full text-black bg-gray-100 opacity-95 flex sm:flex-col lg:flex-row"
  >
    <div class="h-[50px] flex sm:flex-col lg:flex-row w-full">
      <h1
        class="z-20 text-2xl sm:w-full py-2 ml-2 lg:w-1/4 lg:my-0 flex items-center text-orange-600 font-bold font-serif"
      >
        Food Recipe🍕
      </h1>

      <ul
        :class="{ show: showNav }"
        ref="classToggle"
        class="nav bg-gray-100 z-0 mx-auto sm:flex lg:flex sm:flex-col lg:flex-row sm:items-center lg:items-end lg:w-3/4 sm:mb-2 lg:my-0 text-slate-700 w-full sm:-translate-y-[100vh] lg:translate-y-[0px] transition-all duration-500 shadow-2xl"
      >
        <li
          class="sm:w-fit text-sm sm:px-4 lg:w-full border-b-4 border-transparent hover:text-orange-800 font-semibold sm:text-center sm:py-2 cursor-pointer after:transition-all after:duration-700 after:invisible relative after:contents-[''] after:absolute after:border-2 after:border-orange-700 after:-bottom-1 after:-left-0 after:right-full"
          @click="handleClick($event, '/')"
        >
          Home
        </li>
        <li
          class="sm:w-fit text-sm sm:px-4 lg:w-full border-b-4 border-transparent hover:text-orange-800 font-semibold sm:text-center sm:py-2 cursor-pointer transition-all duration-500 after:transition-all after:duration-700 after:invisible relative after:contents-[''] after:absolute after:border-2 after:border-orange-700 after:-bottom-1 after:-left-0 after:right-full lg:px-1"
          @click="handleClick($event, 'bookmark')"
        >
          Book Mark
        </li>
        <li
          class="sm:w-fit text-sm sm:px-4 lg:w-full border-b-4 border-transparent hover:text-orange-800 font-semibold sm:text-center sm:py-2 cursor-pointer transition-all duration-500 after:transition-all after:duration-700 after:invisible relative after:contents-[''] after:absolute after:border-2 after:border-orange-700 after:-bottom-1 after:-left-0 after:right-full lg:px-1"
          @click="handleClick($event, 'mypage')"
        >
          My Recipes
        </li>
        <li
          class="sm:w-fit text-sm sm:px-4 lg:w-full border-b-4 border-transparent hover:text-orange-800 font-semibold sm:text-center sm:py-2 cursor-pointer transition-all duration-500 after:transition-all after:duration-700 after:invisible relative after:contents-[''] after:absolute after:border-2 after:border-orange-700 after:-bottom-1 after:-left-0 after:right-full lg:px-1"
          @click="handleClick($event, 'createrecipe')"
        >
          Add Recipe
        </li>
        <li
          class="sm:w-fit sm:px-4 text-sm lg:w-full border-b-4 border-transparent hover:text-orange-800 font-semibold sm:text-center sm:py-2 cursor-pointer transition-all duration-500 after:transition-all after:duration-700 after:invisible relative after:contents-[''] after:absolute after:border-2 after:border-orange-700 after:-bottom-1 after:-left-0 after:right-full lg:px-1"
          @click="logout"
        >
          Log out
        </li>
      </ul>
    </div>

    <div
      ref="expandedMenue"
      class="z-30 w-[50px] h-[40px] absolute right-2 flex justify-center items-center lg:hidden mt-2 cursor-pointer"
      @click="toggle"
    >
      <span
        :class="{ burgerAnim: burgerAnim }"
        class="burger w-[32px] h-[5px] bg-slate-600 relative before:content-[''] before:w-full before:h-full before:absolute before:bg-slate-600 before:-top-[10px] after:w-full after:h-full after:absolute after:bg-slate-600 after:top-[10px] after:rounded-2xl before:rounded-2xl rounded-2xl"
      ></span>
    </div>
  </div>

  <div
    v-else
    class="z-20 fixed min-h-[50px] w-screen flex items-center bg-gray-100 opacity-95"
  >
    <h1
        class="z-20 text-3xl sm:w-full py-2 ml-2 lg:my-0 flex items-center text-orange-600 font-bold font-serif"
      >
        Food Recipe🍕
      </h1>
    <button
      class="mr-3 w-fit font-semibold border-2 border-black hover:bg-black hover:text-white py-1 px-4"
      @click="login"
    >
      LogIn
    </button>
  </div>
  <RouterView />
</template>
<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "../axios/axiosConfig";
const store = useStore();
const router = useRouter();
const route = useRoute();
const showNav = ref(false);
const burgerAnim = ref(false);
const user = computed(() => store.state.user);

async function logout() {
  showNav.value = false;
  burgerAnim.value = false;
  if (route.path != "/") router.push("/");
  axios
    .get("/logout", { withCredentials: true })
    .then((result) => {
      store.dispatch("SET_ACCESS_TOKEN", {
        accessToken: result.data.accessToken,
      });
    })
    .catch((error) => console.log(error.message));
  store.dispatch("SET_USER", { user: null });
}
function login() {
  router.push("/login");
}
const GOTOP = ref("");

window.addEventListener("scroll", onScroll);

function onScroll() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    GOTOP.value.style.transform = "scale(1,1)";
  } else {
    GOTOP.value.style.transform = "scale(0,0)";
  }
}
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

function goTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const useroute = useRoute();

watch(
  () => useroute.path,
  () => {
    const currentPath = ref(useroute.path).value;
    setActiveLink(currentPath);
  }
);
function removeActiveNav() {
  document.querySelectorAll("li").forEach((element) => {
    element.classList.remove("active");
  });
}
function setActiveLink(currentPath) {
  switch (currentPath) {
    case "/":
      if (user.value) {
        removeActiveNav();
        document.querySelector(".nav").children[0].classList.add("active");
      }

      break;
    case "/bookmark":
      if (user.value) {
        removeActiveNav();
        document.querySelector(".nav").children[1].classList.add("active");
      }
      break;
    case "/mypage":
      if (user.value) {
        removeActiveNav();
        document.querySelector(".nav").children[2].classList.add("active");
      }
      break;
    case "/createrecipe":
      if (user.value) {
        removeActiveNav();
        document.querySelector(".nav").children[3].classList.add("active");
      }
      break;
    case "/detail":
      showNav.value = false;
      burgerAnim.value = false;
      removeActiveNav();
      break;

    default:
      break;
  }
}
onMounted(() => {
  setActiveLink(ref(useroute.path).value);
});

function handleClick(e, route) {
  if (window.innerWidth < 750) showNav.value = false;
  burgerAnim.value = false;

  router.push(route);
}

const classToggle = ref("");
function toggle() {
  showNav.value = !showNav.value;
  burgerAnim.value = !burgerAnim.value;
}

window.addEventListener("resize", (e) => {
  if (window.innerWidth > 750) {
    showNav.value = false;
    burgerAnim.value = false;
  }
});
</script>
<style>
.show {
  @apply sm:-translate-y-[3px] lg:translate-y-[0];
}
.burgerAnim {
  @apply bg-transparent after:top-[5px] after:-rotate-45 before:top-[5px] before:rotate-45;
}
.active {
  @apply after:right-0 after:visible text-orange-900;
}
</style>
