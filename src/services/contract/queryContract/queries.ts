import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { placeholders as p } from "./placeholders";

export const queries: {
  [K in QT]: Q[K]["args"] extends null
    ? [object, Q[K]["transform"]]
    : [(args: Q[K]["args"]) => object, Q[K]["transform"]];
} = {
  /** registrar */
  "registrar.config": [{ config: {} }, () => p["registrar.config"]],
  "registrar.config-extension": [
    { config_extension: {} },
    () => p["registrar.config-extension"],
  ],

  /** index fund */
  "index-fund.funds": [{ funds_list: {} }, () => p["index-fund.funds"]],
  "index-fund.alliance-members": [
    { alliance_members: {} },
    () => p["index-fund.alliance-members"],
  ],
  "index-fund.config": [{ config: {} }, () => p["index-fund.config"]],

  /** gov */
  "gov.staker": [
    ({ addr }) => ({
      staker: { address: addr },
    }),
    () => p["gov.staker"],
  ],
  "gov.state": [{ state: {} }, () => p["gov.state"]],
  "gov.config": [{ config: {} }, () => p["gov.config"]],
  "gov.polls": [{ polls: {} }, () => p["gov.polls"]],

  /** cw20 */
  "cw20.info": [{}, () => p["cw20.info"]],
  "cw20.balance": [
    ({ addr }) => ({
      balance: { address: addr },
    }),
    () => p["cw20.balance"],
  ],

  /** giftcard */
  "gift-card.balance": [
    ({ addr }) => ({
      balance: { address: addr },
    }),
    () => p["gift-card.balance"],
  ],

  /** cw4 member */
  "cw4.members": [{ list_members: {} }, () => p["cw4.members"]],
  "cw4.member": [
    ({ addr }) => ({
      member: { addr },
    }),
    () => p["cw4.member"],
  ],

  /** cw3 voter */
  "cw3.voter": [
    ({ addr }) => ({
      voter: { address: addr },
    }),
    () => p["cw3.voter"],
  ],

  "cw3.voters": [{ list_voters: {} }, () => p["cw3.voters"]],
  "cw3.config": [{ config: {} }, () => p["cw3.config"]],
  "cw3.proposals": [
    (options) => ({
      reverse_proposals: options,
    }),
    () => p["cw3.proposals"],
  ],
  "cw3.proposal": [
    ({ id }) => ({
      proposal: { proposal_id: id },
    }),
    () => p["cw3.proposal"],
  ],

  "cw3.votes": [
    (options) => ({
      list_votes: options,
    }),
    () => p["cw3.votes"],
  ],

  /** account */
  "accounts.endowment": [
    ({ id }) => ({
      endowment: { id },
    }),
    () => p["accounts.endowment"],
  ],
  "accounts.state": [
    ({ id }) => ({ state: { id } }),
    () => p["accounts.state"],
  ],

  /** (account) settings controller */
  "accounts/settings.controller": [
    ({ id }) => ({ endowment_controller: { id } }),
    () => p["accounts/settings.controller"],
  ],
};
