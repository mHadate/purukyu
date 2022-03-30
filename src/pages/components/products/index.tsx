import Image from "next/image";
import { PriceList } from "../../../hooks/usePrices";
import { ProductList } from "../../../hooks/useProducts";
import { Price } from "../price";

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
      productList.data.map((product) => (
        <div key={product.id} className="w-4/12 text-center">
          <Image src={product.images[0]} width={250} height={250} alt="" />
          <p>{product.name}</p>
          <p>
            <Price priceList={priceList} productId={product.id} />
          </p>
        </div>
      ))}
  </>
);
