<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import BookItem from '@/components/book-item.vue';
import type { IBookItem } from '@/types/BookItem';
import FiltrationSidebar from '@/components/filtration-sidebar.vue';
import { BASE_URL } from '@/consts';

const books = ref<IBookItem[]>([])

onMounted(async () => {
  try {
    const resp = await axios.get(`${BASE_URL}books`)
    books.value = resp.data
  } catch (err) {
    console.log(err);
  }
})

const searchBooks = ref('')

watch(searchBooks, async () => {
  try {
    const resp = await axios.get(`${BASE_URL}books?name_like=${searchBooks.value}`);
    books.value = resp.data
  } catch (err) {
    console.log(err);
  }
})

async function toggleFavourite(bookId: string, isFavorite: boolean) {
  try {
    books.value = books.value.map(book => ({
      ...book,
      isFavorite: book.id === bookId ? !isFavorite : book.isFavorite
    }))

    const resp = await axios.patch(`${BASE_URL}books/${bookId}`, {
      isFavorite: !isFavorite
    })
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
}
</script>


<template>
  <div class="main">
    <div class="books-list">
      <book-item 
        v-for="book of books" 
        :key="book.id" 
        :book="book"
        @toggle-favourite="toggleFavourite"
      />
    </div>

    <filtration-sidebar
      v-model:search-books="searchBooks"
    />
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  gap: 50px;
}

.books-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}
</style>
