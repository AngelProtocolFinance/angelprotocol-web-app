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

export interface EndowmentMultiSigEmitterInterface extends utils.Interface {
  functions: {
    "approvalsRequirementChangedEndowment(uint256,uint256)": FunctionFragment;
    "createEndowmentMultisig(address,uint256,address,address[],uint256,bool,uint256)": FunctionFragment;
    "expiryChangedEndowment(uint256,uint256)": FunctionFragment;
    "initEndowmentMultiSigEmitter(address)": FunctionFragment;
    "ownerReplacedEndowment(uint256,address,address)": FunctionFragment;
    "ownersAddedEndowment(uint256,address[])": FunctionFragment;
    "ownersRemovedEndowment(uint256,address[])": FunctionFragment;
    "requireExecutionChangedEndowment(uint256,bool)": FunctionFragment;
    "transactionConfirmationOfFormerOwnerRevokedEndowment(uint256,address,uint256)": FunctionFragment;
    "transactionConfirmationRevokedEndowment(uint256,address,uint256)": FunctionFragment;
    "transactionConfirmedEndowment(uint256,address,uint256)": FunctionFragment;
    "transactionExecutedEndowment(uint256,uint256)": FunctionFragment;
    "transactionSubmittedEndowment(uint256,address,uint256,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approvalsRequirementChangedEndowment"
      | "createEndowmentMultisig"
      | "expiryChangedEndowment"
      | "initEndowmentMultiSigEmitter"
      | "ownerReplacedEndowment"
      | "ownersAddedEndowment"
      | "ownersRemovedEndowment"
      | "requireExecutionChangedEndowment"
      | "transactionConfirmationOfFormerOwnerRevokedEndowment"
      | "transactionConfirmationRevokedEndowment"
      | "transactionConfirmedEndowment"
      | "transactionExecutedEndowment"
      | "transactionSubmittedEndowment"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approvalsRequirementChangedEndowment",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "createEndowmentMultisig",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "expiryChangedEndowment",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initEndowmentMultiSigEmitter",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerReplacedEndowment",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "ownersAddedEndowment",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "ownersRemovedEndowment",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "requireExecutionChangedEndowment",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "transactionConfirmationOfFormerOwnerRevokedEndowment",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transactionConfirmationRevokedEndowment",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transactionConfirmedEndowment",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transactionExecutedEndowment",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transactionSubmittedEndowment",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "approvalsRequirementChangedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createEndowmentMultisig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "expiryChangedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initEndowmentMultiSigEmitter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownerReplacedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownersAddedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownersRemovedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requireExecutionChangedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactionConfirmationOfFormerOwnerRevokedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactionConfirmationRevokedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactionConfirmedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactionExecutedEndowment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactionSubmittedEndowment",
    data: BytesLike
  ): Result;

