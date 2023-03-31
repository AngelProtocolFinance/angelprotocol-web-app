import { toEndowStatus, toEndowType, toPermission } from "./decoded-types";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { SettingsController } from "types/contracts";
import { UNSDG_NUMS } from "types/lists";
import { endowState, endowmentDetails } from "contracts/evm/Account";
import { balance as erc20Balance } from "contracts/evm/ERC20";
import { confirmations, owners, transactionIds } from "contracts/evm/Multisig";
import { balance as giftCardBalance } from "contracts/evm/gift-card";
import { funds } from "contracts/evm/index-fund";
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
  "index-fund.funds": [
    funds.encode({ startAfter: 0, limit: 10 }) as any,
    (result) => {
      const d = funds.decode(result);
      return d.map((f) => ({
        id: f.id.toNumber(),
        name: f.name,
        description: f.description,
        members: f.members.map((m) => m.toString()), //TODO: members should number[] now
        rotating_fund: f.rotatingFund,
        split_to_liquid: f.splitToLiquid.div(100).toString(),
        expiry_time: f.expiryTime.toNumber(),
        expiry_height: f.expiryHeight.toNumber(),
      }));
    },
  ],
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
    ({ addr }) => erc20Balance.encode(addr) as any,
    (result) => erc20Balance.decode(result),
  ],

  /** giftcard */
  "gift-card.balance": [
    ({ addr }) => giftCardBalance.encode(addr) as any,
    (result) => {
      const {
        coinNativeAmount,
        /** amounts and addresses corresponds to one another */
        Cw20CoinVerified_addr: addresses,
        Cw20CoinVerified_amount: amounts,
      } = giftCardBalance.decode(result);
      return {
        cw20: addresses.map((addr, i) => ({
          address: addr,
          amount: amounts[i].toString(),
        })),
        native: [{ denom: "", amount: coinNativeAmount.toString() }],
      };
    },
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
    (options) => {
      const from = options.start_before || 0;
      const to = from + (options.limit || 0);
      return transactionIds.encode({
        from,
        to,
        pending: true,
        executed: true,
      }) as any;
    },
    (result) =>
      transactionIds
        .decode(result)
        .map((id) => ({ ...p["cw3.proposal"], id: id.toNumber() })),
  ],
  "cw3.proposal": [
    ({ id }) => ({
      proposal: { proposal_id: id },
    }),
    () => p["cw3.proposal"],
  ],

  "cw3.votes": [
    ({ proposal_id }) => confirmations.encode(proposal_id) as any,
    (result) =>
      confirmations
        .decode(result)
        .map((addr) => ({ voter: addr, vote: "yes", weight: 1 })),
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
        settingsController: Object.entries(d.settingsController).reduce(
          (result, [key, permission]) => ({
            ...result,
            [key]: toPermission(permission),
          }),
          {} as SettingsController
        ),
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
};
