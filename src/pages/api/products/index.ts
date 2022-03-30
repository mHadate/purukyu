// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "../../../services/stripeApi";
import Stripe from "stripe"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await getProducts();
  const json = await result.json() as Promise<Stripe.ApiList<Stripe.Product>>
  res.status(200).json(json);
};
