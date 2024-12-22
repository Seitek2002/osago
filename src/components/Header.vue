<template>
  <header class="header" :class="{ service: type }">
    <Container>
      <div class="header__content">
        <headerIcon @click="handleClick" v-if="title !== t('home.title')" />
        <span>{{ title || 'ОСАГО' }}</span>
        <select v-model="lang">
          <option value="ru">RU</option>
          <option value="kg">KG</option>
          <option value="en">ENG</option>
        </select>
      </div>
    </Container>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Container from './Container.vue'
import headerIcon from '@/assets/icons/headerIcon.vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

defineProps(['type', 'title'])

const router = useRouter()

const handleClick = () => {
  router.back()
}

const lang = ref(locale.value)

watch(lang, (newLang) => {
  locale.value = newLang
})
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

  select {
    @apply text-[#000] absolute right-0 top-0;
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
