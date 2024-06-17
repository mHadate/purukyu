// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import stripe from "../../../services/stripe";
import { getPrices, getProducts } from "../../../services/stripeApi";
import Stripe from "stripe";
import { v4 as uuid } from "uuid";
import { StripePayments } from "../../../types/stripe-payments";
import {
  getStripeCustomerByEmail,
  insertStripePayment,
  createStripeCustomer
} from "../../../services/firestore";
import { sendSlackWebhook } from "../../../services/notification";

async function createUser(customer: string, email: string) {
  const newUser = await stripe.customers.create({
    name: customer,
    email,
    metadata: {
      username: customer
    }
  })
  await createStripeCustomer(newUser.id, customer, email)
  return await getStripeCustomerByEmail(customer)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    productId,
    priceId,
    staff,
    customer,
    email
  }: {
    productId: string;
    priceId: string;
    staff: string;
    customer: string;
    email: string;
  } = JSON.parse(req.body);
  if (req.method !== "POST" || !productId || !priceId || !staff || !customer || !email) {
    const message = `チェックアウトに失敗しました。
method : ${req.method}
productId : ${productId}
priceId : ${priceId}
staff : ${staff}
customer: ${customer}
email: ${email}`;
    await sendSlackWebhook(message);
    return res.status(500).end();
  }

  const tempUser = await getStripeCustomerByEmail(email)
  const user = tempUser ?? await createUser(customer, email)

  const uid = uuid();
  const [session, productRes, priceRes] = await Promise.all([
    stripe.checkout.sessions.create({
      mode: "payment",
      customer: user?.customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success?uid=${uid}`,
      cancel_url: `${req.headers.referer}`,
    }),
    getProducts(productId),
    getPrices(priceId),
  ]);

  const [product, price]: [Stripe.Product, Stripe.Price] = await Promise.all([
    productRes.json(),
    priceRes.json(),
  ]);

  const doc: StripePayments<Date> = {
    customerId: user?.customerId ?? "not found customer id",
    name: customer,
    sessionId: uid,
    productId,
    priceId,
    productName: product.name,
    price: price.unit_amount as number,
    paid: false,
    staff,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  await insertStripePayment(session.id, doc);

  res.status(200).json({
    url: session.url,
  });
}
