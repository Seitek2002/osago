<template>
  <header class="header" :class="{ service: type }">
    <Container>
      <div class="header__content">
        <headerIcon @click="handleClick" />
        <span>{{ title || 'ОСАГО' }}</span>
      </div>
    </Container>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Container from './Container.vue'
import headerIcon from '@/assets/icons/headerIcon.vue'

defineProps(['type', 'title'])

const router = useRouter()

const handleClick = () => {
  router.back()
}
</script>

<style lang="scss">
.header {
  @apply fixed top-0 left-0 w-full py-[16px] z-20 text-[#fff];

  &__content {
    @apply relative flex justify-center;

    svg {
      @apply absolute top-0 left-0 cursor-pointer;

      path {
        @apply fill-[#fff];
      }
    }

    span {
      @apply text-[16px];
    }
  }
}

.header {
  &.service {
    @apply text-[#191D23];
  }

  &.service &__content {
    svg {
      path {
        @apply fill-[#040D1C];
      }
    }

    span {
      @apply text-[16px];
    }
  }
}
</style>
