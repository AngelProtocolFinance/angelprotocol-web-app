import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";

export const queryObjects: {
  [K in QT]: Q[K]["args"] extends null
    ? [object, Q[K]["transform"]]
    : [(args: Q[K]["args"]) => object, Q[K]["transform"]];
} = {
  /** registrar */
  "registrar.config": [{ config: {} }, (res) => res.data],
  "registrar.config-extension": [{ config_extension: {} }, (res) => res.data],

  /** index fund */
  "index-fund.funds": [{ funds_list: {} }, (res) => res.data.funds],
  "index-fund.alliance-members": [
    { alliance_members: {} },
    (res) => res.data.alliance_members,
  ],
  "index-fund.config": [{ config: {} }, (res) => res.data],

  /** gov */
  "gov.staker": [
    ({ addr }) => ({
      staker: { address: addr },
    }),
    (res) => res.data,
  ],
  "gov.state": [{ state: {} }, (res) => res.data],
  "gov.config": [{ config: {} }, (res) => res.data],
  "gov.polls": [{ polls: {} }, (res) => res.data.polls],

  /** cw20 */
  "cw20.info": [{}, (res) => res.data],
  "cw20.balance": [
    ({ addr }) => ({
      balance: { address: addr },
    }),
    (res) => res.data,
  ],

  /** giftcard */
  "gift-card.balance": [
    ({ addr }) => ({
      balance: { address: addr },
    }),
    (res) => res.data,
  ],

  /** cw4 member */
  "cw4.members": [{ list_members: {} }, (res) => res.data.members],
  "cw4.member": [
    ({ addr }) => ({
      member: { addr },
    }),
    (res) => res.data,
  ],

  /** cw3 voter */
  "cw3.voter": [
    ({ addr }) => ({
      voter: { address: addr },
    }),
    (res) => res.data,
  ],

  "cw3.voters": [{ list_voters: {} }, (res) => res.data.voters],
  "cw3.config": [{ config: {} }, (res) => res.data],
  "cw3.proposals": [
    (options) => ({
      reverse_proposals: options,
    }),
    (res) => res.data.proposals,
  ],
  "cw3.proposal": [
    ({ id }) => ({
      proposal: { proposal_id: id },
    }),
    (res) => res.data,
  ],

  "cw3.votes": [
    (options) => ({
      list_votes: options,
    }),
    (res) => res.data.votes,
  ],

  /** account */
  "accounts.endowment": [
    ({ id }) => ({
      endowment: { id },
    }),
    (res) => res.data,
  ],
  "accounts.state": [({ id }) => ({ state: { id } }), (res) => res.data],

  /** (account) settings controller */
  "accounts/settings.controller": [
    ({ id }) => ({ endowment_controller: { id } }),
    (res) => res.data,
  ],
};
