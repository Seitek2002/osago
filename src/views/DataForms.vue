<template>
  <section class="form-section">
    <Container>
      <div class="form-section__content">
        <h2 class="text-title">Проверка данных</h2>

        <div class="form-group">
          <label class="text-suptitle"> Номер телефона </label>
          <input
            type="text"
            placeholder="+996 (502) 235-509"
            :value="formData.phone"
            class="form-input mt-[12px]"
            v-mask="'+996 (###) ###-###'"
          />
        </div>

        <h3 class="text-suptitle">Цель использования ТС <span>*</span></h3>
        <Dropdown
          v-model="formData.purpose"
          :options="purposeOptions"
          placeholder="Для личных целей"
        />

        <div class="form-group">
          <label class="text-suptitle mb-[12px] block" for="address"> Адрес фактического проживания </label>
          <textarea class="form-input" :value="formData.address" id="address"></textarea>
        </div>

        <!-- <FormInput
          v-model="formData.phone"
          label="Номер телефона"
          placeholder="+996-555-123-123"
          id="phoneNumber"
          v-mask="'+996 (###) ###-##-##'"
        /> -->

        <Dropdown v-model="formData.passport" placeholder="Данные с ID паспорта">
          <template #content>
            <div>
              <DropdownDetail label="ФИО" :value="idDetails.name" />
              <DropdownDetail label="ИНН" :value="idDetails.inn" />
              <DropdownDetail label="Серия и номер паспорта" :value="idDetails.number" />
              <div class="dropdown__bottom">
                <DropdownDetail label="Орган выдачи" :value="idDetails.issuer" />
                <DropdownDetail label="Дата выдачи" :value="idDetails.issueDate" />
              </div>
            </div>
          </template>
        </Dropdown>

        <Dropdown v-model="formData.idData" placeholder="Данные водительского удостоверения">
          <template #content>
            <div>
              <DropdownDetail label="ФИО" :value="driverLicenseDetails.name" />
              <DropdownDetail label="ИНН" :value="driverLicenseDetails.inn" />
              <DropdownDetail label="Серия и номер" :value="driverLicenseDetails.number" />
              <div class="dropdown__bottom">
                <DropdownDetail label="Орган выдачи" :value="driverLicenseDetails.issuer" />
                <DropdownDetail label="Дата выдачи" :value="driverLicenseDetails.issueDate" />
              </div>
            </div>
          </template>
        </Dropdown>

        <Dropdown v-model="formData.idData" placeholder="Данные свидетельства о регистрации ТС">
          <template #content>
            <div>
              <DropdownDetail label="ФИО" :value="vehicleRegistrationDetails.name" />
              <DropdownDetail label="ИНН" :value="vehicleRegistrationDetails.inn" />
              <DropdownDetail label="Серия и номер" :value="vehicleRegistrationDetails.number" />
              <div class="dropdown__bottom">
                <DropdownDetail label="Орган выдачи" :value="vehicleRegistrationDetails.issuer" />
                <DropdownDetail label="Дата выдачи" :value="vehicleRegistrationDetails.issueDate" />
              </div>
            </div>
          </template>
        </Dropdown>
      </div>
      <Footer :isValid="false" navigateTo="/calculator" />
    </Container>
  </section>
</template>

<script setup>
import Container from '@/components/Container.vue'
import Footer from '@/components/Footer.vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownDetail from '@/components/DropdownDetail.vue'
import { reactive } from 'vue'

const purposeOptions = [
  'Личная',
  'Учебная езда',
  'Такси',
  'Перевозка опасных грузов',
  'Прокат/краткосрочная аренда',
  'Регулярные пассажирские перевозки',
  'Дорожные и спецсредства',
  'Экстренные службы',
  'Прочее',
]

const driverLicenseDetails = {
  name: 'Тургунов Бекжан Сапарович',
  inn: '68245884935',
  number: 'DL 2456789',
  issuer: 'ГАИ МВД',
  issueDate: '25.06.2021',
}

const vehicleRegistrationDetails = {
  name: 'Тургунов Бекжан Сапарович',
  inn: '68245884935',
  number: 'VR 4561234',
  issuer: 'МРЭО №7',
  issueDate: '01.03.2022',
}

const formData = reactive({
  purpose: null,
  address: 'Нарынская обл., г. Нарын, ул. Айтматова, д. 25, кв. 6',
  phone: '',
  passport: null,
  idData: null,
})

const passportDetails = {
  name: 'Тургунов Бекжан Сапарович',
  inn: '68245884935',
  number: 'AN 1234567',
  issuer: 'MKK-50',
  issueDate: '20.12.1996',
}

const idDetails = { ...passportDetails }
</script>

<style scoped lang="scss">
.form-section {
  @apply pt-14 pb-[100px];

  &__content {
    @apply space-y-4;

    h3 {
      span {
        @apply text-[#FC3400];
      }
    }
  }
}

.form-title {
  @apply text-[#000B16] text-[20px] font-semibold mb-4;
}

.form-group {
  @apply mt-4;
}

.form-label {
  @apply block text-[16px] font-medium text-gray-700 mb-2;
}

.required {
  @apply text-red-500;
}

.form-input {
  @apply w-full bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
}
</style>
