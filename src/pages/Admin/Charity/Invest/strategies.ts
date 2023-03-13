/** strategies placeholder */

export type Strategy = {
  name: string;
  description: string;
  providerName: string;
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

const userBalance: Strategy["balances"] = { locked: 1000, liquid: 1000 };

const strategy: Strategy = {
  name: "Investment Option Name",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius ipsum velaliq imperdiet. Sed porttitor nibh sit amet molestie commodo. Etiam aliquet ex magna, vestibulum dignissim nibh commodo non. Praesent congue maximus viverra. Etiam rhoncus imperdiet gravida.",
  providerName: "Provider Name & URL",
  rating: "AAA",
  type: "Uncollateralized Lending",
  apy: 5.2,
  invested: 500,
  balances: userBalance,
};

export const strategies: Strategy[] = Array(3).fill(strategy);
