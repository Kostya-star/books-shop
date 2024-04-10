<script setup lang="ts">
import { Genres } from '@/types/genres';

const props = defineProps<{
  searchBooks: string
  toggleFavorite: boolean
  toggleDiscount: boolean
  genre: Genres | null
}>()

const emit = defineEmits<{
  (e: 'update:search-books', search: string): void
  (e: 'update:toggle-favorite', fav: boolean): void
  (e: 'update:toggle-discount', discount: boolean): void
  (e: 'update:genre', genre: string | null): void
}>()

function selectGenre(selectedGenre: Genres) {

  // if the selected genre was pressed again, cancel genre filtration and emit null
  if (selectedGenre === props.genre) {
    emit('update:genre', null)
    return
  }

  emit('update:genre', selectedGenre)
}

</script>

<template>
  <div class="filtration">
    <input 
        type="text" 
        placeholder="Search books..." 
        :value="searchBooks"
        @input="$emit('update:search-books', ($event.target as HTMLInputElement).value)" 
      />

    <div>
      <input 
        id="favorite" 
        type="checkbox" 
        name="favorites" 
        :checked="toggleFavorite"
        @input="$emit('update:toggle-favorite', ($event.target as HTMLInputElement).checked)" 
      />
      <label for="favorite">Favorite only</label> 
    </div>

    <div>
      <input 
        id="discount" 
        type="checkbox" 
        name="discount"
        :checked="toggleDiscount"
        @input="$emit('update:toggle-discount', ($event.target as HTMLInputElement).checked)" 
      />
      <label for="discount">Discount only</label>
    </div>

    <div>
      Choose genre:
      <div v-for="_genre in Genres" :key="_genre">
        <input 
          :id="_genre" 
          type="checkbox" 
          name="genres" 
          :checked="_genre === genre"
          @input="() => selectGenre(_genre)"
        />
        <label :for="_genre" :name="_genre">{{ _genre }}</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filtration {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
