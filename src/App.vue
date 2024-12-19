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
</style>
