<script setup lang="ts">
import { GameState } from '@/composables/useGameManager'

const props = defineProps<{
  loadNewPokemon: () => void
  gameState: GameState
}>()
</script>

<template>
  <div
    v-if="props.gameState !== GameState.Playing"
    :class="[
      'alert',
      props.gameState === GameState.Correct ? 'alert-success' : 'alert-danger',
      'text-center',
    ]"
  >
    <h2>{{ props.gameState === GameState.Correct ? '¡Correcto!' : '¡Incorrecto!' }}</h2>
    <button class="btn btn-dark mt-3" @click="props.loadNewPokemon">Volver a jugar</button>
  </div>
</template>
