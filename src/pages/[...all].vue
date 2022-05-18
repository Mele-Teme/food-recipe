<template>
<div class="h-screen w-full">
   <div class="my-auto flex flex-col justify-center items-center h-full">
       <img src="/src/assets/pageError.png" class="w-52 h-52" alt="" srcset="">
        <h1 class="text-center text-3xl font-bold">Oups ! Page Not Found</h1>
        <button class="border-4 border-black rounded-md mt-10 px-5 py-2 hover:bg-black hover:text-white font-semibold" @click="backHome">Back To Home</button>
    </div>
</div>
    
</template>
<script setup>
   import {useRouter} from 'vue-router'
   const router = useRouter();
   function backHome(){
     router.replace('/')
   }
</script>