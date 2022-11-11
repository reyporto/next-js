import { FC } from "react";
import Head from "next/head";
import Navbar from "../ui/Navbar";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const Layaout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokémon App"}</title>
        <meta name="author" content="Reinaldo Porto" />
        <meta name="description" content="Pokemon App" />
        <meta name="keywords" content={`${title}, pokémon, pokédex`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
