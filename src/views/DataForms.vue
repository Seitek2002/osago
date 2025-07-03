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
            :class="[
              'form-input mt-[12px]',
              !formData.phone ? 'border-red-500' : 'border-gray-300',
            ]"
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

        <h3 class="text-suptitle">Проверьте ваши данные <span class="required">*</span></h3>
        <Dropdown
          v-model="formData.passport"
          :placeholder="t('dataForms.dataID')"
          :isInvalid="isPassportInvalid"
        >
          <template #content>
            <div>
              <DropdownDetail :label="t('dataForms.fullName')" v-model:value="idDetails.fullName" />
              <DropdownDetail label="Фамилия" v-model:value="idDetails.surname" />
              <DropdownDetail label="Имя" v-model:value="idDetails.name" />
              <DropdownDetail label="Отчество" v-model:value="idDetails.patronymic" />
              <DropdownDetail :label="t('dataForms.inn')" v-model:value="idDetails.inn" />
              <DropdownDetail :label="t('dataForms.partID')" v-model:value="idDetails.number" />
              <DropdownDetail label="Серия" v-model:value="idDetails.series" />
              <DropdownDetail label="Пол" v-model:value="idDetails.gender" :options="['Мужской', 'Женский']" />
              <DropdownDetail label="Место рождения" v-model:value="idDetails.birthPlace" />
              <DropdownDetail label="Национальность" v-model:value="idDetails.ethnicity" />
              <div class="dropdown__bottom">
                <DropdownDetail :label="t('dataForms.organGet')" v-model:value="idDetails.issuer" />
                <div class="dropdown__details-card">
                  <div class="dropdown__detail">
                    <label class="litle-title" for="idIssueDate">{{
                      t('dataForms.dateGet')
                    }}</label>
                    <input
                      type="date"
                      class="form-input w-full"
                      id="idIssueDate"
                      v-model="idDetails.issueDate"
                      required
                    />
                  </div>
                </div>
                <div class="dropdown__details-card">
                  <div class="dropdown__detail">
                    <label class="litle-title" for="idExpiryDate">Срок действия</label>
                    <input
                      type="date"
                      class="form-input w-full"
                      id="idExpiryDate"
                      v-model="idDetails.expiryDate"
                    />
                  </div>
                </div>
                <div class="dropdown__details-card">
                  <div class="dropdown__detail">
                    <label class="litle-title" for="birthDate">{{
                      t('dataForms.birthDate')
                    }}</label>
                    <input
                      type="date"
                      class="form-input w-full"
                      id="birthDate"
                      v-model="idDetails.birthDate"
                      required
                    />
                  </div>
                </div>
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
                required
              />
              <div class="dropdown__details-card">
                <div class="dropdown__detail">
                  <label class="litle-title" for="birthDate">Дата рождения</label>
                  <input
                    type="date"
                    class="form-input w-full"
                    id="birthDate"
                    v-model="driverLicenseDetails.birthDate"
                    required
                  />
                </div>
              </div>
              <DropdownDetail
                :label="t('dataForms.partNumber')"
                v-model:value="driverLicenseDetails.number"
                required
              />
              <div class="dropdown__details-card">
                <div class="dropdown__detail">
                  <label class="litle-title" for="driverIssueDate">Дата выдачи</label>
                  <input
                    type="date"
                    class="form-input w-full"
                    id="driverIssueDate"
                    v-model="driverLicenseDetails.issueDate"
                    required
                  />
                </div>
              </div>
              <div class="dropdown__details-card">
                <div class="dropdown__detail">
                  <label class="litle-title" for="driverExpiryDate">Срок действия</label>
                  <input
                    type="date"
                    class="form-input w-full"
                    id="driverExpiryDate"
                    v-model="driverLicenseDetails.expiryDate"
                    required
                  />
                </div>
              </div>
              <DropdownDetail
                :label="t('dataForms.organGet')"
                v-model:value="driverLicenseDetails.issuer"
              />
              <div class="form-group">
                <label class="text-suptitle">Категории</label>
                <div style="display: flex; flex-wrap: wrap; gap: 8px">
                  <label
                    v-for="cat in allCategories"
                    :key="cat"
                    style="display: flex; align-items: center; gap: 4px"
                  >
                    <input type="checkbox" :value="cat" v-model="driverLicenseDetails.category" />
                    {{ cat }}
                  </label>
                </div>
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
                v-model:value="vehicleRegistrationDetails.carModel"
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

