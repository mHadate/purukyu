import type { NextPage } from "next";
import Head from "next/head";
import { WEBSITE_NAME, DESCRIPTION } from "../constants";
import { getProducts, ProductList } from "../store/products";
import { getPrices, PriceList } from "../store/prices";
import { Products } from "../components/products";

interface HomeProps {
  productList: ProductList;
  priceList: PriceList;
}

export const getServerSideProps = async () => {
  const [productList, priceList] = await Promise.all([
    getProducts(),
    getPrices(),
  ]);
  return {
    props: {
      productList,
      priceList,
    },
  };
};

const Home = ({ productList, priceList }: HomeProps) => {
  return (
    <>
      <Head>
        <title>{WEBSITE_NAME}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="flex flex-wrap">
        <Products productList={productList} priceList={priceList} />
      </div>
    </>
  );
};

export default Home;
