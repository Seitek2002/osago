<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-[10px] px-4">
    <div class="font-bold text-center text-[20px]">Сколько водителей будет управлять автомобилем?</div>
    <router-link class="button" to="/documents-form"> Один водитель </router-link>
    <router-link class="button" to="/documents-form-2"> Несколько водителей </router-link>
  </div>
</template>

<script></script>

<style lang="scss">
.button {
  @apply flex justify-center w-full py-[14px] bg-[#005CAA] rounded-[6px] text-[#fff] text-[16px];

  &:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
</style>
