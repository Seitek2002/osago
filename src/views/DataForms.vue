<template>
  <section class="form-section">
    <Container>
      <div class="form-section__content">
        <h2 class="form-title">Проверка данных</h2>

        <h3>Цель использования ТС <span>*</span></h3>
        <Dropdown
          v-model="formData.purpose"
          :options="purposeOptions"
          placeholder="Для личных целей"
        />

        <div class="form-group">
          <label class="form-label" for="address"> Адрес фактического проживания </label>
          <textarea class="form-input" :value="formData.address" id="address"></textarea>
        </div>

        <FormInput
          v-model="formData.phone"
          label="Номер телефона"
          placeholder="Введите номер телефона"
          id="phoneNumber"
        />

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
import FormInput from '@/components/FormInput.vue'
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
  phone: '+996 555 123 123',
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
      @apply text-[#040415] font-medium;

      span {
        @apply text-[#FC3400];
      }
    }
  }
}

.form-title {
  @apply text-[#000B16] text-[20px] font-semibold mb-4;
}
</style>
