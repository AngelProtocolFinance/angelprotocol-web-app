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

export declare namespace LibAccounts {
  export type DelegateStruct = {
    addr: PromiseOrValue<string>;
    expires: PromiseOrValue<BigNumberish>;
  };

  export type DelegateStructOutput = [string, BigNumber] & {
    addr: string;
    expires: BigNumber;
  };

  export type SettingsPermissionStruct = {
    locked: PromiseOrValue<boolean>;
    delegate: LibAccounts.DelegateStruct;
  };

  export type SettingsPermissionStructOutput = [
    boolean,
    LibAccounts.DelegateStructOutput
  ] & { locked: boolean; delegate: LibAccounts.DelegateStructOutput };

  export type SettingsControllerStruct = {
    acceptedTokens: LibAccounts.SettingsPermissionStruct;
    lockedInvestmentManagement: LibAccounts.SettingsPermissionStruct;
    liquidInvestmentManagement: LibAccounts.SettingsPermissionStruct;
    allowlistedBeneficiaries: LibAccounts.SettingsPermissionStruct;
    allowlistedContributors: LibAccounts.SettingsPermissionStruct;
    maturityAllowlist: LibAccounts.SettingsPermissionStruct;
    maturityTime: LibAccounts.SettingsPermissionStruct;
    earlyLockedWithdrawFee: LibAccounts.SettingsPermissionStruct;
    withdrawFee: LibAccounts.SettingsPermissionStruct;
    depositFee: LibAccounts.SettingsPermissionStruct;
    balanceFee: LibAccounts.SettingsPermissionStruct;
    name: LibAccounts.SettingsPermissionStruct;
    image: LibAccounts.SettingsPermissionStruct;
    logo: LibAccounts.SettingsPermissionStruct;
    sdgs: LibAccounts.SettingsPermissionStruct;
    splitToLiquid: LibAccounts.SettingsPermissionStruct;
    ignoreUserSplits: LibAccounts.SettingsPermissionStruct;
  };

  export type SettingsControllerStructOutput = [
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput,
    LibAccounts.SettingsPermissionStructOutput
  ] & {
    acceptedTokens: LibAccounts.SettingsPermissionStructOutput;
    lockedInvestmentManagement: LibAccounts.SettingsPermissionStructOutput;
    liquidInvestmentManagement: LibAccounts.SettingsPermissionStructOutput;
    allowlistedBeneficiaries: LibAccounts.SettingsPermissionStructOutput;
    allowlistedContributors: LibAccounts.SettingsPermissionStructOutput;
    maturityAllowlist: LibAccounts.SettingsPermissionStructOutput;
    maturityTime: LibAccounts.SettingsPermissionStructOutput;
    earlyLockedWithdrawFee: LibAccounts.SettingsPermissionStructOutput;
    withdrawFee: LibAccounts.SettingsPermissionStructOutput;
    depositFee: LibAccounts.SettingsPermissionStructOutput;
    balanceFee: LibAccounts.SettingsPermissionStructOutput;
    name: LibAccounts.SettingsPermissionStructOutput;
    image: LibAccounts.SettingsPermissionStructOutput;
    logo: LibAccounts.SettingsPermissionStructOutput;
    sdgs: LibAccounts.SettingsPermissionStructOutput;
    splitToLiquid: LibAccounts.SettingsPermissionStructOutput;
    ignoreUserSplits: LibAccounts.SettingsPermissionStructOutput;
  };

  export type SplitDetailsStruct = {
    max: PromiseOrValue<BigNumberish>;
    min: PromiseOrValue<BigNumberish>;
    defaultSplit: PromiseOrValue<BigNumberish>;
  };

  export type SplitDetailsStructOutput = [BigNumber, BigNumber, BigNumber] & {
    max: BigNumber;
    min: BigNumber;
    defaultSplit: BigNumber;
  };

  export type FeeSettingStruct = {
    payoutAddress: PromiseOrValue<string>;
    bps: PromiseOrValue<BigNumberish>;
  };

  export type FeeSettingStructOutput = [string, BigNumber] & {
    payoutAddress: string;
    bps: BigNumber;
  };
}

export declare namespace AccountMessages {
  export type UpdateEndowmentControllerRequestStruct = {
    id: PromiseOrValue<BigNumberish>;
    settingsController: LibAccounts.SettingsControllerStruct;
  };

  export type UpdateEndowmentControllerRequestStructOutput = [
    number,
    LibAccounts.SettingsControllerStructOutput
  ] & {
    id: number;
    settingsController: LibAccounts.SettingsControllerStructOutput;
  };

