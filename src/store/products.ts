import Stripe from "stripe";

const webapp_url = process.env.WEBAPP_URL

export const getProducts = async (): Promise<ProductList> => {
  console.log(`${webapp_url}/api/products`);
  const res = await fetch(`${webapp_url}/api/products`);
  return await res.json();
};

export const getProduct = async (
  productId: string
): Promise<Stripe.Product> => {
  const res = await fetch(`${webapp_url}/api/products/${productId}`);
  return await res.json();
};

export type ProductList = Stripe.ApiList<Stripe.Product> | null;
