type Quotation = {
  [index: string]: {
    usd: number;
  };
};

export const USD = async (coinId: string): Promise<number> =>
  fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
  )
    .then<Quotation>((res) => {
      if (!res.ok) throw new Error("Failed to fetch USD value");
      return res.json();
    })
    .then((data) => data[coinId].usd);
