import { OverrideProperties } from "type-fest";
import {
  AccountMessages,
  AccountStorage,
  AngelCoreStruct,
} from "../typechain-types/contracts/core/accounts/IAccounts";
import { AccountMessages as AccountsUpdateEndowmentSettingsControllerMessages } from "../typechain-types/contracts/core/accounts/facets/AccountsUpdateEndowmentSettingsController";
import { EndowmentType, UNSDG_NUMS } from "../lists";
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

/**
 * 0 - locked
 * 1 - liquid
 * 2 - none
 */
export type AccountType = 0 | 1 | 2;

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

export type SettingsControllerUpdate = OverrideProperties<
  AccountsUpdateEndowmentSettingsControllerMessages.UpdateEndowmentControllerRequestStruct,
  { id: number; settingsController: SettingsController }
>;

export type EndowmentSettingsUpdate = OverrideProperties<
  Plain<AccountsUpdateEndowmentSettingsControllerMessages.UpdateEndowmentSettingsRequestStruct>,
  { id: number; splitToLiquid: SplitDetails }
>;

type DurationData = Mapped<AngelCoreStruct.DurationDataStruct, number>;
/**
 * 0 - height
 * 1 - time
 */
type Duration = OverrideProperties<
  AngelCoreStruct.DurationStruct,
  { data: DurationData; enumData: 0 | 1 }
>;

export type Fee = OverrideProperties<
  Plain<AngelCoreStruct.EndowmentFeeStruct>,
  { feePercentage: number }
>;

type VETypeData = Mapped<AngelCoreStruct.VeTypeDataStruct, number>;

/**
 * 0 - constant
 * 1 - linear
 * 2 - sqrt
 */
type VEType = OverrideProperties<
  AngelCoreStruct.VeTypeStruct,
  { ve_type: 0 | 1 | 2; data: VETypeData }
>;

type DaoTokenData = OverrideProperties<
  Plain<AngelCoreStruct.DaoTokenDataStruct>,
  {
    newCw20InitialSupply: string;
    bondingveveType: VEType;
    bondingveDecimals: number;
    bondingveReserveDecimals: number;
    bondingveUnbondingPeriod: number;
  }
>;

/**
 * 0 - existing CW20
 * 1 - new CW20
 * 2 - bonding curve
 */
type DaoToken = OverrideProperties<
  AngelCoreStruct.DaoTokenStruct,
  {
    token: 0 | 1 | 2;
    data: DaoTokenData;
  }
>;

type DaoSetup = OverrideProperties<
  Mapped<AngelCoreStruct.DaoSetupStruct, number>,
  { token: DaoToken }
>;

export type NewAST = OverrideProperties<
  Plain<AccountMessages.CreateEndowmentRequestStruct>,
  {
    maturityTime: number;
    maturityHeight: number;
    categories: Categories;
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
    endow_type: 0 | 1 | 2;
    threshold: number;
    cw3MaxVotingPeriod: Duration;
    splitMax: number;
    splitMin: number;
    splitDefault: number;
    earningsFee: Fee;
    withdrawFee: Fee;
    depositFee: Fee;
    balanceFee: Fee;
    dao: DaoSetup;
    proposalLink: number;
    settingsController: SettingsController;
    parent: number;
    splitToLiquid: SplitDetails;
    referralId: number;
  }
>;
