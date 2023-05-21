import { BigNumber } from "@ethersproject/bignumber";
import {
  DEndowment,
  DEndowmentState,
  DFund,
  DGenericBalance,
  DTransaction,
  toBalMap,
  toDelegate,
  toEndowStatusText,
  toEndowType,
  toSplit,
} from "./decoded-types";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { UNSDG_NUMS } from "types/lists";
import { IndexFundStorage } from "types/typechain-types/contracts/core/index-fund/IndexFund";
import { RegistrarStorage } from "types/typechain-types/contracts/core/registrar/interfaces/IRegistrar";
import { accounts } from "contracts/evm/Account";
import { erc20 } from "contracts/evm/ERC20";
import { giftCard } from "contracts/evm/gift-card";
import { indexFund } from "contracts/evm/index-fund";
import { multisig } from "contracts/evm/multisig";
import { registrar } from "contracts/evm/registrar";
import { toTuple } from "helpers";

export const queryObjects: {
  [K in QT]: Q[K]["args"] extends null
    ? [string, Q[K]["transform"]]
    : [(args: Q[K]["args"]) => string, Q[K]["transform"]];
} = {
  /** registrar */
  "registrar.config": [
    registrar.encodeFunctionData("queryConfig", []),
    (result) => {
      const d: RegistrarStorage.ConfigStructOutput =
        registrar.decodeFunctionResult("queryConfig", result)[0];
      return {
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
        splitToLiquid: toSplit(d.splitToLiquid),
        haloToken: d.haloToken.toLowerCase(),
        haloTokenLpContract: d.haloTokenLpContract.toLowerCase(),
        govContract: d.govContract.toLowerCase(),
        collectorShare: d.collectorShare.toNumber(),
        charitySharesContract: d.charitySharesContract.toLowerCase(),
        fundraisingContract: d.fundraisingContract.toLowerCase(),
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
  ],

  "index-fund.config": [
    indexFund.encodeFunctionData("queryConfig", []),
    (result) => {
      const d: IndexFundStorage.ConfigStructOutput =
        indexFund.decodeFunctionResult("queryConfig", result)[0];

      return {
        owner: d.owner.toLowerCase(),
        registrarContract: d.registrarContract.toLowerCase(),
        fundRotation: d.fundRotation.toNumber(),
        fundMemberLimit: d.fundMemberLimit.toNumber(),
        fundingGoal: d.fundingGoal.toNumber(),
      };
    },
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
  ],
  "erc20.allowance": [
    (args) => erc20.encodeFunctionData("allowance", toTuple(args)),
    (result) => {
      const decoded: BigNumber = erc20.decodeFunctionResult(
        "allowance",
        result
      )[0];
      return decoded.toString();
    },
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
  ],

  /** multisig */
  "multisig.members": [
    multisig.encodeFunctionData("getOwners", []),
    (result) => {
      const d: string[] = multisig.decodeFunctionResult("getOwners", result)[0];
      //wallets outputs lowercase addresses, but addresses from contracts are not
      return d.map((a) => a.toLowerCase());
    },
  ],
  "multisig.threshold": [
    multisig.encodeFunctionData("required", []),
    (result) => {
      const d: BigNumber = multisig.decodeFunctionResult("required", result)[0];
      return d.toNumber();
    },
  ],
  "multisig.require-execution": [
    multisig.encodeFunctionData("requireExecution", []),
    (result) => multisig.decodeFunctionResult("requireExecution", result)[0],
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
        allowlistedBeneficiaries: d.allowlistedBeneficiaries.map((w) =>
          w.toLowerCase()
        ),
        allowlistedContributors: d.allowlistedBeneficiaries.map((w) =>
          w.toLowerCase()
        ),
        maturityAllowlist: d.maturityAllowlist.map((w) => w.toLowerCase()),
        kycDonorsOnly: d.kycDonorsOnly,
        donationMatchActive: d.donationMatchActive,
        settingsController: {
          strategies: toDelegate(controller.strategies),
          allowlistedBeneficiaries: toDelegate(
            controller.allowlistedBeneficiaries
          ),
          allowlistedContributors: toDelegate(
            controller.allowlistedContributors
          ),
          maturityAllowlist: toDelegate(controller.maturityAllowlist),
          maturityTime: toDelegate(controller.maturityTime),
          withdrawFee: toDelegate(controller.withdrawFee),
          depositFee: toDelegate(controller.depositFee),
          balanceFee: toDelegate(controller.balanceFee),
          name: toDelegate(controller.name),
          image: toDelegate(controller.image),
          logo: toDelegate(controller.logo),
          categories: toDelegate(controller.categories),
          splitToLiquid: toDelegate(controller.splitToLiquid),
          ignoreUserSplits: toDelegate(controller.ignoreUserSplits),
        },
        ignoreUserSplits: d.ignoreUserSplits,
        splitToLiquid: toSplit(d.splitToLiquid),
      };
    },
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
  ],
};
