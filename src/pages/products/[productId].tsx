import type { NextPage } from "next";
import Head from "next/head";
import { WEBSITE_NAME, DESCRIPTION } from "../../constants";
import { useProduct } from "../../hooks/useProducts";
import { usePrices } from "../../hooks/usePrices";
import { useRouter } from "next/router";
import { Product } from "../../components/product";
import { useAuthentication } from "../../hooks/authenication";

const ProductPage: NextPage = () => {
  const { user } = useAuthentication();
  const router = useRouter();
  const { productId } = router.query;
  const product = useProduct(productId as string);
  const priceList = usePrices();

  return (
    <>
      <Head>
        <title>{WEBSITE_NAME}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="flex flex-wrap">
        <Product
          product={product}
          priceList={priceList}
          user={user}
        />
      </div>
    </>
  );
};

export default ProductPage;
