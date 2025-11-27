import type { ITicker } from "lib/nav";
import { coingecko_api_key, finnhub_api_key } from ".server/env";

export async function update_tickers(tickers: ITicker[]): Promise<ITicker[]> {
  const new_tickers: ITicker[] = [];
  for (const t of tickers) {
    // only update date for cash
    if (t.id === "CASH") {
      new_tickers.push({ ...t, price_date: new Date().toISOString() });
      continue;
    }

    if (t.id === "BTC" || t.id === "ETH") {
      const id = t.id === "BTC" ? "bitcoin" : "ethereum";
      const url = new URL(`https://api.coingecko.com/api/v3/coins/${id}/ohlc`);
      url.searchParams.set("vs_currency", "usd");
      url.searchParams.set("days", "1");
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": coingecko_api_key,
        },
      });
      if (!res.ok) throw res;
      const data: any = await res.json();
      const [[timestamp, _o, _h, _l, c]] = data;
      const updated: ITicker = {
        id: t.id,
        qty: t.qty,
        price_date: new Date(timestamp).toISOString(),
        price: c,
        value: t.qty * c,
      };
      new_tickers.push(updated);
      continue;
    }

    const url = new URL("https://finnhub.io/api/v1/quote");
    url.searchParams.set("token", finnhub_api_key);
    url.searchParams.set("symbol", t.id);

    const res = await fetch(url);
    if (!res.ok) throw res;

    const { c, t: timestamp }: any = await res.json();

    const updated: ITicker = {
      id: t.id,
      qty: t.qty,
      price_date: new Date(timestamp * 1000).toISOString(),
      price: c,
      value: t.qty * c,
    };
    new_tickers.push(updated);
  }
  return new_tickers;
}
