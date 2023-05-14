import { Tupleable } from "../evm";
import { AccountType, EndowmentType } from "../lists";
import { Beneficiary, Categories, EndowmentStatusText } from "./common";
import { ADDRESS_ZERO } from "./evm";

//transformed GenericBalance
export type GenericBalMap = { native: string } & { [index: string]: string }; //erc20s

export interface BalanceInfo {
  locked: GenericBalMap;
  liquid: GenericBalMap;
}

export interface DonationsReceived {
  liquid: string; // uint256
  locked: string; // uint256
}

export interface EndowmentState {
  donationsReceived: DonationsReceived;
  balances: BalanceInfo;
  closingEndowment: boolean;
  closingBeneficiary: Beneficiary;
}

/** 
interface RebalanceDetails {
  rebalance_liquid_invested_profits: boolean; // should invested portions of the liquid account be rebalanced?
  locked_interests_to_liquid: boolean; // should Locked acct interest earned be distributed to the Liquid Acct?
  interest_distribution: string; // % of Locked acct interest earned to be distributed to the Liquid Acct
  locked_principle_to_liquid: boolean; // should Locked acct principle be distributed to the Liquid Acct?
  principle_distribution: string; // % of Locked acct principle to be distributed to the Liquid Acct
} */

export interface Strategy {
  vault: string; // Vault SC Address
  percentage: string; // percentage of funds to invest
}

type Vaults<T> = {
  liquid: T;
  locked: T;
};

export type AccountStrategies = Vaults<Strategy[]>;

export type Delegate = {
  Addr: string | ADDRESS_ZERO;
  expires: number; // datetime int of delegation expiry: 0 if no expiry
};
export type SettingsPermission = {
  ownerControlled: boolean;
  govControlled: boolean;
  modifiableAfterInit: boolean;
  delegate: Delegate;
};

export type SettingsController = {
  endowmentController: SettingsPermission;
  strategies: SettingsPermission;
  whitelistedBeneficiaries: SettingsPermission;
  whitelistedContributors: SettingsPermission;
  maturityWhitelist: SettingsPermission;
  maturityTime: SettingsPermission;
  profile: SettingsPermission;
  earningsFee: SettingsPermission;
  withdrawFee: SettingsPermission;
  depositFee: SettingsPermission;
  aumFee: SettingsPermission;
  kycDonorsOnly: SettingsPermission;
  name: SettingsPermission;
  image: SettingsPermission;
  logo: SettingsPermission;
  categories: SettingsPermission;
  splitToLiquid: SettingsPermission;
  ignoreUserSplits: SettingsPermission;
};

export interface EndowmentDetails {
  owner: string;
  categories: Categories;
  //tier
  endow_type: EndowmentType;
  //logo
  //image
  status: EndowmentStatusText;
  //deposit_approved
  //withdraw_approved
  maturityTime: number;
  whitelistedBeneficiaries: string[];
  maturityWhitelist: string[];
  //rebalance
  kycDonorsOnly: boolean;
  settingsController: SettingsController;
  //pending_redemptions
  //proposal_link
  //referral_id
}

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

export interface SettingsControllerUpdate extends Tupleable {
  id: number;
  endowmentController: SettingsPermission;
  name: SettingsPermission;
  image: SettingsPermission;
  logo: SettingsPermission;
  categories: SettingsPermission;
  kycDonorsOnly: SettingsPermission;
  splitToLiquid: SettingsPermission;
  ignoreUserSplits: SettingsPermission;
  whitelistedBeneficiaries: SettingsPermission;
  whitelistedContributors: SettingsPermission;
  maturityWhitelist: SettingsPermission;
  earningsFee: SettingsPermission;
  depositFee: SettingsPermission;
  withdrawFee: SettingsPermission;
  aumFee: SettingsPermission;
}
