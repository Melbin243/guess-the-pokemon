import type { Pokemon } from '@/types/pokemon.interface'
import { getRandomIntInclusive } from '@/utils/random-number'

import axios from 'axios'

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon'
const MAX_POKEMON_COUNT = 151

const getRandomPokemon = async (): Promise<Pokemon> => {
  const randomId = getRandomIntInclusive(1, MAX_POKEMON_COUNT)

  try {
    const { data } = await axios.get(`${POKEMON_API_URL}/${randomId}`)
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
    }
  } catch (error) {
    throw new Error(`Error fetching Pokémon with ID ${randomId}`)
  }
}

const normalizePokemonName = (name: string): string => {
  return name
    .toLocaleLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
}

const isPokemonNameValid = (pokemonName: string, userInput: string): boolean => {
  const normalizedPokemonName = normalizePokemonName(pokemonName)
  const normalizedUserInput = normalizePokemonName(userInput)

  return normalizedPokemonName === normalizedUserInput
}

export const pokemonService = {
  getRandomPokemon,
  isPokemonNameValid,
}
