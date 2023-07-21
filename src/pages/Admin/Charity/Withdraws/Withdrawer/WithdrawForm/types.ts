import { IERC20, ProtocolFeeRates } from "services/types";
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
};

export type EndowFeeRates = {
  earlyLockedWithdrawBps: number;
  withdrawBps: number;
  depositBps: number;
};

export type FV = {
  amounts: Amount[];
  destinationChainId: string;
  //FUTURE: support endowement | index-fund
  beneficiaryWallet: string;

  //meta
  _amounts: string; //collective amounts error
  endowType: EndowmentType;
  accountType: AccountType;
  endowFeeRates: EndowFeeRates;
} & Pick<WithdrawerProps, "accountType" | "bridgeFees" | "protocolFeeRates">;
