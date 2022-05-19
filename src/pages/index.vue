<template lang="">
  <div class="w-full h-full relative">
    <div
      class="h-40 bg-[url('/src/assets/banner.jpg')] bg-no-repeat bg-cover bg-center"
    >
      <div
        class="shadow-2xl w-fit px-4 h-24 bg-white/80 m-auto relative -bottom-[114px] flex flex-col items-center justify-center"
      >
        <p class="font-bold text-2xl mb-2 pt-2 font-serif text-slate-800">
          What would you like to cook ?
        </p>

        <div class="mb-3 w-full pb-2 flex items-center">
          <input
            type="search"
            v-model="searchKey"
            class="peer form-control block w-full px-3 py-1 text-base font-normal shadow-lg text-gray-700 bg-white border border-solid border-white rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:border-r-0 focus:outline-none rounded-r-0"
            placeholder="Search Recipe"
          />
          <div class="">
            <select
              v-model="filter"
              class="cursor-pointer rounded-r-lg appearance-none pl-2 py-1 focut:outline-none outline-none bg-slate-800 text-white font-mono border-[1px] border-black pr-2"
            >
              <option value="" disabled>Search By</option>
              <option value="title">Title</option>
              <option value="time">Time</option>
              <option value="ingredient">Ingrediant</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <body class="sm:flex-col sm:mt-14 md:mt-0 w-full flex lg:mt-8 md:flex-col">
      <div
        class="scroll md:flex md:flex-col md:mt-11 ml-2 text-3xl md:p-4 lg:mt-1 mr-6"
      >
        <ul
          class="scroll text-black text-base italic flex gap-3 mt-4 flex-nowrap lg:ml-2 overflow-x-scroll scroll py-2"
        >
          <div>
            <Category name="All Category" @click="changeCat('all')" />
          </div>
          <div v-for="cat in carArray" :key="cat.name">
            <Category :name="cat.name" @click="changeCat(cat.value)" />
          </div>
        </ul>
      </div>

      <div
        v-if="!recipe.length && !loading"
        class="w-full h-full flex justify-center items-center flex-col"
      >
        <img
          src="/src/assets/no_search_result.jpg"
          alt=""
          srcset=""
          class="w-52 h-52"
        />
        <h2 class="font-semibold text-xl">We couldn't found any matches</h2>
        <p>please try another recipe</p>
      </div>
      <div v-if="loading" class="mt-16">
        <Loading />
      </div>
      <div
        v-else
        class="sm:grid sm:grid-cols-2 sm:gap-4 md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-4 xl:grid-cols-5 xl:gap-4 px-4 sm:mt-3"
      >
        <div
          v-for="item in recipe"
          :key="item.id"
          class="shadow-lg hover:shadow-xl py-3 flex items-center justify-center flex-col rounded-2xl cursor-pointer hover:scale-105 duration-300 bg-gradient-to-b from-white mb-2"
          @click="handleClick(item.id)"
        >
          <FoodCard :item="item" />
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
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { carArray } from "../data/chategoryData";
import { recipeQuery } from "../data/qlOperations/query";
const store = useStore();
const router = useRouter();
const filter = ref("");
const searchKey = ref("");
const categoryValue = ref("all");

const { result, error, loading, fetchMore } = useQuery(recipeQuery);
onMounted(() => {
  fetchMore({
    variables: {
      cat: categoryValue.value,
      filter: filter.value == "" ? "title" : filter.value,
      search: "" + searchKey.value,
    },
  });
});
const recipe = computed(() => result.value?.search_recipes ?? []);

watchEffect(() => {
  if (error.value?.message?.includes("Could not verify JWT")) {
    fetchMore({
      variables: {
        cat: _catagory,
        filter: _filter == "" ? "title" : _filter,
        search: "" + _search,
      },
    });
  }
  setVariable(categoryValue.value, filter.value, "" + searchKey.value);
});
function changeCat(value) {
  categoryValue.value = value;
}

function setVariable(_catagory, _filter, _search) {
  fetchMore({
    variables: {
      cat: _catagory,
      filter: _filter == "" ? "title" : _filter,
      search: "" + _search,
    },
  });
}

function handleClick(id) {
  router.push("detail?id=" + id);
}
</script>
<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(82, 80, 80);
}
</style>
