import Stripe from "stripe";

interface PriceProps {
  priceList: Stripe.ApiList<Stripe.Price> | null;
  productId: string;
}

export const Price = (props: PriceProps) => (
  <>
    {props.priceList?.data
      .find((price) => price.product === props.productId)
      ?.unit_amount?.toLocaleString()}円
  </>
);
