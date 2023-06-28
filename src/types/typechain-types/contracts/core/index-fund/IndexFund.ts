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

export declare namespace IndexFundMessage {
  export type InstantiateMessageStruct = {
    registrarContract: PromiseOrValue<string>;
    fundRotation: PromiseOrValue<BigNumberish>;
    fundMemberLimit: PromiseOrValue<BigNumberish>;
    fundingGoal: PromiseOrValue<BigNumberish>;
  };

  export type InstantiateMessageStructOutput = [
    string,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    registrarContract: string;
    fundRotation: BigNumber;
    fundMemberLimit: BigNumber;
    fundingGoal: BigNumber;
  };

  export type StateResponseMessageStruct = {
    totalFunds: PromiseOrValue<BigNumberish>;
    activeFund: PromiseOrValue<BigNumberish>;
    roundDonations: PromiseOrValue<BigNumberish>;
    nextRotationBlock: PromiseOrValue<BigNumberish>;
  };

  export type StateResponseMessageStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    totalFunds: BigNumber;
    activeFund: BigNumber;
    roundDonations: BigNumber;
    nextRotationBlock: BigNumber;
  };

  export type UpdateConfigMessageStruct = {
    fundRotation: PromiseOrValue<BigNumberish>;
    fundMemberLimit: PromiseOrValue<BigNumberish>;
    fundingGoal: PromiseOrValue<BigNumberish>;
  };

  export type UpdateConfigMessageStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    fundRotation: BigNumber;
    fundMemberLimit: BigNumber;
    fundingGoal: BigNumber;
  };
}

export declare namespace IIndexFund {
  export type IndexFundStruct = {
    id: PromiseOrValue<BigNumberish>;
    name: PromiseOrValue<string>;
    description: PromiseOrValue<string>;
    members: PromiseOrValue<BigNumberish>[];
    splitToLiquid: PromiseOrValue<BigNumberish>;
    expiryTime: PromiseOrValue<BigNumberish>;
  };

  export type IndexFundStructOutput = [
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
    members: number[];
    splitToLiquid: BigNumber;
    expiryTime: BigNumber;
  };
}

export declare namespace IndexFundStorage {
  export type ConfigStruct = {
    owner: PromiseOrValue<string>;
    registrarContract: PromiseOrValue<string>;
    fundRotation: PromiseOrValue<BigNumberish>;
    fundMemberLimit: PromiseOrValue<BigNumberish>;
    fundingGoal: PromiseOrValue<BigNumberish>;
  };

  export type ConfigStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    owner: string;
    registrarContract: string;
    fundRotation: BigNumber;
    fundMemberLimit: BigNumber;
    fundingGoal: BigNumber;
  };
}

