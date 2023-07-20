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
} from "../../common";

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

export interface DummyRouterInterface extends utils.Interface {
  functions: {
    "execute(bytes32,string,string,bytes)": FunctionFragment;
    "executeLocal(string,string,bytes)": FunctionFragment;
    "executeWithToken(bytes32,string,string,bytes,string,uint256)": FunctionFragment;
    "executeWithTokenLocal(string,string,bytes,string,uint256)": FunctionFragment;
    "gateway()": FunctionFragment;
    "setResponseStruct((string,bytes4,bytes4,uint32[],address,uint256,uint256,uint8))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "execute"
      | "executeLocal"
      | "executeWithToken"
      | "executeWithTokenLocal"
      | "gateway"
      | "setResponseStruct"
  ): FunctionFragment;

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
  encodeFunctionData(functionFragment: "gateway", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setResponseStruct",
    values: [IVault.VaultActionDataStruct]
  ): string;

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
  decodeFunctionResult(functionFragment: "gateway", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setResponseStruct",
    data: BytesLike
  ): Result;

  events: {
    "Deposit(tuple)": EventFragment;
    "ErrorBytesLogged(tuple,bytes)": EventFragment;
    "ErrorLogged(tuple,string)": EventFragment;
    "Redeem(tuple,uint256)": EventFragment;
    "Refund(tuple,uint256)": EventFragment;
    "RewardsHarvested(tuple)": EventFragment;
    "Transfer(tuple,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ErrorBytesLogged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ErrorLogged"): EventFragment;
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

export interface DummyRouter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DummyRouterInterface;

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
    execute(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeLocal(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeWithToken(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<BytesLike>,
      arg4: PromiseOrValue<string>,
      arg5: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeWithTokenLocal(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BytesLike>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    gateway(overrides?: CallOverrides): Promise<[string]>;

    setResponseStruct(
      _response: IVault.VaultActionDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  execute(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<string>,
    arg3: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeLocal(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeWithToken(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<string>,
    arg3: PromiseOrValue<BytesLike>,
    arg4: PromiseOrValue<string>,
    arg5: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeWithTokenLocal(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BytesLike>,
    arg3: PromiseOrValue<string>,
    arg4: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  gateway(overrides?: CallOverrides): Promise<string>;

  setResponseStruct(
    _response: IVault.VaultActionDataStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    execute(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    executeLocal(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<IVault.VaultActionDataStructOutput>;

    executeWithToken(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<BytesLike>,
      arg4: PromiseOrValue<string>,
      arg5: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    executeWithTokenLocal(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BytesLike>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IVault.VaultActionDataStructOutput>;

    gateway(overrides?: CallOverrides): Promise<string>;

    setResponseStruct(
      _response: IVault.VaultActionDataStruct,
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
    execute(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeLocal(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeWithToken(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<BytesLike>,
      arg4: PromiseOrValue<string>,
      arg5: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeWithTokenLocal(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BytesLike>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    gateway(overrides?: CallOverrides): Promise<BigNumber>;

    setResponseStruct(
      _response: IVault.VaultActionDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    execute(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeLocal(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeWithToken(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      arg3: PromiseOrValue<BytesLike>,
      arg4: PromiseOrValue<string>,
      arg5: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeWithTokenLocal(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BytesLike>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    gateway(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setResponseStruct(
      _response: IVault.VaultActionDataStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
