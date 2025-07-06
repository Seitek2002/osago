<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="calculator">
    <Container>
      <div class="calculator__content">
        <h2 class="text-title">{{ t('calculator.title') }}</h2>

        <div v-if="false">
          <h3 class="text-suptitle">{{ t('calculator.quantityDrivers') }} <span>*</span></h3>
          <Dropdown
            v-if="driverOptions?.length"
            v-model="formData.driver"
            :options="driverOptions"
            :placeholder="driverOptions[0].label"
          />

          <h3 class="text-suptitle">{{ t('calculator.experienceAge') }} <span>*</span></h3>
          <Dropdown
            v-if="experienceOptions?.length"
            v-model="formData.driverExperience"
            :options="experienceOptions"
            :placeholder="experienceOptions[0].label"
          />
        </div>

        <h3 class="text-suptitle">{{ t('calculator.diagnostic') }}<span>*</span></h3>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="formData.diagnosticCard" :value="0.8" />
            {{ t('calculator.yeah') }}
          </label>
          <label>
            <input type="radio" v-model="formData.diagnosticCard" :value="1" />
            {{ t('calculator.nauh') }}
          </label>
        </div>

        <h3 class="text-suptitle">{{ t('calculator.contract') }} <span>*</span></h3>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="formData.previousAgreement" :value="1" />
            {{ t('calculator.yeah') }}
          </label>
          <label>
            <input type="radio" v-model="formData.previousAgreement" :value="0" />
            {{ t('calculator.nauh') }}
          </label>
        </div>

        <h3 class="text-suptitle">{{ t('calculator.insuranceAge') }} <span>*</span></h3>
        <div class="insurance-duration">
          <template v-if="insuranceDurations?.length">
            <button
              v-for="({ label, value }, index) in insuranceDurations"
              :key="index"
              :class="{ active: formData.insuranceDuration === value }"
              @click="formData.insuranceDuration = value"
            >
              {{ label }}
            </button>
          </template>
        </div>
      </div>
      <div class="bg-white mt-[50px]">
        <div class="flex items-center justify-between border-t-[2px] py-[5px]">
          <h3>{{ t('calculator.price') }}</h3>
          <b class="text-[22px]">{{ standartOfOsago }} {{ t('calculator.som') }}</b>
        </div>
        <!-- <Footer
          :isValid="false"
          navigateTo="/"
          :title="t('pay') + ' ' + standartOfOsago + ' ' + t('calculator.som')"
        /> -->

        <footer class="footer">
          <Container>
            <div class="footer__content">
              <button @click="handleClick" :disabled="isPayDisabled">{{ t('pay') }}</button>
            </div>
          </Container>
        </footer>
        <p class="text-[12px]">{{ t('calculator.secPrice') }}</p>
      </div>
    </Container>
  </section>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import Container from '@/components/Container.vue'
import Dropdown from '@/components/Dropdown.vue'

const isPayDisabled = computed(() => standartOfOsago.value === 0)
const { locale, t } = useI18n()

const standartOfOsago = ref(0)

const formData = reactive({
  diagnosticCard: 1,
  insuranceDuration: 1,
  previousAgreement: 1,
  // Добавьте сюда остальные поля, которые нужны для запроса
})

watch(
  formData,
  async () => {
    // Получаем данные из localStorage
    let ocrData = {}
    try {
      ocrData = JSON.parse(localStorage.getItem('ocrData') || '{}')
    } catch {
      ocrData = {}
    }
    // phoneNumber должен быть отдельным полем в ocrData
    // category должен быть массивом
    const driverLicense = { ...(ocrData.driver_license || {}) }
    if (driverLicense.category && typeof driverLicense.category === 'string') {
      driverLicense.category = driverLicense.category.split(',').map(s => s.trim()).filter(Boolean)
    }
    if (!Array.isArray(driverLicense.category)) {
      driverLicense.category = []
    }
    const body = {
      phoneNumber: ocrData.phoneNumber || '', // теперь используем отдельное поле phoneNumber
      passport: ocrData.passport || {},
      driverLicense,
      vehicleRegistrationCertificate: ocrData.vehicle_cert || {},
      // добавьте остальные поля, если нужно
    }
    try {
      const response = await fetch('https://oa.kg/api/osago/calculate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.ok) {
        const data = await response.json()
        standartOfOsago.value = data.amount || 0
      } else {
        standartOfOsago.value = 0
      }
    } catch {
      standartOfOsago.value = 0
    }
  },
  { deep: true, immediate: true }
)
</script>

<style scoped lang="scss">
.calculator {
  @apply pt-14 pb-[20px];

  .footer {
    @apply w-full mt-[40px];

    &__content {
      @apply w-full;

      button {
        @apply flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px] mb-[16px];

        &:disabled {
          @apply opacity-50 cursor-not-allowed;
        }
      }
    }
  }

  &__content {
    @apply space-y-4;

    h3 {
      span {
        @apply text-[#FC3400];
      }
    }

    .radio-group {
      @apply grid grid-cols-2 gap-5;

      label {
        @apply flex items-center bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm p-[12px];

        input {
          @apply mr-2;
        }
      }
    }

    .insurance-duration {
      @apply grid grid-cols-3 gap-[8px];

      button {
        @apply px-4 py-2 border rounded-lg text-[14px];

        &.active {
          @apply border-[#005CAA] bg-[#005CAA14];
        }
      }
    }
  }
}

.form-title {
  @apply text-[#000B16] text-[20px] font-semibold mb-4;
}
</style>
