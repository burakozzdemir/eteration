import Head from "next/head";
import Home from "./home";

const Index = () => {
  return (
    <>
      <Head>
        <title>Eteration</title>
        <meta name="description" content="Generated by Eteration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_ovi.ico" />
      </Head>
      <Home />
    </>
  );
};
export default Index;


