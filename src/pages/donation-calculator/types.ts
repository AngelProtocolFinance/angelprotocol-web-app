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
  processingFeeRate: number;
  platformFeeRate: number;
  annualSubscriptionCost: string;
  donorCanCoverProcessingFees: boolean;
  /** credit-card, ach, digital-wallets, crypto, stocks, daf */
  donationTypes: string[];

  donationsToSavings: number;
  savingsInvested: number;
}

export interface Growth {
  liq: number;
  lock: number;
  total: number;
  end: Omit<Growth, "end">;
}

export interface View {
  amount: number;
  ogMissedFromDonTypes: number;
  ogProcessingFeeRate: number;
  ogPlatformFeeRate: number;
  ogSubsCost: number;
  ogFees: number;
  ogDeductions: number;
  ogNet: number;

  bgFees: number;
  bgNet: number;

  feeSavings: number;
  advantage: number;

  notGranted: number;
  notGrantedRate: number;
  savingsRate: number;
  savings: number;
  investedRate: number;
  invested: number;

  projection: Growth[];
}
