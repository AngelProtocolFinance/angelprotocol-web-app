import { EndowmentState, IERC20, ProtocolFeeRates } from "services/types";
import { BridgeFees } from "types/aws";
import { EndowmentType } from "types/lists";
import { AccountType } from "types/lists";

export type Amount = {
  tokenId: string; //
  value: string;
  balance: string;
};

export type WithdrawerProps = {
  balances: IERC20[];
  accountType: AccountType;
  bridgeFees: BridgeFees;
  protocolFeeRates: ProtocolFeeRates;
  endowmentState: EndowmentState;
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
  accountType: AccountType;
  endowFeeRates: EndowFeeRates;
  maturityTime: number;
} & Pick<
  WithdrawerProps,
  "accountType" | "bridgeFees" | "protocolFeeRates" | "endowmentState"
>;

export type FormProps = {};

export type FV = {
  amounts: Amount[];
  destinationChainId: string;
  beneficiaryType: "wallet" | "endowment";
  beneficiaryWallet: string;
  beneficiaryEndowmentId: number;
} & FormMeta;
