import { FiatWallet } from "./types";

export const fiatWallet: FiatWallet = {
  tokens: [
    {
      min_donation_amnt: 30,
      symbol: "USD",
      logo: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
    },
    {
      min_donation_amnt: 30,
      symbol: "EUR",
      logo: "https://cdn-icons-png.flaticon.com/512/206/206593.png",
    },
    {
      min_donation_amnt: 30,
      symbol: "GBP",
      logo: "https://cdn-icons-png.flaticon.com/512/206/206592.png",
    },
    {
      min_donation_amnt: 30,
      symbol: "AUD",
      logo: "https://cdn-icons-png.flaticon.com/512/206/206618.png",
    },
  ],
};
