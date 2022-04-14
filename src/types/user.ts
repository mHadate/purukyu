export type User = {
  uid: string;
  providerId: string;
  displayName: string | null;
  photoURL: string | null;
}

export type StripeCustomerUser = {
  customerId: string;
  name: string;
}