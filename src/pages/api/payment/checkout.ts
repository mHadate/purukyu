// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import stripe from "../../../services/stripe";
import { firestore } from "../../../services/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { getPrices, getProducts } from "../../../services/stripeApi";
import Stripe from "stripe";
import { v4 as uuid } from "uuid";
import {StripePayments} from "../../../types/stripe-payments"
import { getStripeCustomerById, insertStripePayment } from "../../../services/firestore";
import { sendSlackWebhook } from "../../../services/slack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    userId,
    productId,
    priceId,
    staff,
  }: {
    userId: string;
    productId: string;
    priceId: string;
    staff: string;
  } = JSON.parse(req.body);

  if (req.method !== "POST" || !userId || !productId || !priceId || !staff) {
    const message = `チェックアウトに失敗しました。
method : ${req.method}
userId : ${userId}
productId : ${productId}
priceId : ${priceId}
staff : ${staff}`
    await sendSlackWebhook(message)
    return res.status(500).end();
  }
  const user = await getStripeCustomerById(userId);

  if (user == null) {
    await sendSlackWebhook("チェックアウト時にユーザが確認できませんでした。")
    return res.status(500).end();
  }

  const uid = uuid();

  const [session, productRes, priceRes] = await Promise.all([
    stripe.checkout.sessions.create({
      mode: "payment",
      customer: user.customerId,
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
    customerId: user.customerId,
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

  await insertStripePayment(session.id, doc)

  res.status(200).json({
    url: session.url,
  });
}
