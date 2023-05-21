import { OverrideProperties } from "type-fest";
import {
  AccountMessages,
  AccountStorage,
  AngelCoreStruct,
} from "../typechain-types/contracts/core/accounts/IAccounts";
import { AccountType, EndowmentType, UNSDG_NUMS } from "../lists";
import { Mapped, Plain } from "../utils";
import {
  Beneficiary,
  DonationsReceived,
  EndowmentStatusText,
  SplitDetails,
} from "./common";
import { ADDRESS_ZERO } from "./evm";

//transformed GenericBalance
export type GenericBalMap = { native: string } & { [index: string]: string }; //erc20s

export interface BalanceInfo {
  locked: GenericBalMap;
  liquid: GenericBalMap;
}

export type EndowmentState = OverrideProperties<
  AccountMessages.StateResponseStruct,
  {
    donationsReceived: DonationsReceived;
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

export type SettingsController = Mapped<
  AngelCoreStruct.SettingsControllerStruct,
  Delegate
>;

type Categories = OverrideProperties<
  AngelCoreStruct.CategoriesStruct,
  { sdgs: UNSDG_NUMS[]; general: number[] }
>;

export type EndowmentDetails = OverrideProperties<
  Pick<
    Plain<AccountStorage.EndowmentStruct>,
    | "categories"
    | "endow_type"
    | "maturityTime"
    | "allowlistedBeneficiaries"
    | "allowlistedContributors"
    | "maturityAllowlist"
    | "kycDonorsOnly"
    | "donationMatchActive"
    | "settingsController"
    | "ignoreUserSplits"
    | "splitToLiquid"
  >,
  {
    categories: Categories;
    endow_type: EndowmentType;
    maturityTime: number;
    settingsController: SettingsController;
    splitToLiquid: SplitDetails;
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

export interface DepositPayload {
  id: number;
  locked_percentage: string; //"0.7"
  liquid_percentage: string; //"0.3"
}

export type StatusChangePayload = {
  endowment_id: number;
  status: EndowmentStatusText;
  beneficiary?: Beneficiary;
};

export type UpdateStategyPayload = {
  id: number;
  acct_type: AccountType;
  strategies: Strategy[];
};

export type SettingsControllerUpdate = {
  id: number;
  settingsController: SettingsController;
};

export type EndowmentSettingsUpdate = {
  id: number;
  donationMatchActive: boolean; //not used in update
  allowlistedBeneficiaries: string[];
  allowlistedContributors: string[];
  maturity_whitelist_add: string[];
  maturity_whitelist_remove: string[];
  splitToLiquid: SplitDetails; //not used in update
  ignoreUserSplits: boolean; //not used in update
};
