<template>
  <div v-if="loading" class="absolute top-1/2 left-1/2 translate-x-1/2">
    <Loading />
  </div>

  <div
    v-else-if="recipeDetail.title"
    class="w-full h-full overflow-x-hidden relative xl:space-x-2 sm:space-y-2"
  >
    <div class="w-full flex flex-col xl:flex-row">
      <div
        class="mt-[50px] sm:flex-col lg:space-x-3 flex md:flex-col mx-3 xl:w-1/2 rounded-lg shadow-lg pb-2 h-fit"
      >
        <div class="w-full h-fit">
          <div v-for="(image,index) in displayImages" :key="image" class="relative full xl:mt-2" :class="{'hidden':index!=currentImageIndex}">
            <img
              :src="displayImages[currentImageIndex]"
              alt=""
              class="w-full h-80 object-cover object-centerz"
            />
            <div
              v-if="displayImages.length > 1"
              class="absolute w-full bottom-0 h-14 flex space-x-10 justify-center"
            >
              <svg
                class="h-12 MuiSvgIcon-root cursor-pointer bg-black/50 rounded-lg fill-white MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ArrowBackIosNewIcon"
                tabindex="-1"
                title="ArrowBackIosNew"
                @click="prev"
              >
                <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z"></path>
              </svg>
              <svg
                class="cursor-pointer h-12 bg-black/50 rounded-lg fill-white MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ArrowForwardIosIcon"
                tabindex="-1"
                title="ArrowForwardIos"
                @click="next"
              >
                <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
              </svg>
            </div>
          </div>
          <div class="w-full h-fit flex items-end justify-end text-sm">
            <div
              class="w-fit flex justify-center items-center shadow-lg px-2 cursor-pointer"
            >
              <svg
                :class="{
                  'fill-slate-600': isBookmarked,
                  'fill-white stroke-black ': !isBookmarked,
                }"
                class="w-9 h-9 p-1 outline-none duration-500 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="BookmarkIcon"
                tabindex="-1"
                title="Bookmark"
                v-on:click="handleBookmark"
              >
                <path
                  d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
                ></path>
              </svg>
              {{ isBookmarked ? "Un-bookmark " : "Save Recipe" }}
            </div>
          </div>
        </div>

        <div class="sm:flex-col flex md:flex-col">
          <h1 class="ml-1 font-bold text-2xl text-slate-700">
            {{ recipeDetail.title }}
            <span class="text-sm text-slate-500"
              >in {{ recipeDetail.time }}</span
            >
          </h1>
          <p class="text-slate-800 shadow-sm w-fit px-3 font-semibold">
            &copy; Recipe by {{ recipeDetail.recipe_owner }}
          </p>
          <p class="text-slate-800 indent-3 text-sm pr-2">
            {{ recipeDetail.description }}
          </p>
          <RateRecipe
            :data="{ title: recipeDetail.title, myRate: myRate, recipeRated }"
            @addRate="refreshReview()"
          />
        </div>

        <div class="flex space-x-3">
          <div class="flex space-x-3">
            <div
              class="like flex justify-center items-center text-gray-600 w-fit mx-auto font-bold py-1 cursor-pointer rounded-2xl ml-5"
              @click="like"
            >
              {{ recipeLikes }}
              <svg
                :class="{
                  'fill-slate-600': isLiked,
                  'fill-white stroke-black': !isLiked,
                }"
                class="outline-none w-6 h-6 ml-1 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ThumbUpAltIcon"
                tabindex="-1"
                title="ThumbUpAlt"
              >
                <path
                  d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"
                ></path>
              </svg>
            </div>
            <div
              class="rounded-2xl flex justify-center items-center text-gray-600 w-fit mx-auto px-4 font-bold py-1"
            >
              {{ recipecomment_count }}
              <img src="/src/assets/card_comment.png" alt="" class="ml-2 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div class="xl:flex xl:flex-col xl:w-1/2 xl:mt-3">
        <ingredient :data="recipeIng" />
        <div class="w-full px-2">
          <h1 class="mt-4 font-bold text-xl mb-4 text-slate-800">
            How to make a
            <span class="text-slate-500">{{ recipeDetail.title }} :</span> Steps
          </h1>
          <div>
            <div
              v-for="item in recipeStep"
              :key="item"
              class="flex items-center shadow-md mb-4 text-sm"
            >
              <h1
                class="font-extrabold text-orange-700 text-5xl mx-5 flex items-baseline"
              >
                S
                <span class="text-2xl text-orange-500">{{
                  recipeStep.indexOf(item) + 1
                }}</span>
              </h1>
              <h1 class="mb-2 pr-2">{{ item }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CommentSection
      :data="commentLs"
      @compose="
        commentFetch({
          variables: {
            rid: recipe_id,
          },
        });
        reviewFetch({
          variables: {
            rid: recipe_id,
            uid: userState.value?.id ?? null,
          },
        });
      "
    />
  </div>
  <div
    v-else-if="!recipeDetail.title"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center flex-col space-y-2"
  >
    <h1 class="font-semibold text-slate-800">
      No Recipe found with id <b>' {{ recipe_id }} '</b>
    </h1>
    <button
      class="bg-slate-300 px-3 rounded-lg py-1 text-sm font-semibold"
      @click="GOHOME"
    >
      Go Home
    </button>
  </div>
</template>
<route lang="yaml">
meta:
  layout: navbar
</route>
<script setup>
import { ref, watchEffect, computed, onMounted } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { bookmarkToggleQL, likeToggleQl } from "../data/qlOperations/mutation";
import {
  detailRecipeQL,
  commentListQl,
  reviewUpdateQl,
} from "../data/qlOperations/query";
const router = useRouter();
const route = useRoute();
const store = useStore();
const recipe_id = route.query.id;
if (recipe_id == null) {
  router.replace("/");
}

const userState = ref(null);
const currentImageIndex = ref(0);
function refreshReview() {
  reviewFetch({
    variables: {
      rid: recipe_id,
      uid: userState.value?.id ?? null,
    },
  });
  commentFetch({
    variables: {
      rid: recipe_id,
    },
  });
}
watchEffect(() => {
  userState.value = store.state.user;
});
const { result, error, variables, loading, fetchMore } =
  useQuery(detailRecipeQL);
variables.value = {
  rid: recipe_id,
};

const recipeDetail = computed(() => result.value?.recipe_detail[0] ?? []);
const recipeRated = ref(0);
const recipeLikes = ref(0);
const recipecomment_count = ref(0);
const recipeMyReview = ref([]);
const recipeIng = ref([]);
const recipeStep = ref([]);
const displayImages = ref([]);
const isLiked = ref(false);
const isBookmarked = ref(false);
const myRate = ref(0);
watchEffect(() => {
  if (error.value?.message?.includes("Could not verify JWT")) {
    fetchMore({
      variables: {
        rid: recipe_id,
      },
    });
  }
  if (recipeDetail.value) {

    recipeIng.value = recipeDetail.value?.ingredients;
    if (recipeIng.value && recipeIng.value.length > 0) {
      recipeIng.value = recipeIng.value[0].ingredient;
    }
    recipeStep.value = recipeDetail.value?.steps;
    if (recipeStep.value && recipeStep.value.length > 0) {
      recipeStep.value = recipeStep.value[0].step;
    }
  }
      if (recipeDetail.value?.cover_image) {
      displayImages.value.push(recipeDetail.value?.cover_image);

      const images = recipeDetail.value?.images[0]?.image ?? [];

      images.forEach((img) => {
        displayImages.value.push(img);
      });
    }
});

const {
  result: reviewResult,
  variables: reviewVar,
  error: revError,
  fetchMore: reviewFetch,
} = useQuery(reviewUpdateQl);
reviewVar.value = {
  rid: recipe_id,
  uid: userState.value?.id ?? null,
};

const revResult = computed(() => reviewResult.value?.recipes_by_pk ?? []);
watchEffect(() => {
  if (revError.value?.message?.includes("Could not verify JWT")) {
    reviewFetch({
      variables: {
        rid: recipe_id,
        uid: userState.value?.id ?? null,
      },
    });
  }
  if (revResult.value) {
    isBookmarked.value = revResult.value?.is_bookamrked ?? false;
    recipeRated.value = revResult.value?.recipe_rate_count??0;
    recipeLikes.value = revResult.value?.recipe_like_count??0;
    recipecomment_count.value = revResult.value?.recipe_comment_count;
    recipeMyReview.value = revResult.value?.get_my_review;
    if (recipeMyReview.value && recipeMyReview.value.length > 0) {
      myRate.value = recipeMyReview.value[0].rate;
      isLiked.value = recipeMyReview.value[0].liked;
    }
  }
});

const { mutate: ToggleBookmark, error: bookError } = useMutation(
  bookmarkToggleQL,
  {
    variables: {
      rid: recipe_id,
      uid: store.state.user?.id ?? null,
    },
  }
);
function GOHOME() {
  router.replace("/");
}
function handleBookmark() {
  if (userState.value) {
    ToggleBookmark()
      .then((result) => {
        reviewFetch({
          variables: {
            rid: recipe_id,
            uid: userState.value?.id ?? null,
          },
        });
        isBookmarked.value = !isBookmarked.value;
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    const confirmationValue = confirm(
      "bookmark for Authenticated user only!\nWant to log In?"
    );
    if (confirmationValue) router.push("/login");
  }
}

const { mutate: ToggleLike, error: likeError } = useMutation(likeToggleQl, {
  variables: {
    rid: recipe_id,
    uid: store.state.user?.id ?? null,
  },
});

function like() {
  if (userState.value) {
    ToggleLike()
      .then((result) => {
        isLiked.value = !isLiked.value;
        reviewFetch({
          variables: {
            rid: recipe_id,
            uid: userState.value?.id ?? null,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    const confirmationValue = confirm(
      "in order to give Review you must log in!\nWant to log In?"
    );
    if (confirmationValue) router.push("/login");
  }
}

const {
  result: commentLst,
  error: commentError,
  variables: commentVariables,
  fetchMore: commentFetch,
} = useQuery(commentListQl);

commentVariables.value = {
  rid: recipe_id,
};

const commentLs = computed(() => commentLst.value?.get_review ?? []);

watchEffect(() => {
  if (commentError.value?.message?.includes("Could not verify JWT")) {
    commentFetch({
      variables: {
        rid: recipe_id,
      },
    });
  }
});

function next() {
  if (currentImageIndex.value < displayImages.value.length - 1) {
    currentImageIndex.value = currentImageIndex.value + 1;
  }
}

function prev() {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value = currentImageIndex.value - 1;
  }
}
onMounted(() => {
  commentFetch({
    variables: {
      rid: recipe_id,
    },
  });
  
  reviewFetch({
    variables: {
      rid: recipe_id,
      uid: userState.value?.id ?? null,
    },
  });
});
</script>
<style></style>
