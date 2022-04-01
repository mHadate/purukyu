import { useEffect, useState } from "react";
import Stripe from "stripe";

export const usePrices = () => {
  const [priceList, setPriceList] = useState<PriceList>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/prices");
      const json = await res.json();
      setPriceList(json);
    })();
  }, []);
  return priceList;
};

export const usePrice = (priceId: string) => {
  const [price, setPrice] = useState<Stripe.Price | null>(null);

  useEffect(() => {
    (async () => {
      if (priceId) {
        const res = await fetch(`/api/prices/${priceId}`);
        const json = await res.json();
        setPrice(json);
      }
    })();
  }, [priceId]);
  return price;
}

export type PriceList = Stripe.ApiList<Stripe.Price> | null;
