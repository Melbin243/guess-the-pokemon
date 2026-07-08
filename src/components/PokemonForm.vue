<script setup lang="ts">
import { ref } from 'vue'
import type { GameState } from '@/composables/useGameManager'

const props = defineProps<{
  handlePokemonNameSubmit: (userInput: string) => void
  gameState: GameState
}>()

const inputValue = ref<string>('')

const handleSubmit = () => {
  if (!inputValue.value.trim()) {
    console.log('Input is empty')
    return
  }
  props.handlePokemonNameSubmit(inputValue.value.trim().toLowerCase())
  inputValue.value = ''
}
</script>

<template>
  <form class="input-group my-4" @submit.prevent="handleSubmit">
    <input
      type="text"
      class="form-control"
      placeholder="¿Quién es ese Pokémon?"
      aria-label="¿Quién es ese Pokémon?"
      v-model="inputValue"
      autofocus
      :disabled="props.gameState !== 'playing'"
    />
    <button
      class="btn btn-outline-dark"
      type="submit"
      :disabled="!inputValue.trim() || props.gameState !== 'playing'"
    >
      Jugar
    </button>
  </form>
</template>
