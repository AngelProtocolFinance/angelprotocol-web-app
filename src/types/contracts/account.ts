import { Coin } from "@cosmjs/proto-signing";
import { Tupleable } from "types/evm";
import {
  Asset,
  CW4Member,
  Categories,
  EndowmentStatus,
  EndowmentStatusText,
  EndowmentType,
  SplitDetails,
  Threshold,
} from "./common";
import { CW20 } from "./cw20";
import { ADDRESS_ZERO } from "./evm";

export interface GenericBalance {
  native: Coin[];
  cw20: CW20[];
}

export interface BalanceInfo {
  locked: GenericBalance;
  liquid: GenericBalance;
}

export interface DonationsReceived {
  locked: number;
  liquid: number;
}

export interface EndowmentState {
  tokens_on_hand: BalanceInfo;
  donations_received: DonationsReceived;
  closing_endowment: boolean;
  closing_beneficiary?: string;
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

type Delegate = {
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
  maturity_time?: number;
  //rebalance
  kyc_donors_only: boolean;
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

export type AccountType = "locked" | "liquid";

export interface WithdrawPayload {
  id: number;
  acct_type: AccountType;
  beneficiary: string;
  assets: Asset[];
}

export interface InvestPayload {
  id: number;
  acct_type: AccountType;
  vaults: [string /**vault addr */, Asset][];
}

type VaultWithBalance = [string /**vault addr */, string /**balance */];

export interface RedeemPayload {
  id: number;
  acct_type: AccountType;
  vaults: VaultWithBalance[];
}

export type Beneficiary =
  | { endowment: { id: number } }
  | { indexfund: { id: number } }
  | { wallet: { address: string } };

export type StatusChangePayload = {
  endowment_id: number;
  status: EndowmentStatus[keyof EndowmentStatus];
  beneficiary?: Beneficiary;
};

export type UpdateStategyPayload = {
  id: number;
  acct_type: AccountType;
  strategies: Strategy[];
};

export type EndowmentFee = {
  payout_address: string;
  fee_percentage: string; // "0" - "1"
  active: boolean;
};

const _normal: EndowmentType = "normal";

export type NewAIF = {
  owner: string;
  maturity_time: number; // required in launchpad: datetime in seconds
  name: string;
  categories: Categories; // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
  //tier
  endow_type: typeof _normal;
  //logo
  //image
  cw4_members: CW4Member[];
  kyc_donors_only: boolean;
  cw3_threshold: Threshold; // currently just absolute percentage
  cw3_max_voting_period: number; // datetime in seconds
  beneficiaries_allowlist: string[]; // if populated, only the listed Addresses can withdraw/receive funds from the Endowment (if empty, anyone can)
  contributors_allowlist: string[]; // if populated, only the listed Addresses can contribute to the Endowment (if empty, anyone can donate)

  split_to_liquid: SplitDetails;
  ignore_user_splits: boolean;

  earnings_fee: EndowmentFee | undefined;
  withdraw_fee: EndowmentFee | undefined;
  deposit_fee: EndowmentFee | undefined;
  //aum_fee
  //dao
  //proposal_link
  //endowment_controller
  //parent
  //referral_id
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
