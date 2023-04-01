import type { BigNumber } from "@ethersproject/bignumber";
import {
  DecodedEndowment,
  DecodedEndowmentState,
  toEndowStatusText,
  toEndowType,
  toSettingsPermission,
} from "./decoded-types";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { UNSDG_NUMS } from "types/lists";
import { accounts } from "contracts/evm/Account";
import { erc20 } from "contracts/evm/ERC20";
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
    ({ addr }) => erc20.encodeFunctionData("balanceOf", [addr]),
    (result) => {
      const decoded: BigNumber = erc20.decodeFunctionResult(
        "balanceOf",
        result
      )[0];
      return decoded.toString();
    },
    "migrated",
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
    ({ id }) => accounts.encodeFunctionData("queryEndowmentDetails", [id]),
    (result) => {
      const d: DecodedEndowment = accounts.decodeFunctionResult(
        "queryEndowmentDetails",
        result
      )[0];
      const controller = d.settingsController;
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
        kyc_donors_only: d.kycDonorsOnly,
        settingsController: {
          endowmentController: toSettingsPermission(
            controller.endowmentController
          ),
          strategies: toSettingsPermission(controller.endowmentController),
          whitelistedBeneficiaries: toSettingsPermission(
            controller.whitelistedBeneficiaries
          ),
          whitelistedContributors: toSettingsPermission(
            controller.whitelistedContributors
          ),
          maturityWhitelist: toSettingsPermission(controller.maturityWhitelist),
          maturityTime: toSettingsPermission(controller.maturityTime),
          profile: toSettingsPermission(controller.profile),
          earningsFee: toSettingsPermission(controller.earningsFee),
          withdrawFee: toSettingsPermission(controller.withdrawFee),
          depositFee: toSettingsPermission(controller.depositFee),
          aumFee: toSettingsPermission(controller.aumFee),
          kycDonorsOnly: toSettingsPermission(controller.kycDonorsOnly),
          name: toSettingsPermission(controller.name),
          image: toSettingsPermission(controller.image),
          logo: toSettingsPermission(controller.logo),
          categories: toSettingsPermission(controller.categories),
          splitToLiquid: toSettingsPermission(controller.splitToLiquid),
          ignoreUserSplits: toSettingsPermission(controller.ignoreUserSplits),
        },
      };
    },
    "migrated",
  ],
  "accounts.state": [
    ({ id }) => accounts.encodeFunctionData("queryState", [id]),
    (result) => {
      const d: DecodedEndowmentState = accounts.decodeFunctionResult(
        "queryState",
        result
      )[0];

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
