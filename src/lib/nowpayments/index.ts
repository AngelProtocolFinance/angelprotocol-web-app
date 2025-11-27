import { URL } from "node:url";
import type { NP } from "./types";

interface Config {
  baseUrl: string;
  apiToken: string;
}
interface Init<T extends string> {
  method?: T extends "GET" ? never : T;
  data?: T extends "GET" ? never : object;
}

export class Nowpayments {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  private request<T extends string>(url: URL, init?: Init<T>) {
    const req = new Request(url, {
      method: init?.method ?? "GET",
      body: init?.data ? JSON.stringify(init.data) : undefined,
    });
    req.headers.set("x-api-key", this.config.apiToken);
    req.headers.set("content-type", "application/json");
    return req;
  }

  private async toJson<T = unknown>(res: Response) {
    if (!res.ok) throw await res.text();
    return res.json() as T;
  }

  async estimate(token_code: string) {
    const params: NP.Estimate.Params = {
      currency_from: token_code,
      fiat_equivalent: "usd",
    };
    const url = new URL(this.config.baseUrl);
    url.pathname = "v1/min-amount";
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
    return fetch(this.request(url))
      .then<Required<NP.Estimate>>(this.toJson)
      .then(({ min_amount: min, fiat_equivalent: min_usd }) => {
        const rate = min_usd / min;
        return { rate, min_usd, min };
      });
  }
  async payment_invoice(payload: NP.Payment.Request) {
    const url = new URL(this.config.baseUrl);
    url.pathname = "v1/invoice-payment";

    return fetch(
      this.request(url, { method: "POST", data: payload })
    ).then<NP.NewPayment>(this.toJson);
  }

  async invoice(payload: NP.Invoice.Request) {
    const url = new URL(this.config.baseUrl);
    url.pathname = "v1/invoice";

    return fetch(
      this.request(url, { method: "POST", data: payload })
    ).then<NP.Invoice>(this.toJson);
  }

  async get_payment_invoice(payment_id: number) {
    const url = new URL(this.config.baseUrl);
    url.pathname = `v1/payment/${payment_id}`;
    return fetch(this.request(url)).then<NP.PaymentStatus>(this.toJson);
  }
}
