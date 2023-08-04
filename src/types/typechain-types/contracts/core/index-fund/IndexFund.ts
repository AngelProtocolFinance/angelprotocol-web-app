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
} from "../../../common";

export declare namespace IIndexFund {
  export type FundResponseStruct = {
    id: BigNumberish;
    name: string;
    description: string;
    endowments: BigNumberish[];
    splitToLiquid: BigNumberish;
    expiryTime: BigNumberish;
  };

  export type FundResponseStructOutput = [
    BigNumber,
    string,
    string,
    number[],
    BigNumber,
    BigNumber
  ] & {
    id: BigNumber;
    name: string;
    description: string;
    endowments: number[];
    splitToLiquid: BigNumber;
    expiryTime: BigNumber;
  };

  export type StateResponseStruct = {
    activeFund: BigNumberish;
    roundDonations: BigNumberish;
    nextRotationBlock: BigNumberish;
  };

  export type StateResponseStructOutput = [BigNumber, BigNumber, BigNumber] & {
    activeFund: BigNumber;
    roundDonations: BigNumber;
    nextRotationBlock: BigNumber;
  };
}

export declare namespace IndexFundStorage {
  export type ConfigStruct = {
    registrarContract: string;
    fundRotation: BigNumberish;
    fundingGoal: BigNumberish;
  };

  export type ConfigStructOutput = [string, BigNumber, BigNumber] & {
    registrarContract: string;
    fundRotation: BigNumber;
    fundingGoal: BigNumber;
  };
}

