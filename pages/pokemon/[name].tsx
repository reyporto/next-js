import { useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Spacer,
  Text,
} from "@nextui-org/react";
import confetti from "canvas-confetti";
import { pokeApi } from "../../api";
import { Layaout } from "../../components/layouts";
import { PokemonResponse, Sprites } from "../../interfaces/pokemon";
import { localFavorites } from "../../utils";
import { PokemonListResponse } from "../../interfaces/pokemon-list";
import { FavoritePokemon } from "../../interfaces/favorite-pokemon";
import { HeartIcon } from "../../components/ui/HeartIcon";

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
                justifyContent: "space-between",
              }}
            >
              <Text transform="capitalize" h1>
                {pokemon.name}
              </Text>
              <Grid>
                <Button
                  size="sm"
                  light
                  color={isInFavorites ? 'error' : 'gradient'}
                  onClick={onToggleFavorite}
                  rounded
                  icon={<HeartIcon fill="currentColor" filled />}
                />
              </Grid>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layaout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const {
    data: { results },
  } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151&offset=0");

  return {
    paths: results.map(({ name }) => ({
      params: {
        name,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name: pokeName } = params as { name: string };
  const {
    data: { id, name, sprites },
  } = await pokeApi.get<PokemonResponse>(`/pokemon/${pokeName}`);
  const pokemon = {
    id,
    name,
    sprites,
  };

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonPage;
