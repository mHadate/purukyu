import Stripe from "stripe";
import { PriceList } from "../../store/prices";

interface PriceProps {
  price: Stripe.Price;
}

export const Price = (props: PriceProps) => (
  <>
    {props.price?.unit_amount?.toLocaleString()}円
  </>
);

export const findPrice = (productId: string, priceList: PriceList) =>
  priceList?.data.find((price) => price.product === productId) as Stripe.Price;
