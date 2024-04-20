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

    <div class="buy">
      <button> 
        BUY NOW!
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buy {
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0;
  button {
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0px;
    background-color: rgb(24, 231, 24);
    cursor: pointer;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.3);
      }
      70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 5px rgba(76, 175, 80, 0);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
      }
    }
  }
}
</style>
