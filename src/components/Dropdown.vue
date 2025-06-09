<template>
  <div
    :class="[
      'relative w-full border rounded-[10px] overflow-hidden transition-colors',
      isInvalid ? 'border-red-500' : isOpen ? 'border-[#0072DE]' : 'border-[#E5E7EB]',
    ]"
  >
    <button
      @click="toggle"
      type="button"
      class="w-full text-left bg-[#F5F5F5] rounded-[10px] py-3 px-[14px] text-[16px] text-[#201F1F] outline-none transition-colors flex items-center justify-between"
    >
      <Warning v-if="isInvalid" class="size-[20px] absolute" />
      <Checked v-else class="size-[15px] absolute rounded-full" />
      <span class="font-semibold ml-[25px]">
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
import { ref, watch } from 'vue'
import dropdownArrow from '@/assets/icons/dropdown-arrow.vue'
import { computed } from 'vue'
import Warning from '@/assets/icons/warning.vue'
import Checked from '@/assets/icons/checked.vue'

const props = defineProps(['options', 'placeholder', 'modelValue', 'isInvalid'])
const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)
const selected = ref(
  props.modelValue
    ? (props.options?.find((opt) => (opt.value ?? opt) === props.modelValue)?.label ??
        props.modelValue)
    : null,
)
const isInvalid = computed(() => props.isInvalid)

watch(
  () => isInvalid,
  (newVal) => {
    selected.value = props.options?.find((opt) => (opt.value ?? opt) === newVal)?.label ?? newVal
  },
)

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
