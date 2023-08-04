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
} from "../../../common";

export interface ISubDaoTokenInterface extends utils.Interface {
  functions: {
    "executeDonorMatch(uint256,address,uint32,address)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "executeDonorMatch"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "executeDonorMatch",
    values: [BigNumberish, string, BigNumberish, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "executeDonorMatch",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ISubDaoToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISubDaoTokenInterface;

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
    executeDonorMatch(
      amount: BigNumberish,
      accountscontract: string,
      endowmentid: BigNumberish,
      donor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  executeDonorMatch(
    amount: BigNumberish,
    accountscontract: string,
    endowmentid: BigNumberish,
    donor: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    executeDonorMatch(
      amount: BigNumberish,
      accountscontract: string,
      endowmentid: BigNumberish,
      donor: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    executeDonorMatch(
      amount: BigNumberish,
      accountscontract: string,
      endowmentid: BigNumberish,
      donor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    executeDonorMatch(
      amount: BigNumberish,
      accountscontract: string,
      endowmentid: BigNumberish,
      donor: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
