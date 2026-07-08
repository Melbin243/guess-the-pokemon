<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { pokemonService } from './service/pokemon.service'
import { type Pokemon } from './types/pokemon.interface'
import { useGameManager } from './composables/useGameManager'

const { pokemon, isLoading, error } = useGameManager()
</script>

<template>
  <h1>Guess the Pokemon</h1>
  <div v-if="isLoading">Cargando...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="pokemon">
    <img :src="pokemon.image" :alt="pokemon.name" />
    <p>{{ pokemon.name }}</p>
  </div>
</template>

<style scoped></style>
