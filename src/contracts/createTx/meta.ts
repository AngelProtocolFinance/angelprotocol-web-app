// import { TxArgs, TxTypes } from "./types";
// import { erc20 } from "contracts/evm/ERC20";
// import { charityApplication } from "contracts/evm/charity-application";
// import { indexFund } from "contracts/evm/index-fund";
// import { lockedWithdraw } from "contracts/evm/locked-withdraw";
// import { multisig } from "contracts/evm/multisig";
// import { registrar } from "contracts/evm/registrar";
// import { toTuple } from "helpers";
// import { accounts } from "../evm/Account";
import { Token } from "types/aws";
import {
  AllianceListUpdate,
  FundDetails,
  FundMemberUpdate,
  IndexFundConfigUpdate,
} from "types/contracts";
import { DiffSet } from "types/utils";

type NotImplemented = unknown;
type Address = { address: string };

// export const txs: { [T in TxTypes]: (args: TxArgs<T>) => string } = {
//   // //// ACCOUNTS ////
//   "accounts.create-endowment": (aif) =>
/**@@ Not Implemented */
//   "accounts.update-controller": (update) =>
//   "accounts.deposit-erc20": (args) =>
/**@@ Not Implemented */
//   "accounts.withdraw": (args) =>
export type Withdraw = {
  beneficiary: string;
  tokens: (Pick<Token, "symbol" | "logo"> & { amount: number })[];
};
//   "accounts.update-status": (args) => "",
//   "accounts.invest": () => "", //future
//   "accounts.redeem": () => "", //future

//   // //// MULTISIG ////
//   "multisig.submit-transaction": (tx) =>
export type MTx = NotImplemented;
//   "multisig.add-owner": ({ address }) =>
export type MAddOwner = Address;
//   "multisig.remove-owner": ({ address }) =>
export type MRemoveOwner = Address;
//   "multisig.confirm-tx": ({ id }) =>
/**@@ Not Implemented */
//   "multisig.revoke-tx": ({ id }) =>
/**@@ Not Implemented */
//   "multisig.execute-tx": ({ id }) =>
/**@@ Not Implemented */
//   "multisig.change-threshold": ({ threshold }) =>

//   // //// ERC20 ////
//   "erc20.transfer": (transfer) =>
export type ERC20Transfer = { amount: number; to: string };
//   "erc20.approve": (allowance) =>
/**@@ Not Implemented */

//   // //// INDEX FUND ////
//   "index-fund.config": (config) =>
export type IFConfig = DiffSet<IndexFundConfigUpdate>;
//   "index-fund.update-owner": ({ newOwner }) =>
export type Owner = { curr: string; new: string };
//   "index-fund.create-fund": (fund) =>
export type FundPreview = Omit<FundDetails, "id">;
//   "index-fund.remove-fund": ({ id }) =>
export type ID = string;
//   "index-fund.remove-member": ({ id }) =>
/**@@ Not Implemented */
//   "index-fund.update-members": (update) =>
export type IFFundMembers = FundMemberUpdate;
//   "index-fund.update-alliance-list": (update) =>
export type IFAllianceList = AllianceListUpdate;

//   "locked-withdraw.propose": (args) =>

//   "charity-application.approve": ({ id }) =>
//   "charity-application.reject": ({ id }) =>

//   "registrar.update-owner": ({ newOwner }) =>
export type RegOwner = { curr: string; new: string };
//   "registrar.update-config": (config) =>
// };
