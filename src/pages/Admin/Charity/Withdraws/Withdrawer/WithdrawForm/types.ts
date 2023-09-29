import {
  EndowmentState,
  IERC20,
  ProtocolFeeRates,
  WithdrawEndowBeneficiary,
} from "services/types";
import { BridgeFees } from "types/aws";
import { BeneficiaryType, EndowmentType } from "types/lists";
import { AccountType } from "types/lists";
import { WithdrawEndowSource } from "../Context";

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
  closedEndowSources: WithdrawEndowSource[];
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
  thisEndowId: number;
} & Pick<
  WithdrawerProps,
  | "accountType"
  | "endowmentState"
  | "bridgeFees"
  | "protocolFeeRates"
  | "closedEndowSources"
>;

export type FormProps = {};

export type FV = {
  amounts: Amount[];
  destinationChainId: string;
  beneficiaryType: BeneficiaryType;
  beneficiaryWallet: string;
  beneficiaryEndowment: WithdrawEndowBeneficiary;
} & FormMeta;
