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

export interface SubdaoEmitterInterface extends utils.Interface {
  functions: {
    "initEmitter(address)": FunctionFragment;
    "initializeSubdao(address)": FunctionFragment;
    "transferSubdao(address,address,address,uint256)": FunctionFragment;
    "updateSubdaoConfig()": FunctionFragment;
    "updateSubdaoPoll(uint256,address)": FunctionFragment;
    "updateSubdaoPollAndStatus(uint256,address,uint8)": FunctionFragment;
    "updateSubdaoState()": FunctionFragment;
    "updateVotingStatus(uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "initEmitter"
      | "initializeSubdao"
      | "transferSubdao"
      | "updateSubdaoConfig"
      | "updateSubdaoPoll"
      | "updateSubdaoPollAndStatus"
      | "updateSubdaoState"
      | "updateVotingStatus"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "initEmitter",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initializeSubdao",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferSubdao",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateSubdaoConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateSubdaoPoll",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateSubdaoPollAndStatus",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateSubdaoState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateVotingStatus",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "initEmitter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializeSubdao",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferSubdao",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSubdaoConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSubdaoPoll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSubdaoPollAndStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSubdaoState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateVotingStatus",
    data: BytesLike
  ): Result;

  events: {
    "ConfigUpdated(address)": EventFragment;
    "PollStatusUpdated(address,uint256,uint8)": EventFragment;
    "PollUpdated(address,uint256,address)": EventFragment;
    "StateUpdated(address)": EventFragment;
    "SubdaoInitialized(address)": EventFragment;
    "Transfer(address,address,address,address,uint256)": EventFragment;
    "VotingStatusUpdated(address,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ConfigUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PollStatusUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PollUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StateUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubdaoInitialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VotingStatusUpdated"): EventFragment;
}

export interface ConfigUpdatedEventObject {
  subdao: string;
}
export type ConfigUpdatedEvent = TypedEvent<[string], ConfigUpdatedEventObject>;

export type ConfigUpdatedEventFilter = TypedEventFilter<ConfigUpdatedEvent>;

export interface PollStatusUpdatedEventObject {
  subdao: string;
  id: BigNumber;
  pollStatus: number;
}
export type PollStatusUpdatedEvent = TypedEvent<
  [string, BigNumber, number],
  PollStatusUpdatedEventObject
>;

export type PollStatusUpdatedEventFilter =
  TypedEventFilter<PollStatusUpdatedEvent>;

export interface PollUpdatedEventObject {
  subdao: string;
  id: BigNumber;
  sender: string;
}
export type PollUpdatedEvent = TypedEvent<
  [string, BigNumber, string],
  PollUpdatedEventObject
>;

export type PollUpdatedEventFilter = TypedEventFilter<PollUpdatedEvent>;

export interface StateUpdatedEventObject {
  subdao: string;
}
export type StateUpdatedEvent = TypedEvent<[string], StateUpdatedEventObject>;

export type StateUpdatedEventFilter = TypedEventFilter<StateUpdatedEvent>;

export interface SubdaoInitializedEventObject {
  subdao: string;
}
export type SubdaoInitializedEvent = TypedEvent<
  [string],
  SubdaoInitializedEventObject
>;

export type SubdaoInitializedEventFilter =
  TypedEventFilter<SubdaoInitializedEvent>;

export interface TransferEventObject {
  subdao: string;
  tokenAddress: string;
  from: string;
  to: string;
  amount: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface VotingStatusUpdatedEventObject {
  subdao: string;
  pollId: BigNumber;
  voter: string;
}
export type VotingStatusUpdatedEvent = TypedEvent<
  [string, BigNumber, string],
  VotingStatusUpdatedEventObject
>;

export type VotingStatusUpdatedEventFilter =
  TypedEventFilter<VotingStatusUpdatedEvent>;

export interface SubdaoEmitter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SubdaoEmitterInterface;

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
    initEmitter(
      accountscontract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initializeSubdao(
      subdao: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferSubdao(
      tokenAddress: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateSubdaoConfig(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateSubdaoPoll(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateSubdaoPollAndStatus(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      pollStatus: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateSubdaoState(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateVotingStatus(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  initEmitter(
    accountscontract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initializeSubdao(
    subdao: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferSubdao(
    tokenAddress: PromiseOrValue<string>,
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateSubdaoConfig(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateSubdaoPoll(
    pollId: PromiseOrValue<BigNumberish>,
    voter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateSubdaoPollAndStatus(
    pollId: PromiseOrValue<BigNumberish>,
    voter: PromiseOrValue<string>,
    pollStatus: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateSubdaoState(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateVotingStatus(
    pollId: PromiseOrValue<BigNumberish>,
    voter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    initEmitter(
      accountscontract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    initializeSubdao(
      subdao: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferSubdao(
      tokenAddress: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateSubdaoConfig(overrides?: CallOverrides): Promise<void>;

    updateSubdaoPoll(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateSubdaoPollAndStatus(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      pollStatus: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateSubdaoState(overrides?: CallOverrides): Promise<void>;

    updateVotingStatus(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ConfigUpdated(address)"(subdao?: null): ConfigUpdatedEventFilter;
    ConfigUpdated(subdao?: null): ConfigUpdatedEventFilter;

    "PollStatusUpdated(address,uint256,uint8)"(
      subdao?: null,
      id?: null,
      pollStatus?: null
    ): PollStatusUpdatedEventFilter;
    PollStatusUpdated(
      subdao?: null,
      id?: null,
      pollStatus?: null
    ): PollStatusUpdatedEventFilter;

    "PollUpdated(address,uint256,address)"(
      subdao?: null,
      id?: null,
      sender?: null
    ): PollUpdatedEventFilter;
    PollUpdated(
      subdao?: null,
      id?: null,
      sender?: null
    ): PollUpdatedEventFilter;

    "StateUpdated(address)"(subdao?: null): StateUpdatedEventFilter;
    StateUpdated(subdao?: null): StateUpdatedEventFilter;

    "SubdaoInitialized(address)"(subdao?: null): SubdaoInitializedEventFilter;
    SubdaoInitialized(subdao?: null): SubdaoInitializedEventFilter;

    "Transfer(address,address,address,address,uint256)"(
      subdao?: null,
      tokenAddress?: null,
      from?: null,
      to?: null,
      amount?: null
    ): TransferEventFilter;
    Transfer(
      subdao?: null,
      tokenAddress?: null,
      from?: null,
      to?: null,
      amount?: null
    ): TransferEventFilter;

    "VotingStatusUpdated(address,uint256,address)"(
      subdao?: null,
      pollId?: null,
      voter?: null
    ): VotingStatusUpdatedEventFilter;
    VotingStatusUpdated(
      subdao?: null,
      pollId?: null,
      voter?: null
    ): VotingStatusUpdatedEventFilter;
  };

  estimateGas: {
    initEmitter(
      accountscontract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initializeSubdao(
      subdao: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferSubdao(
      tokenAddress: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateSubdaoConfig(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateSubdaoPoll(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateSubdaoPollAndStatus(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      pollStatus: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateSubdaoState(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateVotingStatus(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    initEmitter(
      accountscontract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initializeSubdao(
      subdao: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferSubdao(
      tokenAddress: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateSubdaoConfig(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateSubdaoPoll(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateSubdaoPollAndStatus(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      pollStatus: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateSubdaoState(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateVotingStatus(
      pollId: PromiseOrValue<BigNumberish>,
      voter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
