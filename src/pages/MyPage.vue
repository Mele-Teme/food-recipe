<template lang="">
  <div class="w-full h-full relative">
    <div
      class="relative h-40 w-full bg-[url('src/assets/banner.jpg')] bg-no-repeat bg-cover bg-center"
    >
      <div class="h-full">
        <span
          class="min-w-fit h-fit px-4 py-1 flex justify-center items-center text-2xl absolute text-black font-bold bg-white/90 bottom-[calc(0px-4rem)] shadow-xl rounded-md left-[calc(50%)] -translate-x-[50%] z-10 border-b-2 border-black cursor-pointer font-serif"
        >
          <div class="flex flex-col justify-center items-center">
            <span
              class="w-14 h-14 flex justify-center items-center text-center bg-slate-200 shadow-gray-500 shadow-md rounded-full text-black"
              >{{ user?.name.toUpperCase().charAt(0) }}</span
            >
            <span class="text-md font-normal text2xl text-slate-600">{{
              user?.name
            }}</span>
            <span class="text-md font-normal text2xl text-slate-700">{{
              user?.email
            }}</span>
          </div>
        </span>
      </div>
    </div>
    <div class="mt-[75px]">
      <h1 class="text-4xl text-slate-700 mb-3 font-serif text-left px-3">
        My Recipe
      </h1>
      <div
        v-if="recipe.length == 0"
        class="w-full h-full flex justify-center items-center flex-col"
      >
        <img
          src="/src/assets/add_recipe1.png"
          alt=""
          srcset=""
          class="w-60 object-cover"
        />
        <h2 class="font-semibold text-xl text-slate-500">
          You don't have any Recipe
        </h2>
        <button
          class="mt-2 text-md text-slate-700 bg-slate-100 hover:scale-105 duration-300 px-2 py-1 rounded-lg shadow-lg cursor-pointer"
          @click="goCreate"
        >
          create recipe
        </button>
      </div>
      <div
        v-else
        class="sm:grid sm:grid-cols-2 sm:gap-4 md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-4 xl:grid-cols-5 xl:gap-4 px-4"
      >
        <div
          v-for="item in recipe"
          :key="item.id"
          class="shadow-lg hover:shadow-xl py-3 flex items-center justify-center flex-col rounded-2xl cursor-pointer hover:scale-105 duration-300 bg-gradient-to-b from-white mb-2"
          @click="detail"
        >
          <div @click="handleClick(item.id)" class="w-full h-full">
            <FoodCard :item="item" />
          </div>

          <div class="h-[25px] w-full relative mt-1">
            <button
              class="absolute bottom-0 right-0 bg-red-900 text-white px-2"
              @click="deleteRecipe(item.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: navbar
</route>
<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { myRecip } from "../data/qlOperations/query";
import { deleteRecipeQl } from "../data/qlOperations/mutation";

const showError = ref(false);
const store = useStore();
const user = computed(() => store.state.user);
const router = useRouter();
function goCreate() {
  router.replace("/createrecipe");
}
function handleClick(id) {
  router.push("/detail?id="+id);
}

const { result, error, variables, refetch } = useQuery(myRecip);
variables.value = {
  uid: store.state.user?.id ?? null,
};
watchEffect(() => {
  if (error.value?.message?.includes("Could not verify JWT")) {
    refetch();
  }
});
const recipe = computed(() => result.value?.my_recipe ?? []);
const { mutate: deletRec } = useMutation(deleteRecipeQl);
function deleteRecipe(id) {
  deletRec({
    rid: id,
  })
    .then((result) => {
      refetch();
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
<style>
.toggle {
  @apply translate-x-0 h-fit;
}
</style>
