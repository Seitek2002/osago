<template>
  <div class="dropdown">
    <button @click="toggle" class="dropdown__button">
      {{ selected || placeholder }}
      <span class="dropdown__icon">
        <dropdownArrow :style="{ transform: isOpen ? 'rotate(180deg)' : '' }" />
      </span>
    </button>
    <div v-if="isOpen" class="dropdown__list">
      <slot name="content">
        <ul>
          <li
            v-for="option in options"
            :key="option"
            @click="selectOption(option)"
            class="dropdown__item"
          >
            {{ option.label ?? option }}
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dropdownArrow from '@/assets/icons/dropdown-arrow.vue'
const selected = ref(null)

defineProps(['options', 'placeholder', 'modelValue'])

const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  emit('update:modelValue', option.value ?? option)
  isOpen.value = false
  selected.value = option.label ?? option
}
</script>

<style scoped lang="scss">
.dropdown {
  @apply relative w-full;

  &__button {
    @apply w-full relative bg-[#F7F8FA] border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
  }

  &__icon {
    @apply absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none;
  }

  &__list {
    @apply absolute z-10 mt-1 w-full bg-[#F7F8FA] shadow-lg max-h-60 rounded-md p-2 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm;
  }

  &__item {
    @apply text-gray-900 rounded-md cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-white;
  }
}
</style>
