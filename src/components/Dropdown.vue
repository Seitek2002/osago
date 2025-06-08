<template>
  <div class="dropdown-container">
    <button @click="toggle" class="dropdown-button">
      {{ selected || placeholder }}
      <span class="dropdown-icon">
        <dropdownArrow :style="{ transform: isOpen ? 'rotate(180deg)' : '' }" />
      </span>
    </button>
    <div v-if="isOpen" class="dropdown-menu">
      <slot name="content">
        <ul>
          <li
            v-for="option in options"
            :key="option"
            @click="selectOption(option)"
            class="dropdown-item"
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

<style scoped lang="scss"></style>
