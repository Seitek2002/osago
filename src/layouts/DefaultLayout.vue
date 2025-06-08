<template>
  <div class="wrapper">
    <main>
      <slot />
      <!-- Сюда вставляется контент страниц -->
    </main>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.wrapper {
  @apply bg-gradient-to-b from-[#005CAA]/100 to-[#000C16]/100 box-border;
}
</style>
