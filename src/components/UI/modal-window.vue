<script lang="ts" setup>
defineProps<{
  isOpen: boolean
}>()

defineEmits(['close'])
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="isOpen" class="modal" @click.self="$emit('close')">
        <div class="content">
          <slot name="content" />
  
          <div class="actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(#7a7575, .5);
  z-index: 999;
  transition: opacity 0.3s ease;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    min-width: 300px;
    min-height: 100px;
    border-radius: 10px;
    background-color: var(--purple);
    
    .actions {
      display: flex;
      justify-content: end;
      gap: 5px;
    }
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
