import { EndowmentState, IERC20, ProtocolFeeRates } from "services/types";
import { BridgeFees } from "types/aws";
import { BeneficiaryType, EndowmentType } from "types/lists";
import { AccountType } from "types/lists";

export type Amount = {
  tokenId: string; //
  value: string;
  balance: string;
};

export type WithdrawerProps = {
  balances: IERC20[];
  accountType: AccountType;
  endowmentState: EndowmentState;
  bridgeFees: BridgeFees;
  protocolFeeRates: ProtocolFeeRates;
};

export type EndowFeeRates = {
  earlyLockedWithdrawBps: number;
  withdrawBps: number;
  depositBps: number;
};

/** data that isn't represented by any form UI */
export type FormMeta = {
  _amounts: string; //collective amounts error
  endowType: EndowmentType;
  maturityTime: number;
  endowFeeRates: EndowFeeRates;
  endowId: number;
} & Pick<
  WithdrawerProps,
  "accountType" | "endowmentState" | "bridgeFees" | "protocolFeeRates"
>;

export type FormProps = {};

export type FV = {
  amounts: Amount[];
  destinationChainId: string;
  beneficiaryType: BeneficiaryType;
  beneficiaryWallet: string;
  beneficiaryEndowmentId: string;
} & FormMeta;
