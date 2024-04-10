<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import BookItem from '@/components/book-item.vue';
import type { IBookItem } from '@/types/BookItem';
import FiltrationSidebar from '@/components/filtration-sidebar.vue';
import { BASE_URL } from '@/consts';
import { debounce } from '@/utils/debounce';
import { Genres } from '@/types/genres';

const books = ref<IBookItem[]>([])
const booksLoading = ref(false)
const booksError = ref(null)

const searchBooks = ref('')
const toggleFavorite = ref(false)
const toggleDiscount = ref(false)
const selectedGenre = ref<Genres | null>(null)

onMounted(async () => {
  booksLoading.value = true
  try {
    const resp = await axios.get(`${BASE_URL}books`)
    books.value = resp.data
  } catch (err) {
    booksError.value = err;
  } finally {
    booksLoading.value = false
  }
})

watch([searchBooks, toggleFavorite, toggleDiscount, selectedGenre], onFiltrationDebounced())

function onFiltrationDebounced() {
  return debounce(async ([search, isFavorite, isDiscount, genre]) => {
    const params = {
      name_like: search.trim(),
      isFavorite: isFavorite || '',
      discount_ne: isDiscount ? 'undefined' : '',
      genre: genre ?? ''
    }

    const query = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== ''))).toString();

    try {
      const resp = await axios.get(`${BASE_URL}books${query ? `?${query}` : ''}`);
      books.value = resp.data;
    } catch (err) {
      booksError.value = err;
    }
  }, 300);
}

async function toggleFavourite(bookId: string, isFavorite: boolean) {
  try {
    books.value = books.value.map(book => ({
      ...book,
      isFavorite: book.id === bookId ? !isFavorite : book.isFavorite
    }))

    await axios.patch(`${BASE_URL}books/${bookId}`, {
      isFavorite: !isFavorite
    })
  } catch (err) {
    booksError.value = err;
  }
}
</script>

<template>
  <div class="main">
    <div v-if="booksLoading">
      Loading...
    </div>

    <div v-else-if="booksError">
      Error occured
    </div>

    <template v-else>
      <div v-if="books.length" class="books-list">
        <book-item v-for="book of books" :key="book.id" :book="book" @toggle-favourite="toggleFavourite" />
      </div>

      <div v-else>No Books</div>

      <filtration-sidebar 
        v-model:search-books="searchBooks"
        v-model:toggle-favorite="toggleFavorite"
        v-model:toggle-discount="toggleDiscount"
        v-model:genre="selectedGenre"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  gap: 50px;
}

.books-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}
</style>
