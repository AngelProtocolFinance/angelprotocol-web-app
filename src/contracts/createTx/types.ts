import { ValueOf } from "type-fest";
import {
  AccountType,
  Beneficiary,
  CloseEndowmentRequest,
  ERC20Deposit,
  EndowmentSettingsUpdate,
  FundMemberUpdate,
  IndexFundConfigUpdate,
  NewFund,
  RegistrarConfigUpdate,
  SettingsControllerUpdate,
} from "types/contracts";
import { NewAST } from "types/contracts";
import { Allowance, Transfer } from "types/contracts/evm/erc20";
import { Asset } from "types/contracts/gift-card";
import { NewTransaction } from "types/contracts/multisig";
import { Tupleable } from "types/evm";
import { Contract } from "types/lists";
import { Diff } from "types/utils";
import {
  AccountStatusMeta,
  MultisigMemberMeta,
  OwnerMeta,
  ThresholdMeta,
  TransferMeta,
  WithdrawMeta,
} from "./meta";

type Tx<T extends Tupleable, M> = {
  meta: M;
  args: T;
};

export type Addr = { address: string };
export type ID = { id: number };

type Txs = {
  // //// ACCOUNTS ////
  "accounts.create-endowment": Tx<NewAST, never>; //not multisig tx
  "accounts.update-controller": Tx<SettingsControllerUpdate, never>; //future
  "accounts.update-settings": Tx<EndowmentSettingsUpdate, never>; //future
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
  "accounts.close": Tx<CloseEndowmentRequest, string>;
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
  "index-fund.config": Tx<IndexFundConfigUpdate, Diff[]>;
  "index-fund.update-owner": Tx<{ newOwner: string }, OwnerMeta>;
  "index-fund.create-fund": Tx<NewFund, NewFund>;
  "index-fund.remove-fund": Tx<ID, ID>;
  "index-fund.remove-member": Tx<ID, ID>;
  "index-fund.update-members": Tx<FundMemberUpdate, FundMemberUpdate>;

  "locked-withdraw.propose": Tx<
    {
      id: number;
      token: string;
      amount: string;
    },
    WithdrawMeta
  >;

  "charity-application.approve": Tx<ID, never>; //info already in /application page
  "charity-application.reject": Tx<ID, never>; //info already in /application page

  "gift-card.spend": Tx<
    {
      asset: Asset;
      id: number;
      lockedPCT: number;
      liquidPCT: number;
    },
    never //not multisig tx
  >;
  "gift-card.deposit-native": Tx<{ from: string; to: string }, never>; //not multisig tx
  "gift-card.deposit-erc20": Tx<
    { from: string; to: string; asset: Asset },
    never //not multisig tx
  >;

  "registrar.update-owner": Tx<{ newOwner: string }, OwnerMeta>;
  "registrar.update-config": Tx<RegistrarConfigUpdate, Diff[]>;
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
