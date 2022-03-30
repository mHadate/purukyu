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

export type PriceList = Stripe.ApiList<Stripe.Price> | null;
