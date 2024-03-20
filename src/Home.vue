<script setup lang="ts">
import avatar from '@/assets/avatar.png'
import home from '@/assets/home.svg'
import cat from '@/assets/cat.jpeg'
import horse from '@/assets/horse.gif'

</script>


<template>
  <div>
    <p class="hone">
      This is home page
    </p>

    <p>
      <!-- <img :src="avatar" alt="some img avatar"> -->
      <!-- <img :src="home" alt="some img avatar"> -->
      <!-- <img :src="cat" alt="some img avatar"> -->
      <!-- <img :src="horse" alt="some img avatar"> -->
      <img :src="home" alt="some img avatar">
    </p>

  </div>
</template>

<style lang="scss" scoped>
.hone {
  background-color: red;
}
</style>
