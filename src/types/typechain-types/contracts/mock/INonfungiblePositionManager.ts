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
  PayableOverrides,
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
} from "../../common";

export declare namespace INonfungiblePositionManager {
  export type CollectParamsStruct = {
    tokenId: PromiseOrValue<BigNumberish>;
    recipient: PromiseOrValue<string>;
    amount0Max: PromiseOrValue<BigNumberish>;
    amount1Max: PromiseOrValue<BigNumberish>;
  };

  export type CollectParamsStructOutput = [
    BigNumber,
    string,
    BigNumber,
    BigNumber
  ] & {
    tokenId: BigNumber;
    recipient: string;
    amount0Max: BigNumber;
    amount1Max: BigNumber;
  };

  export type DecreaseLiquidityParamsStruct = {
    tokenId: PromiseOrValue<BigNumberish>;
    liquidity: PromiseOrValue<BigNumberish>;
    amount0Min: PromiseOrValue<BigNumberish>;
    amount1Min: PromiseOrValue<BigNumberish>;
    deadline: PromiseOrValue<BigNumberish>;
  };

  export type DecreaseLiquidityParamsStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    tokenId: BigNumber;
    liquidity: BigNumber;
    amount0Min: BigNumber;
    amount1Min: BigNumber;
    deadline: BigNumber;
  };

  export type IncreaseLiquidityParamsStruct = {
    tokenId: PromiseOrValue<BigNumberish>;
    amount0Desired: PromiseOrValue<BigNumberish>;
    amount1Desired: PromiseOrValue<BigNumberish>;
    amount0Min: PromiseOrValue<BigNumberish>;
    amount1Min: PromiseOrValue<BigNumberish>;
    deadline: PromiseOrValue<BigNumberish>;
  };

  export type IncreaseLiquidityParamsStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    tokenId: BigNumber;
    amount0Desired: BigNumber;
    amount1Desired: BigNumber;
    amount0Min: BigNumber;
    amount1Min: BigNumber;
    deadline: BigNumber;
  };

  export type MintParamsStruct = {
    token0: PromiseOrValue<string>;
    token1: PromiseOrValue<string>;
    fee: PromiseOrValue<BigNumberish>;
    tickLower: PromiseOrValue<BigNumberish>;
    tickUpper: PromiseOrValue<BigNumberish>;
    amount0Desired: PromiseOrValue<BigNumberish>;
    amount1Desired: PromiseOrValue<BigNumberish>;
    amount0Min: PromiseOrValue<BigNumberish>;
    amount1Min: PromiseOrValue<BigNumberish>;
    recipient: PromiseOrValue<string>;
    deadline: PromiseOrValue<BigNumberish>;
  };

  export type MintParamsStructOutput = [
    string,
    string,
    number,
    number,
    number,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber
  ] & {
    token0: string;
    token1: string;
    fee: number;
    tickLower: number;
    tickUpper: number;
    amount0Desired: BigNumber;
    amount1Desired: BigNumber;
    amount0Min: BigNumber;
    amount1Min: BigNumber;
    recipient: string;
    deadline: BigNumber;
  };
}

