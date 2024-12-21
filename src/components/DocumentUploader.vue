<script setup>
import uploadIcon from '@/assets/icons/upload.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps(['title', 'fields'])
defineEmits(['file-change'])
</script>

<template>
  <div>
    <h2 class="text-suptitle">{{ title }}</h2>
    <div class="grid grid-cols-2 gap-[12px] mb-[30px]">
      <label v-for="({ field, file, url }, i) in fields" :key="field" :for="field">
        <div class="content">
          <img v-if="file" :src="url" alt="Изображение" />
          <template v-else>
            <uploadIcon />
          </template>
        </div>
        <div class="text-center">
          <span v-if="i % 2 === 0">{{ t('documents_form.frontSide') }}</span>
          <span v-else>{{ t('documents_form.backSide') }}</span>
        </div>
        <input type="file" :data-name="field" :id="field" @change="$emit('file-change', $event)" />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
span {
  @apply mt-[10px] text-[12px];
}

label {
  @apply bg-[#F7F8FA] h-[101px] border-[3px] border-dashed rounded-[4px] sm:h-[200px];

  input[type='file'] {
    @apply hidden;
  }

  .content {
    @apply flex flex-col items-center justify-center w-full h-full;

    img {
      @apply max-w-full max-h-full object-contain;
    }
  }
}
</style>
