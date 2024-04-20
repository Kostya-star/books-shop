<script setup lang="ts">
import '@/styles/index.scss'
import Navigation from '@/components/UI/navigation.vue';

</script>


<template>
  <div class="app">
    <div class="content">
      <div class="navigation">
        <navigation />
      </div>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  background-color: thistle;
  min-height: 100vh;
  max-height: 100%;
}
.content {
  max-width: 1400px;
  margin: 0 auto;
  
  .navigation {
    position: sticky;
    top: 0;
    background-color: thistle;
    border-bottom: solid 1px rgb(238, 111, 238);
    z-index: 1;
    margin-bottom: 20px;
  }
}
</style>
