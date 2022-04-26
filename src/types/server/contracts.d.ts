declare module "@types-server/contracts" {
  import { Coin } from "@terra-money/terra.js";
  /** _wrapper */
  interface QueryRes<T> {
    query_result: T;
  }

  /** _shared */
  type Vote = "yes" | "no";

  type EmbeddedWasmMsg = {
    wasm: {
      execute: {
        contract_addr: string;
        funds: Coin.Data[];
        msg: string; //base64 endocoded msg object
      };
    };
  };

  type EmbeddedBankMsg = {
    bank: {
      send: {
        amount: Coin.Data[];
        to_address: string;
      };
    };
  };

  /** _account */
  interface Profile {
    name: string;
    overview: string;
    un_sdg?: number;
    tier?: number;
    logo?: string;
    image?: string;
    url?: string;
    registration_number?: string;
    country_city_origin?: string;
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

  type Holding = { address: string; amount: string };
  interface Holdings {
    locked_native: Holding[];
    locked_cw20: Holding[];
    liquid_native: Holding[];
    liquid_cw20: Holding[];
    is_placeholder?: true;
  }

  interface Source {
    locked: string; //"0"
    liquid: string; //"0"
    vault: string; //"terra123addr"
  }

  interface UpdateProfilePayload {
    //separate shape for update
    name?: string;
    overview?: string;
    un_sdg?: number;
    tier?: number;
    logo?: string;
    image?: string;
    url?: string;
    registration_number?: string;
    country_city_origin?: string;
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

  /** _admin */
  type PageOptions = { limit?: number; start_before?: number };
  type VotesPageOptions = {
    proposal_id: number;
    limit?: number;
    start_after?: number;
  };

  type Member = {
    addr: string;
    weight: number;
  };

  type MemberRes = {
    members: Member[];
  };

  type ProposalsRes = {
    proposals: Proposal[];
  };

  type ProposalStatus = "pending" | "open" | "rejected" | "passed" | "executed";

  type Proposal = {
    id: number; //1
    title: string; //"this prpposal rocks"
    description: string; //"this is a description"
    meta?: string; //JSON string that contains preview metadata
    msgs: (EmbeddedWasmMsg | EmbeddedBankMsg)[];
    status: ProposalStatus;
    expires: { at_height: number };
    threshold: {
      //others absolute account, threshold quourum
      absolute_percentage: {
        percentage: string; //"0.5"
        total_weight: number; //2
      };
    };
  };

  type CW3Config = {
    group_addr: string; //"terra123abc.."
    threshold: {
      absolute_percentage: {
        percentage: string; //"0.5"
      };
    };
    max_voting_period: {
      height: number; //1000
    };
    isPlacholder?: true;
    //...future needed attr
  };

  type AdminVoteInfo = {
    voter: string; //"terra123abc.."
    vote: Vote;
    weight: number; //1
  };

  type CWContracts = "apTeam" | { cw3?: string; cw4?: string };

  /** _governance */
  type PollStatus =
    | "in_progress"
    | "passed"
    | "rejected"
    | "executed"
    | "expired"
    | "failed";

  type Poll = {
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

  type Polls = { polls: Poll[] };

  type PollExecuteMsg = {
    order: number;
    contract: string;
    msg: string;
  };

  type GovVoteInfo = { vote: Vote; balance: string };
  type LockedHolding = [number, GovVoteInfo]; //[poll_id, info]
  type Claim = { amount: string; release_at: { at_time: string } };

  type GovStaker = {
    balance: string;
    share: string;
    locked_balance: LockedHolding[];
    claims?: Claim[];
  };

  type GovState = {
    poll_count: number;
    total_share: string; //gov share from gov staking
    total_deposit: string; //total deposit from poll_creation and votes
  };

  type GovConfig = {
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
  type ClaimInquiry = {
    is_claimed: boolean;
  };

  /** _indexfund */
  type AllianceMember = {
    wallet: string;
    name: string;
    logo?: string;
    website?: string;
  };

  type IndexFundConfig = {
    owner: string; //"terra123abc.."
    registrar_contract: string; //"terra123abc";
    fund_rotation?: number; //10
    fund_member_limit: number; //10
    funding_goal?: string; //"50000000"
    accepted_tokens: {
      native: string[]; //["uusd"]
      cw20: string[]; //
    };
  };

  type FundDetails = {
    id: number;
    name: string;
    description: string;
    members: string[];
    rotating_fund?: boolean;
    split_to_liquid?: string; //"0.63"
    expiry_time?: number; //unix time on seconds
    expiry_height?: number; //block height
  };

  type IndexFundOwnerPayload = {
    new_owner: string;
  };

  interface FundConfig {
    fund_rotation?: number;
    fund_member_limit?: number;
    funding_goal?: string;
  }

  /** CW20 */
  type TokenInfo = {
    name: string;
    symbol: string;
    decimals: number;
    total_supply: string;
  };

  type HaloBalance = {
    balance: string;
  };

  /** _lbp */
  type Simulation = {
    return_amount: string;
    spread_amount: string;
    commission_amount: string;
    is_placeholder?: true;
  };

  /** _registrar */
  type EndowmentStatus = {
    Inactive: 0;
    Approved: 1;
    Frozen: 2;
    Closed: 3;
  };

  type EndowmentType = "charity";
  type EndowmentStatusNum = EndowmentStatus[keyof EndowmentStatus];
  type EndowmentStatusStrNum = `${EndowmentStatusNum}`;

  type EndowmentTier = "Level1" | "Level2" | "Level3";
  type EndowmentEntry = {
    address: string;
    status: keyof EndowmentStatus;
    name: string;
    owner?: string;
    tier?: EndowmentTier;
    endow_type?: EndowmentType;
    un_sdg?: number;
  };

  type CategorizedEndowments = {
    [index: number]: EndowmentEntry[];
  };

  type EndowmentQueryOptions = {
    name?: string;
    owner?: string;
    status?: EndowmentStatusStrNum;
    tier?: EndowmentTier;
    endow_type?: EndowmentType;
  };

  interface EndowmentQueryMsg {
    address: string;
    msg: {
      endowment_list: EndowmentQueryOptions;
    };
  }

  type RegistrarConfig = {
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

  type VaultRateInfo = {
    vault_addr: string; //"terra172u..
    fx_rate: string; //"1.206784043460040765"
  };

  type StatusChangePayload = {
    endowment_addr: string;
    status: EndowmentStatus[keyof EndowmentStatus];
    beneficiary?: string;
  };

  type RegistrarConfigPayload = {
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

  type RegistrarOwnerPayload = {
    new_owner: string;
  };
}
