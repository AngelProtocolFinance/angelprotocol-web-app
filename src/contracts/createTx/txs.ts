import { TxArgs, TxTypes } from "./types";
import { toTuple } from "helpers";
import { accounts } from "../evm/Account";
import { erc20 } from "../evm/ERC20";
import { charityApplication } from "../evm/charity-application";
import { indexFund } from "../evm/index-fund";
import { lockedWithdraw } from "../evm/locked-withdraw";
import { multisig } from "../evm/multisig";
import { registrar } from "../evm/registrar";

export const txs: { [T in TxTypes]: (args: TxArgs<T>) => string } = {
  // //// ACCOUNTS ////
  "accounts.create-endowment": (aif) =>
    accounts.encodeFunctionData("createEndowment", [toTuple(aif)]),
  "accounts.update-controller": (update) =>
    accounts.encodeFunctionData("updateEndowmentController", [toTuple(update)]),
  "accounts.deposit-erc20": (args) =>
    accounts.encodeFunctionData("depositERC20", toTuple(args)),
  "accounts.withdraw": (args) =>
    accounts.encodeFunctionData("withdraw", toTuple(args)),
  "accounts.update-status": (args) => "",
  "accounts.invest": () => "", //future
  "accounts.redeem": () => "", //future

  // //// MULTISIG ////
  "multisig.submit-transaction": (tx) =>
    multisig.encodeFunctionData("submitTransaction", toTuple(tx)),
  "multisig.add-owner": ({ address }) =>
    multisig.encodeFunctionData("addOwner", [address]),
  "multisig.remove-owner": ({ address }) =>
    multisig.encodeFunctionData("removeOwner", [address]),
  "multisig.confirm-tx": ({ id }) =>
    multisig.encodeFunctionData("confirmTransaction", [id]),
  "multisig.revoke-tx": ({ id }) =>
    multisig.encodeFunctionData("revokeConfirmation", [id]),
  "multisig.execute-tx": ({ id }) =>
    multisig.encodeFunctionData("executeTransaction", [id]),
  "multisig.change-threshold": ({ threshold }) =>
    multisig.encodeFunctionData("changeRequirement", [threshold]),

  // //// ERC20 ////
  "erc20.transfer": (transfer) =>
    erc20.encodeFunctionData("transfer", toTuple(transfer)),
  "erc20.approve": (allowance) =>
    erc20.encodeFunctionData("approve", toTuple(allowance)),

  // //// INDEX FUND ////
  "index-fund.config": (config) =>
    indexFund.encodeFunctionData("updateConfig", [toTuple(config)]),
  "index-fund.update-owner": ({ newOwner }) =>
    indexFund.encodeFunctionData("updateOwner", [newOwner]),
  "index-fund.create-fund": (fund) =>
    indexFund.encodeFunctionData("createIndexFund", toTuple(fund)),
  "index-fund.remove-fund": ({ id }) =>
    indexFund.encodeFunctionData("removeIndexFund", [id]),
  "index-fund.remove-member": ({ id }) =>
    indexFund.encodeFunctionData("removeMember", [id]),
  "index-fund.update-members": (update) =>
    indexFund.encodeFunctionData("updateFundMembers", toTuple(update)),
  "index-fund.update-alliance-list": (update) =>
    indexFund.encodeFunctionData("updateAllianceMemberList", toTuple(update)),

  "locked-withdraw.propose": (args) =>
    lockedWithdraw.encodeFunctionData("propose", toTuple(args)),

  "charity-application.approve": ({ id }) =>
    charityApplication.encodeFunctionData("approveCharity", [id]),
  "charity-application.reject": ({ id }) =>
    charityApplication.encodeFunctionData("rejectCharity", [id]),

  "registrar.update-owner": ({ newOwner }) =>
    registrar.encodeFunctionData("updateOwner", [newOwner]),
  "registrar.update-config": (config) =>
    registrar.encodeFunctionData("updateConfig", [toTuple(config)]),
};
