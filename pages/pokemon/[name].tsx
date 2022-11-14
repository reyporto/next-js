import { useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Grid, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { Layaout } from "../../components/layouts";
import { PokemonResponse } from "../../interfaces/pokemon";
import { pokemonInfo, localFavorites } from "../../utils";
import { FavoritePokemon, PokemonInfo, SmallPokemon } from "../../interfaces";
import { HeartIcon } from "../../components/ui/HeartIcon";
import { PokemonSprites } from "../../components/pokemon/PokemonSprites";

interface Props {
  pokemon: PokemonResponse;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const favoritePokemon: FavoritePokemon = {
    id: pokemon.id,
    name: pokemon.name,
  };
  const frontDefault =
    pokemon.sprites.other?.dream_world.front_default || "/no-image.png";
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(favoritePokemon)
  );
  const capitalizeText = (text: string) =>
    text[0].toUpperCase() + text.substring(1);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(favoritePokemon);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layaout
      title={`Pokémon - ${capitalizeText(pokemon.name)}`}
      image={frontDefault}
    >
      <Grid.Container
        css={{
          marginTop: "5px",
        }}
        gap={2}
      >
        <Grid xs={12} sm={4}>
          <Card
            isHoverable={true}
            css={{
              padding: "30px",
            }}
          >
            <Card.Body>
              <Card.Image
                src={frontDefault}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Grid
                css={{
                  paddingBottom: 0,
                }}
              >
                <Text transform="capitalize" h1>
                  {pokemon.name}
                </Text>
              </Grid>
              <Grid
                css={{
                  paddingTop: 0,
                }}
              >
                <Button
                  size="sm"
                  color={isInFavorites ? "error" : "error"}
                  onClick={onToggleFavorite}
                  shadow={isInFavorites ? true : false}
                  icon={
                    <HeartIcon fill="currentColor" filled={isInFavorites} />
                  }
                >
                  Favorito
                </Button>
              </Grid>
            </Card.Header>
            <Card.Body>
              <PokemonSprites sprites={pokemon.sprites} name={pokemon.name} />
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layaout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons: SmallPokemon[] = await pokemonInfo.getPokemons(151);

  return {
    paths: pokemons.map(({ name }) => ({
      params: {
        name,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon: PokemonInfo | null = await pokemonInfo.getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonPage;
