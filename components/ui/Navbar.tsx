import { useRouter } from "next/router";
import { Spacer, Text, Link, useTheme } from "@nextui-org/react";
import Image from "next/image";

export default function Navbar() {
  const { theme } = useTheme();
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  const goToFavorites = () => {
    router.push("/favorites");
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray50.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="Icon"
        width={70}
        height={70}
      />
      <Link onClick={goToHome}>
        <Text css={{ marginBottom: "5px" }} color="white" h2>
          P
        </Text>
        <Text css={{ marginBottom: "5px" }} color="white" h3>
          okémon
        </Text>
      </Link>

      <Spacer
        css={{
          flex: 1,
        }}
      />
      <Link onClick={goToFavorites}>
        <Text color="white">Favoritos</Text>
      </Link>
    </div>
  );
}
