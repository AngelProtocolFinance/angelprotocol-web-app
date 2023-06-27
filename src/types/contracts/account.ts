import { OverrideProperties } from "type-fest";
import {
  AngelCoreStruct as AccountDepositWithdrawEndowmentsCoreStruct,
  AccountMessages as AccountDepositWithdrawEndowmentsMessages,
} from "../typechain-types/contracts/core/accounts/facets/AccountsDepositWithdrawEndowments";
import { AccountMessages as AccountsUpdateEndowmentSettingsControllerMessages } from "../typechain-types/contracts/core/accounts/facets/AccountsUpdateEndowmentSettingsController";
import {
  AccountMessages,
  AccountStorage,
  AngelCoreStruct,
} from "../typechain-types/contracts/core/accounts/interfaces/IAccounts";
import { EndowmentType } from "../lists";
import { Mapped, Plain } from "../utils";
import { SplitDetails } from "./common";

type BeneficiaryData = OverrideProperties<
  AngelCoreStruct.BeneficiaryDataStruct,
  { endowId: number; fundId: number; addr: string }
>;

/**
 * 0 Endowment
 * 1 IndexFund
 * 2 Wallet
 * 3 None
 */
export type Beneficiary = OverrideProperties<
  AngelCoreStruct.BeneficiaryStruct,
  { data: BeneficiaryData; enumData: 0 | 1 | 2 | 3 }
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
  AngelCoreStruct.DelegateStruct,
  {
    addr: string | ADDRESS_ZERO;
    expires: number; // datetime int of delegation expiry: 0 if no expiry
  }
>;

export type SettingsPermission = OverrideProperties<
  AngelCoreStruct.SettingsPermissionStruct,
  {
    locked: boolean;
    delegate: Delegate;
  }
>;

export type SettingsController = Mapped<
  AngelCoreStruct.SettingsControllerStruct,
  SettingsPermission
>;

export type EndowmentDetails = OverrideProperties<
  Pick<
    Plain<AccountStorage.EndowmentStruct>,
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
    splitToLiquid: SplitDetails;
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
  Plain<AccountsUpdateEndowmentSettingsControllerMessages.UpdateEndowmentSettingsRequestStruct>,
  { id: number; splitToLiquid: SplitDetails; maturityTime: number }
>;

export type CloseEndowmentRequest = {
  id: number;
  beneficiary: Beneficiary;
};

type DepositRequest = Mapped<
  AccountDepositWithdrawEndowmentsMessages.DepositRequestStruct,
  number
>;

export type ERC20Deposit = {
  details: DepositRequest;
  tokenAddress: string;
  amount: string;
};

export type Fee = OverrideProperties<
  Plain<AngelCoreStruct.FeeSettingStruct>,
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

export type NewAST = OverrideProperties<
  Plain<AccountMessages.CreateEndowmentRequestStruct>,
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
    splitToLiquid: SplitDetails;
    referralId: number;
  }
>;

export type Token = OverrideProperties<
  AccountDepositWithdrawEndowmentsCoreStruct.TokenInfoStruct,
  {
    addr: string;
    amnt: string;
  }
>;
