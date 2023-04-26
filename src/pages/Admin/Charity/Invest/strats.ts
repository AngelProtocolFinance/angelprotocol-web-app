/** strategies placeholder */
import { TStrategy } from "types/aws";

export const strategies: TStrategy[] = [
  {
    strategy_key: "0x00001",
    chain_id: "80001",
    apy: 7.8,
    contract: "0x5A0801BAd20B6c62d86C566ca90688A6b9ea1d3f",
    description:
      "The Senior Pool is a pool of capital that is diversified across all Borrower Pools on the Goldfinch protocol. Liquidity Providers (LPs) who provide capital into the Senior Pool are capital providers in search of passive, diversified exposure across all Borrower Pools. This capital is protected by junior (first-loss) capital in each Borrower Pool.",
    icon: "https://app.goldfinch.finance/favicon-32x32.png",
    market_cap: 79350864,
    name: "Goldfinch Senior Pool (Coming Soon)",
    provider: {
      icon: "https://app.goldfinch.finance/favicon-32x32.png",
      name: "Goldfinch",
      url: "https://goldfinch.finance/",
    },
    rating: "-",
    type: "Uncollateralized Lending",
    vaults: {
      liquid: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      locked: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    },
    website: "https://app.goldfinch.finance/pools/senior",
  },
];
