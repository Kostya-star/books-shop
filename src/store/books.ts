import { BASE_URL } from '@/consts';
import { IBookItem } from '@/types/BookItem';
import { GetBooksQuery } from '@/types/query';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBooksStore = defineStore('books', () => {
  const books = ref<IBookItem[]>([]);
  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)

  return { 
    books, 
    isLoading, 
    isError, 
    getBooks, 
    toggleFavourite, 
    addDeleteBooksInCart 
  }

  async function getBooks(params?: GetBooksQuery) {
    isLoading.value = true;

    const query = params 
    ? new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).filter(([_, value]) => Boolean(value))
        )
      ).toString() 
    : '';

    try {
      const resp = await axios.get(`${BASE_URL}books${query ? `?${query}` : ''}`);
      books.value = resp.data;
    } catch (err) {
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  async function toggleFavourite(bookId: number, isFavorite: boolean) {
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

  async function addDeleteBooksInCart(bookId: number, newCartCount: number) {
    try {
      books.value = books.value.map(book => ({
        ...book,
        inCart: bookId === book.id ? newCartCount : book.inCart
      }))
  
      await axios.patch(`${BASE_URL}books/${bookId}`, {
        inCart: newCartCount
      })
    } catch (error) {
      isError.value = true;
    }
  }
});
