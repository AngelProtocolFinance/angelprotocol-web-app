import { Coin } from "@cosmjs/proto-signing";
import { EndowmentTierNum } from "types/shared/registration";

/** _ethereum contract */
export interface ERC20Token {
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
  balance: string;
}

/** _wrapper */
export interface QueryRes<T> {
  data: T;
}

/** _shared */
export type Vote = "yes" | "no";

export type EmbeddedWasmMsg = {
  wasm: {
    execute: {
      contract_addr: string;
      funds: Coin[];
      msg: string; //base64 endocoded msg object
    };
  };
};

export type EmbeddedBankMsg = {
  bank: {
    send: {
      amount: Coin[];
      to_address: string;
    };
  };
};

/** _account */

export interface CW20 {
  address: string;
  amount: string;
}

export interface GenericBalance {
  native: Coin[];
  cw20: CW20[];
}

export interface BalanceInfo {
  locked_balance: GenericBalance;
  liquid_balance: GenericBalance;
}

export interface DepositPayload {
  locked_percentage: string; //"0.7"
  liquid_percentage: string; //"0.3"
}

export type WithdrawPayload = {
  sources: Source[];
  beneficiary: string;
};

export interface WithdrawLiqPayload {
  beneficiary: string;
  assets: GenericBalance;
}

interface RebalanceDetails {
  rebalance_liquid_invested_profits: boolean; // should invested portions of the liquid account be rebalanced?
  locked_interests_to_liquid: boolean; // should Locked acct interest earned be distributed to the Liquid Acct?
  interest_distribution: string; // % of Locked acct interest earned to be distributed to the Liquid Acct
  locked_principle_to_liquid: boolean; // should Locked acct principle be distributed to the Liquid Acct?
  principle_distribution: string; // % of Locked acct principle to be distributed to the Liquid Acct
}

interface StrategyComponent {
  vault: string; // Vault SC Address
  locked_percentage: string; // percentage of funds to invest
  liquid_percentage: string; // percentage of funds to invest
}

export interface EndowmentDetails {
  owner: string;
  beneficiary: string;
  withdraw_before_maturity: boolean;
  maturity_time?: number;
  maturity_height?: number;
  strategies: StrategyComponent[];
  rebalance: RebalanceDetails;
  guardians: string[];
}

