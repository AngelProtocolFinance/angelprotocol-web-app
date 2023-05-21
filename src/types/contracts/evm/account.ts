import { Tupleable } from "../../evm";

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
