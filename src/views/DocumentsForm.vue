<script setup>
import { ref } from 'vue'
import { useDocumentStore } from '@/stores/useDocumentStore'

import Container from '@/components/Container.vue'
import DocumentUploader from '@/components/DocumentUploader.vue'
import Footer from '@/components/Footer.vue'

const documentStore = useDocumentStore()
const isValid = ref(true)

const documents = [
  { id: 'passport', title: 'ID паспорт', fields: ['passport-front-side', 'passport-back-side'] },
  {
    id: 'license',
    title: 'Водительское удостоверение',
    fields: ['license-front-side', 'license-back-side'],
  },
  {
    id: 'certificate',
    title: 'Свидетельство о регистрации ТС',
    fields: ['certificate-front-side', 'certificate-back-side'],
  },
]

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

  // Обновляем данные в store
  documentStore.updateDocument(fieldName, data)

  // Проводим валидацию
  documentStore.areMandatoryDocumentsUploaded ? (isValid.value = false) : (isValid.value = true)
}
</script>

<template>
  <section class="passport">
    <Container>
      <h2 class="passport__title">Загрузка документов</h2>

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
          Я соглашаюсь на сбор и обработку моих персональных данных.
        </label>
        <!-- <label>
          <input type="checkbox" checked />
          Я согласен с <span>Правилами</span>
        </label> -->
      </div>
      <Footer :isValid="false" navigateTo="/data-forms" />
    </Container>
  </section>
</template>

<style lang="scss">
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