const allCategories = ['A', 'A1', 'B', 'B1', 'C', 'C1', 'D', 'D1', 'BE', 'CE', 'C1E', 'DE', 'D1E']

const driverLicenseDetails = reactive({
  name: '',
  birthDate: '',
  number: '',
  issueDate: '',
  expiryDate: '',
  issuer: '',
  category: [],
})

const vehicleRegistrationDetails = reactive({
  owner: '',
  vin: '',
  carModel: '',
  brand: '',
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
  driverLicense: null,
  vehicleCert: null,
  idData: null,
})

const idDetails = reactive({
  fullName: '',
  inn: '',
  number: '',
  series: '',
  issuer: '',
  issueDate: '',
  birthDate: '',
  surname: '',
  name: '',
  patronymic: '',
  gender: '',
  birthPlace: '',
  ethnicity: '',
  expiryDate: '',
})

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
    idDetails.fullName = [
      ocrStore.passport.surname,
      ocrStore.passport.name,
      ocrStore.passport.patronymic,
    ]
      .filter(Boolean)
      .join(' ')
    idDetails.inn = ocrStore.passport.personalNumber || ''
    idDetails.number = ocrStore.passport.series + ocrStore.passport.number || ''
    idDetails.issuer = ocrStore.passport.authority || ''
    idDetails.issueDate = ocrStore.passport.issueDate || ''
    idDetails.surname = ocrStore.passport.surname || ''
    idDetails.name = ocrStore.passport.name || ''
    idDetails.patronymic = ocrStore.passport.patronymic || ''
    idDetails.gender = ocrStore.passport.gender || ''
    idDetails.birthPlace = ocrStore.passport.birthPlace || ''
    idDetails.ethnicity = ocrStore.passport.ethnicity || ''
    idDetails.expiryDate = ocrStore.passport.expiryDate || ''
    idDetails.series = ocrStore.passport.series || ''
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
    // categories: строка -> массив
    if (typeof ocrStore.driver_license.categories === 'string') {
      driverLicenseDetails.category = ocrStore.driver_license.categories
        .split(',')
        .map((s) => s.trim())
    } else if (Array.isArray(ocrStore.driver_license.categories)) {
      driverLicenseDetails.category = ocrStore.driver_license.categories
    } else {
      driverLicenseDetails.category = []
    }
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
    !idDetails.fullName ||
    !idDetails.inn ||
    !idDetails.number ||
    !idDetails.issuer ||
    !idDetails.issueDate ||
    !idDetails.surname ||
    !idDetails.name ||
    !idDetails.patronymic ||
    !idDetails.gender ||
    !idDetails.birthPlace ||
    !idDetails.ethnicity ||
    !idDetails.expiryDate ||
    !idDetails.series
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
    !driverLicenseDetails.category.length
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

const isFormValid = computed(() => {
  return (
    !isPassportInvalid.value &&
    !isDriverInvalid.value &&
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
    documentNumber: idDetails.number,
    authority: idDetails.issuer,
    issueDate: idDetails.issueDate,
  }
  ocrStore.driver_license = {
    ...ocrStore.driver_license,
    name: driverLicenseDetails.name,
    birthDate: driverLicenseDetails.birthDate,
    licenceNumber: driverLicenseDetails.number,
    issueDate: driverLicenseDetails.issueDate,
    expiryDate: driverLicenseDetails.expiryDate,
    authority: driverLicenseDetails.issuer,
    categories: driverLicenseDetails.category.join(', '),
  }
  ocrStore.vehicle_cert = {
    ...ocrStore.vehicle_cert,
    ownerFullName: vehicleRegistrationDetails.owner,
    vin: vehicleRegistrationDetails.vin,
    brandModel: vehicleRegistrationDetails.model,
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
