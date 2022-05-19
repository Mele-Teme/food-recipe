<template>
  <div class="rate flex">
    <div class="relative flex w-1/2 justify-center items-center my-3 flex-col">
      <Rate :givenRate="probs.data.recipeRated" />
      <div class="text-slate-600 text-sm">
        <b>{{ probs.data.title }} </b> rated <b>{{ probs.data.recipeRated }}</b>  star
      </div>
    </div>
    <div class="relative flex w-1/2 justify-center items-center my-3 flex-col">
      <div class="flex">
        <div
          v-for="star in rateStarts"
          :key="star.id"
          @click="rate(rateStarts.indexOf(star))"
        >
          <svg
            :class="{ 'fill-orange-600': star.check }"
            class="w-6 h-6 focus:border-none focus:outline-none"
            focusable="false"
            aria-hidden="true"
            stroke-width="2"
            viewBox="0 0 24 24"
            data-testid="LocalDiningIcon"
            tabindex="-1"
            title="StarBorder"
          >
            <path
              d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            ></path>
          </svg>
        </div>
      </div>
      <button
        class="hover:border-b disabled:text-slate-300 hover:shadow-lg border-slate-700 text-sm"
        @click="rateRecipe" :disabled="!toggleButton"
      >
        <span v-if="rateStatus"> change Rate </span>
        <span v-else>Rate Recipe</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { rateRecipeQl } from "../../data/qlOperations/mutation";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const probs = defineProps({ data: Object });
const rateGiven = ref(0);

const emit = defineEmits(["addRate"]);
const { mutate: addRate, error } = useMutation(rateRecipeQl);
function rateRecipe() {
  if (store.state.user) {
    rateGiven.value = 0;
    for (var i = 0; i < rateStarts.value.length; i++) {
      if (rateStarts.value[i].check) {
        rateGiven.value++;
      }
    }
  
    addRate({
      uid: store.state.user?.id ?? null,
      rid: route.query.id,
      rateVal: rateGiven.value,
    })
      .then((res) => {
        emit("addRate");
      })
      .catch((error) => {
        console.log("error", error);
      });
  } else {
    const confirmationValue = confirm(
      "in order to give Review you must log in!\nWant to log In?"
    );
    if (confirmationValue) router.push("/login");
  }
}
const rateStarts = ref([]);
const rateStatus = ref(false);
watchEffect(() => {
  rateStarts.value = [];

  for (var x = 0; x < 5; x++) {
    if (x < probs.data.myRate) {
      rateStatus.value = true;
      rateStarts.value.push({ check: true, id: x });
    } else {
      rateStarts.value.push({ check: false, id: x });
    }
  }
});
const toggleButton = ref(false);
function rate(index) {
  toggleButton.value = true;
  for (var x = 0; x < 5; x++) {
    if (x < index + 1) {
      rateStarts.value[x].check = true;
    } else {
      rateStarts.value[x].check = false;
    }
  }
}
</script>
