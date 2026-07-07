<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { pokemonService } from './service/pokemon.service'
import { type Pokemon } from './types/pokemon.interface'

const pokemon = ref<Pokemon | null>(null)

onMounted(async () => {
  pokemon.value = await pokemonService.getRandomPokemon()
})
</script>

<template>
  <h1>Guess the Pokemon</h1>
  <img :src="pokemon?.image" :alt="pokemon?.name" />
  <p>{{ pokemon?.name }}</p>
</template>

<style scoped></style>
