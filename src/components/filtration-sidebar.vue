<script setup lang="ts">
import { toRefs, watch } from 'vue';

const props = defineProps<{
  toggleFavorite: boolean | null
}>()
const emit = defineEmits(['update:search-books', 'update:toggle-favorite'])

const { toggleFavorite } = toRefs(props)

function toggleFavoritesFilters(newFav: boolean) {
  
  // if the same chackbox is clicked then emit null and return
  if(toggleFavorite.value === newFav) {
    emit('update:toggle-favorite', null)
    return
  }

  emit('update:toggle-favorite', newFav)
}
</script>

<template>
  <div class="filtration">
    <input type="text" placeholder="Search books..."
      @input="$emit('update:search-books', ($event.target as HTMLInputElement).value)" />

    <div>
      <input 
        type="checkbox" 
        id="favorite" 
        name="favorites" 
        :checked="toggleFavorite === true"
        @input="() => toggleFavoritesFilters(true)" 
      />
      <label for="favorite">Favorite only</label> <br />

      <input 
        type="checkbox" 
        id="unfavorite" 
        name="favorites" 
        :checked="toggleFavorite === false"
        @input="() => toggleFavoritesFilters(false)" 
      />
      <label for="unfavorite">Unfavorite only</label>
    </div>
    <div>
      <input type="checkbox" id="discount" name="discount" />
      <label for="discount" name="discount">Discount only</label>
    </div>

    <div>
      Choose genre:
      <div>
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
