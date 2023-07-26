/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export declare namespace IVault {
  export type VaultActionDataStruct = {
    destinationChain: PromiseOrValue<string>;
    strategyId: PromiseOrValue<BytesLike>;
    selector: PromiseOrValue<BytesLike>;
    accountIds: PromiseOrValue<BigNumberish>[];
    token: PromiseOrValue<string>;
    lockAmt: PromiseOrValue<BigNumberish>;
    liqAmt: PromiseOrValue<BigNumberish>;
    status: PromiseOrValue<BigNumberish>;
  };

  export type VaultActionDataStructOutput = [
    string,
    string,
    string,
    number[],
    string,
    BigNumber,
    BigNumber,
    number
  ] & {
    destinationChain: string;
    strategyId: string;
    selector: string;
    accountIds: number[];
    token: string;
    lockAmt: BigNumber;
    liqAmt: BigNumber;
    status: number;
  };
}

export interface RouterInterface extends utils.Interface {
  functions: {
    "chain()": FunctionFragment;
    "deposit((string,bytes4,bytes4,uint32[],address,uint256,uint256,uint8),string,uint256)": FunctionFragment;
    "execute(bytes32,string,string,bytes)": FunctionFragment;
    "executeLocal(string,string,bytes)": FunctionFragment;
    "executeWithToken(bytes32,string,string,bytes,string,uint256)": FunctionFragment;
    "executeWithTokenLocal(string,string,bytes,string,uint256)": FunctionFragment;
    "gasReceiver()": FunctionFragment;
    "gateway()": FunctionFragment;
    "initialize(string,address,address,address)": FunctionFragment;
    "registrar()": FunctionFragment;
    "sendTokens(string,string,bytes,string,uint256,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "chain"
      | "deposit"
      | "execute"
      | "executeLocal"
      | "executeWithToken"
      | "executeWithTokenLocal"
      | "gasReceiver"
      | "gateway"
      | "initialize"
      | "registrar"
      | "sendTokens"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "chain", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [
      IVault.VaultActionDataStruct,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "executeLocal",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "executeWithToken",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "executeWithTokenLocal",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "gasReceiver",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "gateway", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "registrar", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sendTokens",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "chain", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeLocal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeWithToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeWithTokenLocal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gasReceiver",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "gateway", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registrar", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sendTokens", data: BytesLike): Result;

  events: {
    "Deposit(tuple)": EventFragment;
    "ErrorBytesLogged(tuple,bytes)": EventFragment;
    "ErrorLogged(tuple,string)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "Redeem(tuple,uint256)": EventFragment;
    "Refund(tuple,uint256)": EventFragment;
    "RewardsHarvested(tuple)": EventFragment;
    "Transfer(tuple,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ErrorBytesLogged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ErrorLogged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Redeem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Refund"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RewardsHarvested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export interface DepositEventObject {
  action: IVault.VaultActionDataStructOutput;
}
export type DepositEvent = TypedEvent<
  [IVault.VaultActionDataStructOutput],
  DepositEventObject
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface ErrorBytesLoggedEventObject {
  action: IVault.VaultActionDataStructOutput;
  data: string;
}
export type ErrorBytesLoggedEvent = TypedEvent<
  [IVault.VaultActionDataStructOutput, string],
  ErrorBytesLoggedEventObject
>;

export type ErrorBytesLoggedEventFilter =
  TypedEventFilter<ErrorBytesLoggedEvent>;

export interface ErrorLoggedEventObject {
  action: IVault.VaultActionDataStructOutput;
  message: string;
}
export type ErrorLoggedEvent = TypedEvent<
  [IVault.VaultActionDataStructOutput, string],
  ErrorLoggedEventObject
>;

export type ErrorLoggedEventFilter = TypedEventFilter<ErrorLoggedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RedeemEventObject {
  action: IVault.VaultActionDataStructOutput;
  amount: BigNumber;
}
export type RedeemEvent = TypedEvent<
  [IVault.VaultActionDataStructOutput, BigNumber],
  RedeemEventObject
>;

export type RedeemEventFilter = TypedEventFilter<RedeemEvent>;

export interface RefundEventObject {
  action: IVault.VaultActionDataStructOutput;
  amount: BigNumber;
}
export type RefundEvent = TypedEvent<
  [IVault.VaultActionDataStructOutput, BigNumber],
  RefundEventObject
>;

export type RefundEventFilter = TypedEventFilter<RefundEvent>;

export interface RewardsHarvestedEventObject {
  action: IVault.VaultActionDataStructOutput;
}
export type RewardsHarvestedEvent = TypedEvent<
  [IVault.VaultActionDataStructOutput],
  RewardsHarvestedEventObject
>;

export type RewardsHarvestedEventFilter =
  TypedEventFilter<RewardsHarvestedEvent>;

export interface TransferEventObject {
  action: IVault.VaultActionDataStructOutput;
  amount: BigNumber;
}
export type TransferEvent = TypedEvent<
  [IVault.VaultActionDataStructOutput, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface Router extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RouterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    chain(overrides?: CallOverrides): Promise<[string]>;

    deposit(
      action: IVault.VaultActionDataStruct,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    execute(
      commandId: PromiseOrValue<BytesLike>,
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeLocal(
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeWithToken(
      commandId: PromiseOrValue<BytesLike>,
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeWithTokenLocal(
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    gasReceiver(overrides?: CallOverrides): Promise<[string]>;

    gateway(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _chain: PromiseOrValue<string>,
      _gateway: PromiseOrValue<string>,
      _gasReceiver: PromiseOrValue<string>,
      _registrar: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registrar(overrides?: CallOverrides): Promise<[string]>;

    sendTokens(
      destinationChain: PromiseOrValue<string>,
      destinationAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      symbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      gasToken: PromiseOrValue<string>,
      gasFeeAmt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  chain(overrides?: CallOverrides): Promise<string>;

  deposit(
    action: IVault.VaultActionDataStruct,
    tokenSymbol: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  execute(
    commandId: PromiseOrValue<BytesLike>,
    sourceChain: PromiseOrValue<string>,
    sourceAddress: PromiseOrValue<string>,
    payload: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeLocal(
    sourceChain: PromiseOrValue<string>,
    sourceAddress: PromiseOrValue<string>,
    payload: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeWithToken(
    commandId: PromiseOrValue<BytesLike>,
    sourceChain: PromiseOrValue<string>,
    sourceAddress: PromiseOrValue<string>,
    payload: PromiseOrValue<BytesLike>,
    tokenSymbol: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeWithTokenLocal(
    sourceChain: PromiseOrValue<string>,
    sourceAddress: PromiseOrValue<string>,
    payload: PromiseOrValue<BytesLike>,
    tokenSymbol: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  gasReceiver(overrides?: CallOverrides): Promise<string>;

  gateway(overrides?: CallOverrides): Promise<string>;

  initialize(
    _chain: PromiseOrValue<string>,
    _gateway: PromiseOrValue<string>,
    _gasReceiver: PromiseOrValue<string>,
    _registrar: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registrar(overrides?: CallOverrides): Promise<string>;

  sendTokens(
    destinationChain: PromiseOrValue<string>,
    destinationAddress: PromiseOrValue<string>,
    payload: PromiseOrValue<BytesLike>,
    symbol: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    gasToken: PromiseOrValue<string>,
    gasFeeAmt: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    chain(overrides?: CallOverrides): Promise<string>;

    deposit(
      action: IVault.VaultActionDataStruct,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    execute(
      commandId: PromiseOrValue<BytesLike>,
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    executeLocal(
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<IVault.VaultActionDataStructOutput>;

    executeWithToken(
      commandId: PromiseOrValue<BytesLike>,
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    executeWithTokenLocal(
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IVault.VaultActionDataStructOutput>;

    gasReceiver(overrides?: CallOverrides): Promise<string>;

    gateway(overrides?: CallOverrides): Promise<string>;

    initialize(
      _chain: PromiseOrValue<string>,
      _gateway: PromiseOrValue<string>,
      _gasReceiver: PromiseOrValue<string>,
      _registrar: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    registrar(overrides?: CallOverrides): Promise<string>;

    sendTokens(
      destinationChain: PromiseOrValue<string>,
      destinationAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      symbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      gasToken: PromiseOrValue<string>,
      gasFeeAmt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Deposit(tuple)"(action?: null): DepositEventFilter;
    Deposit(action?: null): DepositEventFilter;

    "ErrorBytesLogged(tuple,bytes)"(
      action?: null,
      data?: null
    ): ErrorBytesLoggedEventFilter;
    ErrorBytesLogged(action?: null, data?: null): ErrorBytesLoggedEventFilter;

    "ErrorLogged(tuple,string)"(
      action?: null,
      message?: null
    ): ErrorLoggedEventFilter;
    ErrorLogged(action?: null, message?: null): ErrorLoggedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "Redeem(tuple,uint256)"(action?: null, amount?: null): RedeemEventFilter;
    Redeem(action?: null, amount?: null): RedeemEventFilter;

    "Refund(tuple,uint256)"(action?: null, amount?: null): RefundEventFilter;
    Refund(action?: null, amount?: null): RefundEventFilter;

    "RewardsHarvested(tuple)"(action?: null): RewardsHarvestedEventFilter;
    RewardsHarvested(action?: null): RewardsHarvestedEventFilter;

    "Transfer(tuple,uint256)"(
      action?: null,
      amount?: null
    ): TransferEventFilter;
    Transfer(action?: null, amount?: null): TransferEventFilter;
  };

  estimateGas: {
    chain(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      action: IVault.VaultActionDataStruct,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    execute(
      commandId: PromiseOrValue<BytesLike>,
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeLocal(
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeWithToken(
      commandId: PromiseOrValue<BytesLike>,
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeWithTokenLocal(
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    gasReceiver(overrides?: CallOverrides): Promise<BigNumber>;

    gateway(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _chain: PromiseOrValue<string>,
      _gateway: PromiseOrValue<string>,
      _gasReceiver: PromiseOrValue<string>,
      _registrar: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registrar(overrides?: CallOverrides): Promise<BigNumber>;

    sendTokens(
      destinationChain: PromiseOrValue<string>,
      destinationAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      symbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      gasToken: PromiseOrValue<string>,
      gasFeeAmt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    chain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      action: IVault.VaultActionDataStruct,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    execute(
      commandId: PromiseOrValue<BytesLike>,
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeLocal(
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeWithToken(
      commandId: PromiseOrValue<BytesLike>,
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeWithTokenLocal(
      sourceChain: PromiseOrValue<string>,
      sourceAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      tokenSymbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    gasReceiver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gateway(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _chain: PromiseOrValue<string>,
      _gateway: PromiseOrValue<string>,
      _gasReceiver: PromiseOrValue<string>,
      _registrar: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sendTokens(
      destinationChain: PromiseOrValue<string>,
      destinationAddress: PromiseOrValue<string>,
      payload: PromiseOrValue<BytesLike>,
      symbol: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      gasToken: PromiseOrValue<string>,
      gasFeeAmt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
