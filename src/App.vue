<script setup lang="ts">
</script>


<template>
  <div class="vue-app">
    <p>
      <strong>Current route path: {{ $route.fullPath }}</strong>
    </p>
    <nav>
      <router-link to="/">Go Home</router-link>
      <router-link to="/about">Go To About</router-link>
    </nav>

    <p>
      dsasddsddddddd
    </p>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss" scoped>
// .vue-app {
// }
</style>
