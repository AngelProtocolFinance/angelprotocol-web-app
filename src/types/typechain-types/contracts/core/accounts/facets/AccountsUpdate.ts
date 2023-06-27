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
} from "../../../../common";

export declare namespace AngelCoreStruct {
  export type FeeSettingStruct = {
    payoutAddress: PromiseOrValue<string>;
    bps: PromiseOrValue<BigNumberish>;
  };

  export type FeeSettingStructOutput = [string, BigNumber] & {
    payoutAddress: string;
    bps: BigNumber;
  };
}

export interface AccountsUpdateInterface extends utils.Interface {
  functions: {
    "updateConfig(address,uint256,(address,uint256))": FunctionFragment;
    "updateOwner(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "updateConfig" | "updateOwner"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "updateConfig",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      AngelCoreStruct.FeeSettingStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateOwner",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "updateConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateOwner",
    data: BytesLike
  ): Result;

  events: {
    "AllowanceRemoved(address,address,address)": EventFragment;
    "AllowanceUpdated(address,address,address,uint256)": EventFragment;
    "ConfigUpdated()": EventFragment;
    "DaoContractCreated(uint32,address)": EventFragment;
    "DonationDeposited(uint256,address,uint256)": EventFragment;
    "DonationMatchCreated(uint256,address)": EventFragment;
    "DonationWithdrawn(uint256,address,address,uint256)": EventFragment;
    "EndowmentCreated(uint256)": EventFragment;
    "EndowmentSettingUpdated(uint256,string)": EventFragment;
    "EndowmentUpdated(uint256)": EventFragment;
    "OwnerUpdated(address)": EventFragment;
    "TokenSwapped(uint256,uint8,address,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AllowanceRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AllowanceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ConfigUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DaoContractCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DonationDeposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DonationMatchCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DonationWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentSettingUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenSwapped"): EventFragment;
}

export interface AllowanceRemovedEventObject {
  sender: string;
  spender: string;
  tokenAddress: string;
}
export type AllowanceRemovedEvent = TypedEvent<
  [string, string, string],
  AllowanceRemovedEventObject
>;

export type AllowanceRemovedEventFilter =
  TypedEventFilter<AllowanceRemovedEvent>;

export interface AllowanceUpdatedEventObject {
  sender: string;
  spender: string;
  tokenAddress: string;
  allowance: BigNumber;
}
export type AllowanceUpdatedEvent = TypedEvent<
  [string, string, string, BigNumber],
  AllowanceUpdatedEventObject
>;

export type AllowanceUpdatedEventFilter =
  TypedEventFilter<AllowanceUpdatedEvent>;

export interface ConfigUpdatedEventObject {}
export type ConfigUpdatedEvent = TypedEvent<[], ConfigUpdatedEventObject>;

export type ConfigUpdatedEventFilter = TypedEventFilter<ConfigUpdatedEvent>;

export interface DaoContractCreatedEventObject {
  endowId: number;
  daoAddress: string;
}
export type DaoContractCreatedEvent = TypedEvent<
  [number, string],
  DaoContractCreatedEventObject
>;

export type DaoContractCreatedEventFilter =
  TypedEventFilter<DaoContractCreatedEvent>;

export interface DonationDepositedEventObject {
  endowId: BigNumber;
  tokenAddress: string;
  amount: BigNumber;
}
export type DonationDepositedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  DonationDepositedEventObject
>;

export type DonationDepositedEventFilter =
  TypedEventFilter<DonationDepositedEvent>;

export interface DonationMatchCreatedEventObject {
  endowId: BigNumber;
  donationMatchContract: string;
}
export type DonationMatchCreatedEvent = TypedEvent<
  [BigNumber, string],
  DonationMatchCreatedEventObject
>;

export type DonationMatchCreatedEventFilter =
  TypedEventFilter<DonationMatchCreatedEvent>;

export interface DonationWithdrawnEventObject {
  endowId: BigNumber;
  recipient: string;
  tokenAddress: string;
  amount: BigNumber;
}
export type DonationWithdrawnEvent = TypedEvent<
  [BigNumber, string, string, BigNumber],
  DonationWithdrawnEventObject
>;

export type DonationWithdrawnEventFilter =
  TypedEventFilter<DonationWithdrawnEvent>;

export interface EndowmentCreatedEventObject {
  endowId: BigNumber;
}
export type EndowmentCreatedEvent = TypedEvent<
  [BigNumber],
  EndowmentCreatedEventObject
>;

export type EndowmentCreatedEventFilter =
  TypedEventFilter<EndowmentCreatedEvent>;

export interface EndowmentSettingUpdatedEventObject {
  endowId: BigNumber;
  setting: string;
}
export type EndowmentSettingUpdatedEvent = TypedEvent<
  [BigNumber, string],
  EndowmentSettingUpdatedEventObject
>;

export type EndowmentSettingUpdatedEventFilter =
  TypedEventFilter<EndowmentSettingUpdatedEvent>;

export interface EndowmentUpdatedEventObject {
  endowId: BigNumber;
}
export type EndowmentUpdatedEvent = TypedEvent<
  [BigNumber],
  EndowmentUpdatedEventObject
>;

