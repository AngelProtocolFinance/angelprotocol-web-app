import { unmask } from "../dollar-mask";
import { type State, methodsArr } from "../types";

const donationTypeWeights: { [key: string]: number } = {
  "credit-card": 0.63,
  ach: 0.1,
  "digital-wallets": 0.07,
  daf: 0.12,
  stocks: 0.06,
  crypto: 0.02,
};

// Helper function for compound growth over one year with daily compounding
const compoundGrowthYearOne = (amount: number, annualRate: number): number => {
  const dailyRate = annualRate / 365;
  let total = amount;
  for (let day = 0; day < 365; day++) {
    total *= 1 + dailyRate;
  }
  return total;
};

export function getBgAmount(state: State): {
  donationAmount: number;
  yearOneInvestmentGrowth: number;
  yearOneSavingsGrowth: number;
  yearOneSustainabilityGrowth: number;
  totalWithInvestment: number;
  feeSavings: number;
  additionalFromTypes: number;
  totalAnnualImpact: number;
} {
  // Parse and normalize inputs
  const amnt = unmask(state.annualAmount);
  const subscriptionCost = unmask(state.annualSubscriptionCost);
  const processingFeeRate = state.averageProcessingFee;
  const platformFeeRate = state.platformFees;
  const savingsAllocation = state.savingsInvested;
  const sustainabilityAllocation = 1 - state.savingsInvested;

  // Better Giving constants
  const bgProcessingFeeRate = 0.02;
  const bgDonorCoverage = 0.8;
  const bgEffectiveRate = bgProcessingFeeRate * (1 - bgDonorCoverage);
  const donorDropoffFactor = 0.5;

  // Investment constants
  const savingsYield = 0.04;
  const sustainabilityReturn = 0.2;

  // Calculate current amount received
  const effectiveProcessingFeeRate = state.donorCanCoverProcessingFees
    ? processingFeeRate * (1 - 0.8)
    : processingFeeRate;
  const currentAmountReceived =
    amnt -
    amnt * effectiveProcessingFeeRate -
    amnt * platformFeeRate -
    subscriptionCost;

  // Calculate net amount after Better Giving fees
  const netAfterFees = amnt * (1 - bgEffectiveRate);

  // Identify missing donation types
  const enabledTypes = new Set(state.donationTypes);
  const allTypes = methodsArr;
  const missingTypes = allTypes.filter((type) => !enabledTypes.has(type));

  // Sum the weights of missing donation types using for...of
  let missedOpportunities = 0;
  for (const type of missingTypes) {
    if (type in donationTypeWeights) {
      missedOpportunities += donationTypeWeights[type];
    }
  }

  // Calculate additional donations
  const additionalFromTypes = amnt * missedOpportunities * donorDropoffFactor;

  // Base Better Giving donation amount
  const donationAmount = netAfterFees + additionalFromTypes;

  // Calculate fee savings
  const yearlyIncrease = donationAmount - currentAmountReceived;
  const feeSavings = yearlyIncrease - additionalFromTypes;

  // Calculate investment opportunity for Year 1
  const annualInvestmentAmount = donationAmount * state.donationsToSavings;
  const annualSavingsAmount = annualInvestmentAmount * savingsAllocation;
  const annualSustainabilityAmount =
    annualInvestmentAmount * sustainabilityAllocation;

  const yearOneSavings = compoundGrowthYearOne(
    annualSavingsAmount,
    savingsYield
  );
  const yearOneSustainability = compoundGrowthYearOne(
    annualSustainabilityAmount,
    sustainabilityReturn
  );

  const yearOneSavingsGrowth = yearOneSavings - annualSavingsAmount;
  const yearOneSustainabilityGrowth =
    yearOneSustainability - annualSustainabilityAmount;
  const yearOneInvestmentGrowth =
    yearOneSavingsGrowth + yearOneSustainabilityGrowth;

  // Total including investment growth
  const totalWithInvestment = donationAmount + yearOneInvestmentGrowth;

  // Total annual impact (processing impact + investment impact)
  const totalAnnualImpact = yearlyIncrease + yearOneInvestmentGrowth;

  return {
    donationAmount,
    yearOneInvestmentGrowth,
    yearOneSavingsGrowth,
    yearOneSustainabilityGrowth,
    totalWithInvestment,
    feeSavings,
    additionalFromTypes,
    totalAnnualImpact,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
