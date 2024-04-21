<script lang="ts" setup>

interface Props {
  modelValue: string
  placeholder?: string
  autofocus?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  autofocus: false
})

defineEmits<{
  (e: 'update:model-value', text: string): void
}>()
</script>

<template>
  <div class="text-input">
    <input 
      v-focus="autofocus"
      type="text" 
      :placeholder="placeholder" 
      :value="modelValue"
      @input="$emit('update:model-value', ($event.target as HTMLInputElement).value)" 
    />
    <span v-if="$slots.append && modelValue" class="append">
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
