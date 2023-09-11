import { OverrideProperties } from "type-fest";
import {
  AccountMessages as AccountDepositWithdrawEndowmentsMessages,
  IAccountsDepositWithdrawEndowments,
} from "../typechain-types/contracts/core/accounts/facets/AccountsDepositWithdrawEndowments";
import { AccountMessages as AccountsQueryEndowmentsMessages } from "../typechain-types/contracts/core/accounts/facets/AccountsQueryEndowments";
import { AccountMessages as AccountsStrategyMessages } from "../typechain-types/contracts/core/accounts/facets/AccountsStrategy";
import { AccountMessages as AccountsUpdateEndowmentSettingsControllerMessages } from "../typechain-types/contracts/core/accounts/facets/AccountsUpdateEndowmentSettingsController";
import {
  AccountMessages,
  LibAccounts,
} from "../typechain-types/contracts/core/accounts/interfaces/IAccounts";
import { EndowmentType } from "../lists";
import { Mapped } from "../utils";

type BeneficiaryData = OverrideProperties<
  LibAccounts.BeneficiaryDataStruct,
  { endowId: number }
>;

export type AccountsSplitDetails = Mapped<
  LibAccounts.SplitDetailsStruct,
  number
>;

/**
 * 0 Endowment
 * 1 Wallet
 * 2 None (treasury)
 */
export type Beneficiary = OverrideProperties<
  LibAccounts.BeneficiaryStruct,
  { data: BeneficiaryData; enumData: 0 | 1 | 2 }
>;

export type ADDRESS_ZERO = "0x0000000000000000000000000000000000000000" & {
  __type: "address_zero";
};

//transformed GenericBalance
export type GenericBalMap = { native: string } & { [index: string]: string }; //erc20s

export interface BalanceInfo {
  locked: GenericBalMap;
  liquid: GenericBalMap;
}

/**
 * 0 - locked
 * 1 - liquid
 * 2 - none
 */
export type AccountType = 0 | 1 | 2;

export type EndowmentState = OverrideProperties<
  AccountMessages.StateResponseStruct,
  {
    closingEndowment: boolean;
    closingBeneficiary: Beneficiary;
  }
>;

export interface Strategy {
  vault: string; // Vault SC Address
  percentage: string; // percentage of funds to invest
}

type Vaults<T> = {
  liquid: T;
  locked: T;
};

export type AccountStrategies = Vaults<Strategy[]>;

export type Delegate = OverrideProperties<
  LibAccounts.DelegateStruct,
  {
    addr: string | ADDRESS_ZERO;
    expires: number; // datetime int of delegation expiry: 0 if no expiry
  }
>;

export type SettingsPermission = OverrideProperties<
  LibAccounts.SettingsPermissionStruct,
  {
    locked: boolean;
    delegate: Delegate;
  }
>;

export type SettingsController = Mapped<
  LibAccounts.SettingsControllerStruct,
  SettingsPermission
>;

export type EndowmentDetails = OverrideProperties<
  Pick<
    AccountsQueryEndowmentsMessages.EndowmentResponseStruct,
    | "owner"
    | "endowType"
    | "maturityTime"
    | "allowlistedBeneficiaries"
    | "allowlistedContributors"
    | "maturityAllowlist"
    | "donationMatchActive"
    | "settingsController"
    | "ignoreUserSplits"
    | "splitToLiquid"
    | "earlyLockedWithdrawFee"
    | "withdrawFee"
    | "depositFee"
    | "balanceFee"
  >,
  {
    endowType: EndowmentType;
    maturityTime: number;
    settingsController: SettingsController;
    splitToLiquid: AccountsSplitDetails;
    earlyLockedWithdrawFee: Fee;
    withdrawFee: Fee;
    depositFee: Fee;
    balanceFee: Fee;
  }
>;

export type Holding = { address: string; amount: string };
export interface Holdings {
  locked_native: Holding[];
  locked_cw20: Holding[];
  liquid_native: Holding[];
  liquid_cw20: Holding[];
  is_placeholder?: true;
}

export interface Source {
  locked: string; //"0"
  liquid: string; //"0"
  vault: string; //"juno123addr.."
}

export type UpdateStategyPayload = {
  id: number;
  acct_type: AccountType;
  strategies: Strategy[];
};

export type SettingsControllerUpdate = OverrideProperties<
  AccountsUpdateEndowmentSettingsControllerMessages.UpdateEndowmentControllerRequestStruct,
  { id: number; settingsController: SettingsController }
>;

export type EndowmentSettingsUpdate = OverrideProperties<
  AccountsUpdateEndowmentSettingsControllerMessages.UpdateEndowmentSettingsRequestStruct,
  { id: number; splitToLiquid: AccountsSplitDetails; maturityTime: number }
>;

export type CloseEndowmentRequest = {
  id: number;
  beneficiary: Beneficiary;
};

type DepositRequest = OverrideProperties<
  AccountDepositWithdrawEndowmentsMessages.DepositRequestStruct,
  {
    id: number;
    lockedPercentage: number;
    liquidPercentage: number;
    donationMatch: string;
  }
>;

export type ERC20Deposit = {
  details: DepositRequest;
  tokenAddress: string;
  amount: string;
};

export type Fee = OverrideProperties<
  LibAccounts.FeeSettingStruct,
  { bps: number }
>;

export type FeeSettingsUpdate = OverrideProperties<
  AccountsUpdateEndowmentSettingsControllerMessages.UpdateFeeSettingRequestStruct,
  {
    id: number;
    earlyLockedWithdrawFee: Fee;
    depositFee: Fee;
    withdrawFee: Fee;
    balanceFee: Fee;
  }
>;

// function params not exporter separately
/**
 * types
 * 0 - beneficiaries
 * 1 - contributors
 * 2 - maturity
 */
export type AllowlistUpdate = {
  id: number;

  allowlistType: number;
  add: string[];
  remove: string[];
};

export type NewAST = OverrideProperties<
  AccountMessages.CreateEndowmentRequestStruct,
  {
    maturityTime: number;
    sdgs: number[];
    /**
     * 0 - none
     * 1 - Level 1
     * 2 - Level 2
     * 3 - Level 3
     */
    tier: 0 | 1 | 2 | 3;
    /**
     * 0 - charity
     * 1 - normal
     * 2 - none
     */
    endowType: 0 | 1 | 2;
    threshold: number;
    duration: number;
    earlyLockedWithdrawFee: Fee;
    withdrawFee: Fee;
    depositFee: Fee;
    balanceFee: Fee;
    proposalLink: number;
    settingsController: SettingsController;
    parent: number;
    splitToLiquid: AccountsSplitDetails;
    referralId: number;
  }
>;

export type Token = OverrideProperties<
  IAccountsDepositWithdrawEndowments.TokenInfoStruct,
  {
    addr: string;
    amnt: string;
  }
>;

export type InvestRequest = Mapped<
  AccountsStrategyMessages.InvestRequestStruct,
  string
>;

//no standalone type
export type InvestPayload = {
  id: number;
  investRequest: InvestRequest;
};
