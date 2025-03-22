export const methods: { [id: string]: string } = {
  "credit-card": "Credit Card",
  ach: "ACH (Bank Transfer)",
  "digital-wallets": "Digital Wallets",
  crypto: "Crypto",
  stocks: "Stocks",
  daf: "DAF",
};

export const methodsArr = Object.keys(methods);

export interface State {
  annualAmount: string;
  averageProcessingFee: number;
  platformFees: number;
  annualSubscriptionCost: string;
  donorCanCoverProcessingFees: boolean;
  /** credit-card, ach, digital-wallets, crypto, stocks, daf */
  donationTypes: string[];

  donationsToSavings: number;
  savingsInvested: number;
}
