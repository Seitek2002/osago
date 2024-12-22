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
      <div class="fixed left-[15px] bottom-[69px] w-[94%] bg-white">
        <div class="flex items-center justify-between border-t-[2px] py-[5px]">
          <h3>{{ t('calculator.price') }}</h3>
          <b>{{ standartOfOsago }} {{ t('calculator.som') }}</b>
        </div>
        <Footer :isValid="false" navigateTo="/" :title="t('pay') + ' ' + standartOfOsago + ' ' + t('calculator.som')" />
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
const { locale, t } = useI18n()

const standartOfOsago = ref(1680)

const driverOptionsRu = [
  {
    label: 'Неограниченное кол-во водителей',
    value: 1,
  },
  {
    label: 'До 4х водителей',
    value: 2,
  },
]
const driverOptionsEn = [
  {
    label: "Unlimited number of drivers",
    value: 1
  },
  {
    label: "Up to 4 drivers",
    value: 2
  }
]
const driverOptionsKg = [
  {
    label: "Чектелбеген айдоочулардын саны",
    value: 1
  },
  {
    label: "Төрт айдоочуга чейин",
    value: 2
  }
]

const driverOptions = computed(() => {
  switch (locale.value) {
    case 'ru':
      return driverOptionsRu
    case 'kg':
      return driverOptionsKg
    case 'en':
      return driverOptionsEn
    default:
      return driverOptionsRu 
  }
})

const experienceOptionsRu = [
  {
    label: 'до 25-ти лет и стажем до 3-х лет',
    value: 1.4,
  },
  {
    label: 'до 25-ти лет и стажем от 4-х лет',
    value: 1.3,
  },
  {
    label: 'от 26-ти лет и стажем до 3-х лет',
    value: 1.2,
  },
  {
    label: 'от 26-ти лет и стажем от 4-х лет',
    value: 1,
  },
]
const experienceOptionsEn = [
  {
    label: "Under 25 years old and up to 3 years of experience",
    value: 1.4
  },
  {
    label: "Under 25 years old and 4 years or more of experience",
    value: 1.3
  },
  {
    label: "Over 26 years old and up to 3 years of experience",
    value: 1.2
  },
  {
    label: "Over 26 years old and 4 years or more of experience",
    value: 1
  }
]
const experienceOptionsKg = [
  {
    label: "25 жашка чейин жана 3 жылдан аз тажрыйба",
    value: 1.4
  },
  {
    label: "25 жашка чейин жана 4 жана андан көп жыл тажрыйба",
    value: 1.3
  },
  {
    label: "26 жаштан жогору жана 3 жылга чейин тажрыйба",
    value: 1.2
  },
  {
    label: "26 жаштан жогору жана 4 жана андан көп жыл тажрыйба",
    value: 1
  }
]

const experienceOptions = computed(() => {
  switch (locale.value) {
    case 'ru':
      return experienceOptionsRu
    case 'kg':
      return experienceOptionsKg
    case 'en':
      return experienceOptionsEn
    default:
      return experienceOptionsRu 
  }
})

const insuranceDurationsRu = [
  {
    label: '15 дней',
    value: 0.2,
  },
  {
    label: '1 месяца',
    value: 0.3,
  },
  {
    label: '3 месяцев',
    value: 0.5,
  },
  {
    label: '6 месяцев',
    value: 0.7,
  },
  {
    label: '9 месяцев',
    value: 0.9,
  },
  {
    label: '12 месяцев',
    value: 1,
  },
]
const insuranceDurationsEn = [
{
    "label": "15 days",
    "value": 0.2
  },
  {
    "label": "1 month",
    "value": 0.3
  },
  {
    "label": "3 months",
    "value": 0.5
  },
  {
    "label": "6 months",
    "value": 0.7
  },
  {
    "label": "9 months",
    "value": 0.9
  },
  {
    "label": "12 months",
    "value": 1
  }
]
const insuranceDurationsKg = [
{
    "label": "15 күн",
    "value": 0.2
  },
  {
    "label": "1 ай",
    "value": 0.3
  },
  {
    "label": "3 ай",
    "value": 0.5
  },
  {
    "label": "6 ай",
    "value": 0.7
  },
  {
    "label": "9 ай",
    "value": 0.9
  },
  {
    "label": "12 ай",
    "value": 1
  }
]

const insuranceDurations = computed(() => {
  switch (locale.value) {
    case 'ru':
      return insuranceDurationsRu
    case 'kg':
      return insuranceDurationsKg
    case 'en':
      return insuranceDurationsEn
    default:
      return insuranceDurationsRu 
  }
})


const formData = reactive({
  driver: 1,
  driverExperience: 1.4,
  diagnosticCard: 1,
  insuranceDuration: 1,
  previousAgreement: 1,
})

watch(
  () => formData,
  () => {
    const basePrice = 1680
    const coefficients = [
      formData.driver || 1,
      formData.driverExperience || 1,
      formData.diagnosticCard || 1,
      formData.insuranceDuration || 1,
    ]

    const totalMultiplier = coefficients.reduce((acc, coef) => acc * coef, 1)

    standartOfOsago.value = Math.ceil(basePrice * totalMultiplier)

    standartOfOsago.value = Math.ceil(standartOfOsago.value * 1.03)
  },
  {
    deep: true,
  },
)
</script>

<style scoped lang="scss">
.calculator {
  @apply pt-14 pb-[130px];

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
