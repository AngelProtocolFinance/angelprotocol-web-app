/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
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
} from "../../../../common";

export interface FactoryInterface extends utils.Interface {
  functions: {
    "endowmentIdToMultisig(uint256)": FunctionFragment;
    "getInstantiationCount(address)": FunctionFragment;
    "instantiations(address,uint256)": FunctionFragment;
    "isInstantiation(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "endowmentIdToMultisig"
      | "getInstantiationCount"
      | "instantiations"
      | "isInstantiation"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "endowmentIdToMultisig",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getInstantiationCount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "instantiations",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isInstantiation",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "endowmentIdToMultisig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInstantiationCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "instantiations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isInstantiation",
    data: BytesLike
  ): Result;

  events: {
    "ContractInstantiated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ContractInstantiated"): EventFragment;
}

export interface ContractInstantiatedEventObject {
  sender: string;
  instantiation: string;
}
export type ContractInstantiatedEvent = TypedEvent<
  [string, string],
  ContractInstantiatedEventObject
>;

export type ContractInstantiatedEventFilter =
  TypedEventFilter<ContractInstantiatedEvent>;

export interface Factory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FactoryInterface;

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
    endowmentIdToMultisig(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getInstantiationCount(
      creator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    instantiations(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isInstantiation(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  endowmentIdToMultisig(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getInstantiationCount(
    creator: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  instantiations(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  isInstantiation(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    endowmentIdToMultisig(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getInstantiationCount(
      creator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    instantiations(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    isInstantiation(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "ContractInstantiated(address,address)"(
      sender?: null,
      instantiation?: null
    ): ContractInstantiatedEventFilter;
    ContractInstantiated(
      sender?: null,
      instantiation?: null
    ): ContractInstantiatedEventFilter;
  };

  estimateGas: {
    endowmentIdToMultisig(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getInstantiationCount(
      creator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    instantiations(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isInstantiation(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    endowmentIdToMultisig(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getInstantiationCount(
      creator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    instantiations(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isInstantiation(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
