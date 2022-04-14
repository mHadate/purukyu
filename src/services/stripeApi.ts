const BASE_URL = process.env.STRIPE_BASE_URL;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.STRIPE_API_SECRET_KEY}`,
};

type RequestApiProps = {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
};

const requestApi = async ({ path, method, body }: RequestApiProps) => {
  const url = `${BASE_URL}${path}`;
  switch (method) {
    case "GET":
      return await fetch(url, {
        headers,
      });
    case "POST":
    case "PUT":
    case "PATCH":
      return await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
      });
    case "DELETE":
      return await fetch(url, {
        method,
        headers,
      });
  }
};

export const getProducts = async (productId?: string): Promise<Response> => {
  return await requestApi({
    path: productId ? `/products/${productId}` : "/products",
    method: "GET",
  });
}

export const getPrices = async (priceId?:string): Promise<Response> => {
  return await requestApi({
    path: priceId ? `/prices/${priceId}` : "/prices",
    method: "GET",
  });
};

// export const payment = async ()