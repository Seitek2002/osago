<template>
  <div class="default">
    <main>
      <slot /> <!-- Сюда вставляется контент страниц -->
    </main>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.default {
  @apply bg-gradient-to-b from-[#005CAA]/100 to-[#000C16]/100;
}
</style>