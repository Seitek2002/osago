<template>
  <div class="dropdown__detail">
    <span class="litle-title">{{ label }}</span>
    <input class="litle-input" type="text" :defaultValue="value">
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
