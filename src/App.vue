<script setup lang="ts">
import { computed, ref } from 'vue';


const count = ref<number>(1)

const logginCount = computed(() => `the count now is ${count.value}`)

function increment() {
  count.value = count.value + 1
}
function decrement() {
  count.value = count.value - 1
}
</script>


<template>
  <div class="vue-app">{{ count }}</div>
  <button @click="increment">Increment</button>
  <button @click="decrement">Decrement</button>
  <span>{{ logginCount }}</span>
</template>

<style lang="scss">
.vue-app {
  background-color: red;
}
</style>
