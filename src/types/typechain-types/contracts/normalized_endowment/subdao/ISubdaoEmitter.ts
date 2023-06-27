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
} from "../../../common";

export interface ISubdaoEmitterInterface extends utils.Interface {
  functions: {
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
      | "initializeSubdao"
      | "transferSubdao"
      | "updateSubdaoConfig"
      | "updateSubdaoPoll"
      | "updateSubdaoPollAndStatus"
      | "updateSubdaoState"
      | "updateVotingStatus"
  ): FunctionFragment;

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

  events: {};
}

export interface ISubdaoEmitter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISubdaoEmitterInterface;

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

  filters: {};

  estimateGas: {
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
