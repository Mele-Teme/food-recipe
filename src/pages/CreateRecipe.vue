<template>
  <div
    class="relative h-40 w-full bg-[url('/src/assets/banner.jpg')] bg-no-repeat bg-cover bg-center"
  ></div>
  <div
    class="flex overflow-hidden w-full py-3 justify-center items-center bg-gray-50"
  >
    <div class="w-[95%] rounded-xl">
      <h1 class="text-center text-4xl text-slate-600 font-semibold mb-2">
        Create Recipe
      </h1>
      <form
        @submit.prevent="submit"
        class="rounded-xl shadow-md shadow-black/50 py-4 px-2 overflow-hidden bg-slate-50"
      >
        <div
          class="lg:grid lg:grid-cols-2 lg:gap-x-10 lg:justify-between items-start lg:w-full justify-center"
        >
          <InputField
            placeholder="Food Name"
            name="foodName"
            class="mb-5 w-full"
          />
          <div class="flex">
            <InputField
              placeholder="Time it takes"
              name="time"
              type="number"
              class="mb-5 w-full"
            />
            
            <select
              name=""
              id=""
              v-model="timeUnit"
              class="h-fit py-2 mt-1 ml-4 rounded-lg px-2 outline-none"
            >
              <option value="min">min</option>
              <option value="hr">hour</option>
            </select>
          </div>

          <div class="relative mb-4 w-full">
            <textarea
            rows="4"
              class="resize-none border focus:border-slate-600 text-sm duration-500 lg:w-full hover:scale-[1.015] appearance-none w-full px-3 py-2 text-gray-700 outline-none hover:bg-white placeholder-gray-500 bg-white rounded-xl"
              placeholder="Discription"
              v-model="descValue"
              name="desc"
            ></textarea>
            <span
              class="absolute right-0 bottom-[-10px] bg-white text-red-600 text-sm px-2 rounded-b"
              >{{ descError }}</span
            >
          </div>
          <div class="w-full relative mb-4">
            <span class="text-slate-700 pl-2 font-bold mt-1 block font-serif"
              >Category</span
            >
            <select
              name="catagory"
              id=""
              v-model="catValue"
              class="hover:scale-[1.015] w-full py-3 duration-500 border pl-2 bg-white rounded-xl hover:bg-white focut:outline-none outline-none text-gray-500"
            > 
              <option
                v-for="cat in carArray"
                :key="cat.name"
                :value="cat.value"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="w-full">
            <span
              class="text-slate-700 pl-2 font-bold mt-1 block font-serif mb-1"
              >Choose Images
              <span class="text-sm font-normal">and select featured</span>
            </span>

            <div class="mb-2 relative">
              <input
                type="file"
                accept="image/*"
                name="image"
                @change="multChange($event)"
                class="bg-white w-full border rounded-lg hover:scale-[1.015] hover:bg-white appearance-none text-gray-700 outline-none placeholder-gray-500 file:border-none file:h-full file:py-3 file:text-black file:p-2 pr-3 font-mono text-sm"
                multiple
              />
              <div class="flex mt-2 flex-wrap gap-y-3">
                <div
                  v-for="(item, index) in multSrc"
                  :key="item"
                  class="flex relative mr-3"
                  @click="selectedImage = index"
                >
                  <img
                    class="w-16 h-16 object-cover rounded-lg"
                    :src="item"
                    ref="coverImage"
                  />

                  <input
                    type="radio"
                    name="radio"
                    :value="index"
                    class="invisible absolute left-0 top-0 peer"
                    v-model="selectedImage"
                  />
                  <div
                    class="w-full h-full bg-black/40 absolute top-0 left-0 mr-3 rounded-lg invisible peer-checked:visible border-y-2 border-white shadow-xl"
                  >
                    <img
                      src="/src/assets/selectedImage.png"
                      class="absolute bottom-0 right-0 w-8 h-8 object-cover object-center"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="ImageError"
                class="absolute -bottom-2 right-2 bg-white text-sm text-red-600 px-5"
              >
                {{ ImageError }}
              </div>
            </div>
          </div>
          <div class="py-4 w-full">
            <div class="flex justify-between relative">
              <InputField
                placeholder="Ingrediant with Amount"
                name="ingredient"
                required="true"
                class="w-full mb-5"
              />
              <span
                @click="addIngrediant"
                class="w-[100px] ml-2 mt-2 h-fit flex justify-center items-center px-1 py-1 border-2 border-slate-500 text-black font-mono cursor-pointer text-sm"
                >Add Ing</span
              >
            </div>

            <span
              v-if="formIngrediant.length > 0"
              class="ml-2 border-2 border-black hover:bg-black hover:text-white text-slate-800 cursor-pointer font-semibold px-3 py-1 text-sm mb-5 block w-fit"
              @click="showIng"
              >{{ ingredientShowHide }}</span
            >
            <div
              v-if="showIngredient && formIngrediant.length > 0"
              class="flex flex-col my-2 text-sm"
            >
              <div
                v-for="ingredient in formIngrediant"
                :key="ingredient"
                class="pl-3 py-2 shadow-gray-400 shadow-sm pr-1 flex ml-2 mt-2 mr-24"
              >
                <span class="text-gray-700 w-[90%] text-md">
                  of
                  {{
                    ingredient.length > 50
                      ? ingredient.substring(0, 50) + "..."
                      : ingredient
                  }}</span
                >
                <img
                  src="/src/assets/delete.png"
                  alt=""
                  class="w-7 h-7 ml-1 cursor-pointer"
                  @click="removeIngredient(ingredient)"
                />
              </div>
            </div>

            <div class="flex justify-between relative">
              <InputField placeholder="Steps" name="step" class="mb-5 w-full" />
              <span
                @click="addStep"
                class="w-[100px] ml-2 mt-2 h-fit flex justify-center items-center px-1 py-1 border-2 border-slate-500 text-black font-mono cursor-pointer text-sm"
                >Add Step</span
              >
            </div>

            <span
              v-if="formStep.length > 0"
              class="ml-2 border-2 border-black hover:bg-black hover:text-white text-slate-800 cursor-pointer font-semibold px-3 py-1 text-sm mb-5"
              @click="showSteps"
              >{{ stepShowHide }}</span
            >
            <div
              v-if="showStep && formStep.length > 0"
              class="flex flex-col my-2 text-sm"
            >
              <div
                v-for="step in formStep"
                :key="step"
                class="pl-3 py-2 shadow-gray-400 shadow-sm pr-1 flex ml-2 mt-2 mr-24"
              >
                <span class="text-gray-700 w-[90%] text-lg">{{
                  step.length > 50 ? step.substring(0, 50) + "..." : step
                }}</span>
                <img
                  src="/src/assets/delete.png"
                  alt=""
                  class="w-7 h-7 ml-1 cursor-pointer"
                  @click="removeStep(step)"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="space-x-4 flex justify-center items-center">
          <Loading />
          <span class="font-mono">Working on your request</span>
        </div>
        <div v-if="createResult" class="flex justify-center items-center">
          <span class="mb-2 font-semibold">{{ createResult }}</span>
        </div>
        <div class="flex justify-evenly w-full">
          <button
            class="bg-gray-600 hover:bg-gray-700 disabled:bg-slate-400 text-white px-10 py-2 rounded-md shadow-xl"
            :disabled="loading"
          >
            create Recipe
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: navbar
</route>
<script setup>
import { ref, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { useMutation } from "@vue/apollo-composable";
import store from "../store/store";
import { carArray } from "../data/chategoryData";
import { add_recipeQl } from "../data/qlOperations/mutation";
import axios from '../axios/axiosConfig'
const loading = ref(false);
const createResult = ref("");
watch(createResult, (value, prev) => {
  if (value) {
    setTimeout(() => {
      createResult.value = "";
    }, 5000);
  }
});

const timeUnit = ref("min");
const selectedImage = ref(0);
const multSrc = ref([]);
const multiSrcFileName = ref([]);
const ImageError = ref("");
const featuredImage = ref("");
const multipleImageLink = ref([]);
const multChange = (e) => {
  ImageError.value = "";
  selectedImage.value = 0;
  multSrc.value = [];
  multiSrcFileName.value = [];
  const files = [...e.target.files];

  files.forEach((file) => {
    multiSrcFileName.value.push(file.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (e) => {
      multSrc.value.push(e.target.result);
    });
  });
};

const schema = {
  foodName(value) {
    if (!value) {
      return "Food Name is not Filled";
    } else if (value.length < 3) {
      return "Food Name to short";
    }
    return true;
  },
  time(value) {
    if (!value) {
      return "Time to Cook is not Filld";
    } else if (value > 120) {
      return "Time to long";
    }
    return true;
  },
  desc(value) {
    if (!value ) {
      return "Discription About Food is not Filled";
    } else if (value.length < 10) {
      return "Discription to short";
    }
    return true;
  },

  ingredient(value) {
      if(!value && formIngrediant.value.length<1){
           return "ingredient required";
      }
    if (value.length < 5 && formIngrediant.value.length<1) {
      return "ingredient too short";
    }
    return true;
  },
  step(value) {
      if (!value && formStep.value.length<1) {
        return "step required";
      }
    if (value.length < 5 && formStep.value.length<1) {
      return "step too short";
    }
    return true;
  },
};
const { handleSubmit ,resetForm} = useForm({
  validationSchema: schema,
});
const { value: descValue, errorMessage: descError } = useField("desc");
const { value: imageValue, errorMessage: imageError } = useField("image");
const { value: ingValue, errorMessage: ingError } = useField("ingredient");
const { value: stepValue, errorMessage: stepError } = useField("step");

const { value: catValue } = useField("catagory");
catValue.value = "Breakfast";

const catagory = ref("Catagory");

const toggle = ref(false);
const formIngrediant = ref([]);
const formStep = ref([]);
function addIngrediant() {
  if (ingValue.value && ingError.value != "ingredient too short") {
    formIngrediant.value.push(ingValue.value);
    ingValue.value = "";
  }
}
function addStep() {
  if (stepValue.value && stepError.value != "step too short") {
    formStep.value.push(stepValue.value);
    stepValue.value = "";
  }
}
function removeIngredient(name) {
  formIngrediant.value = formIngrediant.value.filter(
    (ingredient) => ingredient !== name
  );
}
function removeStep(name) {
  formStep.value = formStep.value.filter((step) => step !== name);
}
const { mutate: create_recipe } = useMutation(add_recipeQl);
const submit = handleSubmit(
  async (value) => {
    loading.value = true;
    if (ingValue.value) {
      formIngrediant.value.push(ingValue.value);
    }
    if (stepValue.value) {
      formStep.value.push(stepValue.value);
    }
    await convertImageToUrl();
    create_recipe({
      title: value.foodName,
      desc: value.desc,
      cover: featuredImage.value,
      cat: value.catagory,
      time: value.time + timeUnit.value,
      images: multipleImageLink.value.join(",,,,,"),
      ings: formIngrediant.value.join(",,,,,"),
      steps: formStep.value.join(",,,,,"),
      uid: store.state.user.id,
    })
      .then((result) => {
        resetForm();
        formIngrediant.value = []
        formStep.value = []
        loading.value = false;
        createResult.value = "Recipe created Succesfully";
      })
      .catch((error) => {
        loading.value = false;
        createResult.value = "Something went wrong ! please try again";
      });
  },
  (error) => {
    if (multSrc.value.length < 1) {
      ImageError.value = "Please add Image";
      return;
    }
  }
);

const showIngredient = ref(false);
const ingredientShowHide = ref("Show");
const showStep = ref(false);
const stepShowHide = ref("Show");

watch(formIngrediant, (value, prev) => {
  if (value == 0) {
    showIngredient.value = false;
    ingredientShowHide.value = "Show";
  }
});
watch(formStep, (value, prev) => {
  if (value == 0) {
    showStep.value = false;
    stepShowHide.value = "Show";
  }
});

function showIng() {
  if (!showIngredient.value) {
    ingredientShowHide.value = "Hide";
  } else {
    ingredientShowHide.value = "Show";
  }
  showIngredient.value = !showIngredient.value;
}
function showSteps() {
  if (!showStep.value) {
    stepShowHide.value = "Hide";
  } else {
    stepShowHide.value = "Show";
  }
  showStep.value = !showStep.value;
}
async function convertImageToUrl (){
  for (let index = 0; index < multSrc.value.length; index++) {
    await axios
      .post("/imgUrl", {
        fname: multiSrcFileName.value[index],
        fstr64: multSrc.value[index].split(",")[1],
      })
      .then((res) => {
        if (index == selectedImage.value) featuredImage.value = res.data.imgUrl;
        else multipleImageLink.value.push(res.data.imgUrl);
      });
  }
}
</script>
<style></style>
