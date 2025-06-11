<script setup>
import { computed, ref } from 'vue'
import { useDocumentStore } from '@/stores/useDocumentStore'
import { useOcrStore } from '@/stores/useOcrStore'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Container from '@/components/Container.vue'
import DocumentUploader from '@/components/DocumentUploader.vue'
import Footer from '@/components/Footer.vue'

const documentStore = useDocumentStore()
const ocrStore = useOcrStore()
const router = useRouter()
const isValid = ref(true)
const loading = ref(false)
const { t } = useI18n()

const handleFooterClick = async () => {
  loading.value = true
  try {
    await ocrStore.recognizeAllDocuments(documentStore)
    if (ocrStore.error) {
      alert(ocrStore.error)
      loading.value = false
      return
    }
    ocrStore.saveToLocalStorage()
    router.push('/data-forms')
  } catch (e) {
    alert(e.message || 'Ошибка при распознавании документов')
  } finally {
    loading.value = false
  }
}

const documents = computed(() => [
  {
    id: 'passport',
    title: t('documents_form.idPassport'),
    fields: ['passport-front-side', 'passport-back-side'],
  },
  {
    id: 'license',
    title: t('documents_form.license'),
    fields: ['license-front-side', 'license-back-side'],
  },
  {
    id: 'certificate',
    title: t('documents_form.certificate'),
    fields: ['certificate-front-side', 'certificate-back-side'],
  },
])

const handleFileChange = (event) => {
  const fieldName = event.target.dataset.name
  const selectedFile = event.target.files?.[0]

  if (selectedFile && !['image/jpeg', 'image/png'].includes(selectedFile.type)) {
    alert('Пожалуйста, загрузите изображение в формате JPEG или PNG.')
    return
  }

  const data = selectedFile
    ? { file: selectedFile, url: URL.createObjectURL(selectedFile) }
    : { file: null, url: null }

  documentStore.updateDocument(fieldName, data)

  documentStore.areMandatoryDocumentsUploaded ? (isValid.value = false) : (isValid.value = true)
}
</script>

<template>
  <section class="passport">
    <Container>
      <h2 class="text-title">{{ t('documents_form.title') }}</h2>

      <DocumentUploader
        v-for="doc in documents"
        :key="doc.id"
        :title="doc.title"
        :fields="doc.fields.map((field) => ({ field, ...documentStore.uploadedDocuments[field] }))"
        @file-change="handleFileChange"
      />

      <div class="passport__bottom">
        <label>
          <input type="checkbox" checked />
          {{t('documents_form.personalData')}}
        </label>
      </div>
      <Footer
        :isValid="!documentStore.areMandatoryDocumentsUploaded || loading"
        @click="handleFooterClick"
        :navigateTo="'/data-forms'"
      />
      <div v-if="loading" class="text-center mt-4">
        <span>{{ t('documents_form.loading') || 'Загрузка...' }}</span>
      </div>
    </Container>
  </section>
</template>


<style lang="scss" scoped>
.passport {
  @apply py-14 pb-[100px];

  &__title {
    @apply text-[#000B16] text-[20px] font-semibold mb-4;
  }

  &__bottom {
    @apply flex flex-col gap-[20px] mt-[60px];

    label {
      @apply flex items-center gap-[14px] text-[11px];
    }

    span {
      @apply text-[#3D9CEC] underline;
    }

    input {
      appearance: none;
      border: 2px solid #005caa;
      width: 20px;
      height: 20px;
      border-radius: 3px;

      &:checked {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23005CAA' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
      }
    }
  }
}
</style>
