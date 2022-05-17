import Link from "next/link";
import Stripe from "stripe";
import { PriceList } from "../../store/prices";
import { ProductList } from "../../store/products";
import { Price, findPrice } from "../price";
import { Columns } from "react-bulma-components";

interface ProductsProps {
  productList: ProductList;
  priceList: PriceList;
}

const productClassName =
  "sm:w-40 text-center cursor-pointer bg-yellow-50 p-3 rounded-md mb-5";

export const Products = ({ productList, priceList }: ProductsProps) => (
  <Columns className="gap-4 flex-nowrap">
    {productList &&
      priceList &&
      productList?.data?.length &&
      priceList?.data?.length &&
      productList.data.map((product) => {
        const productId = product.id;
        const price = findPrice(productId, priceList) as Stripe.Price;
        return (
          product.active && (
            <Columns.Column
              key={productId}
              className="text-center cursor-pointer min-w-fit ml-3"
            >
              <Link
                passHref
                href="/products/[productId]"
                as={`/products/${productId}`}
              >
                <div className="rounded-lg p-3 bg-white">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt=""
                      className="ml-auto mr-auto h-40"
                    />
                  ) : null}
                  <p>{product.name}</p>
                  <p>
                    <Price price={price} />
                  </p>
                </div>
              </Link>
            </Columns.Column>
          )
        );
      })}
  </Columns>
);
