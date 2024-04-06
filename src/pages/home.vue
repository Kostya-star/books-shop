<script setup lang="ts">
import { books } from '@/books';
import BookImg from '@/assets/book.png'
</script>


<template>
  <div class="books-list">
    <div v-for="book of books" :key="book.id" class="book-item">
      <img :src="BookImg" alt="book img" class="book-img">
      {{ book.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.books-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
}

.book-item {
  text-align: center;
  background-color: #fff;
}

.book-img {
  width: 100%;
  height: auto;
}
</style>

