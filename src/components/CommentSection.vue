<template>
<div class="flex justify-center items-center">
<div class="w-full xl:w-3/4 ">
    <h1 class="text-2xl mb-2 ml-2 font-serif text-slate-700 mx-3 px-2">
    Comment
  </h1>
  <div class="flex mx-5 items-center mb-5 space-x-3">
    <textarea
      type="text"
      v-model="comment"
      class="resize-none flex-auto shadow-md w-[60%] px-3 py-1 text-gray-700 bg-white border border-solid border-white rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none placeholder-lime-900 shadow-slate-400"
      placeholder="Leave your comment"
    ></textarea>
    <button
      type="submit"
      @click="sendComment"
      :disabled="butonToggle"
      class="relative h-fit disabled:bg-gray-100 disabled:text-slate-500 w-fit justify-center py-1 px-2 border border-transparent text-sm font-extrabold rounded-md text-white bg-slate-700 hover:bg-zinc-800 hover:text-white focus:outline-none"
    >
      Comment
    </button>
  </div>
  <div class="py-4 w-full">
    <div
      v-for="comment in probs.data"
      :key="comment"
      class="flex mx-4 items-center mb-3"
    >
      <div
        class="w-10 h-10 rounded-full bg-orange-300 shadow-lg flex justify-center items-center"
      >
        <span class="font-semibold text-1xl">{{
          comment.user.name.toUpperCase().charAt(0)
        }}</span>
      </div>
      <div class="ml-2 w-full shadow-xl px-2 py-1">
        <div class="flex flex-col justify-center">
          <span class="text-sm text-orange-700">{{ comment.user.name }}</span>
          <Rate :givenRate="comment.rate" w="small" />
        </div>

        <h1 class="text-sm indent-1">{{ comment.comment }}</h1>
      </div>
    </div>
  </div>
</div>
</div>

 
</template>
<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { addComment } from "../data/qlOperations/mutation";
const route = useRoute();
const recipe_id = route.query.id;
const router = useRouter();
const store = useStore();
const probs = defineProps({ data: Object });
console.log(probs.data);
const butonToggle = ref(true);
const comment = ref("");
const emit = defineEmits(["compose"]);
watch(comment, (value, before) => {
  if (!value.trim()) {
    butonToggle.value = true;
  } else {
    butonToggle.value = false;
  }
});

const { mutate: compose, error } = useMutation(addComment);
function sendComment() {
  if (store.state.user) {
    compose({
      comment: comment.value,
      rid: route.query.id,
      uid: store.state.user.id ?? null,
    })
      .then((result) => {
        comment.value = '';
        emit("compose");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else {
    const confirmationValue = confirm(
      "comment with Account!\nWant to log In?"
    );
    if (confirmationValue) router.push("/login");
  }
}
</script>
