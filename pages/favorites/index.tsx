import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Layaout } from "../../components/layouts";
import NoFavorites from "../../components/ui/NoFavorites";
import { localFavorites } from "../../utils";
import { FavoritePokemons } from "../../components/pokemon";
import { FavoritePokemon } from '../../interfaces';

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<FavoritePokemon[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layaout title="Pokémos - Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favoritePokemons} />
      )}
    </Layaout>
  );
};

export default FavoritesPage;
