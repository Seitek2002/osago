<template>
  <div class="form-group">
    <label :for="id" class="form-label">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-input"
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

<style lang="scss" scoped>
.form-group {
  @apply mt-4;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.required {
  @apply text-red-500;
}

.form-input {
  @apply w-full bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
}
</style>
