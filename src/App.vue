<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
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
    <div class="wrapper">
      <Loader v-if="loading" />
      <RouterView v-else />
    </div>
  </component>
</template>

<style lang="scss" scoped>
.wrapper {
  @apply py-[24px];
}
</style>
