<script setup lang="ts">
import type { Pokemon } from '@/types/pokemon.interface'
import { GameState } from '@/composables/useGameManager'
import Spinner from './Spinner.vue'

defineProps<{
  pokemon: Pokemon | null
  isLoading: boolean
  gameState: GameState
}>()
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h1 class="text-center">
        {{
          gameState !== GameState.Playing ? pokemon?.name?.toUpperCase() : '¿Quién es ese Pokémon?'
        }}
      </h1>
    </div>
    <div class="card-body">
      <Spinner v-if="isLoading" />

      <img
        v-else
        :src="pokemon?.image"
        alt=""
        class="img-fluid mx-auto d-block"
        :style="{
          maxHeight: '300px',
          filter: gameState !== GameState.Playing ? 'none' : 'brightness(0)',
          transition: 'filter 0.3s ease-in-out',
        }"
      />
    </div>
  </div>
</template>

<style scoped></style>
