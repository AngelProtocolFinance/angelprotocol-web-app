import { toEndowStatus, toEndowType } from "./decoded-types";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { UNSDG_NUMS } from "types/lists";
import { endowState, endowmentDetails } from "contracts/evm/Account";
import { owners } from "contracts/evm/Multisig";
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
  "cw4.members": [
    owners.data as any,
    (result) => owners.decode(result).map((addr) => ({ addr, weight: 1 })),
  ],
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
  //TO CONFIRM: no query for Proposal[] just proposal_id[]
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
    ({ id }) => endowmentDetails.encode(id) as any,
    (result) => {
      const d = endowmentDetails.decode(result);
      return {
        owner: d.owner,
        categories: {
          sdgs: d.categories.sdgs.map((s) => s.toNumber()) as UNSDG_NUMS[],
          general: d.categories.general.map((s) =>
            s.toNumber()
          ) as UNSDG_NUMS[],
        },
        endow_type: toEndowType(d.endow_type),
        status: toEndowStatus(d.status),
        //TODO: populate strategies
        invested_strategies: {
          liquid: [],
          locked: [],
        },
        kyc_donors_only: d.kycDonorsOnly,
      };
    },
  ],
  "accounts.state": [
    ({ id }) => endowState.encode(id) as any,
    (result) => {
      const d = endowState.decode(result);
      return {
        //TODO: populate once needed
        tokens_on_hand: {
          locked: {
            native: [],
            cw20: [],
          },
          liquid: {
            native: [],
            cw20: [],
          },
        },
        donations_received: {
          locked: d.donationsReceived.locked.toNumber(),
          liquid: d.donationsReceived.liquid.toNumber(),
        },
        closing_endowment: d.closingEndowment,
        //FUTURE: index-fund can also be beneficiary
        closing_beneficiary: d.closingBeneficiary.data.addr,
      };
    },
  ],

  /** (account) settings controller */
  "accounts/settings.controller": [
    //currently included in endowment details
    ({ id }) => ({ endowment_controller: { id } }),
    () => p["accounts/settings.controller"],
  ],
};
