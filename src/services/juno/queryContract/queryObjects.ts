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
import { AccountMessages } from "types/typechain-types/contracts/core/accounts/interfaces/IAccounts";
import {
  IIndexFund,
  IndexFundStorage,
} from "types/typechain-types/contracts/core/index-fund/IndexFund";
import { LibAccounts as RegistrarLibAccounts } from "types/typechain-types/contracts/core/registrar/LocalRegistrar";
import { RegistrarStorage } from "types/typechain-types/contracts/core/registrar/interfaces/IRegistrar";
import { DecodedApplicationProposal } from "types/typechain-types/custom";
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
        accountsContract: d.accountsContract.toLowerCase(),
        apTeamMultisig: d.apTeamMultisig.toLowerCase(),
        treasury: d.treasury.toLowerCase(),
        indexFundContract: d.indexFundContract.toLowerCase(),
        haloToken: d.haloToken.toLowerCase(),
        govContract: d.govContract.toLowerCase(),
        fundraisingContract: d.fundraisingContract.toLowerCase(),
        uniswapRouter: d.uniswapRouter.toLowerCase(),
        uniswapFactory: d.uniswapFactory.toLowerCase(),
        multisigFactory: d.multisigFactory.toLowerCase(),
        multisigEmitter: d.multisigEmitter.toLowerCase(),
        charityApplications: d.charityApplications.toLowerCase(),
        proxyAdmin: d.proxyAdmin.toLowerCase(),
        usdcAddress: d.usdcAddress.toLowerCase(),
        wMaticAddress: d.wMaticAddress.toLowerCase(),
        gasFwdFactory: d.gasFwdFactory.toLowerCase(),
      };
    },
  ],
  "registrar.fee-setting": [
    ({ type }) => {
      const feeType = (() => {
        switch (type) {
          case "Harvest":
            return 1;
          case "WithdrawCharity":
            return 2;
          case "WithdrawNormal":
            return 3;
          case "EarlyLockedWithdrawCharity":
            return 4;
          case "EarlyLockedWithdrawNormal":
            return 5;
          default: //Default
            return 0;
        }
      })();
      return registrar.encodeFunctionData("getFeeSettingsByFeeType", [feeType]);
    },
    (result) => {
      const d: RegistrarLibAccounts.FeeSettingStructOutput =
        registrar.decodeFunctionResult("getFeeSettingsByFeeType", result)[0];
      return {
        payoutAddress: d.payoutAddress.toLowerCase(),
        bps: d.bps.toNumber(),
      };
    },
  ],

  "index-fund.config": [
    indexFund.encodeFunctionData("queryConfig", []),
    (result) => {
      const d: IndexFundStorage.ConfigStructOutput =
        indexFund.decodeFunctionResult("queryConfig", result)[0];

      return {
        registrarContract: d.registrarContract.toLowerCase(),
        fundRotation: d.fundRotation.toNumber(),
        fundingGoal: d.fundingGoal.toNumber(),
      };
    },
  ],
  "index-fund.fund": [
    ({ id }) => indexFund.encodeFunctionData("queryFundDetails", [id]),
    (result) => {
      const d: IIndexFund.FundResponseStructOutput =
        indexFund.decodeFunctionResult("queryFundDetails", result)[0];

      return {
        id: d.id.toNumber(),
        name: d.name,
        description: d.description,
        endowments: d.endowments.map((m) => m),
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
      const d: AccountMessages.EndowmentResponseStructOutput =
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
