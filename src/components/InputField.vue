<template>
  <div class="mb-2 relative">
    <input
      :type="props.type"
      :name="props.name"
      v-model="value"
      class=" bg-white border focus:border-slate-600  rounded-lg hover:scale-[1.015] duration-500 hover:bg-white appearance-none w-full px-3 py-3 text-gray-700 outline-none placeholder-gray-500  text-sm"
      :placeholder="props.placeholder"
    /><span
      class="absolute right-0 bottom-[-17px] bg-white text-red-600 text-sm px-2 rounded-b"
      >{{ errorMessage }}</span
    >
  </div>
</template>
<script setup>
import { computed } from "@vue/runtime-core";
import {useField} from 'vee-validate';

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  placeholder: String,
  error: String,
  modelValue: String,
  name: String,
  type: String,
  required: String,
});
const { value, errorMessage } = useField(props.name);
</script>
