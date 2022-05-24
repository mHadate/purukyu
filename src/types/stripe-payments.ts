export type StripePayments<T> = {
  customerId: string;
  name: string;
  sessionId: string;
  productId: string;
  priceId: string;
  productName: string;
  price: number;
  paid: boolean;
  staff: string;
  createdDate: T;
  updatedDate: T;
};