  events: {
    "ApprovalsRequirementChanged(uint256,uint256)": EventFragment;
    "EndowmentMultisigCreated(address,uint256,address,address[],uint256,bool,uint256)": EventFragment;
    "ExpiryChanged(uint256,uint256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "OwnerReplaced(uint256,address,address)": EventFragment;
    "OwnersAdded(uint256,address[])": EventFragment;
    "OwnersRemoved(uint256,address[])": EventFragment;
    "RequireExecutionChanged(uint256,bool)": EventFragment;
    "TransactionConfirmationOfFormerOwnerRevoked(uint256,address,uint256)": EventFragment;
    "TransactionConfirmationRevoked(uint256,address,uint256)": EventFragment;
    "TransactionConfirmed(uint256,address,uint256)": EventFragment;
    "TransactionExecuted(uint256,uint256)": EventFragment;
    "TransactionSubmitted(uint256,address,uint256,bytes)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "ApprovalsRequirementChanged"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentMultisigCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExpiryChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerReplaced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnersAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnersRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequireExecutionChanged"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "TransactionConfirmationOfFormerOwnerRevoked"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "TransactionConfirmationRevoked"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransactionConfirmed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransactionExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransactionSubmitted"): EventFragment;
}

export interface ApprovalsRequirementChangedEventObject {
  endowmentId: BigNumber;
  approvalsRequired: BigNumber;
}
export type ApprovalsRequirementChangedEvent = TypedEvent<
  [BigNumber, BigNumber],
  ApprovalsRequirementChangedEventObject
>;

export type ApprovalsRequirementChangedEventFilter =
  TypedEventFilter<ApprovalsRequirementChangedEvent>;

export interface EndowmentMultisigCreatedEventObject {
  multisigAddress: string;
  endowmentId: BigNumber;
  emitter: string;
  owners: string[];
  required: BigNumber;
  requireExecution: boolean;
  transactionExpiry: BigNumber;
}
export type EndowmentMultisigCreatedEvent = TypedEvent<
  [string, BigNumber, string, string[], BigNumber, boolean, BigNumber],
  EndowmentMultisigCreatedEventObject
>;

export type EndowmentMultisigCreatedEventFilter =
  TypedEventFilter<EndowmentMultisigCreatedEvent>;

export interface ExpiryChangedEventObject {
  endowmentId: BigNumber;
  transactionExpiry: BigNumber;
}
export type ExpiryChangedEvent = TypedEvent<
  [BigNumber, BigNumber],
  ExpiryChangedEventObject
>;

export type ExpiryChangedEventFilter = TypedEventFilter<ExpiryChangedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnerReplacedEventObject {
  endowmentId: BigNumber;
  currOwner: string;
  newOwner: string;
}
export type OwnerReplacedEvent = TypedEvent<
  [BigNumber, string, string],
  OwnerReplacedEventObject
>;

export type OwnerReplacedEventFilter = TypedEventFilter<OwnerReplacedEvent>;

export interface OwnersAddedEventObject {
  endowmentId: BigNumber;
  owners: string[];
}
export type OwnersAddedEvent = TypedEvent<
  [BigNumber, string[]],
  OwnersAddedEventObject
>;

export type OwnersAddedEventFilter = TypedEventFilter<OwnersAddedEvent>;

export interface OwnersRemovedEventObject {
  endowmentId: BigNumber;
  owners: string[];
}
export type OwnersRemovedEvent = TypedEvent<
  [BigNumber, string[]],
  OwnersRemovedEventObject
>;

export type OwnersRemovedEventFilter = TypedEventFilter<OwnersRemovedEvent>;

export interface RequireExecutionChangedEventObject {
  endowmentId: BigNumber;
  requireExecution: boolean;
}
export type RequireExecutionChangedEvent = TypedEvent<
  [BigNumber, boolean],
  RequireExecutionChangedEventObject
>;

export type RequireExecutionChangedEventFilter =
  TypedEventFilter<RequireExecutionChangedEvent>;

export interface TransactionConfirmationOfFormerOwnerRevokedEventObject {
  endowmentId: BigNumber;
  formerOwner: string;
  transactionId: BigNumber;
}
export type TransactionConfirmationOfFormerOwnerRevokedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  TransactionConfirmationOfFormerOwnerRevokedEventObject
>;

export type TransactionConfirmationOfFormerOwnerRevokedEventFilter =
  TypedEventFilter<TransactionConfirmationOfFormerOwnerRevokedEvent>;

export interface TransactionConfirmationRevokedEventObject {
  endowmentId: BigNumber;
  owner: string;
  transactionId: BigNumber;
}
export type TransactionConfirmationRevokedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  TransactionConfirmationRevokedEventObject
>;

export type TransactionConfirmationRevokedEventFilter =
  TypedEventFilter<TransactionConfirmationRevokedEvent>;

export interface TransactionConfirmedEventObject {
  endowmentId: BigNumber;
  owner: string;
  transactionId: BigNumber;
}
export type TransactionConfirmedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  TransactionConfirmedEventObject
>;

export type TransactionConfirmedEventFilter =
  TypedEventFilter<TransactionConfirmedEvent>;

export interface TransactionExecutedEventObject {
  endowmentId: BigNumber;
  transactionId: BigNumber;
}
export type TransactionExecutedEvent = TypedEvent<
  [BigNumber, BigNumber],
  TransactionExecutedEventObject
>;

export type TransactionExecutedEventFilter =
  TypedEventFilter<TransactionExecutedEvent>;

export interface TransactionSubmittedEventObject {
  endowmentId: BigNumber;
  owner: string;
  transactionId: BigNumber;
  metadata: string;
}
export type TransactionSubmittedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  TransactionSubmittedEventObject
>;

export type TransactionSubmittedEventFilter =
  TypedEventFilter<TransactionSubmittedEvent>;

export interface EndowmentMultiSigEmitter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EndowmentMultiSigEmitterInterface;

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
    approvalsRequirementChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      approvalsRequired: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createEndowmentMultisig(
      multisigAddress: PromiseOrValue<string>,
      endowmentId: PromiseOrValue<BigNumberish>,
      emitter: PromiseOrValue<string>,
      owners: PromiseOrValue<string>[],
      required: PromiseOrValue<BigNumberish>,
      requireExecution: PromiseOrValue<boolean>,
      transactionExpiry: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    expiryChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      transactionExpiry: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initEndowmentMultiSigEmitter(
      _multisigFactory: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ownerReplacedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      currOwner: PromiseOrValue<string>,
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ownersAddedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owners: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ownersRemovedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owners: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requireExecutionChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      requireExecution: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transactionConfirmationOfFormerOwnerRevokedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      formerOwner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transactionConfirmationRevokedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transactionConfirmedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transactionExecutedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transactionSubmittedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      metadata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  approvalsRequirementChangedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    approvalsRequired: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createEndowmentMultisig(
    multisigAddress: PromiseOrValue<string>,
    endowmentId: PromiseOrValue<BigNumberish>,
    emitter: PromiseOrValue<string>,
    owners: PromiseOrValue<string>[],
    required: PromiseOrValue<BigNumberish>,
    requireExecution: PromiseOrValue<boolean>,
    transactionExpiry: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  expiryChangedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    transactionExpiry: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initEndowmentMultiSigEmitter(
    _multisigFactory: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ownerReplacedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    currOwner: PromiseOrValue<string>,
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ownersAddedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    owners: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ownersRemovedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    owners: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requireExecutionChangedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    requireExecution: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transactionConfirmationOfFormerOwnerRevokedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    formerOwner: PromiseOrValue<string>,
    transactionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transactionConfirmationRevokedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    owner: PromiseOrValue<string>,
    transactionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transactionConfirmedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    owner: PromiseOrValue<string>,
    transactionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transactionExecutedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    transactionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transactionSubmittedEndowment(
    endowmentId: PromiseOrValue<BigNumberish>,
    owner: PromiseOrValue<string>,
    transactionId: PromiseOrValue<BigNumberish>,
    metadata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approvalsRequirementChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      approvalsRequired: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createEndowmentMultisig(
      multisigAddress: PromiseOrValue<string>,
      endowmentId: PromiseOrValue<BigNumberish>,
      emitter: PromiseOrValue<string>,
      owners: PromiseOrValue<string>[],
      required: PromiseOrValue<BigNumberish>,
      requireExecution: PromiseOrValue<boolean>,
      transactionExpiry: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    expiryChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      transactionExpiry: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    initEndowmentMultiSigEmitter(
      _multisigFactory: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    ownerReplacedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      currOwner: PromiseOrValue<string>,
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    ownersAddedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owners: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    ownersRemovedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owners: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    requireExecutionChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      requireExecution: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    transactionConfirmationOfFormerOwnerRevokedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      formerOwner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transactionConfirmationRevokedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transactionConfirmedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transactionExecutedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transactionSubmittedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      metadata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ApprovalsRequirementChanged(uint256,uint256)"(
      endowmentId?: null,
      approvalsRequired?: null
    ): ApprovalsRequirementChangedEventFilter;
    ApprovalsRequirementChanged(
      endowmentId?: null,
      approvalsRequired?: null
    ): ApprovalsRequirementChangedEventFilter;

    "EndowmentMultisigCreated(address,uint256,address,address[],uint256,bool,uint256)"(
      multisigAddress?: null,
      endowmentId?: null,
      emitter?: null,
      owners?: null,
      required?: null,
      requireExecution?: null,
      transactionExpiry?: null
    ): EndowmentMultisigCreatedEventFilter;
    EndowmentMultisigCreated(
      multisigAddress?: null,
      endowmentId?: null,
      emitter?: null,
      owners?: null,
      required?: null,
      requireExecution?: null,
      transactionExpiry?: null
    ): EndowmentMultisigCreatedEventFilter;

    "ExpiryChanged(uint256,uint256)"(
      endowmentId?: null,
      transactionExpiry?: null
    ): ExpiryChangedEventFilter;
    ExpiryChanged(
      endowmentId?: null,
      transactionExpiry?: null
    ): ExpiryChangedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OwnerReplaced(uint256,address,address)"(
      endowmentId?: null,
      currOwner?: null,
      newOwner?: null
    ): OwnerReplacedEventFilter;
    OwnerReplaced(
      endowmentId?: null,
      currOwner?: null,
      newOwner?: null
    ): OwnerReplacedEventFilter;

    "OwnersAdded(uint256,address[])"(
      endowmentId?: null,
      owners?: null
    ): OwnersAddedEventFilter;
    OwnersAdded(endowmentId?: null, owners?: null): OwnersAddedEventFilter;

    "OwnersRemoved(uint256,address[])"(
      endowmentId?: null,
      owners?: null
    ): OwnersRemovedEventFilter;
    OwnersRemoved(endowmentId?: null, owners?: null): OwnersRemovedEventFilter;

    "RequireExecutionChanged(uint256,bool)"(
      endowmentId?: null,
      requireExecution?: null
    ): RequireExecutionChangedEventFilter;
    RequireExecutionChanged(
      endowmentId?: null,
      requireExecution?: null
    ): RequireExecutionChangedEventFilter;

    "TransactionConfirmationOfFormerOwnerRevoked(uint256,address,uint256)"(
      endowmentId?: null,
      formerOwner?: null,
      transactionId?: null
    ): TransactionConfirmationOfFormerOwnerRevokedEventFilter;
    TransactionConfirmationOfFormerOwnerRevoked(
      endowmentId?: null,
      formerOwner?: null,
      transactionId?: null
    ): TransactionConfirmationOfFormerOwnerRevokedEventFilter;

    "TransactionConfirmationRevoked(uint256,address,uint256)"(
      endowmentId?: null,
      owner?: null,
      transactionId?: null
    ): TransactionConfirmationRevokedEventFilter;
    TransactionConfirmationRevoked(
      endowmentId?: null,
      owner?: null,
      transactionId?: null
    ): TransactionConfirmationRevokedEventFilter;

    "TransactionConfirmed(uint256,address,uint256)"(
      endowmentId?: null,
      owner?: null,
      transactionId?: null
    ): TransactionConfirmedEventFilter;
    TransactionConfirmed(
      endowmentId?: null,
      owner?: null,
      transactionId?: null
    ): TransactionConfirmedEventFilter;

    "TransactionExecuted(uint256,uint256)"(
      endowmentId?: null,
      transactionId?: null
    ): TransactionExecutedEventFilter;
    TransactionExecuted(
      endowmentId?: null,
      transactionId?: null
    ): TransactionExecutedEventFilter;

    "TransactionSubmitted(uint256,address,uint256,bytes)"(
      endowmentId?: null,
      owner?: null,
      transactionId?: null,
      metadata?: null
    ): TransactionSubmittedEventFilter;
    TransactionSubmitted(
      endowmentId?: null,
      owner?: null,
      transactionId?: null,
      metadata?: null
    ): TransactionSubmittedEventFilter;
  };

  estimateGas: {
    approvalsRequirementChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      approvalsRequired: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createEndowmentMultisig(
      multisigAddress: PromiseOrValue<string>,
      endowmentId: PromiseOrValue<BigNumberish>,
      emitter: PromiseOrValue<string>,
      owners: PromiseOrValue<string>[],
      required: PromiseOrValue<BigNumberish>,
      requireExecution: PromiseOrValue<boolean>,
      transactionExpiry: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    expiryChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      transactionExpiry: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initEndowmentMultiSigEmitter(
      _multisigFactory: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ownerReplacedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      currOwner: PromiseOrValue<string>,
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ownersAddedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owners: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ownersRemovedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owners: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requireExecutionChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      requireExecution: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transactionConfirmationOfFormerOwnerRevokedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      formerOwner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transactionConfirmationRevokedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transactionConfirmedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transactionExecutedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transactionSubmittedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      metadata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approvalsRequirementChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      approvalsRequired: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createEndowmentMultisig(
      multisigAddress: PromiseOrValue<string>,
      endowmentId: PromiseOrValue<BigNumberish>,
      emitter: PromiseOrValue<string>,
      owners: PromiseOrValue<string>[],
      required: PromiseOrValue<BigNumberish>,
      requireExecution: PromiseOrValue<boolean>,
      transactionExpiry: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    expiryChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      transactionExpiry: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initEndowmentMultiSigEmitter(
      _multisigFactory: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ownerReplacedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      currOwner: PromiseOrValue<string>,
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ownersAddedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owners: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ownersRemovedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owners: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requireExecutionChangedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      requireExecution: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transactionConfirmationOfFormerOwnerRevokedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      formerOwner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transactionConfirmationRevokedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transactionConfirmedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transactionExecutedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      transactionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transactionSubmittedEndowment(
      endowmentId: PromiseOrValue<BigNumberish>,
      owner: PromiseOrValue<string>,
      transactionId: PromiseOrValue<BigNumberish>,
      metadata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
