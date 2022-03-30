import type { NextPage } from "next";
import Head from "next/head";
import { WEBSITE_NAME, DESCRIPTION } from "../constants";
import { Header } from "./components/header";
import { useProducts } from "../hooks/useProducts";
import { usePrices } from "../hooks/usePrices";
import { Products } from "./components/products";

const Home: NextPage = () => {
  const productList = useProducts();
  const priceList = usePrices();

  return (
    <>
      <Head>
        <title>{WEBSITE_NAME}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Header />
      <div className="container mx-auto">
        <div className="text-center">
          {/* <Image src="/images/logo.png" width={250} height={81} alt="" /> */}
        </div>
        <div className="flex flex-wrap">
          <Products productList={productList} priceList={priceList} />
        </div>
      </div>
    </>
  );
};

export default Home;
