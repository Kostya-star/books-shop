<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref, watch } from 'vue';
import BookItem from '@/components/book-item.vue';
import FiltrationSidebar from '@/components/filtration-sidebar.vue';
import { BASE_URL } from '@/consts';
import { debounce } from '@/utils/debounce';
import { Genres } from '@/types/genres';
import { useBooksStore } from '@/store/books';
import { storeToRefs } from 'pinia';
import { GetBooksQuery } from '@/types/query';

interface Filters {
  searchBooks: string
  toggleFavorite: boolean
  toggleDiscount: boolean
  selectedGenre: Genres | null
}

defineEmits(['add-to-cart'])

const booksStore = useBooksStore();
const { books, isLoading, isError } = storeToRefs(booksStore);
const { getBooks } = booksStore;

const filters = reactive<Filters>({
  searchBooks: '',
  toggleFavorite: false,
  toggleDiscount: false,
  selectedGenre: null
})

onMounted(async () => await getBooks())

watch(filters, onFiltrationDebounced())

function onFiltrationDebounced() {
  return debounce(async (filters: Filters) => {
    const { searchBooks, toggleFavorite, toggleDiscount, selectedGenre } = filters

    const params: GetBooksQuery = {
      name_like: searchBooks.trim(),
      isFavorite: toggleFavorite ? 'true' : '',
      discount_ne: toggleDiscount ? 'undefined' : '',
      genre: selectedGenre ?? ''
    }

    await getBooks(params)
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
    isError.value = true;
  }
}
</script>

<template>
  <div class="main">
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
        @toggle-favourite="toggleFavourite" 
      />
    </div>

    <div v-else>No Books</div>

    <filtration-sidebar 
      v-model:searchBooks="filters.searchBooks"
      v-model:toggle-favorite="filters.toggleFavorite"
      v-model:toggle-discount="filters.toggleDiscount"
      v-model:genre="filters.selectedGenre"
    />
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
