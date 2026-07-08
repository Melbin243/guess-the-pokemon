<script setup lang="ts">
import PokemonDisplay from './components/PokemonDisplay.vue'
import PokemonForm from './components/PokemonForm.vue'
import PokemonResult from './components/PokemonResult.vue'
import { useGameManager } from './composables/useGameManager'

const { pokemon, isLoading, gameState, loadNewPokemon, handlePokemonNameSubmit } = useGameManager()
</script>

<template>
  <div class="container mx-auto my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md 8 col-lg-6">
        <PokemonDisplay :pokemon="pokemon" :is-loading="isLoading" :game-state="gameState" />
        <PokemonForm
          :game-state="gameState"
          :handle-pokemon-name-submit="handlePokemonNameSubmit"
        />
        <PokemonResult :game-state="gameState" :load-new-pokemon="loadNewPokemon" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
