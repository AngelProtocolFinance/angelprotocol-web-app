import { ContractQueries } from "./types";

export const placeholders: {
  [K in Exclude<
    keyof ContractQueries,
    "accounts.endowment" | "accounts.state"
  >]: ReturnType<ContractQueries[K]["transform"]>;
} = {
  "registrar.config": {
    owner: "terra1...",
  },
  "registrar.config-extension": {
    accounts_contract: "terra1...",
    accounts_settings_controller: "terra1...",
    applications_review: "terra1...",
    charity_shares_contract: "terra1...",
    collector_addr: "terra1...",
    cw3_code: 1,
    cw4_code: 1,
    donation_match_charites_contract: "terra1...",
    donation_match_code: 1,
    gov_contract: "terra1...",
    halo_token_lp_contract: "terra1...",
    halo_token: "terra1...",
    index_fund: "terra1...",
    subdao_bonding_token_code: 1,
    subdao_cw20_token_code: 1,
    subdao_cw900_code: 1,
    subdao_distributor_code: 1,
    subdao_gov_code: 1,
    swap_factory: "terra1...",
    swaps_router: "terra1...",
  },
  "index-fund.funds": [],
  "index-fund.alliance-members": [],
  "index-fund.config": {
    owner: "juno123abc..",
    registrar_contract: "juno123abc..",
    fund_rotation: 10,
    fund_member_limit: 10,
    funding_goal: "50000000",
    accepted_tokens: {
      native: ["ujuno"],
      cw20: [],
    },
  },
  "gift-card.balance": {
    cw20: [],
    native: [],
  },

  "gov.staker": {
    balance: "0",
    share: "0",
    locked_balance: [],
    claims: [],
  },
  "gov.state": {
    poll_count: 0,
    total_share: "0",
    total_deposit: "0",
  },

  "gov.config": {
    owner: "halo1",
    halo_token: "halo1",
    quorum: "0.3",
    threshold: "0.5",
    voting_period: 2000,
    timelock_period: 1000,
    proposal_deposit: "10000000000",
    snapshot_period: 10,
  },
  "gov.polls": [],
  "cw20.info": {
    name: "Halo",
    symbol: "HALO",
    decimals: 6,
    total_supply: "1000000000000000",
  },
  "cw20.balance": "1000000",

  "cw4.members": [],
  "cw4.member": { weight: 1 },

  "cw3.voters": [],
  "cw3.voter": { weight: 1 },
  "cw3.config": {
    group_addr: "juno123abc..",
    threshold: {
      absolute_percentage: {
        percentage: "0.5",
      },
    },
    max_voting_period: { time: 1000 },
    require_execution: true,
  },
  /**
   * not implemented in solidity multisig.
   * can only get array of ids
   */
  "cw3.proposals": [],
  /**
   * not implemented in solidity multisig.
   */
  "cw3.proposal": {
    id: 1,
    title: "this prpposal rocks",
    description: "this is a description",
    msgs: [],
    status: "pending",
    expires: { at_time: 123 },
    threshold: { absolute_percentage: { percentage: "0.5", total_weight: 2 } },
    proposal_type: "normal",
  },
  "cw3.votes": [],
};
