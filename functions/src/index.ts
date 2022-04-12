import functions from "./libs/functions";
import admin from "./libs/firebase";
import stripe from "./libs/stripe";

export const createStripeCustomer = functions.auth
  .user()
  .onCreate(async (user) => {
    const customer = await stripe.customers.create({
      name: user.displayName,
      email: user.email,
    });
    const doc = admin.firestore().collection("stripe_customers").doc(user.uid);
    const ref = await doc.get();
    const fireuser = ref.data();

    if (fireuser) {
      return fireuser;
    } else {
      return doc.set({
        customerId: customer.id,
        name: user.displayName,
      });
    }
  });
