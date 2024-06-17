import { ChangeEvent, Fragment, useState } from "react";
import Stripe from "stripe";
import { PriceList } from "../../store/prices";
import { Price, findPrice } from "../price";
import { Columns } from "react-bulma-components";

const PHOTO_BOOK_PRODUCT_ID = "prod_OFpMETTNCeamG3";

interface ProductProps {
  product: Stripe.Product | null;
  priceList: PriceList;
}

export const Product = ({ product, priceList }: ProductProps) => {
  const [staff, setStaff] = useState("");
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidate, setEmailValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  if (product == null || !Object.keys(product).length) {
    return null;
  }

  const price = findPrice(product.id, priceList);

  const onChangeStaff = (e: ChangeEvent<HTMLInputElement>) => {
    setStaff(e.target.value.trim());
  };

  const onChangeCustomer = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer(e.target.value.trim());
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValidate(
      /^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)*@([a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/.test(
        e.target.value.trim()
      )
    );
    setEmail(e.target.value.trim());
  };

  const onClickCheckout = async () => {
    setLoading(true);
    if (!staff || !customer) return;
    const body = {
      productId: product.id,
      priceId: price.id,
      staff,
      customer,
      email
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
        <img src={product.images[0]} alt="" className="h-80 ml-auto mr-auto" />
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
        <form method="post" onSubmit={onClickCheckout}>
          {product.id === PHOTO_BOOK_PRODUCT_ID ? (
            <div className="mb-10">
              <label>
                お客様の配送先住所 氏名
                <input
                  type="text"
                  value={staff}
                  placeholder="例）〒160-0021 東京都新宿区歌舞伎町１-３−１５ ザ・カテリーナ 5F 蒼井つくね"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={onChangeStaff}
                />
              </label>
            </div>
          ) : (
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
          <div className="mb-10">
            <label>
              ご購入者のお名前
              <input
                type="text"
                value={customer}
                placeholder="例）あさい"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onChangeCustomer}
              />
            </label>
          </div>
          <div className="mb-10">
            <label>
              ご購入者のメールアドレス
              <input
                type="email"
                value={email}
                placeholder="purukyu@example.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={onChangeEmail}
              />
            </label>
          </div>
          {loading ? (
            <button
              className="bg-pink-400 w-full p-3 text-white text-xl text-center rounded-xl opacity-50 cursor-not-allowed"
              disabled
            >
              <div className="animate-spin h-7 w-7 border-4 border-white rounded-full border-t-transparent ml-auto mr-auto" />
            </button>
          ) : (
            <button
              className="bg-pink-400 w-full p-3 text-white text-xl text-center rounded-xl hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!staff || !customer || !emailValidate}
              onClick={onClickCheckout}
            >
              購入する
            </button>
          )}
        </form>
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