  export type UpdateEndowmentSettingsRequestStruct = {
    id: PromiseOrValue<BigNumberish>;
    donationMatchActive: PromiseOrValue<boolean>;
    maturityTime: PromiseOrValue<BigNumberish>;
    allowlistedBeneficiaries: PromiseOrValue<string>[];
    allowlistedContributors: PromiseOrValue<string>[];
    maturity_allowlist_add: PromiseOrValue<string>[];
    maturity_allowlist_remove: PromiseOrValue<string>[];
    splitToLiquid: LibAccounts.SplitDetailsStruct;
    ignoreUserSplits: PromiseOrValue<boolean>;
  };

  export type UpdateEndowmentSettingsRequestStructOutput = [
    number,
    boolean,
    BigNumber,
    string[],
    string[],
    string[],
    string[],
    LibAccounts.SplitDetailsStructOutput,
    boolean
  ] & {
    id: number;
    donationMatchActive: boolean;
    maturityTime: BigNumber;
    allowlistedBeneficiaries: string[];
    allowlistedContributors: string[];
    maturity_allowlist_add: string[];
    maturity_allowlist_remove: string[];
    splitToLiquid: LibAccounts.SplitDetailsStructOutput;
    ignoreUserSplits: boolean;
  };

  export type UpdateFeeSettingRequestStruct = {
    id: PromiseOrValue<BigNumberish>;
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStruct;
    depositFee: LibAccounts.FeeSettingStruct;
    withdrawFee: LibAccounts.FeeSettingStruct;
    balanceFee: LibAccounts.FeeSettingStruct;
  };

  export type UpdateFeeSettingRequestStructOutput = [
    number,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput
  ] & {
    id: number;
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStructOutput;
    depositFee: LibAccounts.FeeSettingStructOutput;
    withdrawFee: LibAccounts.FeeSettingStructOutput;
    balanceFee: LibAccounts.FeeSettingStructOutput;
  };
}

export interface AccountsUpdateEndowmentSettingsControllerInterface
  extends utils.Interface {
  functions: {
    "updateEndowmentController((uint32,((bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)))))": FunctionFragment;
    "updateEndowmentSettings((uint32,bool,uint256,address[],address[],address[],address[],(uint256,uint256,uint256),bool))": FunctionFragment;
    "updateFeeSettings((uint32,(address,uint256),(address,uint256),(address,uint256),(address,uint256)))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "updateEndowmentController"
      | "updateEndowmentSettings"
      | "updateFeeSettings"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "updateEndowmentController",
    values: [AccountMessages.UpdateEndowmentControllerRequestStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "updateEndowmentSettings",
    values: [AccountMessages.UpdateEndowmentSettingsRequestStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFeeSettings",
    values: [AccountMessages.UpdateFeeSettingRequestStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "updateEndowmentController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateEndowmentSettings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFeeSettings",
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

export interface AccountsUpdateEndowmentSettingsController
  extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AccountsUpdateEndowmentSettingsControllerInterface;

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
    updateEndowmentController(
      details: AccountMessages.UpdateEndowmentControllerRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateEndowmentSettings(
      details: AccountMessages.UpdateEndowmentSettingsRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateFeeSettings(
      details: AccountMessages.UpdateFeeSettingRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  updateEndowmentController(
    details: AccountMessages.UpdateEndowmentControllerRequestStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateEndowmentSettings(
    details: AccountMessages.UpdateEndowmentSettingsRequestStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateFeeSettings(
    details: AccountMessages.UpdateFeeSettingRequestStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    updateEndowmentController(
      details: AccountMessages.UpdateEndowmentControllerRequestStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    updateEndowmentSettings(
      details: AccountMessages.UpdateEndowmentSettingsRequestStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    updateFeeSettings(
      details: AccountMessages.UpdateFeeSettingRequestStruct,
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
    updateEndowmentController(
      details: AccountMessages.UpdateEndowmentControllerRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateEndowmentSettings(
      details: AccountMessages.UpdateEndowmentSettingsRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateFeeSettings(
      details: AccountMessages.UpdateFeeSettingRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    updateEndowmentController(
      details: AccountMessages.UpdateEndowmentControllerRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateEndowmentSettings(
      details: AccountMessages.UpdateEndowmentSettingsRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateFeeSettings(
      details: AccountMessages.UpdateFeeSettingRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
