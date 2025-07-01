<template>
  <header class="header" :class="{ service: type }">
    <Container>
      <div class="header__content">
        <headerIcon @click="handleClick" v-if="title !== t('home.title')" />
        <span :style="{ paddingRight: title ? '50px' : '' }">{{ title || 'ОСАГО' }}</span>
        <span
          class="lang-switch"
          :style="{
            color: '#000',
            position: 'absolute',
            right: '-10px',
            top: 0,
            cursor: 'pointer',
            background: 'white',
            padding: '0 10px'
          }"
          @click="toggleLang"
        >
          {{ lang === 'kg' ? 'Русский' : 'Кыргызча' }}
        </span>
      </div>
    </Container>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Container from './Container.vue'
import headerIcon from '@/assets/icons/headerIcon.vue'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();

defineProps(['type', 'title'])

const router = useRouter()

const handleClick = () => {
  router.back()
}

const savedLang = localStorage.getItem('lang');
const lang = ref(savedLang || locale.value);
locale.value = lang.value;

function toggleLang() {
  const newLang = lang.value === 'kg' ? 'ru' : 'kg';
  localStorage.setItem('lang', newLang);
  lang.value = newLang;
  locale.value = newLang;
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

  .lang-switch {
    /* Стили заданы инлайн */
  }
}

.header {
  &.service {
    @apply text-[#191D23] bg-white;
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
