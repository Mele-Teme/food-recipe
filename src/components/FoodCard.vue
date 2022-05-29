<template>
  <div class="relative w-full">
    <img
      :src="probs.item.cover_image"
      alt=""
      class="w-full h-36 object-cover object-center rounded-t-lg"
    />
    <span
      class="absolute bottom-0 w-full h-8 bg-white/70 justify-end items-center flex"
    >
      <img src="/src/assets/clock.png" alt="" class="w-6" />
      <span class="mr-3 font-semibold text-slate-800">
        {{ probs.item.time }}
      </span>
    </span>
  </div>
  <div class="w-full flex justify-center flex-col items-center relative">
    <p class="font-bold text-slate-700 w-full truncate group-hover:text-black font-serif text-center">
      {{ probs.item.title }}
    </p>
    <p class="text-center text-sm px-1 h-[55px] text-slate-600 break-all">
      {{ probs.item.description.substring(0, 60) }}
    </p>
    <Review
      :like="probs.item.recipe_like_count"
      :comment="probs.item.recipe_comment_count"
      :rate="item.recipe_rate_count ?? 0"
    />
  </div>
</template>

<script setup>
const probs = defineProps({ item: Object });
</script>
