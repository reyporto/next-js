import { FavoritePokemon } from "../interfaces/favorite-pokemon";

const includes = (
  favorites: FavoritePokemon[],
  favoritePokemon: FavoritePokemon
): Boolean => {
  return (
    favorites.filter(({ name }) => name === favoritePokemon.name).length > 0
  );
};

const toggleFavorite = (favoritePokemon: FavoritePokemon) => {
  let favorites: FavoritePokemon[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  if (includes(favorites, favoritePokemon)) {
    favorites = favorites.filter(({ name }) => name !== favoritePokemon.name);
  } else {
    favorites.push(favoritePokemon);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existInFavorites = (favoritePokemon: FavoritePokemon): Boolean => {
  if (typeof window === "undefined") return false;

  const favorites: FavoritePokemon[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  return includes(favorites, favoritePokemon);
};

const pokemons = (): FavoritePokemon[] => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export default {
  toggleFavorite,
  existInFavorites,
  pokemons,
};
