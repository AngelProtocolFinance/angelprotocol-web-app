export type RebalanceDetails = {
  // should invested portions of the liquid account be rebalanced?
  rebalanceLiquidInvestedProfits: boolean;
  // should Locked acct interest earned be distributed to the Liquid Acct?
  lockedInterestsToLiquid: boolean;
  // % of Locked acct interest earned to be distributed to the Liquid Acct
  interest_distribution: number;
  // should Locked acct principle be distributed to the Liquid Acct?
  lockedPrincipleToLiquid: boolean;
  // % of Locked acct principle to be distributed to the Liquid Acct
  principle_distribution: number;
};

export type AcceptedTokens = {
  //this may not be final
  //?? erc20
  cw20: string[];
};

export type SplitDetails = {
  max: number;
  min: number;
  defaultSplit: number;
};

export type RegistrarConfig = {
  owner: string;
  applicationsReview: string;
  indexFundContract: string;
  accountsContract: string;
  treasury: string;
  subdaoGovCode: string;
  subdaoCw20TokenCode: string;
  subdaoBondingTokenCode: string;
  subdaoCw900Code: string;
  subdaoDistributorCode: string;
  subdaoEmitter: string;
  donationMatchCode: string;
  donationMatchCharitesContract: string;
  donationMatchEmitter: string;
  splitToLiquid: SplitDetails;
  haloToken: string;
  haloTokenLpContract: string;
  govContract: string;
  collectorAddr: string;
  collectorShare: number;
  charitySharesContract: string;
  acceptedTokens: AcceptedTokens;
  fundraisingContract: string;
  rebalance: RebalanceDetails;
  swapsRouter: string;
  multisigFactory: string;
  multisigEmitter: string;
  charityProposal: string;
  lockedWithdrawal: string;
  proxyAdmin: string;
  usdcAddress: string;
  wethAddress: string;
  cw900lvAddress: string;
};

export type RegistrarOwnerPayload = {
  new_owner: string;
};

export type RegistrarConfigPayload = {
  accountsContract: string;
  taxRate: number;
  rebalance: RebalanceDetails;
  approved_charities: string[];
  splitMax: number;
  splitMin: number;
  splitDefault: number;
  collectorShare: number;
  acceptedTokens: AcceptedTokens;
  subdaoGovCode: string;
  subdaoCw20TokenCode: string;
  subdaoBondingTokenCode: string;
  subdaoCw900Code: string;
  subdaoDistributorCode: string;
  subdaoEmitter: string;
  donationMatchCode: string;
  indexFundContract: string;
  govContract: string;
  treasury: string;
  donationMatchCharitesContract: string;
  donationMatchEmitter: string;
  haloToken: string;
  haloTokenLpContract: string;
  charitySharesContract: string;
  fundraisingContract: string;
  applicationsReview: string;
  swapsRouter: string;
  multisigFactory: string;
  multisigEmitter: string;
  charityProposal: string;
  lockedWithdrawal: string;
  proxyAdmin: string;
  usdcAddress: string;
  wethAddress: string;
  cw900lvAddress: string;
};
