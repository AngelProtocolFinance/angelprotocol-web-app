import { AbiCoder } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import {
  DGenericBalance,
  toBalMap,
  toEndowType,
  toFee,
  toPermission,
  toSplit,
} from "./decoded-types";
import { ContractQueries as Q, ContractQueryTypes as QT } from "./types";
import { TxMeta } from "types/tx";
import {
  AccountMessages,
  AccountStorage,
} from "types/typechain-types/contracts/core/accounts/interfaces/IAccounts";
import {
  IIndexFund,
  IndexFundStorage,
} from "types/typechain-types/contracts/core/index-fund/IndexFund";
import { RegistrarStorage } from "types/typechain-types/contracts/core/registrar/interfaces/IRegistrar";
import { DecodedApplicationProposal } from "types/typechain-types/custom";
import { accounts } from "contracts/evm/Account";
import { erc20 } from "contracts/evm/ERC20";
import { giftCard } from "contracts/evm/gift-card";
import { indexFund } from "contracts/evm/index-fund";
import { multisig } from "contracts/evm/multisig";
import { registrar } from "contracts/evm/registrar";
import { toTuple } from "helpers";
import { EMPTY_DATA } from "constants/evm";

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
        uniswapRouter: d.uniswapRouter.toLowerCase(),
        uniswapFactory: d.uniswapFactory.toLocaleLowerCase(),
        multisigFactory: d.multisigFactory.toLowerCase(),
        multisigEmitter: d.multisigEmitter.toLowerCase(),
        charityApplications: d.charityApplications.toLowerCase(),
        lockedWithdrawal: d.lockedWithdrawal.toLowerCase(),
        proxyAdmin: d.proxyAdmin.toLowerCase(),
        usdcAddress: d.usdcAddress.toLowerCase(),
        wMaticAddress: d.wMaticAddress.toLowerCase(),
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
      const d: IIndexFund.IndexFundStructOutput =
        indexFund.decodeFunctionResult("queryFundDetails", result)[0];

      return {
        id: d.id.toNumber(),
        name: d.name,
        description: d.description,
        members: d.members.map((m) => m),
        splitToLiquid: d.splitToLiquid.toNumber(),
        expiryTime: d.expiryTime.toNumber(),
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
  "multisig.is-owner": [
    ({ addr }) => multisig.encodeFunctionData("isOwner", [addr]),
    (result) => multisig.decodeFunctionResult("isOwner", result)[0],
  ],
  "multisig.threshold": [
    multisig.encodeFunctionData("approvalsRequired", []),
    (result) => {
      const d: BigNumber = multisig.decodeFunctionResult(
        "approvalsRequired",
        result
      )[0];
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
          pending: status === "open",
          executed: status === "approved",
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
        status: args?.status ?? "open",
      }));
    },
  ],
  "multisig.transaction": [
    ({ id }) => multisig.encodeFunctionData("transactions", [id]),
    (result, args) => {
      // no separate TransactionOutputStruct from typechain
      const d: [string, BigNumber, string, boolean, BigNumber, string] & {
        destination: string;
        value: BigNumber;
        data: string;
        executed: boolean;
        expiry: BigNumber;
        metadata: string;
      } = multisig.decodeFunctionResult("transactions", result) as any;

      const parsed: TxMeta | undefined =
        d.metadata === EMPTY_DATA
          ? undefined
          : JSON.parse(new AbiCoder().decode(["string"], d.metadata)[0]);

      return {
        id: args?.id ?? 0,
        destination: d.destination,
        value: d.value.toString(),
        data: d.data,
        status: d.executed ? "approved" : "open",
        expiry: d.expiry.toNumber(),
        metadata: parsed,
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
  "multisig.tx-duration": [
    multisig.encodeFunctionData("transactionExpiry", []),
    (result) => {
      const d: BigNumber = multisig.decodeFunctionResult(
        "transactionExpiry",
        result
      )[0];
      return d.toNumber();
    },
  ],
  "multisig/review.is-confirmed": [
    ({ id, addr }) =>
      multisig.encodeFunctionData("getProposalConfirmationStatus", [id, addr]),
    (result) =>
      multisig.decodeFunctionResult("getProposalConfirmationStatus", result)[0],
  ],
  "multisig/review.proposal": [
    ({ id }) => multisig.encodeFunctionData("proposals", [id]),
    (result) => {
      const d = multisig.decodeFunctionResult(
        "proposals",
        result
      ) as DecodedApplicationProposal;

      return {
        //abi is tuple only
        executed: d[4],
        expiry: d[3].toNumber(),
      };
    },
  ],
  "multisig/review.prop-confirms": [
    ({ id }) =>
      multisig.encodeFunctionData("getProposalConfirmationCount", [id]),
    (result) => {
      const d: BigNumber = multisig.decodeFunctionResult(
        "getProposalConfirmationCount",
        result
      )[0];

      return d.toNumber();
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
        sdgs: d.sdgs.map((s) => s.toNumber()),
        endowType: toEndowType(d.endowType),
        maturityTime: d.maturityTime.toNumber(),
        allowlistedBeneficiaries: d.allowlistedBeneficiaries.map((w) =>
          w.toLowerCase()
        ),
        allowlistedContributors: d.allowlistedContributors.map((w) =>
          w.toLowerCase()
        ),
        maturityAllowlist: d.maturityAllowlist.map((w) => w.toLowerCase()),
        donationMatchActive: d.donationMatchActive,

        earlyLockedWithdrawFee: toFee(d.earlyLockedWithdrawFee),
        depositFee: toFee(d.depositFee),
        withdrawFee: toFee(d.withdrawFee),
        balanceFee: toFee(d.balanceFee),

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
          sdgs: toPermission(controller.sdgs),
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
