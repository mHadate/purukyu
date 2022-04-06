import functions from "./libs/functions"
import admin from "./libs/firebase"
import stripe from "./libs/stripe"

export const createStripeCustomer = functions.auth.user().onCreate(async (user) => {
  const customer = await stripe.customers.create({ name: user.displayName, email: user.email });
  return admin
    .firestore()
    .collection("stripe_customers")
    .doc(user.uid)
    .set({
      customer_id: customer.id,
      name: user.displayName
    });
});
