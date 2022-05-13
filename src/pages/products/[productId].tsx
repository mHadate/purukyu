import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { WEBSITE_NAME, DESCRIPTION } from "../../constants";
import { getProduct, getProducts } from "../../store/products";
import { getPrices, PriceList } from "../../store/prices";
import { Product } from "../../components/product";
import { useAuthContext } from "../../context/AuthContext";
import { ParsedUrlQuery } from "node:querystring";
import Stripe from "stripe";

interface ProductPageProps {
  product: Stripe.Product;
  priceList: PriceList;
}

interface QueryParams extends ParsedUrlQuery {
  productId: string;
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const productList = await getProducts();
  if (productList == null) return { paths: [], fallback: false };
  const paths = productList?.data.map((product) => {
    return {
      params: { productId: `/products/${product.id}` }
    }
  });
  return { paths, fallback: false };
};

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
  const { user } = useAuthContext();

  return (
    <>
      <Head>
        <title>{WEBSITE_NAME}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="flex flex-wrap">
        <Product product={product} priceList={priceList} user={user} />
      </div>
    </>
  );
};

export default ProductPage;
