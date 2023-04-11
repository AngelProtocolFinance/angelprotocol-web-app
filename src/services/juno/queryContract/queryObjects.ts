import { BigNumber } from "@ethersproject/bignumber";
import {
  DecodedFund,
  DecodedGiftCardBalance,
  DecodedIndexFundConfig,
} from "./decoded-types";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { RegistrarConfig } from "types/contracts";
// import { RegistrarConfig } from "types/contracts";
import { giftCard } from "contracts/evm/gift-card";
import { indexFund } from "contracts/evm/index-fund";
import { multisig } from "contracts/evm/multisig";
import { registrar } from "contracts/evm/registrar";
import { toTuple } from "helpers";
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
  "registrar.config": [
    registrar.encodeFunctionData("queryConfig", []),
    (result) => {
      const decoded: RegistrarConfig = registrar.decodeFunctionResult(
        "queryConfig",
        result
      )[0];
      //select fields only
      return { owner: decoded.owner, acceptedTokens: decoded.acceptedTokens };
    },
    "migrated",
  ],
  "registrar.config-extension": [
    "",
    () => p["registrar.config-extension"],
    "placeholder",
  ],

  /** index fund */
  "index-fund.funds": [
    (args) => indexFund.encodeFunctionData("queryFundsList", toTuple(args)),
    (result) => {
      const decoded: DecodedFund[] = indexFund.decodeFunctionResult(
        "queryFundsList",
        result
      )[0];
      return decoded.map((f) => ({
        id: f.id.toNumber(),
        name: f.name,
        description: f.description,
        members: f.members.map((m) => m.toNumber()),
        rotatingFund: f.rotatingFund,
        splitToLiquid: f.splitToLiquid.toNumber(),
        expiryTime: f.expiryTime.toNumber(),
        expiryHeight: f.expiryHeight.toNumber(),
      }));
    },
    "migrated",
  ],
  "index-fund.alliance-members": [
    (args) =>
      indexFund.encodeFunctionData("queryAllianceMembers", toTuple(args)),
    (result) => {
      const decoded: string[] = indexFund.decodeFunctionResult(
        "queryAllianceMembers",
        result
      )[0];
      return decoded.map((a) => ({
        wallet: a,
        name: "Alliance member",
      }));
    },
    "semi-migrated",
  ],
  "index-fund.config": [
    indexFund.encodeFunctionData("queryConfig", []),
    (result) => {
      const d: DecodedIndexFundConfig = indexFund.decodeFunctionResult(
        "queryConfig",
        result
      )[0];
      return {
        owner: d.owner,
        registrarContract: d.registrarContract,
        fundRotation: d.fundRotation.toNumber(),
        fundMemberLimit: d.fundMemberLimit.toNumber(),
        fundingGoal: d.fundingGoal.toNumber(),
        alliance_members: d.alliance_members,
      };
    },
    "migrated",
  ],

  /** giftcard */
  "gift-card.balance": [
    ({ addr }) => giftCard.encodeFunctionData("queryBalance", [addr]),
    (result) => {
      const decoded: DecodedGiftCardBalance = giftCard.decodeFunctionResult(
        "queryBalance",
        result
      )[0];
      const {
        coinNativeAmount,
        /** amounts and addresses corresponds to one another */
        Cw20CoinVerified_addr: addresses,
        Cw20CoinVerified_amount: amounts,
      } = decoded;

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
    multisig.encodeFunctionData("getOwners", []),
    (result) => {
      const d: string[] = multisig.decodeFunctionResult("getOwners", result)[0];
      //wallets outputs lowercase addresses, but addresses from contracts are not
      return d.map((a) => a.toLowerCase());
    },
    "migrated",
  ],
  "multisig.config": ["", () => p["multisig.config"], "placeholder"],
  //TO CONFIRM: no query for Proposal[] just proposal_id[]
  "multisig.proposals": [
    (options) => {
      const from = options.start_before || 0;
      const to = from + (options.limit || 0);
      return multisig.encodeFunctionData(
        "getTransactionIds",
        toTuple({
          from,
          to,
          pending: true,
          executed: true,
        })
      );
    },
    (result) => {
      const ids: BigNumber[] = multisig.decodeFunctionResult(
        "getTransactionIds",
        result
      )[0];
      return ids.map((id) => ({
        ...p["multisig.proposal"],
        id: id.toNumber(),
      }));
    },

    "semi-migrated",
  ],
  "multisig.proposal": [() => "", () => p["multisig.proposal"], "placeholder"],

  "multisig.votes": [
    ({ proposal_id }) =>
      multisig.encodeFunctionData("getConfirmations", [proposal_id]),
    (result) => {
      const confirmations: string[] = multisig.decodeFunctionResult(
        "getConfirmations",
        result
      )[0];
      return confirmations.map((addr) => ({
        voter: addr,
        vote: "yes",
        weight: 1,
      }));
    },

    "migrated",
  ],
};
