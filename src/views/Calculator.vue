<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="calculator">
    <Container>
      <div class="calculator__content">
        <h2 class="text-title">{{ t('calculator.title') }}</h2>

        <h3 class="text-suptitle">{{ t('calculator.quantityDrivers') }} <span>*</span></h3>
        <Dropdown
          v-model="formData.driver"
          :options="driverOptions"
          :placeholder="driverOptions[0].label"
        />

        <h3 class="text-suptitle">{{ t('calculator.experienceAge') }} <span>*</span></h3>
        <Dropdown
          v-model="formData.driverExperience"
          :options="experienceOptions"
          :placeholder="experienceOptions[0].label"
        />

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
          <button
            v-for="({ label, value }, index) in insuranceDurations"
            :key="index"
            :class="{ active: formData.insuranceDuration === value }"
            @click="formData.insuranceDuration = value"
          >
            {{ label }}
          </button>
        </div>
      </div>
      <div class="bg-white mt-[50px]">
        <div class="flex items-center justify-between border-t-[2px] py-[5px]">
          <h3>{{ t('calculator.price') }}</h3>
          <b>{{ standartOfOsago }} {{ t('calculator.som') }}</b>
        </div>
        <!-- <Footer
          :isValid="false"
          navigateTo="/"
          :title="t('pay') + ' ' + standartOfOsago + ' ' + t('calculator.som')"
        /> -->

        <footer class="footer">
          <Container>
            <div class="footer__content">
              <button @click="handleClick" :disabled="isValid">{{ t('pay') }}</button>
            </div>
          </Container>
        </footer>
        <p class="text-[12px]">{{ t('calculator.secPrice') }}</p>
      </div>
    </Container>
  </section>
</template>

<script setup>
import Container from '@/components/Container.vue'
import Footer from '@/components/Footer.vue'
import Dropdown from '@/components/Dropdown.vue'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { calcConstants } from '@/stores/calcConstants'
const { locale, t } = useI18n()

const standartOfOsago = ref(calcConstants.BASE_RATE)

// КОЭФФИЦИЕНТЫ ТЕПЕРЬ ИЗ calcConstants

const driverOptions = computed(() => [
  {
    label:
      locale.value === 'ru' ? 'Неограниченное кол-во водителей' : 'Unlimited number of drivers',
    value: calcConstants.DRIVER_COEFFICIENTS?.unlimited ?? 1.6,
  },
  {
    label: locale.value === 'ru' ? 'До 4х водителей' : 'Up to 4 drivers',
    value: calcConstants.DRIVER_COEFFICIENTS?.limited ?? 2,
  },
])

const experienceOptions = computed(
  () =>
    calcConstants.EXPERIENCE_COEFFICIENTS_UI[locale.value] ||
    calcConstants.EXPERIENCE_COEFFICIENTS_UI['ru'],
)

const insuranceDurations = computed(
  () =>
    calcConstants.INSURANCE_DURATIONS_UI[locale.value] ||
    calcConstants.INSURANCE_DURATIONS_UI['ru'],
)

const formData = reactive({
  driver: 1.6,
  driverExperience: 1.4,
  diagnosticCard: 1,
  insuranceDuration: 1,
  previousAgreement: 1,
})

watch(
  () => formData,
  () => {
    const basePrice = calcConstants.BASE_RATE
    const coefficients = [
      formData.driver || 1,
      formData.driverExperience || 1,
      formData.diagnosticCard || 1,
      formData.insuranceDuration || 1,
    ]

    const totalMultiplier = coefficients.reduce((acc, coef) => acc * coef, 1)

    standartOfOsago.value = Math.ceil(basePrice * totalMultiplier)

    standartOfOsago.value = Math.ceil(standartOfOsago.value * (1 + calcConstants.TAX))
  },
  {
    deep: true,
  },
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
