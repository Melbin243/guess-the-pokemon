import { ref, onMounted } from 'vue'
import { pokemonService } from '@/service/pokemon.service'
import type { Pokemon } from '@/types/pokemon.interface'

export const GameState = {
  Playing: 'playing',
  Correct: 'correct',
  Wrong: 'wrong',
} as const

export type GameState = (typeof GameState)[keyof typeof GameState]

export function useGameManager() {
  const pokemon = ref<Pokemon | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const gameState = ref<GameState>(GameState.Playing)

  const handlePokemonNameSubmit = (userInput: string) => {
    if (!pokemon.value) return
    const isValid = pokemonService.isPokemonNameValid(pokemon.value.name, userInput)
    gameState.value = isValid ? GameState.Correct : GameState.Wrong
  }

  const loadNewPokemon = async () => {
    isLoading.value = true
    error.value = null
    gameState.value = GameState.Playing

    try {
      pokemon.value = await pokemonService.getRandomPokemon()

      console.log(pokemon.value.name)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadNewPokemon()
  })

  return {
    pokemon,
    isLoading,
    error,
    gameState,
    loadNewPokemon,
    handlePokemonNameSubmit,
  }
}
