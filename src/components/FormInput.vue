<template>
  <div class="flex flex-col gap-1">
    <label
      :for="id"
      class="text-[#201F1F] font-medium text-[16px] leading-[1.3] mb-1"
    >
      {{ label }} <span v-if="required" class="text-[#E00A0A]">*</span>
    </label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      class="bg-[#F5F5F5] border border-[#E5E7EB] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] placeholder:text-[#ADB0BA] focus:border-[#0072DE] outline-none transition-colors invalid:border-red-500 required:border-red-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
    />
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss"></style>