export interface INonfungiblePositionManagerInterface extends utils.Interface {
  functions: {
    "burn(uint256)": FunctionFragment;
    "collect((uint256,address,uint128,uint128))": FunctionFragment;
    "createAndInitializePoolIfNecessary(address,address,uint24,uint160)": FunctionFragment;
    "decreaseLiquidity((uint256,uint128,uint256,uint256,uint256))": FunctionFragment;
    "increaseLiquidity((uint256,uint256,uint256,uint256,uint256,uint256))": FunctionFragment;
    "mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))": FunctionFragment;
    "multicall(bytes[])": FunctionFragment;
    "positions(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "burn"
      | "collect"
      | "createAndInitializePoolIfNecessary"
      | "decreaseLiquidity"
      | "increaseLiquidity"
      | "mint"
      | "multicall"
      | "positions"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "burn",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "collect",
    values: [INonfungiblePositionManager.CollectParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "createAndInitializePoolIfNecessary",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "decreaseLiquidity",
    values: [INonfungiblePositionManager.DecreaseLiquidityParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseLiquidity",
    values: [INonfungiblePositionManager.IncreaseLiquidityParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [INonfungiblePositionManager.MintParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "multicall",
    values: [PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "positions",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "collect", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createAndInitializePoolIfNecessary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decreaseLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "positions", data: BytesLike): Result;

  events: {
    "Collect(uint256,address,uint256,uint256)": EventFragment;
    "DecreaseLiquidity(uint256,uint128,uint256,uint256)": EventFragment;
    "IncreaseLiquidity(uint256,uint128,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Collect"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DecreaseLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "IncreaseLiquidity"): EventFragment;
}

export interface CollectEventObject {
  tokenId: BigNumber;
  recipient: string;
  amount0: BigNumber;
  amount1: BigNumber;
}
export type CollectEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber],
  CollectEventObject
>;

export type CollectEventFilter = TypedEventFilter<CollectEvent>;

export interface DecreaseLiquidityEventObject {
  tokenId: BigNumber;
  liquidity: BigNumber;
  amount0: BigNumber;
  amount1: BigNumber;
}
export type DecreaseLiquidityEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  DecreaseLiquidityEventObject
>;

export type DecreaseLiquidityEventFilter =
  TypedEventFilter<DecreaseLiquidityEvent>;

export interface IncreaseLiquidityEventObject {
  tokenId: BigNumber;
  liquidity: BigNumber;
  amount0: BigNumber;
  amount1: BigNumber;
}
export type IncreaseLiquidityEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  IncreaseLiquidityEventObject
>;

export type IncreaseLiquidityEventFilter =
  TypedEventFilter<IncreaseLiquidityEvent>;

export interface INonfungiblePositionManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: INonfungiblePositionManagerInterface;

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
    burn(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    collect(
      params: INonfungiblePositionManager.CollectParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createAndInitializePoolIfNecessary(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      sqrtPriceX96: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    decreaseLiquidity(
      params: INonfungiblePositionManager.DecreaseLiquidityParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    increaseLiquidity(
      params: INonfungiblePositionManager.IncreaseLiquidityParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mint(
      params: INonfungiblePositionManager.MintParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    positions(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        string,
        string,
        number,
        number,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        nonce: BigNumber;
        operator: string;
        token0: string;
        token1: string;
        fee: number;
        tickLower: number;
        tickUpper: number;
        liquidity: BigNumber;
        feeGrowthInside0LastX128: BigNumber;
        feeGrowthInside1LastX128: BigNumber;
        tokensOwed0: BigNumber;
        tokensOwed1: BigNumber;
      }
    >;
  };

  burn(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  collect(
    params: INonfungiblePositionManager.CollectParamsStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createAndInitializePoolIfNecessary(
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    fee: PromiseOrValue<BigNumberish>,
    sqrtPriceX96: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  decreaseLiquidity(
    params: INonfungiblePositionManager.DecreaseLiquidityParamsStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  increaseLiquidity(
    params: INonfungiblePositionManager.IncreaseLiquidityParamsStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mint(
    params: INonfungiblePositionManager.MintParamsStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  multicall(
    data: PromiseOrValue<BytesLike>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  positions(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      string,
      string,
      string,
      number,
      number,
      number,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      nonce: BigNumber;
      operator: string;
      token0: string;
      token1: string;
      fee: number;
      tickLower: number;
      tickUpper: number;
      liquidity: BigNumber;
      feeGrowthInside0LastX128: BigNumber;
      feeGrowthInside1LastX128: BigNumber;
      tokensOwed0: BigNumber;
      tokensOwed1: BigNumber;
    }
  >;

  callStatic: {
    burn(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    collect(
      params: INonfungiblePositionManager.CollectParamsStruct,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
    >;

    createAndInitializePoolIfNecessary(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      sqrtPriceX96: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    decreaseLiquidity(
      params: INonfungiblePositionManager.DecreaseLiquidityParamsStruct,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
    >;

    increaseLiquidity(
      params: INonfungiblePositionManager.IncreaseLiquidityParamsStruct,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        liquidity: BigNumber;
        amount0: BigNumber;
        amount1: BigNumber;
      }
    >;

    mint(
      params: INonfungiblePositionManager.MintParamsStruct,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        tokenId: BigNumber;
        liquidity: BigNumber;
        amount0: BigNumber;
        amount1: BigNumber;
      }
    >;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<string[]>;

    positions(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        string,
        string,
        number,
        number,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        nonce: BigNumber;
        operator: string;
        token0: string;
        token1: string;
        fee: number;
        tickLower: number;
        tickUpper: number;
        liquidity: BigNumber;
        feeGrowthInside0LastX128: BigNumber;
        feeGrowthInside1LastX128: BigNumber;
        tokensOwed0: BigNumber;
        tokensOwed1: BigNumber;
      }
    >;
  };

  filters: {
    "Collect(uint256,address,uint256,uint256)"(
      tokenId?: null,
      recipient?: null,
      amount0?: null,
      amount1?: null
    ): CollectEventFilter;
    Collect(
      tokenId?: null,
      recipient?: null,
      amount0?: null,
      amount1?: null
    ): CollectEventFilter;

    "DecreaseLiquidity(uint256,uint128,uint256,uint256)"(
      tokenId?: null,
      liquidity?: null,
      amount0?: null,
      amount1?: null
    ): DecreaseLiquidityEventFilter;
    DecreaseLiquidity(
      tokenId?: null,
      liquidity?: null,
      amount0?: null,
      amount1?: null
    ): DecreaseLiquidityEventFilter;

    "IncreaseLiquidity(uint256,uint128,uint256,uint256)"(
      tokenId?: null,
      liquidity?: null,
      amount0?: null,
      amount1?: null
    ): IncreaseLiquidityEventFilter;
    IncreaseLiquidity(
      tokenId?: null,
      liquidity?: null,
      amount0?: null,
      amount1?: null
    ): IncreaseLiquidityEventFilter;
  };

  estimateGas: {
    burn(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    collect(
      params: INonfungiblePositionManager.CollectParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createAndInitializePoolIfNecessary(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      sqrtPriceX96: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    decreaseLiquidity(
      params: INonfungiblePositionManager.DecreaseLiquidityParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    increaseLiquidity(
      params: INonfungiblePositionManager.IncreaseLiquidityParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mint(
      params: INonfungiblePositionManager.MintParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    positions(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    burn(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    collect(
      params: INonfungiblePositionManager.CollectParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createAndInitializePoolIfNecessary(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      fee: PromiseOrValue<BigNumberish>,
      sqrtPriceX96: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    decreaseLiquidity(
      params: INonfungiblePositionManager.DecreaseLiquidityParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    increaseLiquidity(
      params: INonfungiblePositionManager.IncreaseLiquidityParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mint(
      params: INonfungiblePositionManager.MintParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    multicall(
      data: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    positions(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
