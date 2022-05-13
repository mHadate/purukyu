import Stripe from "stripe";

const webapp_url = process.env.WEBAPP_URL;

export const getPrices = async (): Promise<PriceList> => {
  const res = await fetch(`${webapp_url}/api/prices`);
  return await res.json();
};

export const getPrice = async (priceId: string): Promise<Stripe.Price> => {
  const res = await fetch(`${webapp_url}/api/prices/${priceId}`);
  return await res.json();
};

export type PriceList = Stripe.ApiList<Stripe.Price> | null;
