import { coingecko_api_key } from ".server/env";

interface IPriceByKey {
  [address_or_coin_id: string]: { usd?: number } | undefined;
}

export const usd_rate = async (
  path: string,
  asset_key: string
): Promise<number> => {
  const res = await fetch(`https://api.coingecko.com/${path}`, {
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": coingecko_api_key,
    },
  });
  if (!res.ok) throw res;
  return res.json().then((x: IPriceByKey) => x?.[asset_key]?.usd ?? 0);
};
