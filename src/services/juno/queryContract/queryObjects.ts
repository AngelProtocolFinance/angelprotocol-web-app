import { BigNumber } from "@ethersproject/bignumber";
import {
  DGenericBalance,
  toBalMap,
  toEndowType,
  toPermission,
  toSplit,
} from "./decoded-types";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { UNSDG_NUMS } from "types/lists";
import {
  AccountMessages,
  AccountStorage,
} from "types/typechain-types/contracts/core/accounts/IAccounts";
import {
  IndexFundStorage,
  AngelCoreStruct as IndexFundStructs,
} from "types/typechain-types/contracts/core/index-fund/IndexFund";
import { RegistrarStorage } from "types/typechain-types/contracts/core/registrar/interfaces/IRegistrar";
import { MultiSigStorage } from "types/typechain-types/contracts/multisigs/MultiSigGeneric";
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
  "registrar.owner": [
    registrar.encodeFunctionData("owner", []),
    (result) => registrar.decodeFunctionResult("owner", result)[0],
  ],
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
        subdaoGovContract: d.subdaoGovContract.toLowerCase(),
        subdaoTokenContract: d.subdaoTokenContract.toLowerCase(),
        subdaoBondingTokenContract: d.subdaoBondingTokenContract.toLowerCase(),
        subdaoCw900Contract: d.subdaoCw900Contract.toLowerCase(),
        subdaoDistributorContract: d.subdaoDistributorContract.toLowerCase(),
        subdaoEmitter: d.subdaoEmitter.toLowerCase(),
        donationMatchContract: d.donationMatchContract.toLowerCase(),
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
  "index-fund.fund": [
    ({ id }) => indexFund.encodeFunctionData("queryFundDetails", [id]),
    (result) => {
      const d: IndexFundStructs.IndexFundStructOutput =
        indexFund.decodeFunctionResult("queryFundDetails", result)[0];

      return {
        id: d.id.toNumber(),
        name: d.name,
        description: d.description,
        members: d.members.map((m) => m),
        splitToLiquid: d.splitToLiquid.toNumber(),
        expiryTime: d.expiryTime.toNumber(),
        expiryHeight: d.expiryHeight.toNumber(),
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
      const d: MultiSigStorage.TransactionStructOutput =
        multisig.decodeFunctionResult("transactions", result) as any;

      return {
        id: args?.id ?? 0,
        title: d.title,
        description: d.description,
        destination: d.destination,
        value: d.value.toString(),
        data: d.data,
        status: d.executed ? "executed" : "pending",
        metadata: d.metadata,
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
      const d: AccountStorage.EndowmentStructOutput =
        accounts.decodeFunctionResult("queryEndowmentDetails", result)[0];

      const controller = d.settingsController;
      return {
        owner: d.owner.toLowerCase(),
        categories: {
          sdgs: d.categories.sdgs.map((s) => s.toNumber()) as UNSDG_NUMS[],
          general: d.categories.general.map((s) => s.toNumber()),
        },
        endowType: toEndowType(d.endowType),
        maturityTime: d.maturityTime.toNumber(),
        allowlistedBeneficiaries: d.allowlistedBeneficiaries.map((w) =>
          w.toLowerCase()
        ),
        allowlistedContributors: d.allowlistedContributors.map((w) =>
          w.toLowerCase()
        ),
        maturityAllowlist: d.maturityAllowlist.map((w) => w.toLowerCase()),
        kycDonorsOnly: d.kycDonorsOnly,
        donationMatchActive: d.donationMatchActive,
        settingsController: {
          acceptedTokens: toPermission(controller.acceptedTokens),
          lockedInvestmentManagement: toPermission(
            controller.lockedInvestmentManagement
          ),
          liquidInvestmentManagement: toPermission(
            controller.liquidInvestmentManagement
          ),
          allowlistedBeneficiaries: toPermission(
            controller.allowlistedBeneficiaries
          ),
          allowlistedContributors: toPermission(
            controller.allowlistedContributors
          ),
          maturityAllowlist: toPermission(controller.maturityAllowlist),
          maturityTime: toPermission(controller.maturityTime),
          earlyLockedWithdrawFee: toPermission(
            controller.earlyLockedWithdrawFee
          ),
          withdrawFee: toPermission(controller.withdrawFee),
          depositFee: toPermission(controller.depositFee),
          balanceFee: toPermission(controller.balanceFee),
          name: toPermission(controller.name),
          image: toPermission(controller.image),
          logo: toPermission(controller.logo),
          categories: toPermission(controller.categories),
          splitToLiquid: toPermission(controller.splitToLiquid),
          ignoreUserSplits: toPermission(controller.ignoreUserSplits),
        },
        ignoreUserSplits: d.ignoreUserSplits,
        splitToLiquid: toSplit(d.splitToLiquid),
      };
    },
  ],
  "accounts.state": [
    ({ id }) => accounts.encodeFunctionData("queryState", [id]),
    (result) => {
      const d: AccountMessages.StateResponseStructOutput =
        accounts.decodeFunctionResult("queryState", result)[0];
      const bene = d.closingBeneficiary;

      return {
        closingEndowment: d.closingEndowment,
        //FUTURE: index-fund can also be beneficiary
        closingBeneficiary: {
          data: {
            endowId: bene.data.endowId,
            fundId: bene.data.fundId.toNumber(),
            addr: bene.data.addr.toLowerCase(),
          },
          enumData: bene.enumData as any /** 0 | 1 | 2 | 3 */,
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
