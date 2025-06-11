<template>
  <footer class="footer">
    <Container>
      <div class="footer__content">
        <button @click="handleClick" :disabled="isValid">
          {{ title || t('btn') }}
        </button>
      </div>
    </Container>
  </footer>
</template>

<script setup>
import Container from './Container.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps(['isValid', 'navigateTo', 'title'])
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.footer {
  @apply fixed bottom-0 left-0 w-full;

  &__content {
    @apply w-full;

    button {
      @apply flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] mb-[16px];

      &:disabled {
        @apply opacity-50 cursor-not-allowed;
      }
    }
  }
}
</style>
