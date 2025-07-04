<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useDocumentStore } from '@/stores/useDocumentStore'
import { useOcrStore } from '@/stores/useOcrStore'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Container from '@/components/Container.vue'
import DocumentUploader from '@/components/DocumentUploader.vue'
import Footer from '@/components/Footer.vue'
import loader from '@/assets/icons/loader.vue'

const documentStore = useDocumentStore()
const ocrStore = useOcrStore()
const router = useRouter()

const showReferalInput = ref(false)
const referalId = ref('')

const idDetails = reactive({
  surname: '',
  name: '',
  patronymic: '',
  inn: '',
  number: '',
  issuer: '',
  issueDate: '',
})

onMounted(() => {
  const id = router.currentRoute.value.params.id
  if (id) {
    referalId.value = id
    showReferalInput.value = true
  }

  // ... (остальной сброс и инициализация)

  // Паспорт
  if (ocrStore.passport) {
    idDetails.surname = ocrStore.passport.surname || ''
    idDetails.name = ocrStore.passport.name || ''
    idDetails.patronymic = ocrStore.passport.patronymic || ''
    idDetails.inn = ocrStore.passport.personalNumber || ''
    idDetails.number = ocrStore.passport.documentNumber || ''
    idDetails.issuer = ocrStore.passport.authority || ''
    idDetails.issueDate = ocrStore.passport.issueDate || ''
  }
})
const personalDataChecked = ref(false)
const isDisabled = computed(
  () =>
    !documentStore.areMandatoryDocumentsUploaded2 || loading.value || !personalDataChecked.value,
)
const loading = ref(false)
const { t } = useI18n()

const handleFooterClick = async () => {
  loading.value = true
  try {
    await ocrStore.recognizeAllDocuments(documentStore)
    if (ocrStore.passportError || ocrStore.vehicleCertError) {
      loading.value = false
      return
    }
    ocrStore.saveToLocalStorage()
    router.push('/data-forms-2')
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
        :error="doc.id === 'passport' ? ocrStore.passportError : ocrStore.vehicleCertError"
        @file-change="handleFileChange"
      />

      <div class="form-group">
        <template v-if="!showReferalInput && !referalId">
          <div
            class="text-blue-500 py-2 rounded mb-2 underline text-[13px]"
            type="button"
            @click="showReferalInput = true"
          >
            Указать ID участника (необязательно)
          </div>
        </template>
        <template v-if="showReferalInput || referalId">
          <label for="referal-id" class="text-suptitle">ID участника команды (необязательно)</label>
          <br />
          <input
            type="text"
            placeholder="Введите ID"
            class="form-input mt-[12px]"
            v-model="referalId"
            id="referal-id"
            :readonly="!!referalId && router.currentRoute.value.params.id"
          />
        </template>
      </div>

      <div class="passport__bottom">
        <label>
          <input type="checkbox" v-model="personalDataChecked" />
          {{ t('documents_form.personalData') }}
        </label>
      </div>
      <Footer :isValid="isDisabled" @click="handleFooterClick" :navigateTo="'/data-forms'" />
      <div
        v-if="loading"
        class="fixed z-[10000] top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      >
        <div class="w-[50%] h-[40%] bg-white flex flex-col items-center justify-center rounded">
          <loader class="w-[150px] h-[150px]" />
          <p class="text-center text-[16px]">Идет сканирование документов</p>
        </div>
      </div>
    </Container>
  </section>
</template>

<style lang="scss">
.passport {
  @apply py-14 pb-[100px];

  .form-input {
    @apply w-full bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
  }

  &__title {
    @apply text-[#000B16] text-[20px] font-semibold mb-4;
  }

  &__bottom {
    @apply flex flex-col gap-[20px] mt-[60px];

    label {
      @apply flex items-center gap-[14px] text-[13px];
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
