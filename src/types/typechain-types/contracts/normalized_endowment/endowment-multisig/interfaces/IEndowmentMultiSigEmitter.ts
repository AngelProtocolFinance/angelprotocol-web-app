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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export interface IEndowmentMultiSigEmitterInterface extends utils.Interface {
  functions: {
    "approvalsRequirementChangedEndowment(uint256,uint256)": FunctionFragment;
    "createEndowmentMultisig(address,uint256,address,address[],uint256,bool,uint256)": FunctionFragment;
    "expiryChangedEndowment(uint256,uint256)": FunctionFragment;
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

  events: {};
}

export interface IEndowmentMultiSigEmitter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IEndowmentMultiSigEmitterInterface;

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

  filters: {};

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
