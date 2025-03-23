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

// Define a reusable type for growth projections
interface GrowthProjection {
  savings: number; // Renamed from savingsGrowth
  sustainability: number; // Already renamed from sustainabilityGrowth
  combined: number;
}

// Helper function for compound growth over multiple years with daily compounding
const compoundGrowth = (
  annual: number,
  rate: number,
  years: number
): number => {
  const dailyRate = rate / 365;
  const daysPerYear = 365;
  let total = 0;
  for (let year = 0; year < years; year++) {
    total += annual;
    for (let day = 0; day < daysPerYear; day++) {
      total *= 1 + dailyRate;
    }
  }
  return total;
};

interface View {
  bgAmount: number;
  feeSavings: number;
  additionalFromTypes: number;
  yearlyIncrease: number;
  y1Growth: GrowthProjection;
  y3Growth: GrowthProjection;
  y5Growth: GrowthProjection;
  y10Growth?: GrowthProjection;
  y15Growth?: GrowthProjection;
  y20Growth?: GrowthProjection;
  totalAnnualImpact: number;
}

export function bgView(state: State, projectionYears = 5): View {
  // Parse and normalize inputs
  const amnt = unmask(state.annualAmount);
  const subscriptionCost = unmask(state.annualSubscriptionCost);
  const processingFeeRate = state.averageProcessingFee;
  const platformFeeRate = state.platformFees;
  const savingsAllocation = state.savingsInvested;
  const sustainabilityAllocation = 1 - state.savingsInvested;

  // Better Giving constants
  const processinFee = 0.02;
  const donorCoverage = 0.8;
  const effectiveRate = processinFee * (1 - donorCoverage);
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
  const netAfterFees = amnt * (1 - effectiveRate);

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
  const bgAmount = netAfterFees + additionalFromTypes;

  // Calculate fee savings
  const yearlyIncrease = bgAmount - currentAmountReceived;
  const feeSavings = yearlyIncrease - additionalFromTypes;

  // Calculate investment amounts
  const annualInvestmentAmount = bgAmount * state.donationsToSavings;
  const annualSavingsAmount = annualInvestmentAmount * savingsAllocation;
  const annualSustainabilityAmount =
    annualInvestmentAmount * sustainabilityAllocation;

  // Year 1 growth as object literal
  const y1Savings = compoundGrowth(annualSavingsAmount, savingsYield, 1);
  const y1Sustainability = compoundGrowth(
    annualSustainabilityAmount,
    sustainabilityReturn,
    1
  );
  const y1Growth: GrowthProjection = {
    savings: y1Savings - annualSavingsAmount,
    sustainability: y1Sustainability - annualSustainabilityAmount,
    combined:
      y1Savings -
      annualSavingsAmount +
      (y1Sustainability - annualSustainabilityAmount),
  };

  // Year 3 growth as object literal
  const y3Savings = compoundGrowth(annualSavingsAmount, savingsYield, 3);
  const y3Sustainability = compoundGrowth(
    annualSustainabilityAmount,
    sustainabilityReturn,
    3
  );
  const y3Growth: GrowthProjection = {
    savings: y3Savings - annualSavingsAmount * 3,
    sustainability: y3Sustainability - annualSustainabilityAmount * 3,
    combined:
      y3Savings -
      annualSavingsAmount * 3 +
      (y3Sustainability - annualSustainabilityAmount * 3),
  };

  // Year 5 growth as object literal
  const y5Savings = compoundGrowth(annualSavingsAmount, savingsYield, 5);
  const y5Sustainability = compoundGrowth(
    annualSustainabilityAmount,
    sustainabilityReturn,
    5
  );
  const y5Growth: GrowthProjection = {
    savings: y5Savings - annualSavingsAmount * 5,
    sustainability: y5Sustainability - annualSustainabilityAmount * 5,
    combined:
      y5Savings -
      annualSavingsAmount * 5 +
      (y5Sustainability - annualSustainabilityAmount * 5),
  };

  // Optional projections for 10, 15, 20 years
  let y10Growth: GrowthProjection | undefined;
  let y15Growth: GrowthProjection | undefined;
  let y20Growth: GrowthProjection | undefined;

  if (projectionYears >= 10) {
    const y10Savings = compoundGrowth(annualSavingsAmount, savingsYield, 10);
    const y10Sustainability = compoundGrowth(
      annualSustainabilityAmount,
      sustainabilityReturn,
      10
    );
    y10Growth = {
      savings: y10Savings - annualSavingsAmount * 10,
      sustainability: y10Sustainability - annualSustainabilityAmount * 10,
      combined:
        y10Savings -
        annualSavingsAmount * 10 +
        (y10Sustainability - annualSustainabilityAmount * 10),
    };
  }

  if (projectionYears >= 15) {
    const y15Savings = compoundGrowth(annualSavingsAmount, savingsYield, 15);
    const y15Sustainability = compoundGrowth(
      annualSustainabilityAmount,
      sustainabilityReturn,
      15
    );
    y15Growth = {
      savings: y15Savings - annualSavingsAmount * 15,
      sustainability: y15Sustainability - annualSustainabilityAmount * 15,
      combined:
        y15Savings -
        annualSavingsAmount * 15 +
        (y15Sustainability - annualSustainabilityAmount * 15),
    };
  }

  if (projectionYears >= 20) {
    const y20Savings = compoundGrowth(annualSavingsAmount, savingsYield, 20);
    const y20Sustainability = compoundGrowth(
      annualSustainabilityAmount,
      sustainabilityReturn,
      20
    );
    y20Growth = {
      savings: y20Savings - annualSavingsAmount * 20,
      sustainability: y20Sustainability - annualSustainabilityAmount * 20,
      combined:
        y20Savings -
        annualSavingsAmount * 20 +
        (y20Sustainability - annualSustainabilityAmount * 20),
    };
  }

  // Total annual impact for Year 1 (processing impact + combined growth)
  const totalAnnualImpact = yearlyIncrease + y1Growth.combined;

  return {
    bgAmount,
    feeSavings,
    additionalFromTypes,
    yearlyIncrease,
    y1Growth,
    y3Growth,
    y5Growth,
    y10Growth,
    y15Growth,
    y20Growth,
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
