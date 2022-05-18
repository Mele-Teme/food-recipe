<template>
  <div class="mb-2 relative">
    <input
      type="file"
      accept="image/*"
      class=" bg-white shadow-inner shadow-gray-300 rounded-lg rounded-br-none hover:scale-[1.015] hover:bg-white hover:shadow-xl appearance-none   text-gray-700 outline-none placeholder-gray-500 file:border-none file:bg-lime-800 file:h-full file:text-white  file:p-2  text-sm" multiple={{probs.multiple}}
    />
  </div>
</template>
<script setup>
const probs = defineProps({multiple:Boolean})

</script>