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

const userBalance: TStrategy["balances"] = { locked: 300, liquid: 200 };

const strategy: TStrategy = {
  name: "Investment Option Name",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius ipsum velaliq imperdiet. Sed porttitor nibh sit amet molestie commodo. Etiam aliquet ex magna, vestibulum dignissim nibh commodo non. Praesent congue maximus viverra. Etiam rhoncus imperdiet gravida.",
  provider: { name: "Provider Name & URL", url: "https://google.com" },
  rating: "AAA",
  type: "Uncollateralized Lending",
  apy: 5.2,
  invested: 500,
  balances: userBalance,
};

export const strategies: TStrategy[] = Array(3).fill(strategy);
