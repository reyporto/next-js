import { FC } from "react";
import { Grid } from "@nextui-org/react";
import { FavoritePokemonCard } from "./FavoritePokemonCard";
import { FavoritePokemon } from "../../interfaces";

interface Props {
  pokemons: FavoritePokemon[];
}

export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((pokemon) => (
        <FavoritePokemonCard key={pokemon.id} favoritePokemon={pokemon} />
      ))}
    </Grid.Container>
  );
};
