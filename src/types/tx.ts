import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Except, OverrideProperties } from "type-fest";
import { ValueOf } from "type-fest";
import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { FetchedChain, Token, TokenType } from "./aws";
import {
  Token as AccountToken,
  AccountType,
  AllowlistUpdate,
  CloseEndowmentRequest,
  ERC20Deposit,
  EndowmentSettingsUpdate,
  FeeSettingsUpdate,
  FundMemberUpdate,
  IndexFundConfigUpdate,
  InvestPayload,
  NewAST,
  NewFund,
  RegistrarConfigUpdate,
  SettingsControllerUpdate,
} from "./contracts";
import { Allowance, Transfer } from "./contracts/erc20";
import { Asset } from "./contracts/gift-card";
import { NewTransaction } from "./contracts/multisig";
import { SignDoc } from "./cosmos";
import { Tupleable } from "./evm";
import { EVMTx, LogProcessor, SimulTx } from "./evm";
import { Contract, TransactionStatus } from "./lists";
import { TagPayload } from "./third-party/redux";
import { Diff } from "./utils";

export type TokenWithBalance = OverrideProperties<
  Token,
  { type: TokenType | "erc20-gift" | "evm-native-gift" }
> & { balance: number };

export type TokenWithAmount = Except<TokenWithBalance, "type"> & {
  amount: string;
  type: TokenWithBalance["type"] | "fiat"; // "fiat" type not present in AWS (added here)
};

export type Chain = Omit<FetchedChain, "native_currency" | "tokens"> & {
  tokens: TokenWithBalance[];
  native_currency: TokenWithBalance;
};

// //////////// SEND TX ////////////

export type EstimatedTx =
  | { type: "cosmos"; val: SignDoc; attribute?: string }
  | {
      type: "terra";
      val: CreateTxOptions;
      wallet: ConnectedWallet /**future client/provider will be included in wallet */;
    }
  | { type: "evm"; val: EVMTx; log?: LogProcessor };

export type SubmittedTx = { hash: string; chainID: string };

type TxLoading = { loading: string };
export type TxError = { error: string; tx?: SubmittedTx };
type TxSuccess = SubmittedTx & { data: unknown };

export type TxResult = TxError | TxSuccess;

// //////////// ESTIMATE TX ////////////
export type TxContent =
  | { type: "cosmos"; val: Any[]; attribute?: string }
  | { type: "terra"; val: Msg[]; wallet: ConnectedWallet }
  | { type: "evm"; val: SimulTx; log?: LogProcessor };

type Fee = { amount: number; symbol: string; coinGeckoId: string };
export type Estimate = { fee: Fee; tx: EstimatedTx };

// //////////// HOOK SENDER & PROMPT ////////////
export type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

type SuccessState = { success: TxSuccessMeta; tx?: SubmittedTx };

export type TxState = TxLoading | TxError | SuccessState;
export type TxOnSuccess = (result: TxSuccess, chain: Chain) => void;

export type SenderArgs = {
  tagPayloads?: TagPayload[];
  successMeta?: TxSuccessMeta;
  content: TxContent;
  onSuccess?: TxOnSuccess;
};

// //////////// TYPE GUARDS ////////////
export function isTxResultError(tx: TxResult): tx is TxError {
  return "error" in tx;
}
export function isTxError(tx: TxState): tx is TxError {
  return "error" in tx;
}
export function isTxSuccess(tx: TxState): tx is SuccessState {
  return "success" in tx;
}
export function isTxLoading(tx: TxState): tx is TxLoading {
  return "loading" in tx;
}

// ///// TX META

type MetaToken = Pick<Token, "symbol" | "logo"> & { amount: number };

export type WithdrawMeta = {
  beneficiary: string;
  tokens: MetaToken[];
};

export type AccountStatusMeta = {
  beneficiary: string; //endow id: .. | index fund: .. |
};

export type ThresholdMeta = {
  curr: number;
  new: number;
};

