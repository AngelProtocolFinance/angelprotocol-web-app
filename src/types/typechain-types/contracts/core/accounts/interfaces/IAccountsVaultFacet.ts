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
  PayableOverrides,
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

export interface IAccountsVaultFacetInterface extends utils.Interface {
  functions: {
    "strategyInvest(uint32,bytes4,string,uint256,uint256)": FunctionFragment;
    "strategyRedeem(uint32,bytes4,string,uint256,uint256)": FunctionFragment;
    "strategyRedeemAll(uint32,bytes4,string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "strategyInvest"
      | "strategyRedeem"
      | "strategyRedeemAll"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "strategyInvest",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "strategyRedeem",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "strategyRedeemAll",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "strategyInvest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "strategyRedeem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "strategyRedeemAll",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IAccountsVaultFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAccountsVaultFacetInterface;

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
    strategyInvest(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      lockAmt: PromiseOrValue<BigNumberish>,
      liquidAmt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    strategyRedeem(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      lockAmt: PromiseOrValue<BigNumberish>,
      liquidAmt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    strategyRedeemAll(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  strategyInvest(
    id: PromiseOrValue<BigNumberish>,
    strategy: PromiseOrValue<BytesLike>,
    token: PromiseOrValue<string>,
    lockAmt: PromiseOrValue<BigNumberish>,
    liquidAmt: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  strategyRedeem(
    id: PromiseOrValue<BigNumberish>,
    strategy: PromiseOrValue<BytesLike>,
    token: PromiseOrValue<string>,
    lockAmt: PromiseOrValue<BigNumberish>,
    liquidAmt: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  strategyRedeemAll(
    id: PromiseOrValue<BigNumberish>,
    strategy: PromiseOrValue<BytesLike>,
    token: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    strategyInvest(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      lockAmt: PromiseOrValue<BigNumberish>,
      liquidAmt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    strategyRedeem(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      lockAmt: PromiseOrValue<BigNumberish>,
      liquidAmt: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    strategyRedeemAll(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    strategyInvest(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      lockAmt: PromiseOrValue<BigNumberish>,
      liquidAmt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    strategyRedeem(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      lockAmt: PromiseOrValue<BigNumberish>,
      liquidAmt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    strategyRedeemAll(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    strategyInvest(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      lockAmt: PromiseOrValue<BigNumberish>,
      liquidAmt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    strategyRedeem(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      lockAmt: PromiseOrValue<BigNumberish>,
      liquidAmt: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    strategyRedeemAll(
      id: PromiseOrValue<BigNumberish>,
      strategy: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
