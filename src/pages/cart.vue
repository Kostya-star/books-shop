<script setup lang="ts">
import { onMounted } from 'vue';
import { useBooksStore } from '@/store/books';
import { storeToRefs } from 'pinia';
import BooksList from '@/components/books-list.vue';

const booksStore = useBooksStore();
const { books, isLoading, isError } = storeToRefs(booksStore);
const { getBooks, toggleFavourite, addDeleteBooksInCart } = booksStore;

onMounted(async () => await getBooks({ inCart_ne: '0' }))
</script>


<template>
  <div>
    <books-list 
      :books="books" 
      :is-loading="isLoading" 
      :is-error="isError"
      @toggle-favourite="toggleFavourite"
      @handle-cart-books="addDeleteBooksInCart"
    />  
  </div>
</template>

<style lang="scss" scoped>
.hone {
  background-color: red;
}
</style>
