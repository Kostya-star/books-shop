<script lang="ts" setup>
import { useBooksStore } from '@/store/books';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Logo from '@/assets/logo.png'
import ShoppingCart from '@/assets/shopping-cart.svg'

const booksStore = useBooksStore();
const { books } = storeToRefs(booksStore);

const totalCartPrice = computed(() =>
  books.value.filter(book => book.inCart)
    .reduce((sum, book) => sum + book.price * book.inCart, 0)
)
</script>

<template>
  <div>
    <nav class="navigation">
      <RouterLink to="/">
        <img :src="Logo" alt="project logo" class="project-logo">
      </RouterLink>
  
      <RouterLink to="/cart" class="cart">
        <img :src="ShoppingCart" alt="shopping cart">
  
        <span v-if="totalCartPrice">
          {{ totalCartPrice }}₽
        </span>
  
      </RouterLink>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
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

  .cart {
    cursor: pointer;
    background-color: #b0dc7e;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>
