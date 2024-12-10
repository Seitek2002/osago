<template>
  <div class="dropdown__detail">
    <span>{{ label }}</span>
    <h3>{{ value }}</h3>
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

<style lang="scss" scoped>
.dropdown__detail {
  span {
    @apply text-[#2D465B] opacity-60 text-[12px];
  }

  h3 {
    @apply text-[#2D465B] text-[15px];
  }
}
</style>
