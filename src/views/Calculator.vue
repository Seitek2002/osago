<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="calculator">
    <Container>
      <div class="calculator__content">
        <h2 class="text-title">Калькулятор стоимости ОСАГО</h2>

        <h3 class="text-suptitle">Количество водителей <span>*</span></h3>
        <Dropdown
          v-model="formData.driver"
          :options="driverOptions"
          placeholder="Неограниченное кол-во водителей"
        />

        <h3 class="text-suptitle">Укажите возраст и стаж самого младшего водителя <span>*</span></h3>
        <Dropdown
          v-model="formData.driverExperience"
          :options="experienceOptions"
          placeholder="до 25-ти лет и стажем до 3-х лет"
        />

        <h3 class="text-suptitle">Есть ли у Вас диагностическая карта техосмотра? <span>*</span></h3>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="formData.diagnosticCard" :value="0.8" />
            Да
          </label>
          <label>
            <input type="radio" v-model="formData.diagnosticCard" :value="1" />
            Нет
          </label>
        </div>

        <h3 class="text-suptitle">Заключали ли Вы раньше договор ОСАГО? <span>*</span></h3>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="formData.previousAgreement" :value="1" />
            Да
          </label>
          <label>
            <input type="radio" v-model="formData.previousAgreement" :value="0" />
            Нет
          </label>
        </div>

        <h3 class="text-suptitle">Укажите срок страхования <span>*</span></h3>
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
          <h3>Стоимость страхового полиса:</h3>
          <b>{{ standartOfOsago }} сом</b>
        </div>
        <Footer :isValid="false" navigateTo="/" :title="'Оплатить ' + standartOfOsago + ' сом'" />
        <p class="text-[12px]">Стоимость указана с учетом НсП 3%</p>
      </div>
    </Container>
  </section>
</template>

<script setup>
import Container from '@/components/Container.vue'
import Footer from '@/components/Footer.vue'
import Dropdown from '@/components/Dropdown.vue'
import { reactive, ref, watch } from 'vue'

const standartOfOsago = ref(1680)

const driverOptions = [
  {
    label: 'Неограниченное кол-во водителей',
    value: 1,
  },
  {
    label: 'До 4х водителей',
    value: 2,
  },
]
const experienceOptions = [
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

const insuranceDurations = [
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