export interface Profile {
  name: string;
  overview: string;
  un_sdg?: number;
  tier?: number;
  logo?: string;
  image?: string;
  url?: string;
  registration_number?: string;
  street_address?: string;
  country_of_origin?: string;
  contact_email?: string;
  social_media_urls: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  number_of_employees?: number;
  average_annual_budget?: string;
  annual_revenue?: string;
  charity_navigator_rating?: string;
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

export interface UpdateProfilePayload {
  //separate shape for update
  name?: string;
  overview?: string;
  un_sdg?: number;
  tier?: number;
  logo?: string;
  image?: string;
  url?: string;
  registration_number?: string;
  country_of_origin?: string;
  street_address?: string;
  contact_email?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  number_of_employees?: number;
  average_annual_budget?: string;
  annual_revenue?: string;
  charity_navigator_rating?: string;
  endow_type?: string;
}

/** _cw3 */

type Duration = { time: number } | { height: number };

type AbsolutePercentage = { absolute_percentage: { percentage: string } };

type PercentageRes = {
  absolute_percentage: {
    percentage: string; //"0.5"
    total_weight: number; //2
  };
};

type ThresholdRes = PercentageRes; // | AbsoluteCount | Quorum;
type Threshold = AbsolutePercentage; // | AbsoluteCount | Quorum;

export type PageOptions = { limit?: number; start_before?: number };

export type VotesPageOptions = {
  proposal_id: number;
  limit?: number;
  start_after?: number;
};

export type ProposalsRes = {
  proposals: Proposal[];
};

export type ProposalStatus =
  | "pending"
  | "open"
  | "rejected"
  | "passed"
  | "executed";

export type Expiration = { at_time: number } | { at_height: number };

export type Proposal = {
  id: number; //1
  title: string; //"this prpposal rocks"
  description: string; //"this is a description"
  meta?: string; //JSON string that contains preview metadata
  msgs: (EmbeddedWasmMsg | EmbeddedBankMsg)[];
  status: ProposalStatus;
  expires: Expiration;
  threshold: ThresholdRes;
};

export type CW3Config = {
  group_addr: string; //"juno123abc.."
  threshold: Threshold;
  max_voting_period: Duration;
  //...future needed attr
};

export type CW3ConfigPayload = {
  //percent vote to pass poll
  threshold: Threshold;
  //poll duration in block height
  max_voting_period: Duration;
};

export type AdminVoteInfo = {
  voter: string; //"juno123abc.."
  vote: Vote;
  weight: number; //1
};

/** _cw4 */

export type Member = {
  addr: string;
  weight: number;
};

export type InquiredMember = {
  weight: number | null;
};

export type MemberRes = {
  members: Member[];
};

/** _governance */
export type PollStatus =
  | "in_progress"
  | "passed"
  | "rejected"
  | "executed"
  | "expired"
  | "failed";

export type Poll = {
  id: number;
  creator: string;
  // status: "in_progress";
  status: PollStatus;
  end_height: number;
  title: string;
  description: string;
  link: string;
  deposit_amount: string;
  // execute_data: null;
  execute_data: any;
  yes_votes: "0"; //uhalo amount
  no_votes: "0"; //uhalo amount
  // staked_amount: null;
  staked_amount: any;
  // total_balance_at_end_poll: null;
  total_balance_at_end_poll: any;
};

export type Polls = { polls: Poll[] };

export type PollExecuteMsg = {
  order: number;
  contract: string;
  msg: string;
};

export type GovVoteInfo = { vote: Vote; balance: string };
export type LockedHolding = [number, GovVoteInfo]; //[poll_id, info]
export type Claim = { amount: string; release_at: { at_time: string } };

export type GovStaker = {
  balance: string;
  share: string;
  locked_balance: LockedHolding[];
  claims?: Claim[];
};

export type GovState = {
  poll_count: number;
  total_share: string; //gov share from gov staking
  total_deposit: string; //total deposit from poll_creation and votes
};

export type GovConfig = {
  owner: string; //address of the owner
  halo_token: string; //the contract address of the halo token
  quorum: string; // "0.3" the required number of voters
  threshold: string; //"0.5" required %of voters to vote yes to make the poll passed
  voting_period: number; //2000 block passes since the poll is created
  timelock_period: number; //1000 lock period of deposit?
  proposal_deposit: string; //"10000000000"need 10k HALO to make poll
  snapshot_period: number; //10 num blocks passed when fresh update is made available
};

/** _airdrop */
export type ClaimInquiry = {
  is_claimed: boolean;
};

/** _indexfund */
export type AllianceMember = {
  wallet: string;
  name: string;
  logo?: string;
  website?: string;
};

export type IndexFundConfig = {
  owner: string; //"juno123abc.."
  registrar_contract: string; //"juno123abc..";
  fund_rotation?: number; //10
  fund_member_limit: number; //10
  funding_goal?: string; //"50000000"
  accepted_tokens: {
    native: string[]; //["uusd"]
    cw20: string[]; //
  };
};

export type FundDetails = {
  id: number;
  name: string;
  description: string;
  members: string[];
  rotating_fund?: boolean;
  split_to_liquid?: string; //"0.63"
  expiry_time?: number; //unix time on seconds
  expiry_height?: number; //block height
};

export type IndexFundOwnerPayload = {
  new_owner: string;
};

export interface FundConfig {
  fund_rotation?: number;
  fund_member_limit?: number;
  funding_goal?: string;
}

/** CW20 */
export type CW20Info = {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
};

export type CW20Balance = {
  balance: string;
};

/** _lbp */
export type Simulation = {
  return_amount: string;
  spread_amount: string;
  commission_amount: string;
  is_placeholder?: true;
};

/** _registrar */
export type EndowmentStatus = {
  Inactive: 0;
  Approved: 1;
  Frozen: 2;
  Closed: 3;
};

export type EndowmentType = "charity" | "normal";
export type EndowmentStatusNum = EndowmentStatus[keyof EndowmentStatus];
export type EndowmentStatusStrNum = `${EndowmentStatusNum}`;

export type EndowmentTier = "Level1" | "Level2" | "Level3";
export type EndowmentEntry = {
  address: string;
  status: keyof EndowmentStatus;
  name: string;
  logo?: string;
  image?: string;
  owner?: string;
  tier?: EndowmentTier;
  endow_type?: EndowmentType;
  un_sdg?: number;
};

export type CategorizedEndowments = {
  [index: number]: EndowmentEntry[];
};

export type EndowmentQueryOptions = {
  name?: string;
  owner?: string;
  status?: EndowmentStatusStrNum;
  tier?: EndowmentTier;
  endow_type?: EndowmentType;
};

export interface EndowmentQueryMsg {
  address: string;
  msg: {
    endowment_list: EndowmentQueryOptions;
  };
}

export type RegistrarConfig = {
  owner: string;
  guardians_multisig_addr?: string;
  endowment_owners_group_addr?: string;
  version: string;
  accounts_code_id: number;
  treasury: string;
  tax_rate: string; //decimal string
  default_vault?: string;
  index_fund?: string;
  split_to_liquid: { min: string; max: string; default: string };
  halo_token?: string;
  gov_contract?: string;
  charity_shares_contract?: string;
};

export type VaultRateInfo = {
  vault_addr: string; //"juno172u..
  fx_rate: string; //"1.206784043460040765"
};

export type StatusChangePayload = {
  endowment_addr: string;
  status: EndowmentStatus[keyof EndowmentStatus];
  beneficiary?: string;
};

export type RegistrarConfigPayload = {
  accounts_code_id?: number;
  index_fund_contract?: string; //addr
  treasury?: string; //addr
  tax_rate?: string; //decimal string
  // approved_charities?: string[];
  default_vault?: string;
  guardians_multisig_addr?: string;
  endowment_owners_group_addr?: string;
  split_max?: string; //decimal string
  split_min?: string; //decimal string
  split_default?: string; //decimal string
  halo_token?: string;
  gov_contract?: string;
  charity_shares_contract?: string;
};

export type RegistrarOwnerPayload = {
  new_owner: string;
};

type Endow_type = "Charity";
export type RegistrarCreateEndowmentPayload = {
  beneficiary: string;
  cw4_members: [];
  guardians_multisig_addr: undefined;
  maturity_time: undefined;
  maturity_height: undefined;
  owner: string;
  withdraw_before_maturity: false;
  profile: {
    annual_revenue: undefined; // string value if provided
    average_annual_budget: undefined; // string value if provided
    charity_navigator_rating: undefined; // string value if provided
    contact_email: string;
    country_of_origin: undefined;
    endow_type: Endow_type;
    image: string;
    logo: string;
    name: string;
    number_of_employees: undefined; // int value if provided
    overview: string;
    registration_number: undefined; // string of charity reg # if provided
    social_media_urls: {
      facebook: undefined; // string of URL if provided
      twitter: undefined; // string of URL if provided
      linkedin: undefined; // string of URL if provided
    };
    street_address: undefined;
    tier: EndowmentTierNum;
    un_sdg: number; // 1 - 17 int
    url: string; // string of charity website URL if provided
  };
};
