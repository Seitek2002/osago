<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-[10px] px-4">
    <h2 class="font-bold text-center text-[28px]">Онлайн оформление ОСАГО</h2>
    <img class="max-w-[300px]" src="../assets/images/logo.png" alt="" />
    <p class="text-center">
      ЗАО «Бакай Иншуренс» является дочерней компанией ОАО «Бакай Банк», что является гарантом
      надежности и финансовой устойчивости бренда.
    </p>
    <div class="font-bold text-center text-[20px]">
      Сколько водителей будет управлять автомобилем?
    </div>
    <router-link class="button" :to="'/documents-form' + '/' + referalId">
      Один водитель
    </router-link>
    <router-link class="button" :to="'/documents-form-2' + '/' + referalId">
      Несколько водителей
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const referalId = ref('')

const router = useRouter()
const id = router.currentRoute.value.params.id
if (id) {
  referalId.value = id
}
</script>

<style lang="scss">
.button {
  @apply flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px];

  &:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
</style>
