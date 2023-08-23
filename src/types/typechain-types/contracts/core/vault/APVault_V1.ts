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
} from "../../../common";

export declare namespace IVault {
  export type VaultConfigStruct = {
    vaultType: BigNumberish;
    strategySelector: BytesLike;
    strategy: string;
    registrar: string;
    baseToken: string;
    yieldToken: string;
    apTokenName: string;
    apTokenSymbol: string;
    admin: string;
  };

  export type VaultConfigStructOutput = [
    number,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ] & {
    vaultType: number;
    strategySelector: string;
    strategy: string;
    registrar: string;
    baseToken: string;
    yieldToken: string;
    apTokenName: string;
    apTokenSymbol: string;
    admin: string;
  };

  export type RedemptionResponseStruct = {
    token: string;
    amount: BigNumberish;
    status: BigNumberish;
  };

  export type RedemptionResponseStructOutput = [string, BigNumber, number] & {
    token: string;
    amount: BigNumber;
    status: number;
  };
}

export interface APVault_V1Interface extends utils.Interface {
  functions: {
    "asset()": FunctionFragment;
    "balanceOf(uint32)": FunctionFragment;
    "convertToAssets(uint256)": FunctionFragment;
    "convertToShares(uint256)": FunctionFragment;
    "decimals()": FunctionFragment;
    "deposit(uint32,address,uint256)": FunctionFragment;
    "depositERC4626(address,uint256,uint32)": FunctionFragment;
    "getPricePerFullShare()": FunctionFragment;
    "getVaultConfig()": FunctionFragment;
    "harvest(uint32[])": FunctionFragment;
    "maxDeposit(uint32)": FunctionFragment;
    "maxMint(uint32)": FunctionFragment;
    "maxRedeem(uint32)": FunctionFragment;
    "maxWithdraw(uint32)": FunctionFragment;
    "mint(uint256,uint32)": FunctionFragment;
    "name()": FunctionFragment;
    "previewDeposit(uint256)": FunctionFragment;
    "previewMint(uint256)": FunctionFragment;
    "previewRedeem(uint256)": FunctionFragment;
    "previewWithdraw(uint256)": FunctionFragment;
    "principleByAccountId(uint32)": FunctionFragment;
    "redeem(uint32,uint256)": FunctionFragment;
    "redeemAll(uint32)": FunctionFragment;
    "redeemERC4626(uint256,address,uint32)": FunctionFragment;
    "setVaultConfig((uint8,bytes4,address,address,address,address,string,string,address))": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalAssets()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(uint32,uint256)": FunctionFragment;
    "transferFrom(uint32,uint32,uint256)": FunctionFragment;
    "vaultConfig()": FunctionFragment;
    "withdraw(uint256,address,uint32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "asset"
      | "balanceOf"
      | "convertToAssets"
      | "convertToShares"
      | "decimals"
      | "deposit"
      | "depositERC4626"
      | "getPricePerFullShare"
      | "getVaultConfig"
      | "harvest"
      | "maxDeposit"
      | "maxMint"
      | "maxRedeem"
      | "maxWithdraw"
      | "mint"
      | "name"
      | "previewDeposit"
      | "previewMint"
      | "previewRedeem"
      | "previewWithdraw"
      | "principleByAccountId"
      | "redeem"
      | "redeemAll"
      | "redeemERC4626"
      | "setVaultConfig"
      | "symbol"
      | "totalAssets"
      | "totalSupply"
      | "transfer"
      | "transferFrom"
      | "vaultConfig"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "asset", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "convertToAssets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "convertToShares",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositERC4626",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPricePerFullShare",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVaultConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "harvest",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "maxDeposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "maxMint",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "maxRedeem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "maxWithdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "previewDeposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "previewMint",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "previewRedeem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "previewWithdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "principleByAccountId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemAll",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemERC4626",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setVaultConfig",
    values: [IVault.VaultConfigStruct]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalAssets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "vaultConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "asset", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "convertToAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "convertToShares",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositERC4626",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPricePerFullShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVaultConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "harvest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxDeposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxMint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxRedeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maxWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "previewDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "previewMint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "previewRedeem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "previewWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "principleByAccountId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeemAll", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemERC4626",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setVaultConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vaultConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposit(uint32,address,uint256,uint256)": EventFragment;
    "DepositERC4626(address,uint32,uint256,uint256)": EventFragment;
    "Redeem(uint32,address,uint256,uint256)": EventFragment;
    "Transfer(uint32,uint32,uint256)": EventFragment;
    "VaultConfigUpdated(address,(uint8,bytes4,address,address,address,address,string,string,address))": EventFragment;
    "WithdrawERC4626(address,address,uint32,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DepositERC4626"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Redeem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VaultConfigUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawERC4626"): EventFragment;
}

export interface DepositEventObject {
  endowId: number;
  vault: string;
  amount: BigNumber;
  sharesReceived: BigNumber;
}
export type DepositEvent = TypedEvent<
  [number, string, BigNumber, BigNumber],
  DepositEventObject
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface DepositERC4626EventObject {
  caller: string;
  owner: number;
  assets: BigNumber;
  shares: BigNumber;
}
export type DepositERC4626Event = TypedEvent<
  [string, number, BigNumber, BigNumber],
  DepositERC4626EventObject
>;

export type DepositERC4626EventFilter = TypedEventFilter<DepositERC4626Event>;

export interface RedeemEventObject {
  endowId: number;
  vault: string;
  shares: BigNumber;
  amountRedeemed: BigNumber;
}
export type RedeemEvent = TypedEvent<
  [number, string, BigNumber, BigNumber],
  RedeemEventObject
>;

export type RedeemEventFilter = TypedEventFilter<RedeemEvent>;

export interface TransferEventObject {
  from: number;
  to: number;
  value: BigNumber;
}
export type TransferEvent = TypedEvent<
  [number, number, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface VaultConfigUpdatedEventObject {
  vault: string;
  config: IVault.VaultConfigStructOutput;
}
export type VaultConfigUpdatedEvent = TypedEvent<
  [string, IVault.VaultConfigStructOutput],
  VaultConfigUpdatedEventObject
>;

export type VaultConfigUpdatedEventFilter =
  TypedEventFilter<VaultConfigUpdatedEvent>;

export interface WithdrawERC4626EventObject {
  caller: string;
  receiver: string;
  owner: number;
  assets: BigNumber;
  shares: BigNumber;
}
export type WithdrawERC4626Event = TypedEvent<
  [string, string, number, BigNumber, BigNumber],
  WithdrawERC4626EventObject
>;

export type WithdrawERC4626EventFilter = TypedEventFilter<WithdrawERC4626Event>;

export interface APVault_V1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: APVault_V1Interface;

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
    asset(overrides?: CallOverrides): Promise<[string]>;

    balanceOf(
      account: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    convertToAssets(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    convertToShares(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    deposit(
      accountId: BigNumberish,
      token: string,
      amt: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    depositERC4626(
      strategy: string,
      assets: BigNumberish,
      receiver: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getPricePerFullShare(overrides?: CallOverrides): Promise<[BigNumber]>;

    getVaultConfig(
      overrides?: CallOverrides
    ): Promise<[IVault.VaultConfigStructOutput]>;

    harvest(
      accountIds: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    maxDeposit(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    maxMint(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    maxRedeem(
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    maxWithdraw(
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    mint(
      shares: BigNumberish,
      receiver: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    previewDeposit(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    previewMint(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    previewRedeem(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    previewWithdraw(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    principleByAccountId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        baseToken: BigNumber;
        costBasis_withPrecision: BigNumber;
      }
    >;

    redeem(
      accountId: BigNumberish,
      shares: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    redeemAll(
      accountId: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    redeemERC4626(
      shares: BigNumberish,
      receiver: string,
      owner: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setVaultConfig(
      _newConfig: IVault.VaultConfigStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    totalAssets(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    transferFrom(
      from: BigNumberish,
      to: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    vaultConfig(
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ] & {
        vaultType: number;
        strategySelector: string;
        strategy: string;
        registrar: string;
        baseToken: string;
        yieldToken: string;
        apTokenName: string;
        apTokenSymbol: string;
        admin: string;
      }
    >;

    withdraw(
      assets: BigNumberish,
      receiver: string,
      owner: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  asset(overrides?: CallOverrides): Promise<string>;

  balanceOf(
    account: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  convertToAssets(
    shares: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  convertToShares(
    assets: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  deposit(
    accountId: BigNumberish,
    token: string,
    amt: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  depositERC4626(
    strategy: string,
    assets: BigNumberish,
    receiver: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getPricePerFullShare(overrides?: CallOverrides): Promise<BigNumber>;

  getVaultConfig(
    overrides?: CallOverrides
  ): Promise<IVault.VaultConfigStructOutput>;

  harvest(
    accountIds: BigNumberish[],
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  maxDeposit(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  maxMint(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  maxRedeem(owner: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  maxWithdraw(
    owner: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  mint(
    shares: BigNumberish,
    receiver: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  previewDeposit(
    assets: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  previewMint(
    shares: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  previewRedeem(
    shares: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  previewWithdraw(
    assets: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  principleByAccountId(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      baseToken: BigNumber;
      costBasis_withPrecision: BigNumber;
    }
  >;

  redeem(
    accountId: BigNumberish,
    shares: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  redeemAll(
    accountId: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  redeemERC4626(
    shares: BigNumberish,
    receiver: string,
    owner: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setVaultConfig(
    _newConfig: IVault.VaultConfigStruct,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalAssets(overrides?: CallOverrides): Promise<BigNumber>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  transferFrom(
    from: BigNumberish,
    to: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  vaultConfig(
    overrides?: CallOverrides
  ): Promise<
    [number, string, string, string, string, string, string, string, string] & {
      vaultType: number;
      strategySelector: string;
      strategy: string;
      registrar: string;
      baseToken: string;
      yieldToken: string;
      apTokenName: string;
      apTokenSymbol: string;
      admin: string;
    }
  >;

  withdraw(
    assets: BigNumberish,
    receiver: string,
    owner: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    asset(overrides?: CallOverrides): Promise<string>;

    balanceOf(
      account: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    convertToAssets(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    convertToShares(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    deposit(
      accountId: BigNumberish,
      token: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    depositERC4626(
      strategy: string,
      assets: BigNumberish,
      receiver: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPricePerFullShare(overrides?: CallOverrides): Promise<BigNumber>;

    getVaultConfig(
      overrides?: CallOverrides
    ): Promise<IVault.VaultConfigStructOutput>;

    harvest(
      accountIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    maxDeposit(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxMint(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    maxRedeem(
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxWithdraw(
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mint(
      shares: BigNumberish,
      receiver: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<string>;

    previewDeposit(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    previewMint(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    previewRedeem(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    previewWithdraw(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    principleByAccountId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        baseToken: BigNumber;
        costBasis_withPrecision: BigNumber;
      }
    >;

    redeem(
      accountId: BigNumberish,
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<IVault.RedemptionResponseStructOutput>;

    redeemAll(
      accountId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<IVault.RedemptionResponseStructOutput>;

    redeemERC4626(
      shares: BigNumberish,
      receiver: string,
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setVaultConfig(
      _newConfig: IVault.VaultConfigStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalAssets(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: BigNumberish,
      to: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    vaultConfig(
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
      ] & {
        vaultType: number;
        strategySelector: string;
        strategy: string;
        registrar: string;
        baseToken: string;
        yieldToken: string;
        apTokenName: string;
        apTokenSymbol: string;
        admin: string;
      }
    >;

    withdraw(
      assets: BigNumberish,
      receiver: string,
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "Deposit(uint32,address,uint256,uint256)"(
      endowId?: null,
      vault?: null,
      amount?: null,
      sharesReceived?: null
    ): DepositEventFilter;
    Deposit(
      endowId?: null,
      vault?: null,
      amount?: null,
      sharesReceived?: null
    ): DepositEventFilter;

    "DepositERC4626(address,uint32,uint256,uint256)"(
      caller?: null,
      owner?: null,
      assets?: null,
      shares?: null
    ): DepositERC4626EventFilter;
    DepositERC4626(
      caller?: null,
      owner?: null,
      assets?: null,
      shares?: null
    ): DepositERC4626EventFilter;

    "Redeem(uint32,address,uint256,uint256)"(
      endowId?: null,
      vault?: null,
      shares?: null,
      amountRedeemed?: null
    ): RedeemEventFilter;
    Redeem(
      endowId?: null,
      vault?: null,
      shares?: null,
      amountRedeemed?: null
    ): RedeemEventFilter;

    "Transfer(uint32,uint32,uint256)"(
      from?: null,
      to?: null,
      value?: null
    ): TransferEventFilter;
    Transfer(from?: null, to?: null, value?: null): TransferEventFilter;

    "VaultConfigUpdated(address,(uint8,bytes4,address,address,address,address,string,string,address))"(
      vault?: null,
      config?: null
    ): VaultConfigUpdatedEventFilter;
    VaultConfigUpdated(
      vault?: null,
      config?: null
    ): VaultConfigUpdatedEventFilter;

    "WithdrawERC4626(address,address,uint32,uint256,uint256)"(
      caller?: null,
      receiver?: null,
      owner?: null,
      assets?: null,
      shares?: null
    ): WithdrawERC4626EventFilter;
    WithdrawERC4626(
      caller?: null,
      receiver?: null,
      owner?: null,
      assets?: null,
      shares?: null
    ): WithdrawERC4626EventFilter;
  };

  estimateGas: {
    asset(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(
      account: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    convertToAssets(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    convertToShares(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      accountId: BigNumberish,
      token: string,
      amt: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    depositERC4626(
      strategy: string,
      assets: BigNumberish,
      receiver: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getPricePerFullShare(overrides?: CallOverrides): Promise<BigNumber>;

    getVaultConfig(overrides?: CallOverrides): Promise<BigNumber>;

    harvest(
      accountIds: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    maxDeposit(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxMint(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    maxRedeem(
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxWithdraw(
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mint(
      shares: BigNumberish,
      receiver: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    previewDeposit(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    previewMint(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    previewRedeem(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    previewWithdraw(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    principleByAccountId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    redeem(
      accountId: BigNumberish,
      shares: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    redeemAll(
      accountId: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    redeemERC4626(
      shares: BigNumberish,
      receiver: string,
      owner: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setVaultConfig(
      _newConfig: IVault.VaultConfigStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    totalAssets(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    transferFrom(
      from: BigNumberish,
      to: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    vaultConfig(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      assets: BigNumberish,
      receiver: string,
      owner: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    asset(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      account: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    convertToAssets(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    convertToShares(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      accountId: BigNumberish,
      token: string,
      amt: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    depositERC4626(
      strategy: string,
      assets: BigNumberish,
      receiver: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getPricePerFullShare(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVaultConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    harvest(
      accountIds: BigNumberish[],
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    maxDeposit(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxMint(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxRedeem(
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxWithdraw(
      owner: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mint(
      shares: BigNumberish,
      receiver: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    previewDeposit(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    previewMint(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    previewRedeem(
      shares: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    previewWithdraw(
      assets: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    principleByAccountId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    redeem(
      accountId: BigNumberish,
      shares: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    redeemAll(
      accountId: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    redeemERC4626(
      shares: BigNumberish,
      receiver: string,
      owner: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setVaultConfig(
      _newConfig: IVault.VaultConfigStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalAssets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: BigNumberish,
      to: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    vaultConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      assets: BigNumberish,
      receiver: string,
      owner: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
