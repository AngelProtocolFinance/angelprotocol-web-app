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
} from "../../../../common";

export interface IEndowmentMultiSigFactoryInterface extends utils.Interface {
  functions: {
    "create(uint256,address,address[],uint256,uint256)": FunctionFragment;
    "endowmentIdToMultisig(uint256)": FunctionFragment;
    "updateImplementation(address)": FunctionFragment;
    "updateProxyAdmin(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "create"
      | "endowmentIdToMultisig"
      | "updateImplementation"
      | "updateProxyAdmin"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "create",
    values: [BigNumberish, string, string[], BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "endowmentIdToMultisig",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateImplementation",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateProxyAdmin",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "endowmentIdToMultisig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateProxyAdmin",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IEndowmentMultiSigFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IEndowmentMultiSigFactoryInterface;

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
    create(
      endowmentId: BigNumberish,
      emitterAddress: string,
      owners: string[],
      required: BigNumberish,
      transactionExpiry: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    endowmentIdToMultisig(
      endowmentId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    updateImplementation(
      implementationAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    updateProxyAdmin(
      proxyAdminAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  create(
    endowmentId: BigNumberish,
    emitterAddress: string,
    owners: string[],
    required: BigNumberish,
    transactionExpiry: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  endowmentIdToMultisig(
    endowmentId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  updateImplementation(
    implementationAddress: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  updateProxyAdmin(
    proxyAdminAddress: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    create(
      endowmentId: BigNumberish,
      emitterAddress: string,
      owners: string[],
      required: BigNumberish,
      transactionExpiry: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    endowmentIdToMultisig(
      endowmentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    updateImplementation(
      implementationAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateProxyAdmin(
      proxyAdminAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    create(
      endowmentId: BigNumberish,
      emitterAddress: string,
      owners: string[],
      required: BigNumberish,
      transactionExpiry: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    endowmentIdToMultisig(
      endowmentId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    updateImplementation(
      implementationAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    updateProxyAdmin(
      proxyAdminAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    create(
      endowmentId: BigNumberish,
      emitterAddress: string,
      owners: string[],
      required: BigNumberish,
      transactionExpiry: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    endowmentIdToMultisig(
      endowmentId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    updateImplementation(
      implementationAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    updateProxyAdmin(
      proxyAdminAddress: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
