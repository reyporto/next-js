import { FC } from "react";
import { Card, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FavoritePokemon } from '../../interfaces';

interface Props {
  favoritePokemon: FavoritePokemon;
}

export const FavoritePokemonCard: FC<Props> = ({ favoritePokemon }) => {
  const router = useRouter();
  const { id, name } = favoritePokemon

  const onClick = () => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card
        isHoverable={true}
        isPressable={true}
        css={{
          padding: 10,
        }}
        onClick={onClick}
      >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
};
