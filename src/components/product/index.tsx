import Image from "next/image";
import { Fragment } from "react";
import Stripe from "stripe";
import { Login } from "../../hooks/authenication";
import { PriceList } from "../../hooks/usePrices";
import { User } from "../../types/user";
import { Price, findPrice } from "../price";

interface ProductProps {
  user: User | null;
  product: Stripe.Product | null;
  priceList: PriceList;
}

export const Product = ({ user, product, priceList }: ProductProps) => {
  if (product == null) {
    return null;
  }
  const price = findPrice(product.id, priceList);
  return (
    <div className="bg-white rounded-3xl w-10/12 ml-auto mr-auto pt-20 pb-20">
      <div className="flex flex-wrap">
        <div className="w-6/12 text-center">
          <Image src={product.images[0]} width={400} height={400} alt="" />
        </div>
        <div>
          <h2 className="text-3xl mb-5">{product.name}</h2>
          <p className="mb-5">
            価格：
            <span className="text-xl">
              <Price price={price} />
            </span>
          </p>
          <div className="mb-10 text-sm">
            <Description metadata={product.metadata} />
          </div>
          {user ? (
            <button className="bg-pink-400 w-6/12 p-3 text-white text-xl text-center rounded-xl hover:opacity-50">
              購入する
            </button>
          ) : (
            <button
              onClick={() => Login()}
              className="bg-blue-400 p-3 text-white text-xl text-center rounded-xl hover:opacity-50"
            >
              Twitterでログイン
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface DescriptionProps {
  metadata: Stripe.Metadata;
}

const Description = (props: DescriptionProps) => {
  const description = props.metadata?.["description"];
  const arr = description.split("\n");
  return (
    <>
      {arr.map((str, i) => (
        <Fragment key={i}>
          {str}
          <br />
        </Fragment>
      ))}
    </>
  );
};
