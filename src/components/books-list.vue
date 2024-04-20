<script lang="ts" setup>
import { IBookItem } from '@/types/BookItem';
import BookItem from './book-item.vue';

defineProps<{
  isLoading: boolean;
  isError: boolean;
  books: IBookItem[]
}>()

defineEmits<{
  (e: 'toggle-favourite', bookId: number, newFav: boolean): void
  (e: 'handle-cart-books', bookId: number, cartCount: number): void
}>()

</script>

<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-else-if="isError">
      Error occured
    </div>

    <div v-else-if="books.length" class="books-list">
      <book-item 
        v-for="book of books" 
        :key="book.id" 
        :book="book" 
        @toggle-favourite="(bookId, newFav) => $emit('toggle-favourite', bookId, newFav)" 
        @handle-cart-books="(bookId, cartCount) => $emit('handle-cart-books', bookId, cartCount)"
      />
    </div>

    <div v-else>No Books</div>
  </div>
</template>

<style lang="scss" scoped>
  .books-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
  }
</style>
