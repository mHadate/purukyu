import { METHODS } from "http";

const BASE_URL = process.env.NEXT_PUBLIC_CLOUD_FUNCTIONS_API_URL;

const statusCode = {
  ok: 200,
  created: 201,
  internalServerError: 500,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  notAcceptable: 406,
};

function makeParams(params: any): URLSearchParams {
  return new URLSearchParams(params);
}

let apiAgent: AdminHttpClient;

class AdminHttpClient {
  private headers: { [key: string]: string };
  constructor() {
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  removeHeader(name: string): void {
    if (!this.headers[name]) {
      return;
    }
    const newHeaders: { [key: string]: string } = {};
    Object.keys(this.headers).forEach((k) => {
      if (k === name) {
        return;
      }
      newHeaders[k] = this.headers[k];
    });
    this.headers = newHeaders;
  }

  setHeaders(headers: { [key: string]: string }): void {
    this.headers = { ...this.headers, ...headers };
  }

  private async handler({ method, url, body = new URLSearchParams }: { method: string, url: string, body?: URLSearchParams }): Promise<any> {
    try {
      const response = await this.request({ method, url, body });
      if (
        response.status === statusCode.internalServerError ||
        response.status === statusCode.badRequest ||
        response.status === statusCode.notFound
      ) {
        const responseBody = await response.json();
        throw new Error(
          responseBody.message ||
          "不明なエラーが発生しました。繰り返す場合はエンジニアに問い合わせてください。"
        );
      }
      if (response.status === statusCode.unauthorized || response.status === statusCode.notAcceptable) {
        throw new Error("認証されませんでした。再度ログインしてください。");
      }
      return await response.json();
    } catch (e) {
      // throw new Error(e.message)
    }
  }

  private async request({ method, url, body }: { method: string, url: string, body?: URLSearchParams }): Promise<any> {
    const token = localStorage.getItem("credentical");
    this.setHeaders({ Authorization: `Bearer ${token}` });
    switch (method) {
      case "GET":
        return await fetch(url, {
          headers: this.headers,
        });
      case "POST":
      case "PUT":
      case "PATCH":
        return await fetch(url, {
          method,
          headers: this.headers,
          body: JSON.stringify(body as URLSearchParams),
        });
      case "DELETE":
        return await fetch(url, {
          method,
          headers: this.headers,
        });
    }
  }

  async get(url: string, query?: { [key: string]: any }): Promise<any> {
    const param = makeParams(query);
    return await this.handler({
      method: "GET",
      url: `${BASE_URL}${url}?${param}`,
    });
  }

  async post(
    url: string,
    body: any,
    query?: { [key: string]: any }
  ): Promise<any> {
    const param = makeParams(query);
    return await this.handler({
      method: "POST",
      url: `${BASE_URL}${url}?${param}`,
      body,
    });
  }

  async patch(
    url: string,
    body: any,
    query?: { [key: string]: any }
  ): Promise<any> {
    const param = makeParams(query);
    return await this.handler({
      method: "PATCH",
      url: `${BASE_URL}${url}?${param}`,
      body,
    });
  }

  async put(
    url: string,
    body: any,
    query?: { [key: string]: any }
  ): Promise<any> {
    const param = makeParams(query);
    return await this.handler({
      method: "PUT",
      url: `${BASE_URL}${url}?${param}`,
      body,
    });
  }

  async delete(url: string): Promise<any> {
    return await this.handler({
      method: "DELETE",
      url: `${BASE_URL}${url}`,
    });
  }
}

export function init(): void {
  apiAgent = new AdminHttpClient;
}

export function getAgent(): AdminHttpClient {
  if (!apiAgent) {
    throw new Error("API agent is not initialized");
  }
  return apiAgent;
}

export { apiAgent };