export interface IndexFundInterface extends utils.Interface {
  functions: {
    "createIndexFund(string,string,uint32[],bool,uint256,uint256)": FunctionFragment;
    "depositERC20(uint256,address,uint256)": FunctionFragment;
    "initialize(address,uint256,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "queryActiveFundDetails()": FunctionFragment;
    "queryConfig()": FunctionFragment;
    "queryFundDetails(uint256)": FunctionFragment;
    "queryInvolvedFunds(uint32)": FunctionFragment;
    "queryRotatingFunds()": FunctionFragment;
    "queryState()": FunctionFragment;
    "removeIndexFund(uint256)": FunctionFragment;
    "removeMember(uint32)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateConfig(address,uint256,uint256)": FunctionFragment;
    "updateFundMembers(uint256,uint32[],uint32[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createIndexFund"
      | "depositERC20"
      | "initialize"
      | "owner"
      | "queryActiveFundDetails"
      | "queryConfig"
      | "queryFundDetails"
      | "queryInvolvedFunds"
      | "queryRotatingFunds"
      | "queryState"
      | "removeIndexFund"
      | "removeMember"
      | "renounceOwnership"
      | "transferOwnership"
      | "updateConfig"
      | "updateFundMembers"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createIndexFund",
    values: [
      string,
      string,
      BigNumberish[],
      boolean,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "depositERC20",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "queryActiveFundDetails",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "queryConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "queryFundDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "queryInvolvedFunds",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "queryRotatingFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "queryState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeIndexFund",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeMember",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateConfig",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFundMembers",
    values: [BigNumberish, BigNumberish[], BigNumberish[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "createIndexFund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "queryActiveFundDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "queryConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "queryFundDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "queryInvolvedFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "queryRotatingFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "queryState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeIndexFund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFundMembers",
    data: BytesLike
  ): Result;

  events: {
    "ActiveFundUpdated(uint256)": EventFragment;
    "ConfigUpdated(address,uint256,uint256)": EventFragment;
    "DonationProcessed(uint256)": EventFragment;
    "FundCreated(uint256)": EventFragment;
    "FundRemoved(uint256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "Instantiated(address,uint256,uint256)": EventFragment;
    "MemberRemoved(uint256,uint32)": EventFragment;
    "MembersUpdated(uint256,uint32[])": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "StateUpdated()": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ActiveFundUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ConfigUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DonationProcessed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FundCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FundRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Instantiated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MemberRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MembersUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StateUpdated"): EventFragment;
}

export interface ActiveFundUpdatedEventObject {
  fundId: BigNumber;
}
export type ActiveFundUpdatedEvent = TypedEvent<
  [BigNumber],
  ActiveFundUpdatedEventObject
>;

export type ActiveFundUpdatedEventFilter =
  TypedEventFilter<ActiveFundUpdatedEvent>;

export interface ConfigUpdatedEventObject {
  registrarContract: string;
  fundingGoal: BigNumber;
  fundRotation: BigNumber;
}
export type ConfigUpdatedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  ConfigUpdatedEventObject
>;

export type ConfigUpdatedEventFilter = TypedEventFilter<ConfigUpdatedEvent>;

export interface DonationProcessedEventObject {
  fundId: BigNumber;
}
export type DonationProcessedEvent = TypedEvent<
  [BigNumber],
  DonationProcessedEventObject
>;

export type DonationProcessedEventFilter =
  TypedEventFilter<DonationProcessedEvent>;

export interface FundCreatedEventObject {
  id: BigNumber;
}
export type FundCreatedEvent = TypedEvent<[BigNumber], FundCreatedEventObject>;

export type FundCreatedEventFilter = TypedEventFilter<FundCreatedEvent>;

export interface FundRemovedEventObject {
  id: BigNumber;
}
export type FundRemovedEvent = TypedEvent<[BigNumber], FundRemovedEventObject>;

export type FundRemovedEventFilter = TypedEventFilter<FundRemovedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface InstantiatedEventObject {
  registrarContract: string;
  fundRotation: BigNumber;
  fundingGoal: BigNumber;
}
export type InstantiatedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  InstantiatedEventObject
>;

export type InstantiatedEventFilter = TypedEventFilter<InstantiatedEvent>;

export interface MemberRemovedEventObject {
  fundId: BigNumber;
  endowmentId: number;
}
export type MemberRemovedEvent = TypedEvent<
  [BigNumber, number],
  MemberRemovedEventObject
>;

export type MemberRemovedEventFilter = TypedEventFilter<MemberRemovedEvent>;

export interface MembersUpdatedEventObject {
  fundId: BigNumber;
  endowments: number[];
}
export type MembersUpdatedEvent = TypedEvent<
  [BigNumber, number[]],
  MembersUpdatedEventObject
>;

export type MembersUpdatedEventFilter = TypedEventFilter<MembersUpdatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface StateUpdatedEventObject {}
export type StateUpdatedEvent = TypedEvent<[], StateUpdatedEventObject>;

export type StateUpdatedEventFilter = TypedEventFilter<StateUpdatedEvent>;

export interface IndexFund extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IndexFundInterface;

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
    createIndexFund(
      name: string,
      description: string,
      endowments: BigNumberish[],
      rotatingFund: boolean,
      splitToLiquid: BigNumberish,
      expiryTime: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    depositERC20(
      fundId: BigNumberish,
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    initialize(
      registrarContract: string,
      fundRotation: BigNumberish,
      fundingGoal: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    queryActiveFundDetails(
      overrides?: CallOverrides
    ): Promise<[IIndexFund.FundResponseStructOutput]>;

    queryConfig(
      overrides?: CallOverrides
    ): Promise<[IndexFundStorage.ConfigStructOutput]>;

    queryFundDetails(
      fundId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[IIndexFund.FundResponseStructOutput]>;

    queryInvolvedFunds(
      endowmentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    queryRotatingFunds(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    queryState(
      overrides?: CallOverrides
    ): Promise<[IIndexFund.StateResponseStructOutput]>;

    removeIndexFund(
      fundId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    removeMember(
      endowment: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    updateConfig(
      registrarContract: string,
      fundRotation: BigNumberish,
      fundingGoal: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    updateFundMembers(
      fundId: BigNumberish,
      endowmentsAdd: BigNumberish[],
      endowmentsRemove: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  createIndexFund(
    name: string,
    description: string,
    endowments: BigNumberish[],
    rotatingFund: boolean,
    splitToLiquid: BigNumberish,
    expiryTime: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  depositERC20(
    fundId: BigNumberish,
    token: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  initialize(
    registrarContract: string,
    fundRotation: BigNumberish,
    fundingGoal: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  queryActiveFundDetails(
    overrides?: CallOverrides
  ): Promise<IIndexFund.FundResponseStructOutput>;

  queryConfig(
    overrides?: CallOverrides
  ): Promise<IndexFundStorage.ConfigStructOutput>;

  queryFundDetails(
    fundId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<IIndexFund.FundResponseStructOutput>;

  queryInvolvedFunds(
    endowmentId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  queryRotatingFunds(overrides?: CallOverrides): Promise<BigNumber[]>;

  queryState(
    overrides?: CallOverrides
  ): Promise<IIndexFund.StateResponseStructOutput>;

  removeIndexFund(
    fundId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  removeMember(
    endowment: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  updateConfig(
    registrarContract: string,
    fundRotation: BigNumberish,
    fundingGoal: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  updateFundMembers(
    fundId: BigNumberish,
    endowmentsAdd: BigNumberish[],
    endowmentsRemove: BigNumberish[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    createIndexFund(
      name: string,
      description: string,
      endowments: BigNumberish[],
      rotatingFund: boolean,
      splitToLiquid: BigNumberish,
      expiryTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    depositERC20(
      fundId: BigNumberish,
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      registrarContract: string,
      fundRotation: BigNumberish,
      fundingGoal: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    queryActiveFundDetails(
      overrides?: CallOverrides
    ): Promise<IIndexFund.FundResponseStructOutput>;

    queryConfig(
      overrides?: CallOverrides
    ): Promise<IndexFundStorage.ConfigStructOutput>;

    queryFundDetails(
      fundId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<IIndexFund.FundResponseStructOutput>;

    queryInvolvedFunds(
      endowmentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    queryRotatingFunds(overrides?: CallOverrides): Promise<BigNumber[]>;

    queryState(
      overrides?: CallOverrides
    ): Promise<IIndexFund.StateResponseStructOutput>;

    removeIndexFund(
      fundId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    removeMember(
      endowment: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateConfig(
      registrarContract: string,
      fundRotation: BigNumberish,
      fundingGoal: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateFundMembers(
      fundId: BigNumberish,
      endowmentsAdd: BigNumberish[],
      endowmentsRemove: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ActiveFundUpdated(uint256)"(fundId?: null): ActiveFundUpdatedEventFilter;
    ActiveFundUpdated(fundId?: null): ActiveFundUpdatedEventFilter;

    "ConfigUpdated(address,uint256,uint256)"(
      registrarContract?: null,
      fundingGoal?: null,
      fundRotation?: null
    ): ConfigUpdatedEventFilter;
    ConfigUpdated(
      registrarContract?: null,
      fundingGoal?: null,
      fundRotation?: null
    ): ConfigUpdatedEventFilter;

    "DonationProcessed(uint256)"(fundId?: null): DonationProcessedEventFilter;
    DonationProcessed(fundId?: null): DonationProcessedEventFilter;

    "FundCreated(uint256)"(id?: null): FundCreatedEventFilter;
    FundCreated(id?: null): FundCreatedEventFilter;

    "FundRemoved(uint256)"(id?: null): FundRemovedEventFilter;
    FundRemoved(id?: null): FundRemovedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "Instantiated(address,uint256,uint256)"(
      registrarContract?: null,
      fundRotation?: null,
      fundingGoal?: null
    ): InstantiatedEventFilter;
    Instantiated(
      registrarContract?: null,
      fundRotation?: null,
      fundingGoal?: null
    ): InstantiatedEventFilter;

    "MemberRemoved(uint256,uint32)"(
      fundId?: null,
      endowmentId?: null
    ): MemberRemovedEventFilter;
    MemberRemoved(fundId?: null, endowmentId?: null): MemberRemovedEventFilter;

    "MembersUpdated(uint256,uint32[])"(
      fundId?: null,
      endowments?: null
    ): MembersUpdatedEventFilter;
    MembersUpdated(fundId?: null, endowments?: null): MembersUpdatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "StateUpdated()"(): StateUpdatedEventFilter;
    StateUpdated(): StateUpdatedEventFilter;
  };

  estimateGas: {
    createIndexFund(
      name: string,
      description: string,
      endowments: BigNumberish[],
      rotatingFund: boolean,
      splitToLiquid: BigNumberish,
      expiryTime: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    depositERC20(
      fundId: BigNumberish,
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    initialize(
      registrarContract: string,
      fundRotation: BigNumberish,
      fundingGoal: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    queryActiveFundDetails(overrides?: CallOverrides): Promise<BigNumber>;

    queryConfig(overrides?: CallOverrides): Promise<BigNumber>;

    queryFundDetails(
      fundId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    queryInvolvedFunds(
      endowmentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    queryRotatingFunds(overrides?: CallOverrides): Promise<BigNumber>;

    queryState(overrides?: CallOverrides): Promise<BigNumber>;

    removeIndexFund(
      fundId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    removeMember(
      endowment: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    updateConfig(
      registrarContract: string,
      fundRotation: BigNumberish,
      fundingGoal: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    updateFundMembers(
      fundId: BigNumberish,
      endowmentsAdd: BigNumberish[],
      endowmentsRemove: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createIndexFund(
      name: string,
      description: string,
      endowments: BigNumberish[],
      rotatingFund: boolean,
      splitToLiquid: BigNumberish,
      expiryTime: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    depositERC20(
      fundId: BigNumberish,
      token: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    initialize(
      registrarContract: string,
      fundRotation: BigNumberish,
      fundingGoal: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryActiveFundDetails(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryFundDetails(
      fundId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryInvolvedFunds(
      endowmentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryRotatingFunds(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeIndexFund(
      fundId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    removeMember(
      endowment: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    updateConfig(
      registrarContract: string,
      fundRotation: BigNumberish,
      fundingGoal: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    updateFundMembers(
      fundId: BigNumberish,
      endowmentsAdd: BigNumberish[],
      endowmentsRemove: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
