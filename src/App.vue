<script setup lang="ts">
import '@/styles/index.scss'
import Logo from '@/assets/logo.png'
import ShoppingCart from '@/assets/shopping-cart.svg'

</script>


<template>
  <div style="background-color: thistle; height: 100vh;">
    <div class="app">
      <nav class="navigation">
        <img :src="Logo" alt="project logo" class="project-logo">
        <img :src="ShoppingCart" alt="shopping cart">
        <!-- <router-link to="/">Go Home</router-link>
        <router-link to="/about">Go To About</router-link> -->
      </nav>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  max-width: 1400px;
  margin: 0 auto;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .project-logo {
    width: 150px;
    height: 50px;
    border-radius: 5px;
  }
}
</style>
