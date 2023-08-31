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
  endowmentState: EndowmentState;
} & Pick<FeeRates, "bridgeFees" | "protocolFeeRates">;

export type EndowFeeRates = {
  earlyLockedWithdrawBps: number;
  withdrawBps: number;
  depositBps: number;
};

type FeeRates = {
  endowFeeRates: EndowFeeRates;
  protocolFeeRates: ProtocolFeeRates;
  bridgeFees: BridgeFees;
};

/** data that isn't represented by any form UI */
export type FormMeta = {
  _amounts: string; //collective amounts error
  endowType: EndowmentType;
  maturityTime: number;
} & Pick<WithdrawerProps, "accountType" | "endowmentState">;

export type FormProps = {};

export type FV = {
  amounts: Amount[];
  destinationChainId: string;
  beneficiaryType: "wallet" | "endowment";
  beneficiaryWallet: string;
  beneficiaryEndowmentId: number;
} & FormMeta;

/** NEW TYPES */

type BeneficiaryType = "wallet" | "endowment";

export type BaseFormMeta = {
  _amounts: string; //collective amounts error
};

export type BaseFormValues = {
  amounts: Amount[];
};

type ClosedAccountFormMeta = BaseFormMeta &
  FeeRates & {
    accountType: AccountType;
    endowmentType: EndowmentType;
  };

export type ClosedAccountFormValues = BaseFormValues &
  ClosedAccountFormMeta & {
    destinationChainId: string;
  };

type DAFFormValues = BaseFormValues & BaseFormMeta;

type CharityFormMeta = BaseFormMeta & FeeRates & { accountType: AccountType };

type CharityFormValues = BaseFormValues &
  CharityFormMeta & {
    destinationChainId: string;
    beneficiaryType: BeneficiaryType;
    beneficiaryWallet: string;
    beneficiaryEndowmentId: number;
  };

type ASTFormMeta = CharityFormMeta & { maturityTime: number };
type ASTFormValues = CharityFormValues & ASTFormMeta;
