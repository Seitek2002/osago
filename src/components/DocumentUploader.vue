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
      <label class="file-upload-container" v-for="({ field, file, url }, i) in fields" :key="field" :for="field">
        <div class="file-upload-content">
          <img class="file-upload-image" v-if="file" :src="url" alt="Изображение" />
          <template v-else>
            <uploadIcon />
          </template>
        </div>
        <div class="text-center">
          <span class="file-upload-item" v-if="i % 2 === 0">{{ t('documents_form.frontSide') }}</span>
          <span class="file-upload-item" v-else>{{ t('documents_form.backSide') }}</span>
        </div>
        <input class="file-upload-input" type="file" :data-name="field" :id="field" @change="$emit('file-change', $event)" />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
