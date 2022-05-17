import Image from "next/image";
import { ChangeEvent, Fragment, useState } from "react";
import Stripe from "stripe";
import { login } from "../../services/firebase";
import { PriceList } from "../../store/prices";
import { User } from "../../types/user";
import { Price, findPrice } from "../price";
import { Columns } from "react-bulma-components";

interface ProductProps {
  user: User | null | undefined;
  product: Stripe.Product | null;
  priceList: PriceList;
}

export const Product = ({ user, product, priceList }: ProductProps) => {
  const [staff, setStaff] = useState<string>("");
  const [loading, setLoading] = useState(false);
  if (product == null || !Object.keys(product).length) {
    return null;
  }

  const price = findPrice(product.id, priceList);

  const onChangeStaff = (e: ChangeEvent<HTMLInputElement>) => {
    setStaff(e.target.value);
  };

  const onClickCheckout = async () => {
    setLoading(true);
    const body = {
      userId: user?.uid,
      productId: product.id,
      priceId: price.id,
      staff,
    };

    const result = await fetch("/api/payment/checkout", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const json = await result.json();
    setLoading(false);
    window.location.href = json.url;
  };

  return (
    <>
      <Columns.Column>
        <Image src={product.images[0]} width={400} height={400} alt="" />
      </Columns.Column>
      <Columns.Column>
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
        {user && (
          <div className="mb-10">
            <label>
              希望キャスト
              <input
                type="text"
                value={staff}
                placeholder="例）つくねちゃん"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onChangeStaff}
              />
            </label>
          </div>
        )}
        {user ? (
          loading ? (
            <button
              className="bg-pink-400 w-full p-3 text-white text-xl text-center rounded-xl opacity-50 cursor-not-allowed"
              disabled
            >
              <div className="animate-spin h-7 w-7 border-4 border-white rounded-full border-t-transparent ml-auto mr-auto" />
            </button>
          ) : (
            <button
              className="bg-pink-400 w-full p-3 text-white text-xl text-center rounded-xl hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!staff}
              onClick={onClickCheckout}
            >
              購入する
            </button>
          )
        ) : (
          <button
            id="twitter"
            onClick={() => login()}
            className="bg-blue-400 p-3 w-full text-white text-xl text-center rounded-xl hover:opacity-50"
          >
            Twitterでログイン
          </button>
        )}
      </Columns.Column>
    </>
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
