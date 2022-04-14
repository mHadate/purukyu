import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { PriceList } from "../../store/prices";
import { ProductList } from "../../store/products";
import { Price, findPrice } from "../price";

interface ProductsProps {
  productList: ProductList;
  priceList: PriceList;
}

export const Products = ({ productList, priceList }: ProductsProps) => (
  <>
    {productList &&
      priceList &&
      productList?.data?.length &&
      priceList?.data?.length &&
      productList.data.map((product) => {
        const productId = product.id;
        const price = findPrice(productId, priceList) as Stripe.Price;
        return product.active && (
          <Link
            key={productId}
            passHref
            href="/products/[productId]"
            as={`/products/${productId}`}
          >
            <div className="w-4/12 text-center cursor-pointer">
              {product.images[0] ?
                <Image src={product.images[0]} width={250} height={250} alt="" /> : null}
              <p>{product.name}</p>
              <p>
                <Price price={price} />
              </p>
            </div>
          </Link>
        );
      })}
  </>
);
