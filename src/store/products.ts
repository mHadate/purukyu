import Stripe from "stripe";
import stripe from "../services/stripe"

export const getProducts = async (): Promise<ProductList> => {
  return await stripe.products.list({ limit: 50 })
};

export const getProduct = async (
  productId: string
): Promise<Stripe.Product> => {
  return await stripe.products.retrieve(productId)
};

export type ProductList = Stripe.ApiList<Stripe.Product> | null;
