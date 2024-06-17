import Stripe from "stripe";

const secretKey = process.env.STRIPE_API_SECRET_KEY as string;

const stripe = new Stripe(secretKey, {
  apiVersion: "2024-04-10",
});

export default stripe;
