<template lang="">
  <div class="w-full h-full">
    <div
      class="h-40 bg-[url('/src/assets/banner.jpg')] bg-no-repeat bg-cover bg-center"
    >
      <div>
        <div
          class="group shadow-md min-w-min max-w-max px-8 h-24 bg-white/90 m-auto relative -bottom-[105px] flex flex-col items-center justify-center"
        >
          <p class="font-bold text-2xl mb-2 pt-2 text-orange-600 font-serif">
            Your Book Marks
          </p>

          <div
            class="mb-3 w-full pb-2 flex items-center justify-center text-2xl font-serif text-slate-700"
          >
            Total {{ bookmarkCount }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="recipe.length == 0 && !loading"
      class="w-full h-full flex justify-center items-center flex-col mt-14"
    >
      <img
        src="/src/assets/add_bookmark.jpg"
        alt=""
        srcset=""
        class="w-52 h-52"
      />
      <h2 class="font-semibold text-xl text-slate-700">
        Bookmark List Record is Empty
      </h2>
      <p
        class="mt-2 text-md text-slate-700 bg-slate-100 hover:scale-105 duration-300 px-2 py-1 rounded-lg shadow-lg cursor-pointer"
        @click="home"
      >
        Browse Recipe
      </p>
    </div>
    <body class="w-full flex lg:flex-row lg:mt-8 md:flex-col md:mt-10">
      <div
        class="sm:grid sm:grid-cols-2 sm:gap-4 md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-4 xl:grid-cols-5 xl:gap-4 px-4 mt-16 md:mt-5 w-full"
      >
        <div
          v-for="item in recipe"
          :key="item.id"
          class="shadow-lg hover:shadow-xl py-3 flex items-center justify-center flex-col rounded-2xl cursor-pointer hover:scale-105 duration-300 bg-gradient-to-b from-white mb-2"
        >
          <div @click="handleClick(item.id)" class="w-full h-full">
            <FoodCard :item="item" />
          </div>
          <div class="h-[25px] w-full relative mt-1">
            <button
              class="absolute bottom-0 right-0 bg-red-900 text-white px-2"
              @click="removeBookmark(item.id)"
            >
              remove
            </button>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>
<route lang="yaml">
meta:
  layout: navbar
</route>
<script setup>
import { useRouter } from "vue-router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { computed, watchEffect,onMounted } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { bookmarkToggleQL } from "../data/qlOperations/mutation";
import { bookmarkQl } from "../data/qlOperations/query";
const router = useRouter();
const store = useStore();
const bookmarkCount = ref(0);
function handleClick(id) {
  router.push("/detail?id=" + id);
}
function home() {
  router.replace("/");
}
const { mutate: remBookmark } = useMutation(bookmarkToggleQL);
function removeBookmark(id) {
  remBookmark({
    uid: store.state.user?.id ?? null,
    rid: id,
  })
    .then((result) => {
     fetchMore({
       variables:{
  uid: store.state.user?.id ?? null,
}
     })
    })
    .catch((error) => console.log(error));
}

const { result, error, variables, fetchMore, loading } =
  useQuery(bookmarkQl);
variables.value = {
  uid: store.state.user?.id ?? null,
};
onMounted(() => {
  fetchMore({
    variables: {
      uid: store.state.user?.id ?? null,
    },
  });
});
const recipe = computed(() => result.value?.getbookmark ?? []);
watchEffect(() => {
  bookmarkCount.value = recipe.value?.length ?? 0;
  if (error.value?.message?.includes("Could not verify JWT")) {
        fetchMore({
       variables:{
  uid: store.state.user?.id ?? null,
}
     })
  }
});
</script>
<style lang=""></style>
