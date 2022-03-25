import * as functions from "firebase-functions";
import Stripe from "stripe";

const config = functions.config()
const env = config["stripe"]

const stripe = new Stripe(env.secret_key, {
  apiVersion: "2020-08-27",
});

export default stripe