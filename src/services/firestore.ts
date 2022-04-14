import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase-admin/firestore";
import { StripePayments } from "../types/stripe-payments";
import { StripeCustomerUser } from "../types/user";
import { firestore } from "./firebase-admin";

const COLLECTION_MAP = {
  stripeCustomers: "stripe_customers",
  stripePayments: "stripe_payments",
} as const;
type COLLECTION_MAP = typeof COLLECTION_MAP[keyof typeof COLLECTION_MAP];

const timestampToDate = (date: Timestamp | Date): Date => {
  if (date instanceof Timestamp) {
    return date.toDate();
  }
  return date;
};

const dateToTimestamp = (date: Date | Timestamp): Timestamp => {
  if (date instanceof Date) {
    return Timestamp.fromDate(date);
  }
  return date;
};

const stripeCustomerConverter: FirestoreDataConverter<StripeCustomerUser> = {
  toFirestore(user: StripeCustomerUser): DocumentData {
    return {
      customerId: user.customerId,
      name: user.name,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<StripeCustomerUser>
  ): StripeCustomerUser {
    const data = snapshot.data();
    return {
      customerId: data.customerId,
      name: data.name,
    };
  },
};

const stripePaymentConverter: FirestoreDataConverter<StripePayments<Date>> = {
  toFirestore(stripePayment: StripePayments<Date>): DocumentData {
    return {
      customerId: stripePayment.customerId,
      sessionId: stripePayment.sessionId,
      productId: stripePayment.productId,
      priceId: stripePayment.priceId,
      productName: stripePayment.productName,
      price: stripePayment.price,
      paid: stripePayment.paid,
      staff: stripePayment.staff,
      createdDate: dateToTimestamp(stripePayment.createdDate),
      updatedDate: dateToTimestamp(stripePayment.updatedDate),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<StripePayments<Timestamp>>
  ): StripePayments<Date> {
    const data = snapshot.data();
    return {
      customerId: data.customerId,
      sessionId: data.sessionId,
      productId: data.productId,
      priceId: data.priceId,
      productName: data.productName,
      price: data.price,
      paid: data.paid,
      staff: data.staff,
      createdDate: timestampToDate(data.createdDate),
      updatedDate: timestampToDate(data.updatedDate),
    };
  },
};

export const getStripeCustomerById = async (
  userId: string
): Promise<StripeCustomerUser | undefined> => {
  const ref = await firestore
    .collection(COLLECTION_MAP.stripeCustomers)
    .doc(userId)
    .withConverter(stripeCustomerConverter)
    .get();
  return ref.data();
};

export const getStripePayment = async (uid: string) => {
  const snapshot = await firestore
    .collection("stripe_payments")
    .where("sessionId", "==", uid)
    .where("paid", "==", false)
    .withConverter(stripePaymentConverter)
    .get();
  let docId: string | undefined;
  let data: StripePayments<Date> | undefined;
  snapshot.forEach((doc) => {
    docId = doc.id;
    data = doc.data();
  });
  return { docId, data };
};

export const insertStripePayment = async (
  docId: string,
  stripePayment: StripePayments<Date>
) => {
  await firestore
    .collection(COLLECTION_MAP.stripePayments)
    .doc(docId)
    .withConverter(stripePaymentConverter)
    .set(stripePayment);
};

export const setStripePayment = async (
  docId: string,
  stripePayment: StripePayments<Date>
) => {
  await firestore
    .collection("stripe_payments")
    .doc(docId)
    .withConverter(stripePaymentConverter)
    .update(stripePayment);
};