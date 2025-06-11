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

        <Dropdown
          v-model="formData.passport"
          :placeholder="t('dataForms.dataID')"
          :isInvalid="isPassportInvalid"
        >
          <template #content>
            <div>
              <DropdownDetail :label="t('dataForms.surname')" v-model:value="idDetails.surname" />
              <DropdownDetail :label="t('dataForms.name')" v-model:value="idDetails.name" />
              <DropdownDetail :label="t('dataForms.patronymic')" v-model:value="idDetails.patronymic" />
              <DropdownDetail :label="t('dataForms.inn')" v-model:value="idDetails.inn" />
              <DropdownDetail :label="t('dataForms.partID')" v-model:value="idDetails.number" />
              <div class="dropdown__bottom">
                <DropdownDetail :label="t('dataForms.organGet')" v-model:value="idDetails.issuer" />
                <DropdownDetail
                  :label="t('dataForms.dateGet')"
                  v-model:value="idDetails.issueDate"
                />
              </div>
            </div>
          </template>
        </Dropdown>

        <Dropdown :placeholder="t('dataForms.dataDriverID')" :isInvalid="isDriverInvalid">
          <template #content>
            <div>
              <DropdownDetail
                :label="t('dataForms.fullName')"
                v-model:value="driverLicenseDetails.name"
              />
              <DropdownDetail
                label="Дата рождения"
                v-model:value="driverLicenseDetails.birthDate"
              />
              <DropdownDetail
                :label="t('dataForms.partNumber')"
                v-model:value="driverLicenseDetails.number"
              />
              <DropdownDetail label="Дата выдачи" v-model:value="driverLicenseDetails.issueDate" />
              <DropdownDetail
                label="Срок действия"
                v-model:value="driverLicenseDetails.expiryDate"
              />
              <DropdownDetail
                :label="t('dataForms.organGet')"
                v-model:value="driverLicenseDetails.issuer"
              />
              <DropdownDetail label="Категория" v-model:value="driverLicenseDetails.category" />
            </div>
          </template>
        </Dropdown>

        <Dropdown
          v-model="formData.vehicleCert"
          :placeholder="t('dataForms.dataRegisterCar')"
          :isInvalid="isVehicleInvalid"
        >
          <template #content>
            <div>
              <DropdownDetail
                label="ФИО владельца"
                v-model:value="vehicleRegistrationDetails.owner"
              />
              <DropdownDetail label="VIN" v-model:value="vehicleRegistrationDetails.vin" />
              <DropdownDetail
                label="Марка/модель"
                v-model:value="vehicleRegistrationDetails.model"
              />
              <DropdownDetail
                label="Регистрационный номер"
                v-model:value="vehicleRegistrationDetails.regNumber"
              />
              <DropdownDetail label="Год выпуска" v-model:value="vehicleRegistrationDetails.year" />
              <DropdownDetail label="Цвет" v-model:value="vehicleRegistrationDetails.color" />
              <DropdownDetail
                label="Категория"
                v-model:value="vehicleRegistrationDetails.category"
              />
              <DropdownDetail
                label="Дата регистрации"
                v-model:value="vehicleRegistrationDetails.regDate"
              />
              <DropdownDetail
                label="Орган выдачи"
                v-model:value="vehicleRegistrationDetails.issuer"
              />
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
import { computed, reactive, onMounted, watch } from 'vue'
import { useOcrStore } from '@/stores/useOcrStore'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
const ocrStore = useOcrStore()



const driverLicenseDetails = reactive({
  name: 'Тургунов Бекжан Сапарович',
  birthDate: '15.04.1990',
  number: 'DL 2456789',
  issueDate: '25.06.2021',
  expiryDate: '25.06.2031',
  issuer: 'ГАИ МВД',
  category: 'B',
})

const vehicleRegistrationDetails = reactive({
  owner: 'Тургунов Бекжан Сапарович',
  vin: 'X1234567890ABCDEF',
  model: 'Toyota Camry',
  regNumber: '01KG123ABC',
  year: '2020',
  color: 'Белый',
  category: 'B',
  regDate: '01.03.2022',
  issuer: 'МРЭО №7',
})

const formData = reactive({
  purpose: null,
  address: 'Нарынская обл., г. Нарын, ул. Айтматова, д. 25, кв. 6',
  phone: '',
  passport: null,
  driverLicense: null,
  vehicleCert: null,
  idData: null,
})

const passportDetails = {
  name: 'Тургунов Бекжан Сапарович',
  inn: '68245884935',
  number: 'AN 1234567',
  issuer: 'MKK-50',
  issueDate: '20.12.1996',
}

const idDetails = reactive({ ...passportDetails })

watch(
  vehicleRegistrationDetails,
  (newVal) => {
    ocrStore.vehicle_cert = {
      ...ocrStore.vehicle_cert,
      ownerFullName: newVal.owner,
      vin: newVal.vin,
      brandModel: newVal.model,
      number: newVal.regNumber,
      yearOfManufacture: newVal.year,
      color: newVal.color,
      vehicleCategory: newVal.category,
      registrationDate: newVal.regDate,
      authority: newVal.issuer,
    }
    ocrStore.saveToLocalStorage()
  },
  { deep: true }
)

