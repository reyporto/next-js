import { FC } from "react";
import { Container, Image, Text } from "@nextui-org/react";
import { Sprites } from "../../interfaces";

interface Props {
  sprites: Sprites;
  name: string;
}

export const PokemonSprites: FC<Props> = ({ sprites, name }) => {
  return (
    <>
      <Text size={30}>Sprites:</Text>
      <Container direction="row" display="flex">
        <Image
          src={sprites.front_default}
          alt={name}
          width={100}
          height={100}
        />
        <Image src={sprites.back_default} alt={name} width={100} height={100} />
        <Image src={sprites.front_shiny} alt={name} width={100} height={100} />
        <Image src={sprites.back_shiny} alt={name} width={100} height={100} />
      </Container>
    </>
  );
};
