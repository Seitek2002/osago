<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import cross from '@/assets/icons/cross.vue'
import uploadIcon from '@/assets/icons/upload.vue'

const { t } = useI18n()

const isChange = ref({})

const props = defineProps(['title', 'fields', 'error'])
const emits = defineEmits(['file-change'])

const handleChange = (event) => {
  if (event.target.files.length) {
    emits('file-change', event)
    const fieldName = event.target.dataset.name
    isChange.value[fieldName] = true
  }
}

const handleReset = (field) => {
  // Найти дефолтный url для этого поля
  const def = props.fields.find(f => f.field === field)
  emits('file-change', {
    target: {
      dataset: { name: field },
      files: []
    },
    _reset: true,
    url: def ? def.url : ''
  })
  isChange.value[field] = false
}
</script>

<template>
  <div>
    <h2 class="text-suptitle">{{ title }}</h2>
    <div class="grid grid-cols-2 gap-[12px] mb-[30px]">
      <label
        class="file-upload-container"
        v-for="({ field, url }, i) in fields"
        :key="field"
        :for="field"
      >
        <div class="file-upload-content relative">
          <div v-if="isChange[field]">
            <cross class="absolute top-0 right-0 z-[1] bg-white rounded" @click.stop.prevent="handleReset(field)" />
            <img class="file-upload-image" :src="url" alt="Изображение" />
          </div>
          <div v-else class="relative">
            <uploadIcon
              class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1]"
            />
            <img class="file-upload-image blur-sm" :src="url" alt="Изображение" />
          </div>
        </div>
        <div class="text-center">
          <span class="file-upload-item" v-if="i % 2 === 0">{{
            t('documents_form.frontSide')
          }}</span>
          <span class="file-upload-item" v-else>{{ t('documents_form.backSide') }}</span>
        </div>
        <input
          class="file-upload-input"
          type="file"
          :data-name="field"
          :id="field"
          @change="handleChange"
        />
      </label>
    </div>
    <div v-if="props.error" class="text-red-500 text-center text-[13px] -mt-2 mb-[20px]">
      Ошибка сканирования или загрузки документа
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-suptitle {
  @apply mb-[12px];
}
</style>
