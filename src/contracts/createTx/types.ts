import { ValueOf } from "type-fest";
import {
  AllianceListUpdate,
  FundMemberUpdate,
  IndexFundConfigUpdate,
  NewFund,
  RegistrarConfigPayload,
  SettingsControllerUpdate,
} from "types/contracts";
import {
  AccountType,
  Beneficiary,
  ERC20Deposit,
  NewAST,
} from "types/contracts/evm";
import { Allowance, Transfer } from "types/contracts/evm/erc20";
import { NewTransaction } from "types/contracts/multisig";
import { Tupleable } from "types/evm";
import { Contract } from "types/lists";
import { DiffSet } from "types/utils";
import {
  AccountStatusMeta,
  MultisigMemberMeta,
  OwnerMeta,
  ThresholdMeta,
  TransferMeta,
  WithdrawMeta,
} from "./meta";

type Tx<T extends Tupleable, M> = {
  tags: string[]; //tags to invalidate.
  meta: M;
  /**
   * or create static map
   * [event_topic]: query_tag[]
   *
   * after tx, for each log, if log.topic in map, invalidate query_tag[]
   */
  args: T;
};

export type Addr = { address: string };
export type ID = { id: number };

type Txs = {
  // //// ACCOUNTS ////
  "accounts.create-endowment": Tx<NewAST, never>; //not multisig tx
  "accounts.update-controller": Tx<SettingsControllerUpdate, never>; //future
  "accounts.deposit-erc20": Tx<ERC20Deposit, never>; //not multisig tx
  "accounts.withdraw": Tx<
    {
      id: number;
      type: AccountType;
      beneficiary: string;
      addresses: string[];
      amounts: string[];
    },
    WithdrawMeta
  >;
  "accounts.update-status": Tx<
    {
      id: number;
      status: number;
      beneficiary: Beneficiary;
    },
    AccountStatusMeta
  >;
  "accounts.invest": Tx<
    {
      id: number;
      account: AccountType;
      vaults: string[];
      tokens: string[];
      amounts: string[]; //uint256
    },
    never //future
  >;
  "accounts.redeem": Tx<
    {
      id: number;
      account: AccountType;
      vaults: string[];
    },
    never //future
  >;

  // //// MULTISIG ////
  "multisig.submit-transaction": Tx<NewTransaction, never>; //no meta
  "multisig.add-owner": Tx<Addr, MultisigMemberMeta>;
  "multisig.remove-owner": Tx<Addr, MultisigMemberMeta>;
  "multisig.confirm-tx": Tx<ID, never>; //no meta
  "multisig.revoke-tx": Tx<ID, never>; //no meta
  "multisig.execute-tx": Tx<ID, never>; //no meta
  "multisig.change-threshold": Tx<{ threshold: number }, ThresholdMeta>;

  "erc20.transfer": Tx<Transfer, TransferMeta>;
  "erc20.approve": Tx<Allowance, never>; //not multisig tx

  // //// INDEX FUND ////
  "index-fund.config": Tx<
    IndexFundConfigUpdate,
    DiffSet<IndexFundConfigUpdate>
  >;
  "index-fund.update-owner": Tx<{ newOwner: string }, OwnerMeta>;
  "index-fund.create-fund": Tx<NewFund, NewFund>;
  "index-fund.remove-fund": Tx<ID, ID>;
  "index-fund.remove-member": Tx<ID, ID>;
  "index-fund.update-members": Tx<FundMemberUpdate, FundMemberUpdate>;
  "index-fund.update-alliance-list": Tx<AllianceListUpdate, AllianceListUpdate>;

  "locked-withdraw.propose": Tx<
    {
      id: number;
      beneficiary: string;
      addresses: string[];
      amounts: string[];
    },
    WithdrawMeta
  >;

  "charity-application.approve": Tx<ID, never>; //info already in /application page
  "charity-application.reject": Tx<ID, never>; //info already in /application page

  "registrar.update-owner": Tx<{ newOwner: string }, OwnerMeta>;
  "registrar.update-config": Tx<
    RegistrarConfigPayload,
    DiffSet<RegistrarConfigPayload>
  >;
};

export type TxTypes = keyof Txs;
export type TxArgs<T extends TxTypes> = Txs[T]["args"];

type Empty = { [key: string]: never };
export type TxOptions<T extends TxTypes> = T extends `${infer C}.${string}`
  ? C extends Contract
    ? Txs[T]["args"]
    : { [key in C]: string } & Txs[T]["args"]
  : Empty;

export type Metadata<T extends TxTypes> = Txs[T]["meta"];
export type TxMeta = ValueOf<{
  [K in keyof Txs]: { id: K; data?: Txs[K]["meta"] };
}>;
