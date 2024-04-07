<script setup lang="ts">
import BookImg from '@/assets/book.png'
import HeartSvg from '@/assets/heart.svg'
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface BookItem {
  id: number;
  name: string;
  isFavorite: boolean;
}

const books = ref<BookItem[]>([])

onMounted(async () => {
  try {
    const resp = await axios.get('http://localhost:3001/books')
    books.value = resp.data
  } catch (err) {
    console.log(err);
  }
})

async function toggleFavourite(bookId: number, isFavorite: boolean) {
  try {
    books.value = books.value.map(book => ({
      ...book,
      isFavorite: book.id === bookId ? !isFavorite : book.isFavorite
    }))

    const resp = await axios.patch(`http://localhost:3001/books/${bookId}`, {
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
      <div v-for="book of books" :key="book.id" class="book-item">
        <img :src="BookImg" alt="book img" class="book-img">
        <span>
          {{ book.name }}
        </span>
        <button>Add to cart</button>

        <img :src="HeartSvg" alt="" class="favorite-icon" :class="{ 'favorite_active': book.isFavorite }"
          @click="toggleFavourite(book.id, book.isFavorite)">
      </div>
    </div>

    <div class="filtration">
      <input type="text" placeholder="Search books...">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  gap: 50px;
}

.books-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
}

.book-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  position: relative;

  button {
    margin-top: auto;
  }

  .book-img {
    width: 100%;
    height: auto;
  }

  .favorite-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }

  .favorite_active {
    filter: invert(37%) sepia(93%) saturate(7471%) hue-rotate(356deg) brightness(91%) contrast(135%);
  }
}
</style>