export type DurationMeta = {
  curr: string;
  new: string;
};

export type OwnerMeta = {
  curr: string;
  new: string;
};

export type TransferMeta = {
  to: string;
  token: MetaToken;
};

export type MultisigMembersMeta = {
  addresses: string[];
  action: "add" | "remove";
};

type Tx<T extends Tupleable, M> = {
  meta: M;
  args: T;
};

type Addresses = { addresses: string[] };
export type ID = { id: number };

type Txs = {
  // //// ACCOUNTS ////
  "accounts.create-endowment": Tx<NewAST, never>; //not multisig tx
  "accounts.update-controller": Tx<SettingsControllerUpdate, Diff[]>;
  "accounts.update-settings": Tx<EndowmentSettingsUpdate, Diff[]>;
  "accounts.update-fee-settings": Tx<FeeSettingsUpdate, Diff[]>;
  "accounts.deposit-erc20": Tx<ERC20Deposit, never>; //not multisig tx
  "accounts.update-allowlist": Tx<
    AllowlistUpdate,
    Pick<AllowlistUpdate, "add" | "remove">
  >;
  "accounts.withdraw": Tx<
    {
      id: number;
      type: AccountType;
      beneficiaryAddress: string;
      beneficiaryEndowId: number;
      tokens: AccountToken[];
    },
    WithdrawMeta
  >;
  "accounts.close": Tx<CloseEndowmentRequest, AccountStatusMeta>;
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
  "accounts.invest-v2": Tx<InvestPayload, null /** future */>;
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
  "multisig.add-owners": Tx<Addresses, MultisigMembersMeta>;
  "multisig.remove-owners": Tx<Addresses, MultisigMembersMeta>;
  "multisig.confirm-tx": Tx<ID, never>; //no meta
  "multisig.revoke-tx": Tx<ID, never>; //no meta
  "multisig.execute-tx": Tx<ID, never>; //no meta
  "multisig.change-threshold": Tx<{ threshold: number }, ThresholdMeta>;
  "multisig.change-auto-execute": Tx<{ autoExecute: boolean }, never>; //no need for meta
  "multisig.change-duration": Tx<{ duration: number }, DurationMeta>; //no need for meta

  "multisig/review.confirm-prop": Tx<ID, never>; //no meta
  "multisig/review.execute-prop": Tx<ID, never>; //no meta

  "erc20.transfer": Tx<Transfer, TransferMeta>;
  "erc20.approve": Tx<Allowance, never>; //not multisig tx

  // //// INDEX FUND ////
  "index-fund.config": Tx<IndexFundConfigUpdate, Diff[]>;
  "index-fund.create-fund": Tx<NewFund, NewFund>;
  "index-fund.remove-fund": Tx<ID, ID>;
  "index-fund.remove-member": Tx<ID, ID>;
  "index-fund.update-members": Tx<FundMemberUpdate, FundMemberUpdate>;

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
  "registrar.add-token": Tx<{ token: string }, never>; //future
  "registrar.add-accounts-contract": Tx<
    { chainName: string; contractAddress: string },
    never
  >; //future
};

export type TxType = keyof Txs;
export type TxArgs<T extends TxType> = Txs[T]["args"];

type Empty = { [key: string]: never };
export type TxOptions<T extends TxType> = T extends `${infer C}.${string}`
  ? C extends Contract
    ? Txs[T]["args"]
    : { [key in C]: string } & Txs[T]["args"]
  : Empty;

export type Metadata<T extends TxType> = Txs[T]["meta"];
export type TxMeta = ValueOf<{
  [K in keyof Txs]: { id: K; data?: Txs[K]["meta"] };
}> & { title: string; description: string };

export type Transaction = {
  transactionId: number;
  recordId: string;
  expiry: number;
  status: TransactionStatus;
  confirmations: string[];
  owners: string[];
  meta?: TxMeta;
};
