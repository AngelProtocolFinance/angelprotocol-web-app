import {
  NewFund,
  RegistrarConfigPayload,
  SettingsControllerUpdate,
} from "types/contracts";
import { AccountType, ERC20Deposit, NewAST } from "types/contracts/evm";
import { Allowance, Transfer } from "types/contracts/evm/erc20";
import { NewTransaction } from "types/contracts/multisig";
import { Tupleable } from "types/evm";
import { Contract } from "types/lists";

type Tx<T extends Tupleable> = {
  tags: string[]; //tags to invalidate.
  /**
   * or create static map
   * [event_topic]: query_tag[]
   *
   * after tx, for each log, if log.topic in map, invalidate query_tag[]
   */
  args: T;
};

type Txs = {
  // //// ACCOUNTS ////
  "accounts.create-endowment": Tx<NewAST>;
  "accounts.update-controller": Tx<SettingsControllerUpdate>;
  "accounts.deposit-erc20": Tx<ERC20Deposit>;
  "accounts.withdraw": Tx<{
    id: number;
    type: AccountType;
    beneficiary: string;
    addresses: string[];
    amounts: string[];
  }>;

  "accounts.invest": Tx<{
    id: number;
    account: AccountType;
    vaults: string[];
    tokens: string[];
    amounts: string[]; //uint256
  }>;
  "accounts.redeem": Tx<{
    id: number;
    account: AccountType;
    vaults: string[];
  }>;

  // //// MULTISIG ////
  "multisig.submit-transaction": Tx<NewTransaction>;
  "multisig.add-owner": Tx<{ address: string }>;
  "multisig.remove-owner": Tx<{ address: string }>;
  "multisig.confirm-tx": Tx<{ id: number }>;
  "multisig.revoke-tx": Tx<{ id: number }>;
  "multisig.execute-tx": Tx<{ id: number }>;
  "multisig.change-threshold": Tx<{ threshold: number }>;

  "erc20.transfer": Tx<Transfer>;
  "erc20.approve": Tx<Allowance>;

  // //// INDEX FUND ////
  "index-fund.config": Tx<{
    fundRotation: number;
    fundMemberLimit: number;
    fundingGoal: number;
  }>;
  "index-fund.update-owner": Tx<{ newOwner: string }>;
  "index-fund.create-fund": Tx<NewFund>;
  "index-fund.remove-fund": Tx<{ id: number }>;
  "index-fund.remove-member": Tx<{ id: number }>;
  "index-fund.update-members": Tx<{
    fundId: number;
    add: number[];
    remove: number[];
  }>;
  "index-fund.update-alliance-list": Tx<{
    address: string;
    action: "add" | "remove";
  }>;

  "locked-withdraw.propose": Tx<{
    id: number;
    beneficiary: string;
    addresses: string[];
    amounts: string[];
  }>;

  "charity-application.approve": Tx<{ id: number }>;
  "charity-application.reject": Tx<{ id: number }>;

  "registrar.update-owner": Tx<{ newOwner: string }>;
  "registrar.update-config": Tx<RegistrarConfigPayload>;
};

export type TxTypes = keyof Txs;
export type TxArgs<T extends TxTypes> = Txs[T]["args"];

type Empty = { [key: string]: never };
export type TxOptions<T extends TxTypes> = T extends `${infer C}.${string}`
  ? C extends Contract
    ? Txs[T]["args"]
    : { [key in C]: string } & Txs[T]["args"]
  : Empty;
