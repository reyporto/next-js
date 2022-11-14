import { pokeApi } from "../api";
import {
  PokemonInfo,
  PokemonListResponse,
  PokemonResponse,
  SmallPokemon,
} from "../interfaces";

const getPokemons = async (limit: number): Promise<SmallPokemon[]> => {
  const {
    data: { results },
  } = await pokeApi.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=0`
  );

  return results;
};

const getPokemonInfo = async (
  pokeName: string
): Promise<PokemonInfo | null> => {
  try {
    const {
      data: { id, name, sprites },
    } = await pokeApi.get<PokemonResponse>(`/pokemon/${pokeName}`);

    return {
      id,
      name,
      sprites,
    };
  } catch (error) {
    return null;
  }
};

export default {
  getPokemons,
  getPokemonInfo,
};
