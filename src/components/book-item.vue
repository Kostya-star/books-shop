<script lang="ts" setup>
import BookImg from '@/assets/book.png'
import HeartSvg from '@/assets/heart.svg'
import { IBookItem } from '@/types/BookItem';

defineProps<{
  book: IBookItem
}>()

defineEmits(['toggle-favourite', 'add-to-cart'])

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
    
    <div class="footer">
      <div class="to-cart">
        <span>-</span>
        <span>{{ book.inCart }}</span>
        <span>+</span>
      </div>

      <img :src="HeartSvg" :class="{ 'favorite_active': book.isFavorite }"
        @click="$emit('toggle-favourite', book.id, book.isFavorite)">
    </div>
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
    cursor: pointer;
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

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;

    .to-cart {
      display: flex;
      gap: 5px;
      align-items: center;
      span {
        font-weight: 600;
        &:first-child, &:last-child {
          padding: 1px 5px;
          border-radius: 5px;
          background-color: rgb(213, 209, 209);
          cursor: pointer;
          
          &:hover {
            background-color: gray;
            color: white;
          }
        }
      }
    }

    img {
      cursor: pointer;

      &.favorite_active {
        filter: invert(37%) sepia(93%) saturate(7471%) hue-rotate(356deg) brightness(91%) contrast(135%);
      }
    }

  }
}
</style>