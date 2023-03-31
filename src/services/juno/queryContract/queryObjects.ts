import {
  toEndowStatusText,
  toEndowType,
  toSettingsPermission,
} from "./decoded-types";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { SettingsController } from "types/contracts";
import { UNSDG_NUMS } from "types/lists";
import { endowState, endowmentDetails } from "contracts/evm/Account";
import { balance as erc20Balance } from "contracts/evm/ERC20";
import { balance as giftCardBalance } from "contracts/evm/gift-card";
import { funds } from "contracts/evm/index-fund";
import { confirmations, owners, transactionIds } from "contracts/evm/multisig";
import { placeholders as p } from "./placeholders";

type MigrationState =
  | "migrated"
  | "semi-migrated" /** working but with incomplete data */
  | "placeholder"; /** encoder and decoders are wired but not yet complete */

export const queryObjects: {
  [K in QT]: Q[K]["args"] extends null
    ? [string, Q[K]["transform"], MigrationState]
    : [(args: Q[K]["args"]) => string, Q[K]["transform"], MigrationState];
} = {
  /** registrar */
  "registrar.config": ["", () => p["registrar.config"], "placeholder"],
  "registrar.config-extension": [
    "",
    () => p["registrar.config-extension"],
    "placeholder",
  ],

  /** index fund */
  "index-fund.funds": [
    funds.encode({ startAfter: 0, limit: 10 }),
    () => [],
    "placeholder",
  ],
  "index-fund.alliance-members": ["", () => [], "placeholder"],
  "index-fund.config": ["", () => p["index-fund.config"], "placeholder"],

  /** erc20 */
  "erc20.balance": [
    ({ addr }) => erc20Balance.encode(addr),
    (result) => erc20Balance.decode(result),
    "placeholder",
  ],

  /** giftcard */
  "gift-card.balance": [
    ({ addr }) => giftCardBalance.encode(addr),
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
    "placeholder",
  ],

  /** multisig */
  "multisig.members": [
    owners.data,
    (result) => owners.decode(result).map((addr) => ({ addr, weight: 1 })),
    "migrated",
  ],
  "multisig.config": ["", () => p["multisig.config"], "placeholder"],
  //TO CONFIRM: no query for Proposal[] just proposal_id[]
  "multisig.proposals": [
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
        .map((id) => ({ ...p["multisig.proposal"], id: id.toNumber() })),
    "semi-migrated",
  ],
  "multisig.proposal": [() => "", () => p["multisig.proposal"], "placeholder"],

  "multisig.votes": [
    ({ proposal_id }) => confirmations.encode(proposal_id),
    (result) =>
      confirmations
        .decode(result)
        .map((addr) => ({ voter: addr, vote: "yes", weight: 1 })),
    "migrated",
  ],

  /** account */
  "accounts.endowment": [
    ({ id }) => endowmentDetails.encode(id),
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
        status: toEndowStatusText(d.status),
        //TODO: populate strategies
        invested_strategies: {
          liquid: [],
          locked: [],
        },
        kyc_donors_only: d.kycDonorsOnly,
        settingsController: Object.entries(d.settingsController).reduce(
          (result, [key, permission]) => ({
            ...result,
            [key]: toSettingsPermission(permission),
          }),
          {} as SettingsController
        ),
      };
    },
    "migrated",
  ],
  "accounts.state": [
    ({ id }) => endowState.encode(id),
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
    "migrated",
  ],
};
