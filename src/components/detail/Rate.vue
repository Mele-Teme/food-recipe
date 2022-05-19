<template>
          <div class="flex">
        <div v-for="star in 5" :key="star">
          <svg
            :class="{ 'fill-orange-700': star <= givenRate , 'w-4':w=='small'}"
            class="w-6 focus:border-none focus:outline-none"
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
</template>

<script setup>
  const probs = defineProps({givenRate:Number, w:String??''})
</script>