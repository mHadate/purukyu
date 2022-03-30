import Stripe from "stripe";

const secretKey = process.env.STRIPE_API_SECRET_KEY as string;

const stripe = new Stripe(secretKey, {
  apiVersion: "2020-08-27",
});

export default stripe;
