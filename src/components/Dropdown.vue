<template>
  <div
    :class="[
      'relative w-full border rounded-[10px] overflow-hidden transition-colors',
      isOpen ? 'border-[#0072DE]' : 'border-[#E5E7EB]',
    ]"
  >
    <button
      @click="toggle"
      type="button"
      class="w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors flex items-center justify-between"
    >
      <span class="font-semibold">
        {{ selected || placeholder }}
      </span>
      <span
        class="ml-2 transition-transform duration-200"
        :style="{ transform: isOpen ? 'rotate(180deg)' : '' }"
      >
        <dropdownArrow />
      </span>
    </button>
    <div v-if="isOpen" class="w-full bg-white border border-[#E5E7EB] shadow-lg p-2">
      <slot name="content">
        <ul class="space-y-2">
          <li
            v-for="option in options"
            :key="option"
            @click="selectOption(option)"
            class="px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] text-[16px] text-[#201F1F] rounded-[8px] transition-colors"
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

<style lang="scss"></style>