export interface IndexFundInterface extends utils.Interface {
  functions: {
    "createIndexFund(string,string,uint32[],bool,uint256,uint256)": FunctionFragment;
    "depositERC20(uint256,address,uint256,uint256)": FunctionFragment;
    "initIndexFund((address,uint256,uint256,uint256))": FunctionFragment;
    "queryActiveFundDetails()": FunctionFragment;
    "queryConfig()": FunctionFragment;
    "queryFundDetails(uint256)": FunctionFragment;
    "queryInvolvedFunds(uint32)": FunctionFragment;
    "queryState()": FunctionFragment;
    "removeIndexFund(uint256)": FunctionFragment;
    "removeMember(uint32)": FunctionFragment;
    "updateConfig((uint256,uint256,uint256))": FunctionFragment;
    "updateFundMembers(uint256,uint32[])": FunctionFragment;
    "updateOwner(address)": FunctionFragment;
    "updateRegistrar(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createIndexFund"
      | "depositERC20"
      | "initIndexFund"
      | "queryActiveFundDetails"
      | "queryConfig"
      | "queryFundDetails"
      | "queryInvolvedFunds"
      | "queryState"
      | "removeIndexFund"
      | "removeMember"
      | "updateConfig"
      | "updateFundMembers"
      | "updateOwner"
      | "updateRegistrar"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createIndexFund",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "depositERC20",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "initIndexFund",
    values: [IndexFundMessage.InstantiateMessageStruct]
  ): string;
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
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "queryInvolvedFunds",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "queryState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeIndexFund",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeMember",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateConfig",
    values: [IndexFundMessage.UpdateConfigMessageStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFundMembers",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "updateOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateRegistrar",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createIndexFund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initIndexFund",
    data: BytesLike
  ): Result;
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
    functionFragment: "updateConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFundMembers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateRegistrar",
    data: BytesLike
  ): Result;

  events: {
    "ActiveFundUpdated(uint256)": EventFragment;
    "ConfigUpdated()": EventFragment;
    "DonationMessagesUpdated(uint256)": EventFragment;
    "IndexFundCreated(uint256)": EventFragment;
    "IndexFundRemoved(uint256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "MemberRemoved(uint256,uint32)": EventFragment;
    "MembersUpdated(uint256,uint32[])": EventFragment;
    "OwnerUpdated(address)": EventFragment;
    "RegistrarUpdated(address)": EventFragment;
    "StateUpdated()": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ActiveFundUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ConfigUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DonationMessagesUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "IndexFundCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "IndexFundRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MemberRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MembersUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RegistrarUpdated"): EventFragment;
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

export interface ConfigUpdatedEventObject {}
export type ConfigUpdatedEvent = TypedEvent<[], ConfigUpdatedEventObject>;

export type ConfigUpdatedEventFilter = TypedEventFilter<ConfigUpdatedEvent>;

export interface DonationMessagesUpdatedEventObject {
  fundId: BigNumber;
}
export type DonationMessagesUpdatedEvent = TypedEvent<
  [BigNumber],
  DonationMessagesUpdatedEventObject
>;

export type DonationMessagesUpdatedEventFilter =
  TypedEventFilter<DonationMessagesUpdatedEvent>;

export interface IndexFundCreatedEventObject {
  id: BigNumber;
}
export type IndexFundCreatedEvent = TypedEvent<
  [BigNumber],
  IndexFundCreatedEventObject
>;

export type IndexFundCreatedEventFilter =
  TypedEventFilter<IndexFundCreatedEvent>;

export interface IndexFundRemovedEventObject {
  id: BigNumber;
}
export type IndexFundRemovedEvent = TypedEvent<
  [BigNumber],
  IndexFundRemovedEventObject
>;

export type IndexFundRemovedEventFilter =
  TypedEventFilter<IndexFundRemovedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface MemberRemovedEventObject {
  fundId: BigNumber;
  memberId: number;
}
export type MemberRemovedEvent = TypedEvent<
  [BigNumber, number],
  MemberRemovedEventObject
>;

export type MemberRemovedEventFilter = TypedEventFilter<MemberRemovedEvent>;

export interface MembersUpdatedEventObject {
  fundId: BigNumber;
  members: number[];
}
export type MembersUpdatedEvent = TypedEvent<
  [BigNumber, number[]],
  MembersUpdatedEventObject
>;

export type MembersUpdatedEventFilter = TypedEventFilter<MembersUpdatedEvent>;

export interface OwnerUpdatedEventObject {
  newOwner: string;
}
export type OwnerUpdatedEvent = TypedEvent<[string], OwnerUpdatedEventObject>;

export type OwnerUpdatedEventFilter = TypedEventFilter<OwnerUpdatedEvent>;

export interface RegistrarUpdatedEventObject {
  newRegistrar: string;
}
export type RegistrarUpdatedEvent = TypedEvent<
  [string],
  RegistrarUpdatedEventObject
>;

export type RegistrarUpdatedEventFilter =
  TypedEventFilter<RegistrarUpdatedEvent>;

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
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      members: PromiseOrValue<BigNumberish>[],
      rotatingFund: PromiseOrValue<boolean>,
      splitToLiquid: PromiseOrValue<BigNumberish>,
      expiryTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositERC20(
      fundId: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      splitToLiquid: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initIndexFund(
      details: IndexFundMessage.InstantiateMessageStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    queryActiveFundDetails(
      overrides?: CallOverrides
    ): Promise<[IIndexFund.IndexFundStructOutput]>;

    queryConfig(
      overrides?: CallOverrides
    ): Promise<[IndexFundStorage.ConfigStructOutput]>;

    queryFundDetails(
      fundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IIndexFund.IndexFundStructOutput]>;

    queryInvolvedFunds(
      endowmentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IIndexFund.IndexFundStructOutput[]]>;

    queryState(
      overrides?: CallOverrides
    ): Promise<[IndexFundMessage.StateResponseMessageStructOutput]>;

    removeIndexFund(
      fundId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeMember(
      member: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateConfig(
      details: IndexFundMessage.UpdateConfigMessageStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateFundMembers(
      fundId: PromiseOrValue<BigNumberish>,
      members: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateRegistrar(
      newRegistrar: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createIndexFund(
    name: PromiseOrValue<string>,
    description: PromiseOrValue<string>,
    members: PromiseOrValue<BigNumberish>[],
    rotatingFund: PromiseOrValue<boolean>,
    splitToLiquid: PromiseOrValue<BigNumberish>,
    expiryTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositERC20(
    fundId: PromiseOrValue<BigNumberish>,
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    splitToLiquid: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initIndexFund(
    details: IndexFundMessage.InstantiateMessageStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  queryActiveFundDetails(
    overrides?: CallOverrides
  ): Promise<IIndexFund.IndexFundStructOutput>;

  queryConfig(
    overrides?: CallOverrides
  ): Promise<IndexFundStorage.ConfigStructOutput>;

  queryFundDetails(
    fundId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IIndexFund.IndexFundStructOutput>;

  queryInvolvedFunds(
    endowmentId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IIndexFund.IndexFundStructOutput[]>;

  queryState(
    overrides?: CallOverrides
  ): Promise<IndexFundMessage.StateResponseMessageStructOutput>;

  removeIndexFund(
    fundId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeMember(
    member: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateConfig(
    details: IndexFundMessage.UpdateConfigMessageStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateFundMembers(
    fundId: PromiseOrValue<BigNumberish>,
    members: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateOwner(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateRegistrar(
    newRegistrar: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createIndexFund(
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      members: PromiseOrValue<BigNumberish>[],
      rotatingFund: PromiseOrValue<boolean>,
      splitToLiquid: PromiseOrValue<BigNumberish>,
      expiryTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    depositERC20(
      fundId: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      splitToLiquid: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    initIndexFund(
      details: IndexFundMessage.InstantiateMessageStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    queryActiveFundDetails(
      overrides?: CallOverrides
    ): Promise<IIndexFund.IndexFundStructOutput>;

    queryConfig(
      overrides?: CallOverrides
    ): Promise<IndexFundStorage.ConfigStructOutput>;

    queryFundDetails(
      fundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IIndexFund.IndexFundStructOutput>;

    queryInvolvedFunds(
      endowmentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IIndexFund.IndexFundStructOutput[]>;

    queryState(
      overrides?: CallOverrides
    ): Promise<IndexFundMessage.StateResponseMessageStructOutput>;

    removeIndexFund(
      fundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeMember(
      member: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateConfig(
      details: IndexFundMessage.UpdateConfigMessageStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateFundMembers(
      fundId: PromiseOrValue<BigNumberish>,
      members: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateRegistrar(
      newRegistrar: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "ActiveFundUpdated(uint256)"(fundId?: null): ActiveFundUpdatedEventFilter;
    ActiveFundUpdated(fundId?: null): ActiveFundUpdatedEventFilter;

    "ConfigUpdated()"(): ConfigUpdatedEventFilter;
    ConfigUpdated(): ConfigUpdatedEventFilter;

    "DonationMessagesUpdated(uint256)"(
      fundId?: null
    ): DonationMessagesUpdatedEventFilter;
    DonationMessagesUpdated(fundId?: null): DonationMessagesUpdatedEventFilter;

    "IndexFundCreated(uint256)"(id?: null): IndexFundCreatedEventFilter;
    IndexFundCreated(id?: null): IndexFundCreatedEventFilter;

    "IndexFundRemoved(uint256)"(id?: null): IndexFundRemovedEventFilter;
    IndexFundRemoved(id?: null): IndexFundRemovedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "MemberRemoved(uint256,uint32)"(
      fundId?: null,
      memberId?: null
    ): MemberRemovedEventFilter;
    MemberRemoved(fundId?: null, memberId?: null): MemberRemovedEventFilter;

    "MembersUpdated(uint256,uint32[])"(
      fundId?: null,
      members?: null
    ): MembersUpdatedEventFilter;
    MembersUpdated(fundId?: null, members?: null): MembersUpdatedEventFilter;

    "OwnerUpdated(address)"(newOwner?: null): OwnerUpdatedEventFilter;
    OwnerUpdated(newOwner?: null): OwnerUpdatedEventFilter;

    "RegistrarUpdated(address)"(
      newRegistrar?: null
    ): RegistrarUpdatedEventFilter;
    RegistrarUpdated(newRegistrar?: null): RegistrarUpdatedEventFilter;

    "StateUpdated()"(): StateUpdatedEventFilter;
    StateUpdated(): StateUpdatedEventFilter;
  };

  estimateGas: {
    createIndexFund(
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      members: PromiseOrValue<BigNumberish>[],
      rotatingFund: PromiseOrValue<boolean>,
      splitToLiquid: PromiseOrValue<BigNumberish>,
      expiryTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositERC20(
      fundId: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      splitToLiquid: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initIndexFund(
      details: IndexFundMessage.InstantiateMessageStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    queryActiveFundDetails(overrides?: CallOverrides): Promise<BigNumber>;

    queryConfig(overrides?: CallOverrides): Promise<BigNumber>;

    queryFundDetails(
      fundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    queryInvolvedFunds(
      endowmentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    queryState(overrides?: CallOverrides): Promise<BigNumber>;

    removeIndexFund(
      fundId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeMember(
      member: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateConfig(
      details: IndexFundMessage.UpdateConfigMessageStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateFundMembers(
      fundId: PromiseOrValue<BigNumberish>,
      members: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateRegistrar(
      newRegistrar: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createIndexFund(
      name: PromiseOrValue<string>,
      description: PromiseOrValue<string>,
      members: PromiseOrValue<BigNumberish>[],
      rotatingFund: PromiseOrValue<boolean>,
      splitToLiquid: PromiseOrValue<BigNumberish>,
      expiryTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositERC20(
      fundId: PromiseOrValue<BigNumberish>,
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      splitToLiquid: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initIndexFund(
      details: IndexFundMessage.InstantiateMessageStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    queryActiveFundDetails(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryFundDetails(
      fundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryInvolvedFunds(
      endowmentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeIndexFund(
      fundId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeMember(
      member: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateConfig(
      details: IndexFundMessage.UpdateConfigMessageStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateFundMembers(
      fundId: PromiseOrValue<BigNumberish>,
      members: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateRegistrar(
      newRegistrar: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
