<template>
  <li
    @click="handleClick($event)"
    :class="{
      active_cat: activeCat === probs.name,
    }"
    class="catagory whitespace-nowrap hover:bg-slate-800 duration-200 relative cursor-pointer px-2 rounded hover:text-white text-slate-900 font-semibold py-1"
  >
    {{ probs.name }}
  </li>
</template>
<script setup>
import { ref } from "vue";
const probs = defineProps({ name: String, amount: String });
const activeCat = ref("All Category");
function handleClick(e) {
  document.querySelectorAll(".catagory").forEach((element) => {
    element.classList.remove("active_cat");
  });
  e.target.classList.add("active_cat");
}
</script>

<style>
.active_cat {
  @apply bg-slate-800 text-white;
}
</style>
