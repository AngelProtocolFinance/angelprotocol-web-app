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
  savings: number;
  sustainability: number;
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

const projectFn = (savAmt: number, susAmt: number) => {
  return (yrs: number): GrowthProjection => {
    const totalSav = compoundGrowth(savAmt, 0.04, yrs);
    const totalSus = compoundGrowth(susAmt, 0.2, yrs);

    const savGrowth = totalSav - savAmt * yrs;
    const susGrowth = totalSus - susAmt * yrs;

    return {
      savings: savGrowth,
      sustainability: susGrowth,
      combined: savGrowth + susGrowth,
    };
  };
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

  // Better Giving constants
  const processinFee = 0.02;
  const donorCoverage = 0.8;
  const effectiveRate = processinFee * (1 - donorCoverage);
  const donorDropoffFactor = 0.5;

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

  // Sum the weights of missing donation types
  const missedOpportunities = missingTypes.reduce(
    (sum, type) => sum + (donationTypeWeights[type] || 0),
    0
  );

  // Calculate additional donations
  const additionalFromTypes = amnt * missedOpportunities * donorDropoffFactor;

  // Base Better Giving donation amount
  const bgAmount = netAfterFees + additionalFromTypes;

  // Calculate fee savings
  const yearlyIncrease = bgAmount - currentAmountReceived;
  const feeSavings = yearlyIncrease - additionalFromTypes;

  // Calculate investment amounts
  const notGranted = bgAmount * state.donationsToSavings;
  const savings = notGranted * (1 - state.savingsInvested);
  const invested = notGranted * state.savingsInvested;

  // Create a specialized projection calculator for our specific yields
  const project = projectFn(savings, invested);

  // Calculate growth projections for different years
  const y1Growth = project(1);
  const y3Growth = project(3);
  const y5Growth = project(5);

  // Optional projections for 10, 15, 20 years
  const y10Growth = projectionYears >= 10 ? project(10) : undefined;
  const y15Growth = projectionYears >= 15 ? project(15) : undefined;
  const y20Growth = projectionYears >= 20 ? project(20) : undefined;

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
