<template>
  <section class="form-section">
    <Container>
      <div class="form-section__content">
        <h2 class="text-title">{{ t('dataForms.title') }}</h2>

        <div class="form-group">
          <label class="text-suptitle" for="phoneNumber"
            >{{ t('dataForms.numberPhone') }} <span class="required">*</span></label
          >
          <input
            type="text"
            id="phoneNumber"
            placeholder="+996 (502) 235-509"
            v-model="formData.phone"
            :class="['form-input mt-[12px]', !formData.phone ? 'border-red-500' : 'border-gray-300']"
            v-mask="'+996 (###) ###-###'"
            required
          />
        </div>

        <h3 class="text-suptitle">{{ t('dataForms.carUse') }} <span class="required">*</span></h3>
        <Dropdown
          v-model="formData.purpose"
          :options="purposeOptions"
          :placeholder="t('dataForms.carUsePlac')"
        />

        <div class="form-group">
          <label class="text-suptitle mb-[12px] block" for="address">
            {{ t('dataForms.addressHome') }} <span class="required">*</span>
          </label>
          <input
            :class="['form-input', !formData.address ? 'border-red-500' : 'border-gray-300']"
            v-model="formData.address"
            placeholder="Введите адрес"
            id="address"
            required
          />
        </div>

        <!-- <FormInput
          v-model="formData.phone"
          label="Номер телефона"
          placeholder="+996-555-123-123"
          id="phoneNumber"
          v-mask="'+996 (###) ###-##-##'"
        /> -->

        <h3 class="text-suptitle"> Проверьте ваши данные <span class="required">*</span></h3>
        <Dropdown
          v-model="formData.passport"
          :placeholder="t('dataForms.dataID')"
          :isInvalid="isPassportInvalid"
        >
          <template #content>
            <div>
              <DropdownDetail :label="t('dataForms.fullName')" v-model:value="idDetails.fullName" />
              <DropdownDetail :label="t('dataForms.inn')" v-model:value="idDetails.inn" />
              <DropdownDetail label="Серия" v-model:value="idDetails.series" />
              <DropdownDetail label="Номер" v-model:value="idDetails.number" />
              <div class="dropdown__details-card">
                <div class="dropdown__detail">
                  <label class="litle-title" for="birthDate">Дата рождения</label>
                  <input
                    type="date"
                    class="form-input w-full"
                    id="birthDate"
                    v-model="idDetails.birthDate"
                    required
                  />
                </div>
              </div>
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
                label="Марка"
                v-model:value="vehicleRegistrationDetails.brand"
              />
              <DropdownDetail
                label="Модель"
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
              <div class="dropdown__details-card">
                <div class="dropdown__detail">
                  <label class="litle-title" for="vehicleRegDate">Дата регистрации</label>
                  <input
                    type="date"
                    class="form-input w-full"
                    id="vehicleRegDate"
                    v-model="vehicleRegistrationDetails.regDate"
                    required
                  />
                </div>
              </div>
              <DropdownDetail
                label="Орган выдачи"
                v-model:value="vehicleRegistrationDetails.issuer"
              />
            </div>
          </template>
        </Dropdown>
      </div>
      <Footer :isValid="!isFormValid" navigateTo="/calculator" @click="handleFooterClick" />
    </Container>
  </section>
</template>

<script setup>
import Container from '@/components/Container.vue'
import Footer from '@/components/Footer.vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownDetail from '@/components/DropdownDetail.vue'
import { computed, reactive, onMounted } from 'vue'
import { useOcrStore } from '@/stores/useOcrStore'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
const ocrStore = useOcrStore()

const vehicleRegistrationDetails = reactive({
  owner: '',
  vin: '',
  brand: '',
  model: '',
  regNumber: '',
  year: '',
  color: '',
  category: '',
  regDate: '',
  issuer: '',
})

const formData = reactive({
  purpose: null,
  address: '',
  phone: '',
  passport: null,
  vehicleCert: null,
  idData: null,
})

const idDetails = reactive({
  fullName: '',
  inn: '',
  series: '',
  number: '',
  issuer: '',
  issueDate: '',
  birthDate: '',
})

