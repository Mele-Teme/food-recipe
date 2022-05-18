<template>
  <div class="mb-2 full flex justify-center items-center">
    <div
      class="outerCircle w-7 h-7 flex justify-center items-center rounded-full border-4 border-transparent border-t-4 border-t-black border-l-4 border-l-black"
    >
      <div
        class="innerCircle w-4 h-4 border-4 border-transparent border-b-4 border-b-black border-l-4 border-l-black rounded-full"
      ></div>
    </div>
  </div>
</template>
<style>
.innerCircle {
  animation: inner infinite;
  animation-timing-function: linear;
  animation-duration: 1s;
}
.outerCircle {
  animation: outer infinite;
  animation-timing-function: linear;
  animation-duration: 1s;
}
@keyframes outer {
  0% {
    transform: rotate(360deg);
  }
}
@keyframes inner {
  0% {
    transform: rotate(360deg);
  }
}
</style>
