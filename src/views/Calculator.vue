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
import { useCalcApiStore } from '@/stores/calcApiStore'
import Container from '@/components/Container.vue'
import Dropdown from '@/components/Dropdown.vue'

const isPayDisabled = computed(() => standartOfOsago.value === 0)
const { locale, t } = useI18n()

const calcApiStore = useCalcApiStore()
const standartOfOsago = ref(0)

onMounted(() => {
  if (!calcApiStore.coefficients) {
    calcApiStore.fetchCoefficients()
  }
})

const driverOptions = computed(() => {
  if (!calcApiStore.coefficients) return []
  return calcApiStore.coefficients.driver?.map((opt) => ({
    label: locale.value === 'ru' ? opt.labelRu : opt.labelKy,
    value: opt.value,
  }))
})

const experienceOptions = computed(() => {
  if (!calcApiStore.coefficients) return []
  return calcApiStore.coefficients.experienceUi?.map((opt) => ({
    label: locale.value === 'ru' ? opt.labelRu : opt.labelKy,
    value: opt.value,
  }))
})

const insuranceDurations = computed(() => {
  if (!calcApiStore.coefficients) return []
  return calcApiStore.coefficients.insuranceDurationUi?.map((opt) => ({
    label: locale.value === 'ru' ? opt.labelRu : opt.labelKy,
    value: opt.value,
  }))
})

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
    if (!calcApiStore.coefficients) return
    const basePrice = calcApiStore.coefficients.baseRate?.[0]?.value || 0
    const coefficients = [
      formData.driver || 1,
      formData.driverExperience || 1,
      formData.diagnosticCard || 1,
      formData.insuranceDuration || 1,
    ]

    const totalMultiplier = coefficients.reduce((acc, coef) => acc * coef, 1)

    let price = Math.ceil(basePrice * totalMultiplier)
    const tax = calcApiStore.coefficients.tax?.[0]?.value || 0
    standartOfOsago.value = Math.ceil(price * (1 + tax))
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
