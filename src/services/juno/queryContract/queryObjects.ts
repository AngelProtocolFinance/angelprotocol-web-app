import { BigNumber } from "@ethersproject/bignumber";
import {
  DEndowment,
  DEndowmentState,
  DFund,
  DGenericBalance,
  DIndexFundConfig,
  DRegistrarConfig,
  DTransaction,
  toBalMap,
  toEndowStatusText,
  toEndowType,
  toSettingsPermission,
} from "./decoded-types";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { UNSDG_NUMS } from "types/lists";
import { accounts } from "contracts/evm/Account";
import { erc20 } from "contracts/evm/ERC20";
import { giftCard } from "contracts/evm/gift-card";
import { indexFund } from "contracts/evm/index-fund";
import { multisig } from "contracts/evm/multisig";
import { registrar } from "contracts/evm/registrar";
import { toTuple } from "helpers";

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
      const d: DRegistrarConfig = registrar.decodeFunctionResult(
        "queryConfig",
        result
      )[0];
      return {
        owner: d.owner.toLowerCase(),
        acceptedTokens: {
          cw20: d.acceptedTokens.cw20.map((t) => t.toLowerCase()),
        },
        applicationsReview: d.applicationsReview.toLowerCase(),
        indexFundContract: d.indexFundContract.toLowerCase(),
        accountsContract: d.accountsContract.toLowerCase(),
        treasury: d.treasury.toLowerCase(),
        subdaoGovCode: d.subdaoGovCode.toLowerCase(),
        subdaoCw20TokenCode: d.subdaoCw20TokenCode.toLowerCase(),
        subdaoBondingTokenCode: d.subdaoBondingTokenCode.toLowerCase(),
        subdaoCw900Code: d.subdaoCw900Code.toLowerCase(),
        subdaoDistributorCode: d.subdaoDistributorCode.toLowerCase(),
        subdaoEmitter: d.subdaoEmitter.toLowerCase(),
        donationMatchCode: d.donationMatchCode.toLowerCase(),
        donationMatchCharitesContract:
          d.donationMatchCharitesContract.toLowerCase(),
        donationMatchEmitter: d.donationMatchEmitter.toLowerCase(),
        splitToLiquid: {
          min: d.splitToLiquid.min.toNumber(),
          max: d.splitToLiquid.max.toNumber(),
          defaultSplit: d.splitToLiquid.defaultSplit.toNumber(),
        },
        haloToken: d.haloToken.toLowerCase(),
        haloTokenLpContract: d.haloTokenLpContract.toLowerCase(),
        govContract: d.govContract.toLowerCase(),
        collectorAddr: d.collectorAddr.toLowerCase(),
        collectorShare: d.collectorShare.toNumber(),
        charitySharesContract: d.charitySharesContract.toLowerCase(),
        fundraisingContract: d.fundraisingContract.toLowerCase(),
        rebalance: {
          rebalanceLiquidInvestedProfits: d.rebalance.lockedInterestsToLiquid,
          lockedInterestsToLiquid: d.rebalance.lockedInterestsToLiquid,
          interest_distribution: d.rebalance.interest_distribution.toNumber(),
          lockedPrincipleToLiquid: d.rebalance.lockedPrincipleToLiquid,
          principle_distribution: d.rebalance.principle_distribution.toNumber(),
        },
        swapsRouter: d.swapsRouter.toLowerCase(),
        multisigFactory: d.multisigFactory.toLowerCase(),
        multisigEmitter: d.multisigEmitter.toLowerCase(),
        charityProposal: d.charityProposal.toLowerCase(),
        lockedWithdrawal: d.lockedWithdrawal.toLowerCase(),
        proxyAdmin: d.proxyAdmin.toLowerCase(),
        usdcAddress: d.usdcAddress.toLowerCase(),
        wethAddress: d.wethAddress.toLowerCase(),
        cw900lvAddress: d.cw900lvAddress.toLowerCase(),
      };
    },
    "migrated",
  ],

  /** index fund */
  "index-fund.funds": [
    (args) => indexFund.encodeFunctionData("queryFundsList", toTuple(args)),
    (result) => {
      const decoded: DFund[] = indexFund.decodeFunctionResult(
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
      return decoded.map((a) => a.toLowerCase());
    },
    "semi-migrated",
  ],
  "index-fund.config": [
    indexFund.encodeFunctionData("queryConfig", []),
    (result) => {
      const d: DIndexFundConfig = indexFund.decodeFunctionResult(
        "queryConfig",
        result
      )[0];
      return {
        owner: d.owner.toLowerCase(),
        registrarContract: d.registrarContract,
        fundRotation: d.fundRotation.toNumber(),
        fundMemberLimit: d.fundMemberLimit.toNumber(),
        fundingGoal: d.fundingGoal.toNumber(),
        alliance_members: d.alliance_members,
      };
    },
    "migrated",
  ],

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
    ({ addr }) => giftCard.encodeFunctionData("queryBalance", [addr]),
    (result) => {
      const d: DGenericBalance = giftCard.decodeFunctionResult(
        "queryBalance",
        result
      )[0];

      return toBalMap(d);
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
  "multisig.threshold": [
    multisig.encodeFunctionData("required", []),
    (result) => {
      const d: BigNumber = multisig.decodeFunctionResult("required", result)[0];
      return d.toNumber();
    },
    "migrated",
  ],
  "multisig.require-execution": [
    multisig.encodeFunctionData("requireExecution", []),
    (result) => multisig.decodeFunctionResult("requireExecution", result)[0],
    "migrated",
  ],
  "multisig.tx-count": [
    (options) =>
      multisig.encodeFunctionData("getTransactionCount", toTuple(options)),
    (result) => {
      const d: BigNumber = multisig.decodeFunctionResult(
        "getTransactionCount",
        result
      )[0];
      return d.toNumber();
    },
    "migrated",
  ],
  "multisig.txs": [
    ({ range: [from, to], status }) => {
      return multisig.encodeFunctionData(
        "getTransactionIds",
        toTuple({
          from,
          to,
          pending: status === "pending",
          executed: status === "executed",
        })
      );
    },
    (result, args) => {
      const ids: BigNumber[] = multisig.decodeFunctionResult(
        "getTransactionIds",
        result
      )[0];

      return ids.map((id) => ({
        id: id.toNumber(),
        status: args?.status ?? "pending",
      }));
    },

    "semi-migrated",
  ],
  "multisig.transaction": [
    ({ id }) => multisig.encodeFunctionData("transactions", [id]),
    (result, args) => {
      const d = multisig.decodeFunctionResult(
        "transactions",
        result
      ) as unknown as DTransaction;

      return {
        id: args?.id ?? 0,
        title: d.title,
        description: d.description,
        destination: d.destination,
        value: d.value.toString(),
        data: d.data,
        status: d.executed ? "executed" : "pending",
      };
    },
    "migrated",
  ],

  "multisig.votes": [
    ({ id }) => multisig.encodeFunctionData("getConfirmations", [id]),
    (result) => {
      const d: string[] = multisig.decodeFunctionResult(
        "getConfirmations",
        result
      )[0];
      return d.map((s) => s.toLowerCase());
    },

    "migrated",
  ],

  /** account */
  "accounts.endowment": [
    ({ id }) => accounts.encodeFunctionData("queryEndowmentDetails", [id]),
    (result) => {
      const d: DEndowment = accounts.decodeFunctionResult(
        "queryEndowmentDetails",
        result
      )[0];

      const controller = d.settingsController;
      return {
        owner: d.owner.toLowerCase(),
        categories: {
          sdgs: d.categories.sdgs.map((s) => s.toNumber()) as UNSDG_NUMS[],
          general: d.categories.general.map((s) =>
            s.toNumber()
          ) as UNSDG_NUMS[],
        },
        endow_type: toEndowType(d.endow_type),
        status: toEndowStatusText(d.status),
        maturityTime: d.maturityTime.toNumber(),
        whitelistedBeneficiaries: d.whitelistedBeneficiaries.map((w) =>
          w.toLowerCase()
        ),
        maturityWhitelist: d.maturityWhitelist.map((w) => w.toLowerCase()),
        kycDonorsOnly: d.kycDonorsOnly,
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
      const d: DEndowmentState = accounts.decodeFunctionResult(
        "queryState",
        result
      )[0];

      return {
        //TODO: populate once needed
        donationsReceived: {
          locked: d.donationsReceived.locked.toString(),
          liquid: d.donationsReceived.liquid.toString(),
        },
        balances: {
          liquid: toBalMap(d.balances.liquid),
          locked: toBalMap(d.balances.locked),
        },
        closingEndowment: d.closingEndowment,
        //FUTURE: index-fund can also be beneficiary
        closingBeneficiary: {
          data: {
            id: d.closingBeneficiary.data.id.toNumber(),
            addr: d.closingBeneficiary.data.addr.toLowerCase(),
          },
          enumData: d.closingBeneficiary.enumData.toNumber() as any,
        },
      };
    },
    "migrated",
  ],
  "accounts.token-balance": [
    (args) => accounts.encodeFunctionData("queryTokenAmount", toTuple(args)),
    (result) => {
      const d: BigNumber = accounts.decodeFunctionResult(
        "queryTokenAmount",
        result
      )[0];
      return d.toString();
    },
    "migrated",
  ],
};
