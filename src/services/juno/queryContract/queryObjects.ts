import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";

export const queryObjects: {
  [K in QT]: Q[K]["args"] extends null
    ? [object, Q[K]["transform"]]
    : [(args: Q[K]["args"]) => object, Q[K]["transform"]];
} = {
  /** registrar */
  regConfig: [{ config: {} }, (res) => res.data],
  regConfigExtension: [{ config_extension: {} }, (res) => res.data],

  /** index fund */
  ifFunds: [{ funds_list: {} }, (res) => res.data.funds],
  ifAlliance: [{ alliance_members: {} }, (res) => res.data.alliance_members],
  ifConfig: [{ config: {} }, (res) => res.data],

  /** gov */
  govStaker: [
    ({ addr }) => ({
      staker: { address: addr },
    }),
    (res) => res.data,
  ],
  govState: [{ state: {} }, (res) => res.data],
  govConfig: [{ config: {} }, (res) => res.data],
  govPolls: [{ polls: {} }, (res) => res.data.polls],

  /** cw20 */
  cw20Info: [{}, (res) => res.data],
  cw20Balance: [
    ({ addr }) => ({
      balance: { address: addr },
    }),
    (res) => res.data,
  ],

  /** giftcard */
  giftcardBalance: [
    ({ addr }) => ({
      balance: { address: addr },
    }),
    (res) => res.data,
  ],

  /** cw4 member */
  cw4Members: [{ list_members: {} }, (res) => res.data.members],
  cw4Member: [
    ({ addr }) => ({
      member: { addr },
    }),
    (res) => res.data,
  ],

  /** cw3 voter */
  cw3Voter: [
    ({ addr }) => ({
      voter: { address: addr },
    }),
    (res) => res.data,
  ],

  cw3ListVoters: [{ list_voters: {} }, (res) => res.data.voters],
  cw3Config: [{ config: {} }, (res) => res.data],
  reviewCw3Config: [{ config: {} }, (res) => res.data],
  cw3Proposals: [
    (options) => ({
      reverse_proposals: options,
    }),
    (res) => res.data.proposals,
  ],
  cw3Proposal: [
    ({ id }) => ({
      proposal: { proposal_id: id },
    }),
    (res) => res.data,
  ],

  cw3Votes: [
    (options) => ({
      list_votes: options,
    }),
    (res) => res.data.votes,
  ],

  /** account */
  accEndowment: [
    ({ id }) => ({
      endowment: { id },
    }),
    (res) => res.data,
  ],
  accState: [({ id }) => ({ state: { id } }), (res) => res.data],

  /** (account) settings controller */
  endowmentController: [
    ({ id }) => ({ endowment_controller: { id } }),
    (res) => res.data,
  ],
};
