import { useEffect, useState } from "react";
import Stripe from "stripe";

export const useProducts = () => {
  const [productList, setProductList] = useState<ProductList>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/products");
      const json = await res.json();
      setProductList(json);
    })();
  }, []);
  return productList;
};

export type ProductList = Stripe.ApiList<Stripe.Product> | null;
