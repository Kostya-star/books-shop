<script setup lang="ts">
import { computed, ref } from 'vue';

const count = ref(100)

const logginCount = computed(() => `the count now is ${count.value}`)

function increment() {
  count.value = count.value + 1
}
function decrement() {
  count.value = count.value - 1
}
</script>


<template>
  <div class="vue-app">
    <div>{{ count }}</div>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <span>{{ logginCount }}</span>
  </div>
</template>

<style lang="scss" scoped>
.vue-app {
  button {
    &:nth-child(2) {
      background-color: green;
    }

    &:nth-child(3) {
      background-color: red;
    }
  }
}
</style>