function sanitizeString(val) {
  return typeof val === 'string' && val.trim() !== '' ? val : '';
}
function sanitizeDate(val) {
  // Accepts only valid YYYY-MM-DD format
  if (typeof val !== 'string') return '';
  const m = val.match(/^\d{4}-\d{2}-\d{2}$/);
  return m ? val : '';
}

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
  idDetails.birthDate = ''

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
    idDetails.fullName = [
      sanitizeString(ocrStore.passport.surname),
      sanitizeString(ocrStore.passport.name),
      sanitizeString(ocrStore.passport.patronymic),
    ]
      .filter(Boolean)
      .join(' ')
    idDetails.inn = sanitizeString(ocrStore.passport.personalNumber)
    idDetails.series = sanitizeString(ocrStore.passport.series)
    idDetails.number = sanitizeString(ocrStore.passport.number)
    idDetails.issuer = sanitizeString(ocrStore.passport.authority)
    idDetails.issueDate = sanitizeDate(ocrStore.passport.issueDate)
    idDetails.birthDate = sanitizeDate(ocrStore.passport.birthDate)
  }
  // Техпаспорт (vehicle_cert)
  if (ocrStore.vehicle_cert) {
    // Маппинг по ключам из ответа сервера
    vehicleRegistrationDetails.owner = sanitizeString(ocrStore.vehicle_cert.ownerFullName)
    vehicleRegistrationDetails.vin = sanitizeString(ocrStore.vehicle_cert.vin)
    vehicleRegistrationDetails.brand = sanitizeString(ocrStore.vehicle_cert.brandName)
    vehicleRegistrationDetails.model = sanitizeString(ocrStore.vehicle_cert.carModel)
    vehicleRegistrationDetails.regNumber = sanitizeString(ocrStore.vehicle_cert.number)
    vehicleRegistrationDetails.year = sanitizeString(ocrStore.vehicle_cert.yearOfManufacture)
    vehicleRegistrationDetails.color = sanitizeString(ocrStore.vehicle_cert.color)
    vehicleRegistrationDetails.category = sanitizeString(ocrStore.vehicle_cert.vehicleCategory)
    vehicleRegistrationDetails.regDate = sanitizeDate(ocrStore.vehicle_cert.registrationDate)
    vehicleRegistrationDetails.issuer = sanitizeString(ocrStore.vehicle_cert.authority)
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
    !idDetails.fullName ||
    !idDetails.inn ||
    !idDetails.series ||
    !idDetails.number ||
    !idDetails.issuer ||
    !idDetails.issueDate ||
    !idDetails.birthDate
  )
})

const isVehicleInvalid = computed(() => {
  return (
    !vehicleRegistrationDetails.owner ||
    !vehicleRegistrationDetails.vin ||
    !vehicleRegistrationDetails.brand ||
    !vehicleRegistrationDetails.model ||
    !vehicleRegistrationDetails.regNumber ||
    !vehicleRegistrationDetails.year ||
    !vehicleRegistrationDetails.color ||
    !vehicleRegistrationDetails.category ||
    !vehicleRegistrationDetails.regDate ||
    !vehicleRegistrationDetails.issuer
  )
})

const isFormValid = computed(() => {
  return (
    !isPassportInvalid.value &&
    !isVehicleInvalid.value &&
    formData.phone &&
    formData.address
  )
})
import { useRouter } from 'vue-router'
const router = useRouter()

function handleFooterClick() {
  if (!isFormValid.value) return
  // Сохраняем данные только по кнопке
  ocrStore.passport = {
    ...ocrStore.passport,
    surname: idDetails.surname,
    name: idDetails.name,
    patronymic: idDetails.patronymic,
    personalNumber: idDetails.inn,
    series: idDetails.series,
    number: idDetails.number,
    authority: idDetails.issuer,
    issueDate: idDetails.issueDate,
  }
  ocrStore.vehicle_cert = {
    ...ocrStore.vehicle_cert,
    ownerFullName: vehicleRegistrationDetails.owner,
    vin: vehicleRegistrationDetails.vin,
    brandName: vehicleRegistrationDetails.brand,
    carModel: vehicleRegistrationDetails.model,
    number: vehicleRegistrationDetails.regNumber,
    yearOfManufacture: vehicleRegistrationDetails.year,
    color: vehicleRegistrationDetails.color,
    vehicleCategory: vehicleRegistrationDetails.category,
    registrationDate: vehicleRegistrationDetails.regDate,
    authority: vehicleRegistrationDetails.issuer,
  }
  ocrStore.saveToLocalStorage()
  // Вывод всех данных в консоль перед переходом
  console.log('passport:', ocrStore.passport)
  console.log('driver_license:', ocrStore.driver_license)
  console.log('vehicle_cert:', ocrStore.vehicle_cert)
  console.log('formData:', JSON.parse(JSON.stringify(formData)))
  router.push('/calculator')
}
</script>

<style lang="scss">
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
  @apply w-full bg-[#F7F8FA] border rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
}
</style>
