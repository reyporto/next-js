import { Layaout } from "../components/layouts";
import { GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";
import pokeApi from "../api/pokeApi";
import { PokemonListResponse, SmallPokemon } from "../interfaces/pokemon-list";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

const Home: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layaout title="Listado de Pokémons" image={`${origin}/img/banner.png`}>
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon, i) => (
          <PokemonCard key={i} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layaout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    data: { results },
  } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151&offset=0");
  const pokemons: SmallPokemon[] = results.map((pokemon, index) => {
    const id: number = index + 1;
    const img: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    return { ...pokemon, id, img };
  });

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
