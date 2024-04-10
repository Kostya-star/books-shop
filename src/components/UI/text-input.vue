<script lang="ts" setup>

defineProps<{
  placeholder?: string
  modelValue: string
}>()

defineEmits<{
  (e: 'update:model-value', text: string): void
}>()
</script>

<template>
  <div class="text-input">
    <input 
      type="text" 
      :placeholder="placeholder" 
      :value="modelValue"
      @input="$emit('update:model-value', ($event.target as HTMLInputElement).value)" 
    />
    <span class="append">
      <slot name="append"/>
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .text-input {
    position: relative;
    input {
      border: none;
      outline: none;
      border-radius: 5px;
      padding: 5px;
      padding-right: 30px;
    }
    .append {
      :slotted(img) {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }
    }
  }
</style>