export type EndowmentUpdatedEventFilter =
  TypedEventFilter<EndowmentUpdatedEvent>;

export interface OwnerUpdatedEventObject {
  owner: string;
}
export type OwnerUpdatedEvent = TypedEvent<[string], OwnerUpdatedEventObject>;

export type OwnerUpdatedEventFilter = TypedEventFilter<OwnerUpdatedEvent>;

export interface TokenSwappedEventObject {
  endowId: BigNumber;
  accountType: number;
  tokenIn: string;
  amountIn: BigNumber;
  tokenOut: string;
  amountOut: BigNumber;
}
export type TokenSwappedEvent = TypedEvent<
  [BigNumber, number, string, BigNumber, string, BigNumber],
  TokenSwappedEventObject
>;

export type TokenSwappedEventFilter = TypedEventFilter<TokenSwappedEvent>;

export interface AccountsUpdate extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AccountsUpdateInterface;

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
    updateConfig(
      newRegistrar: PromiseOrValue<string>,
      maxGeneralCategoryId: PromiseOrValue<BigNumberish>,
      earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  updateConfig(
    newRegistrar: PromiseOrValue<string>,
    maxGeneralCategoryId: PromiseOrValue<BigNumberish>,
    earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateOwner(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    updateConfig(
      newRegistrar: PromiseOrValue<string>,
      maxGeneralCategoryId: PromiseOrValue<BigNumberish>,
      earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    updateOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AllowanceRemoved(address,address,address)"(
      sender?: null,
      spender?: null,
      tokenAddress?: null
    ): AllowanceRemovedEventFilter;
    AllowanceRemoved(
      sender?: null,
      spender?: null,
      tokenAddress?: null
    ): AllowanceRemovedEventFilter;

    "AllowanceUpdated(address,address,address,uint256)"(
      sender?: null,
      spender?: null,
      tokenAddress?: null,
      allowance?: null
    ): AllowanceUpdatedEventFilter;
    AllowanceUpdated(
      sender?: null,
      spender?: null,
      tokenAddress?: null,
      allowance?: null
    ): AllowanceUpdatedEventFilter;

    "ConfigUpdated()"(): ConfigUpdatedEventFilter;
    ConfigUpdated(): ConfigUpdatedEventFilter;

    "DaoContractCreated(uint32,address)"(
      endowId?: null,
      daoAddress?: null
    ): DaoContractCreatedEventFilter;
    DaoContractCreated(
      endowId?: null,
      daoAddress?: null
    ): DaoContractCreatedEventFilter;

    "DonationDeposited(uint256,address,uint256)"(
      endowId?: null,
      tokenAddress?: null,
      amount?: null
    ): DonationDepositedEventFilter;
    DonationDeposited(
      endowId?: null,
      tokenAddress?: null,
      amount?: null
    ): DonationDepositedEventFilter;

    "DonationMatchCreated(uint256,address)"(
      endowId?: null,
      donationMatchContract?: null
    ): DonationMatchCreatedEventFilter;
    DonationMatchCreated(
      endowId?: null,
      donationMatchContract?: null
    ): DonationMatchCreatedEventFilter;

    "DonationWithdrawn(uint256,address,address,uint256)"(
      endowId?: null,
      recipient?: null,
      tokenAddress?: null,
      amount?: null
    ): DonationWithdrawnEventFilter;
    DonationWithdrawn(
      endowId?: null,
      recipient?: null,
      tokenAddress?: null,
      amount?: null
    ): DonationWithdrawnEventFilter;

    "EndowmentCreated(uint256)"(endowId?: null): EndowmentCreatedEventFilter;
    EndowmentCreated(endowId?: null): EndowmentCreatedEventFilter;

    "EndowmentSettingUpdated(uint256,string)"(
      endowId?: null,
      setting?: null
    ): EndowmentSettingUpdatedEventFilter;
    EndowmentSettingUpdated(
      endowId?: null,
      setting?: null
    ): EndowmentSettingUpdatedEventFilter;

    "EndowmentUpdated(uint256)"(endowId?: null): EndowmentUpdatedEventFilter;
    EndowmentUpdated(endowId?: null): EndowmentUpdatedEventFilter;

    "OwnerUpdated(address)"(owner?: null): OwnerUpdatedEventFilter;
    OwnerUpdated(owner?: null): OwnerUpdatedEventFilter;

    "TokenSwapped(uint256,uint8,address,uint256,address,uint256)"(
      endowId?: null,
      accountType?: null,
      tokenIn?: null,
      amountIn?: null,
      tokenOut?: null,
      amountOut?: null
    ): TokenSwappedEventFilter;
    TokenSwapped(
      endowId?: null,
      accountType?: null,
      tokenIn?: null,
      amountIn?: null,
      tokenOut?: null,
      amountOut?: null
    ): TokenSwappedEventFilter;
  };

  estimateGas: {
    updateConfig(
      newRegistrar: PromiseOrValue<string>,
      maxGeneralCategoryId: PromiseOrValue<BigNumberish>,
      earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    updateConfig(
      newRegistrar: PromiseOrValue<string>,
      maxGeneralCategoryId: PromiseOrValue<BigNumberish>,
      earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateOwner(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
