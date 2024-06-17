import type { GetStaticProps } from "next";
import Head from "next/head";
import { WEBSITE_NAME, DESCRIPTION } from "../../constants";
import { getProduct } from "../../store/products";
import { getPrices, PriceList } from "../../store/prices";
import { Product } from "../../components/product";
import { ParsedUrlQuery } from "node:querystring";
import Stripe from "stripe";
import { Columns } from "react-bulma-components";

interface ProductPageProps {
  product: Stripe.Product;
  priceList: PriceList;
}

interface QueryParams extends ParsedUrlQuery {
  productId: string;
}

export const getServerSideProps: GetStaticProps<
  ProductPageProps,
  QueryParams
> = async ({ params }) => {
  const [product, priceList] = await Promise.all([
    getProduct(params!.productId),
    getPrices(),
  ]);
  return {
    props: {
      product,
      priceList,
    },
  };
};

const ProductPage = ({ product, priceList }: ProductPageProps) => {
  return (
    <>
      <Head>
        <title>{WEBSITE_NAME}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="mb-10">
        <Columns className="bg-white rounded-3xl lg:w-4/5 md:w-4/5 sm:w-4/5 ml-auto mr-auto items-center">
          <Product product={product} priceList={priceList} />
        </Columns>
      </div>
    </>
  );
};

export default ProductPage;
