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
        type="checkbox" 
        id="favorite" 
        name="favorites" 
        :checked="toggleFavorite"
        @input="$emit('update:toggle-favorite', ($event.target as HTMLInputElement).checked)" 
      />
      <label for="favorite">Favorite only</label> 
    </div>

    <div>
      <input 
        type="checkbox" 
        id="discount" 
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
          type="checkbox" 
          :id="_genre" 
          name="genres" 
          :checked="_genre === genre"
          @input="() => selectGenre(_genre)"
        />
        <label :for="_genre" :name="_genre">{{ _genre }}</label>
      </div>

      <!-- <div>
        <input type="checkbox" id="fantasy" name="genres" />
        <label for="fantasy" name="fantasy">Fantasy</label>
      </div>

      <div>
        <input type="checkbox" id="classic" name="genres" />
        <label for="classic" name="classic">Classic</label>
      </div>

      <div>
        <input type="checkbox" id="dystopian" name="genres" />
        <label for="dystopian" name="dystopian">Dystopian</label>
      </div>

      <div>
        <input type="checkbox" id="romance" name="genres" />
        <label for="romance" name="romance">Romance</label>
      </div>

      <div>
        <input type="checkbox" id="fiction" name="genres" />
        <label for="fiction" name="fiction">Fiction</label>
      </div>

      <div>
        <input type="checkbox" id="mystery" name="genres" />
        <label for="mystery" name="mystery">Mystery</label>
      </div>

      <div>
        <input type="checkbox" id="thriller" name="genres" />
        <label for="thriller" name="thriller">Thriller</label>
      </div>

      <div>
        <input type="checkbox" id="historical fiction" name="genres" />
        <label for="historical fiction" name="historical fiction">Historical Fiction</label>
      </div> -->
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
