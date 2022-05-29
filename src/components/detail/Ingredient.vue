<template>
  <div
    class="mx-3 rounded-2xl shadow-md  shadow-gray-300 xl:h-fit py-2 xl:mt-10"
  >
        <h2
          class="w-fit mb-2 text-center font-bold text-xl text-slate-700 p-1 px-2 rounded-lg"
        >
          Ingrediants :
        </h2>
      <div class="w-full flex sm:flex-col text-slate-800">
        <div
          v-for="item in probs.data"
          :key="item"
          class="flex items-center ml-5 py-1 text-sm"
        >
          <svg class="w-6 h-6 fill-orange-700 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckCircleOutlineIcon" tabindex="-1" title="CheckCircleOutline"><path d="M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
          <div class="flex ">
            <p class="ml-1  break-all">
              {{ item}}
            </p>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
const probs = defineProps({ data: Object });

</script>
