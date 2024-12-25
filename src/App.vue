<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import Loader from "@/components/Loader.vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ServicesLayout from "@/layouts/ServicesLayout.vue";

const route = useRoute();
const router = useRouter();
const loading = ref(false);

const layout = computed(() => route.meta.layout || DefaultLayout);

router.beforeEach(() => {
  loading.value = true;
});

router.afterEach(() => {
  loading.value = false;
});
</script>

<template>
  <component :is="layout">
    <Loader v-if="loading" />
    <RouterView v-else />
  </component>
</template>

<style lang="scss">
.text-title {
  @apply text-[20px] font-semibold mb-4;
}

.text-suptitle {
  @apply text-[16px] font-semibold;
}

//dropdownDetail
.dropdown__detail {
  @apply flex flex-col gap-[6px];
}

.litle-title {
  @apply text-[#2D465B] opacity-60 text-[12px];
}

.litle-input {
  @apply text-[#2D465B] text-[15px] rounded-[5px] pl-[5px];
}

//dropdown
.dropdown-container {
  @apply relative w-full;
}

.dropdown-button {
  @apply w-full relative bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
}

.dropdown-icon {
  @apply absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none;
}

.dropdown-menu {
  @apply z-10 mt-1 w-full bg-[#F7F8FA] shadow-lg max-h-60 rounded-md p-2 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm;
}

.dropdown-item {
  @apply text-gray-900 rounded-md cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-white;
}


//DocumentUploader
.file-upload-container {
  @apply bg-[#F7F8FA] h-[101px] border-[3px] border-dashed rounded-[4px] sm:h-[200px];
}

.file-upload-item {
  @apply mt-[10px] text-[12px];
}

.file-upload-input[type='file'] {
  @apply hidden;
}

.file-upload-content {
  @apply flex flex-col items-center justify-center w-full h-full;
}

.file-upload-image {
  @apply max-w-full max-h-full object-contain;
}

</style>
