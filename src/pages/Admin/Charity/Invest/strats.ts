/** strategies placeholder */

export type TStrategy = {
  name: string;
  description: string;
  provider: { name: string; url: string };
  rating: string; //"AAA";
  type: string; // "Uncollateralized Lending";
  apy: number; //5.2
  invested: number; // locked + liquid total

  //user balances to be used when investing
  balances: {
    locked: number;
    liquid: number;
  };
};

const userBalance: TStrategy["balances"] = { locked: 0, liquid: 0 };

const strategy: TStrategy = {
  name: "Goldfinch Senior Pool (Coming Soon)",
  description:
    "The Senior Pool is a pool of capital that is diversified across all Borrower Pools on the Goldfinch protocol. Liquidity Providers (LPs) who provide capital into the Senior Pool are capital providers in search of passive, diversified exposure across all Borrower Pools. This capital is protected by junior (first-loss) capital in each Borrower Pool.",
  provider: { name: "Provider Name & URL", url: "https://google.com" },
  rating: "-",
  type: "Uncollateralized Lending",
  apy: 7.8,
  invested: 0,
  balances: userBalance,
};

export const strategies: TStrategy[] = Array(1).fill(strategy);