// Двусторонняя связь для driverLicenseDetails
watch(
  driverLicenseDetails,
  (newVal) => {
    ocrStore.driver_license = {
      ...ocrStore.driver_license,
      surname: '', // если нужно, можно добавить отдельные поля
      name: newVal.name,
      birthDate: newVal.birthDate,
      licenceNumber: newVal.number,
      issueDate: newVal.issueDate,
      expiryDate: newVal.expiryDate,
      authority: newVal.issuer,
      categories: newVal.category,
    }
    ocrStore.saveToLocalStorage()
  },
  { deep: true }
)

watch(
  idDetails,
  (newVal) => {
    ocrStore.passport = {
      ...ocrStore.passport,
      surname: newVal.surname,
      name: newVal.name,
      patronymic: newVal.patronymic,
      personalNumber: newVal.inn,
      documentNumber: newVal.number,
      authority: newVal.issuer,
      issueDate: newVal.issueDate,
    }
    ocrStore.saveToLocalStorage()
  },
  { deep: true }
)

onMounted(() => {
  // Загрузка из localStorage, если store пуст
  if (!ocrStore.passport && !ocrStore.driver_license && !ocrStore.vehicle_cert) {
    ocrStore.loadFromLocalStorage()
  }

  // Сброс всех полей перед подстановкой новых данных
  idDetails.surname = ''
  idDetails.name = ''
  idDetails.patronymic = ''
  idDetails.inn = ''
  idDetails.number = ''
  idDetails.issuer = ''
  idDetails.issueDate = ''

  driverLicenseDetails.name = ''
  driverLicenseDetails.birthDate = ''
  driverLicenseDetails.number = ''
  driverLicenseDetails.issueDate = ''
  driverLicenseDetails.expiryDate = ''
  driverLicenseDetails.issuer = ''
  driverLicenseDetails.category = ''

  vehicleRegistrationDetails.owner = ''
  vehicleRegistrationDetails.vin = ''
  vehicleRegistrationDetails.model = ''
  vehicleRegistrationDetails.regNumber = ''
  vehicleRegistrationDetails.year = ''
  vehicleRegistrationDetails.color = ''
  vehicleRegistrationDetails.category = ''
  vehicleRegistrationDetails.regDate = ''
  vehicleRegistrationDetails.issuer = ''

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
  // Водительское удостоверение
  if (ocrStore.driver_license) {
    driverLicenseDetails.name = [ocrStore.driver_license.surname, ocrStore.driver_license.name]
      .filter(Boolean)
      .join(' ')
    driverLicenseDetails.birthDate = ocrStore.driver_license.birthDate || ''
    driverLicenseDetails.number = ocrStore.driver_license.licenceNumber || ''
    driverLicenseDetails.issueDate = ocrStore.driver_license.issueDate || ''
    driverLicenseDetails.expiryDate = ocrStore.driver_license.expiryDate || ''
    driverLicenseDetails.issuer = ocrStore.driver_license.authority || ''
    driverLicenseDetails.category = ocrStore.driver_license.categories || ''
  }
  // Техпаспорт (vehicle_cert)
  if (ocrStore.vehicle_cert) {
    // Маппинг по ключам из ответа сервера
    vehicleRegistrationDetails.owner = ocrStore.vehicle_cert.ownerFullName || ''
    vehicleRegistrationDetails.vin = ocrStore.vehicle_cert.vin || ''
    vehicleRegistrationDetails.model = ocrStore.vehicle_cert.brandModel || ''
    vehicleRegistrationDetails.regNumber = ocrStore.vehicle_cert.number || ''
    vehicleRegistrationDetails.year = ocrStore.vehicle_cert.yearOfManufacture || ''
    vehicleRegistrationDetails.color = ocrStore.vehicle_cert.color || ''
    vehicleRegistrationDetails.category = ocrStore.vehicle_cert.vehicleCategory || ''
    vehicleRegistrationDetails.regDate = ocrStore.vehicle_cert.registrationDate || ''
    vehicleRegistrationDetails.issuer = ocrStore.vehicle_cert.authority || ''
  }
})

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

const isPassportInvalid = computed(() => {
  return (
    !idDetails.name ||
    !idDetails.inn ||
    !idDetails.number ||
    !idDetails.issuer ||
    !idDetails.issueDate
  )
})

const isDriverInvalid = computed(() => {
  return (
    !driverLicenseDetails.name ||
    !driverLicenseDetails.birthDate ||
    !driverLicenseDetails.number ||
    !driverLicenseDetails.issueDate ||
    !driverLicenseDetails.expiryDate ||
    !driverLicenseDetails.issuer ||
    !driverLicenseDetails.category
  )
})

const isVehicleInvalid = computed(() => {
  return (
    !vehicleRegistrationDetails.owner ||
    !vehicleRegistrationDetails.vin ||
    !vehicleRegistrationDetails.model ||
    !vehicleRegistrationDetails.regNumber ||
    !vehicleRegistrationDetails.year ||
    !vehicleRegistrationDetails.color ||
    !vehicleRegistrationDetails.category ||
    !vehicleRegistrationDetails.regDate ||
    !vehicleRegistrationDetails.issuer
  )
})
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
