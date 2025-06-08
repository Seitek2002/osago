<template>
  <section class="form-section">
    <Container>
      <div class="form-section__content">
        <h2 class="text-title">{{ t('dataForms.title') }}</h2>

        <div class="form-group">
          <label class="text-suptitle">{{ t('dataForms.numberPhone') }}</label>
          <input
            type="text"
            placeholder="+996 (502) 235-509"
            :value="formData.phone"
            class="form-input mt-[12px]"
            v-mask="'+996 (###) ###-###'"
          />
        </div>

        <h3 class="text-suptitle">{{ t('dataForms.carUse') }} <span>*</span></h3>
        <Dropdown
          v-model="formData.purpose"
          :options="purposeOptions"
          :placeholder="t('dataForms.carUsePlac')"
        />

        <div class="form-group">
          <label class="text-suptitle mb-[12px] block" for="address">
            {{ t('dataForms.addressHome') }}
          </label>
          <textarea class="form-input" :value="formData.address" id="address"></textarea>
        </div>

        <!-- <FormInput
          v-model="formData.phone"
          label="Номер телефона"
          placeholder="+996-555-123-123"
          id="phoneNumber"
          v-mask="'+996 (###) ###-##-##'"
        /> -->

        <Dropdown v-model="formData.passport" :placeholder="t('dataForms.dataID')">
          <template #content>
            <div>
              <DropdownDetail :label="t('dataForms.fullName')" :value="idDetails.name" />
              <DropdownDetail :label="t('dataForms.inn')" :value="idDetails.inn" />
              <DropdownDetail :label="t('dataForms.partID')" :value="idDetails.number" />
              <div class="dropdown__bottom">
                <DropdownDetail :label="t('dataForms.organGet')" :value="idDetails.issuer" />
                <DropdownDetail :label="t('dataForms.dateGet')" :value="idDetails.issueDate" />
              </div>
            </div>
          </template>
        </Dropdown>

<Dropdown v-model="formData.idData" :placeholder="t('dataForms.dataDriverID')">
  <template #content>
    <div>
      <DropdownDetail :label="t('dataForms.fullName')" :value="driverLicenseDetails.name" />
      <DropdownDetail label="Дата рождения" :value="driverLicenseDetails.birthDate" />
      <DropdownDetail :label="t('dataForms.partNumber')" :value="driverLicenseDetails.number" />
      <DropdownDetail label="Дата выдачи" :value="driverLicenseDetails.issueDate" />
      <DropdownDetail label="Срок действия" :value="driverLicenseDetails.expiryDate" />
      <DropdownDetail :label="t('dataForms.organGet')" :value="driverLicenseDetails.issuer" />
      <DropdownDetail label="Категория" :value="driverLicenseDetails.category" />
    </div>
  </template>
</Dropdown>

<Dropdown v-model="formData.idData" :placeholder="t('dataForms.dataRegisterCar')">
  <template #content>
    <div>
      <DropdownDetail label="ФИО владельца" :value="vehicleRegistrationDetails.owner" />
      <DropdownDetail label="VIN" :value="vehicleRegistrationDetails.vin" />
      <DropdownDetail label="Марка/модель" :value="vehicleRegistrationDetails.model" />
      <DropdownDetail label="Регистрационный номер" :value="vehicleRegistrationDetails.regNumber" />
      <DropdownDetail label="Год выпуска" :value="vehicleRegistrationDetails.year" />
      <DropdownDetail label="Цвет" :value="vehicleRegistrationDetails.color" />
      <DropdownDetail label="Категория" :value="vehicleRegistrationDetails.category" />
      <DropdownDetail label="Дата регистрации" :value="vehicleRegistrationDetails.regDate" />
      <DropdownDetail label="Орган выдачи" :value="vehicleRegistrationDetails.issuer" />
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
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

const purposeOptionsRu = [
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

const purposeOptionsKg = [
  'Жеке',
  'Окутуу үчүн айдоо',
  'Такси',
  'Кооптуу жүктөрдү ташуу',
  'Прокат/кыска мөөнөттүү ижара',
  'Туруктуу жүргүнчүлөрдү ташуу',
  'Жол жана атайын каражаттар',
  'Куткаруу кызматтары',
  'Башка',
]

const purposeOptionsEn = [
  'Personal',
  'Driving training',
  'Taxi',
  'Transportation of dangerous goods',
  'Rental/short-term lease',
  'Regular passenger transportation',
  'Road and special vehicles',
  'Emergency services',
  'Other',
]

const purposeOptions = computed(() => {
  switch (locale.value) {
    case 'ru':
      return purposeOptionsRu
    case 'kg':
      return purposeOptionsKg
    case 'en':
      return purposeOptionsEn
    default:
      return purposeOptionsRu
  }
})

const driverLicenseDetails = {
  name: 'Тургунов Бекжан Сапарович',
  birthDate: '15.04.1990',
  number: 'DL 2456789',
  issueDate: '25.06.2021',
  expiryDate: '25.06.2031',
  issuer: 'ГАИ МВД',
  category: 'B',
}

const vehicleRegistrationDetails = {
  owner: 'Тургунов Бекжан Сапарович',
  vin: 'X1234567890ABCDEF',
  model: 'Toyota Camry',
  regNumber: '01KG123ABC',
  year: '2020',
  color: 'Белый',
  category: 'B',
  regDate: '01.03.2022',
  issuer: 'МРЭО №7',
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
