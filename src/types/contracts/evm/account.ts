import { Tupleable } from "../../evm";
import { SettingsController } from "../account";

type Categories = { sdgs: number[]; general: number[] };

type EndowTier = 0; // none | 1 Level1 | 2 Level2 | 3; Level3

//use normal by default
type EndowType = /** 0 - charity  */ 1 /** normal */ /** | 2 - none */;

//use percentage by default
type Threshold = {
  //0 - absolute count
  enumData: 1; //absolute percentage
  data: {
    weight: number; //absolute count
    percentage: number; //absolute percentage
    threshold: number; // threshold quorum
    quorum: number; // threshold quorum
  };
  //2 - threshold quorum
};

/**
 * 0 - height
 * 1 - time
 */
type Duration = {
  enumData: /** 0 | */ 1;
  data: { height: number; time: number };
};

/**
 * 0 - locked
 * 1 - liquid
 * 2 - none
 */
export type AccountType = 0 | 1 | 2;

export type ADDRESS_ZERO = "0x0000000000000000000000000000000000000000" & {
  __type: "address_zero";
};

export type Fee = {
  payoutAddress: string | ADDRESS_ZERO;
  feePercentage: number; //0-100
  active: boolean;
};

export type TokenData = {
  existingCw20Data: string | ADDRESS_ZERO;
  newCw20InitialSupply: number;
  newCw20Name: string;
  newCw20Symbol: string;
  bondingCurveCurveType: {
    curve_type: 0; //constant | 1 linear | 2 sqrt;
    data: {
      value: number; //constant
      scale: number; //linear
      slope: number; //sqrt
      power: number; //sqrt
    };
  };
  bondingCurveName: string;
  bondingCurveSymbol: string;
  bondingCurveDecimals: number;
  bondingCurveReserveDenom: string | ADDRESS_ZERO;
  bondingCurveReserveDecimals: number;
  bondingCurveUnbondingPeriod: number;
};

export type DaoToken = {
  token: 0; //existingCW20 | 1 newCW20 | 2 bondingCurve;
  data: TokenData;
};

export type DaoSetup = {
  quorum: number; //: Decimal,
  threshold: number; //: Decimal,
  votingPeriod: number; //: u64,
  timelockPeriod: number; //: u64,
  expirationPeriod: number; //: u64,
  proposalDeposit: number; //: Uint128,
  snapshotPeriod: number; //: u64,
  token: DaoToken;
};

type SplitDetails = {
  min: number;
  max: number;
  defaultSplit: number;
};

/**
 * 0 - endowment
 * 1 - indexfund
 * 2 - wallet
 * 3 - none
 */
export type Beneficiary = {
  data: {
    id: number; //for index-fund or endowment
    addr: string; // wallet
  };
  enumData: 0 | 1 | 2 | 3;
};

export interface NewAST extends Tupleable {
  owner: string;
  withdrawBeforeMaturity: true; //not specified in launchpad design
  maturityTime: number;
  maturityHeight: 0; //not used in endowment  creation
  name: string;
  categories: Categories;
  tier: EndowTier; //not specified in launchpad design
  endow_type: EndowType; //not used in endowment creation
  logo: string;
  image: "";
  cw4_members: string[]; // in launchpad design, weight is specified for each member
  kycDonorsOnly: false; //not specified in launchpad design
  cw3Threshold: Threshold;
  cw3MaxVotingPeriod: Duration;

  whitelistedBeneficiaries: string[];
  whitelistedContributors: string[];

  //splits
  splitMax: number;
  splitMin: number;
  splitDefault: number;

  //fees
  earningsFee: Fee;
  withdrawFee: Fee;
  depositFee: Fee;
  aumFee: Fee; //not included in launchpad, for edit later

  //dao
  dao: DaoSetup; //just set to placeholder - overriden by creatDao:bool
  createDao: false; //not included in launchpad, for edit later
  proposalLink: 0;

  settingsController: SettingsController; //not included in launchpad, for edit later
  parent: number;

  maturityWhitelist: string[];
  ignoreUserSplits: boolean;
  splitToLiquid: SplitDetails;

  // referral_id: number; TODO: add later
}

type DepositRequest = {
  id: number;
  lockedPercentage: number;
  liquidPercentage: number;
};

export interface ERC20Deposit extends Tupleable {
  details: DepositRequest;
  token: string;
  amount: string;
}
