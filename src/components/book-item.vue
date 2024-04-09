<script lang="ts" setup>
import BookImg from '@/assets/book.png'
import HeartSvg from '@/assets/heart.svg'
import { IBookItem } from '@/types/BookItem';

defineProps<{
  book: IBookItem
}>()

defineEmits(['toggle-favourite'])

</script>

<template>
  <div class="book-item">
    <img :src="BookImg" alt="book img" class="book-img">
    <span>
      {{ book.name }}
    </span>

    <div v-if="book.discount" class="discount">
      <span class="old-price">{{ book.discount.old }}₽</span>
      -
      <span class="new-price">{{ book.discount.new }}₽</span>
    </div>
    <button>Add to cart</button>

    <img :src="HeartSvg" alt="" class="favorite-icon" :class="{ 'favorite_active': book.isFavorite }"
      @click="$emit('toggle-favourite', book.id, book.isFavorite)">
  </div>
</template>

<style lang="scss" scoped>
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

  .discount {
    position: absolute;
    right: 5px;
    top: 5px;

    .old-price {
      color: tomato;
      text-decoration: line-through 2px;
    }

    .new-price {
      color: green;
      font-weight: 600;
    }
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