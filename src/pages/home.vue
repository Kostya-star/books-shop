<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import FiltrationSidebar from '@/components/filtration-sidebar.vue';
import { debounce } from '@/utils/debounce';
import { Genres } from '@/types/genres';
import { useBooksStore } from '@/store/books';
import { storeToRefs } from 'pinia';
import { GetBooksQuery } from '@/types/query';
import BooksList from '@/components/books-list.vue';

interface Filters {
  searchBooks: string
  toggleFavorite: boolean
  toggleDiscount: boolean
  selectedGenre: Genres | null
}

defineEmits(['add-to-cart'])

const booksStore = useBooksStore();
const { books, isLoading, isError } = storeToRefs(booksStore);
const { getBooks, toggleFavourite, addDeleteBooksInCart } = booksStore;

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
</script>

<template>
  <div class="main">
    <books-list 
      :books="books" 
      :is-loading="isLoading" 
      :is-error="isError"
      @toggle-favourite="toggleFavourite"
      @handle-cart-books="addDeleteBooksInCart"
    />

    <div class="filtration">
      <filtration-sidebar 
        v-model:searchBooks="filters.searchBooks"
        v-model:toggle-favorite="filters.toggleFavorite"
        v-model:toggle-discount="filters.toggleDiscount"
        v-model:genre="filters.selectedGenre"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  gap: 50px;

  .filtration {
    position: sticky;
    right: 0;
    top: 70px; // the height of the navigation + 5px
  }
}
</style>
