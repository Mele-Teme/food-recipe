<template>
  <div class="w-full h-fit flex justify-evenly items-center">
    <div class="flex justify-center items-center space-x-1">
      <span class="text-gray-500">{{ probs.rate }} </span>
      <img src="/src/assets/fav.png" alt="" class="w-5 h-5" />
    </div>
    <div class="flex justify-center items-center space-x-1">
      <span class="flex justify-center items-center text-gray-500"
        >{{ probs.like }}
      </span>
      <img src="/src/assets/card_like.png" alt="" class="w-5 h-5" />
    </div>
    <div class="flex justify-center items-center space-x-1">
      <span class="flex justify-center items-center text-gray-500"
        >{{ probs.comment }}
      </span>
      <img src="/src/assets/card_comment.png" alt="" class="w-5 h-5" />
    </div>
  </div>
</template>
<script setup>
const probs = defineProps({ like: Number, comment: Number, rate: Number });
</script>
