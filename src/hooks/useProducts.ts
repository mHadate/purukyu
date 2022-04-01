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

export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Stripe.Product | null>(null);

  useEffect(() => {
    (async () => {
      if (productId) {
        const res = await fetch(`/api/products/${productId}`);
        const json = await res.json();
        setProduct(json);
      }
    })();
  }, [productId]);
  return product;
};

export type ProductList = Stripe.ApiList<Stripe.Product> | null;
