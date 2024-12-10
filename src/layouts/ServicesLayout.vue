<template>
  <div>
    <Header type="services" />
    <main>
      <slot /> <!-- Сюда вставляется контент страниц -->
    </main>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";

</script>

<style>

</style>