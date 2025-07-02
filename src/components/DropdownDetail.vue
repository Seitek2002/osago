<template>
  <div class="dropdown__details-card">
    <div class="dropdown__detail">
      <span class="litle-title">{{ label }}</span>
      <input
        :class="['litle-input', !value || value.trim() === '' ? 'border-red-500' : 'border-[#0072DE] focus:border-[#0051FF]']"
        type="text"
        :value="value ?? ''"
        @input="$emit('update:value', $event.target.value)"
      />
    </div>
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

<style lang="scss">
.dropdown__details-card {
  @apply bg-white rounded-xl flex flex-col gap-4 mb-4;
}

.dropdown__detail {
  @apply flex flex-col gap-1;
}

.litle-title {
  @apply text-[#6B7280] text-[14px] font-medium mb-1;
}

.litle-input {
  @apply bg-white border rounded-[8px] py-2 px-3 text-[16px] text-[#201F1F] placeholder:text-[#ADB0BA] outline-none transition-colors;
  box-shadow: 0 1px 4px 0 #e5e7eb22;
}
</style>
