<template>
  <div class="dropdown__detail">
    <span>{{ label }}</span>
    <input type="text" :defaultValue="value">
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
  @apply flex flex-col gap-[6px];

  span {
    @apply text-[#2D465B] opacity-60 text-[12px];
  }

  input {
    @apply text-[#2D465B] text-[15px] rounded-[5px] pl-[5px];
  }
}
</style>
