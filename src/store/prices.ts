import Stripe from "stripe";
import stripe from "../services/stripe"

export const getPrices = async (): Promise<PriceList> => {
  return await stripe.prices.list({ limit: 50 })
};

export const getPrice = async (priceId: string): Promise<Stripe.Price> => {
  return await stripe.prices.retrieve(priceId)
};

export type PriceList = Stripe.ApiList<Stripe.Price> | null;
