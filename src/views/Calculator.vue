<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="calculator">
    <Container>
      <div class="calculator__content">
        <h2 class="form-title">Калькулятор стоимости ОСАГО</h2>

        <!-- Dropdown для водителей -->
        <h3>Водители</h3>
        <Dropdown v-model="formData.driver" :options="driverOptions" placeholder="Любой водитель" />

        <!-- Dropdown для стажа водителя -->
        <h3>Укажите ваш возраст и водительский стаж <span>*</span></h3>
        <Dropdown
          v-model="formData.driverExperience"
          :options="experienceOptions"
          placeholder="До 25 лет включительно, стаж менее трех лет"
        />

        <!-- Вопрос о диагностической карте -->
        <h3>Есть ли у Вас диагностическая карта техосмотра? <span>*</span></h3>
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

        <!-- Вопрос о предыдущем договоре ОСАГО -->
        <h3>Заключали ли Вы раньше договор ОСАГО? <span>*</span></h3>
        <div class="radio-group">
          <label>
            <!-- поменять value -->
            <input type="radio" v-model="formData.previousAgreement" :value="1" />
            Да
          </label>
          <label>
            <!-- поменять value -->
            <input type="radio" v-model="formData.previousAgreement" :value="0" />
            Нет
          </label>
        </div>

        <!-- Укажите срок страхования -->
        <h3>Укажите срок страхования <span>*</span></h3>
        <div class="insurance-duration">
          <button
            v-for="({
              label, value
            }, index) in insuranceDurations"
            :key="index"
            :class="{ active: formData.insuranceDuration === value }"
            @click="formData.insuranceDuration = value"
          >
            {{ label }}
          </button>
        </div>

        <hr />
        <div class="flex items-center justify-between">
          <h3>Стоимость страхового полиса:</h3>
          <b>2352 сом</b>
        </div>
      </div>
      <Footer :isValid="false" navigateTo="/" />
    </Container>
  </section>
</template>

<script setup>
import Container from '@/components/Container.vue'
import Footer from '@/components/Footer.vue'
import Dropdown from '@/components/Dropdown.vue'
import { reactive, watch } from 'vue'

const driverOptions = [
  {
    label: 'Любой водитель',
    value: 1
  },
  {
    label: 'Конкретные водители',
    value: 2
  }
]
const experienceOptions = [
  {
    label: 'До 25 лет включительно, со стажем вождения до 3 лет включительно',
    value: 1.4
  },
  {
    label: 'До 25 лет включительно, со стажем вождения свыше 3 лет',
    value: 1.3
  },
  {
    label: 'Более 25 лет, со стажем вождения до 3 лет включительно',
    value: 1.2
  },
  {
    label: 'Более 25 лет, со стажем вождения свыше 3 лет',
    value: 1
  }
]

const insuranceDurations = [
  {
    label: 'От 5 до 15 дней',
    value: 0.2
  }, {
    label: 'От 16 дней до 1 месяца',
    value: 0.3
  }, {
    label: 'До 3 месяцев',
    value: 0.5
  }, {
    label: 'До 6 месяцев',
    value: 0.7
  }, {
    label: 'До 9 месяцев',
    value: 0.9
  }, {
    label: 'До 12 месяцев',
    value: 1
  }
]

const formData = reactive({
  driver: null,
  driverExperience: null,
  diagnosticCard: null,
  previousAgreement: null,
  insuranceDuration: 1,
})

watch(
  () => formData,
  () => {
    // НсП = 3%  Потом добавить для расчета
    const calculate = formData.driver + formData.driverExperience + formData.diagnosticCard + formData.previousAgreement + formData.insuranceDuration
    console.log(calculate.toFixed(2));

  }, {
    deep: true
  })

</script>

<style scoped lang="scss">
.calculator {
  @apply py-14;

  &__content {
    @apply space-y-4;

    h3 {
      @apply text-[#040415] font-medium text-[14px];

      span {
        @apply text-[#FC3400];
      }
    }

    .radio-group {
      @apply grid grid-cols-2 space-x-4;

      label {
        @apply flex items-center space-x-2 bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm p-[12px];

        input {
          @apply mr-2;
        }
      }
    }

    .insurance-duration {
      @apply grid grid-cols-4 gap-[8px];

      button {
        @apply px-4 py-2 border rounded-lg text-[12px];

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
