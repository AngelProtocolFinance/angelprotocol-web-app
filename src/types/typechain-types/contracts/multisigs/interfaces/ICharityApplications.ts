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
} from "../../../common";

export declare namespace LibAccounts {
  export type FeeSettingStruct = {
    payoutAddress: PromiseOrValue<string>;
    bps: PromiseOrValue<BigNumberish>;
  };

  export type FeeSettingStructOutput = [string, BigNumber] & {
    payoutAddress: string;
    bps: BigNumber;
  };

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
}

export declare namespace AccountMessages {
  export type CreateEndowmentRequestStruct = {
    withdrawBeforeMaturity: PromiseOrValue<boolean>;
    maturityTime: PromiseOrValue<BigNumberish>;
    name: PromiseOrValue<string>;
    sdgs: PromiseOrValue<BigNumberish>[];
    tier: PromiseOrValue<BigNumberish>;
    endowType: PromiseOrValue<BigNumberish>;
    logo: PromiseOrValue<string>;
    image: PromiseOrValue<string>;
    members: PromiseOrValue<string>[];
    threshold: PromiseOrValue<BigNumberish>;
    duration: PromiseOrValue<BigNumberish>;
    allowlistedBeneficiaries: PromiseOrValue<string>[];
    allowlistedContributors: PromiseOrValue<string>[];
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStruct;
    withdrawFee: LibAccounts.FeeSettingStruct;
    depositFee: LibAccounts.FeeSettingStruct;
    balanceFee: LibAccounts.FeeSettingStruct;
    proposalLink: PromiseOrValue<BigNumberish>;
    settingsController: LibAccounts.SettingsControllerStruct;
    parent: PromiseOrValue<BigNumberish>;
    maturityAllowlist: PromiseOrValue<string>[];
    ignoreUserSplits: PromiseOrValue<boolean>;
    splitToLiquid: LibAccounts.SplitDetailsStruct;
    referralId: PromiseOrValue<BigNumberish>;
  };

  export type CreateEndowmentRequestStructOutput = [
    boolean,
    BigNumber,
    string,
    BigNumber[],
    number,
    number,
    string,
    string,
    string[],
    BigNumber,
    BigNumber,
    string[],
    string[],
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    BigNumber,
    LibAccounts.SettingsControllerStructOutput,
    number,
    string[],
    boolean,
    LibAccounts.SplitDetailsStructOutput,
    BigNumber
  ] & {
    withdrawBeforeMaturity: boolean;
    maturityTime: BigNumber;
    name: string;
    sdgs: BigNumber[];
    tier: number;
    endowType: number;
    logo: string;
    image: string;
    members: string[];
    threshold: BigNumber;
    duration: BigNumber;
    allowlistedBeneficiaries: string[];
    allowlistedContributors: string[];
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStructOutput;
    withdrawFee: LibAccounts.FeeSettingStructOutput;
    depositFee: LibAccounts.FeeSettingStructOutput;
    balanceFee: LibAccounts.FeeSettingStructOutput;
    proposalLink: BigNumber;
    settingsController: LibAccounts.SettingsControllerStructOutput;
    parent: number;
    maturityAllowlist: string[];
    ignoreUserSplits: boolean;
    splitToLiquid: LibAccounts.SplitDetailsStructOutput;
    referralId: BigNumber;
  };
}

export declare namespace ApplicationsStorage {
  export type ConfigStruct = {
    accountsContract: PromiseOrValue<string>;
    seedSplitToLiquid: PromiseOrValue<BigNumberish>;
    gasAmount: PromiseOrValue<BigNumberish>;
    seedAsset: PromiseOrValue<string>;
    seedAmount: PromiseOrValue<BigNumberish>;
  };

  export type ConfigStructOutput = [
    string,
    BigNumber,
    BigNumber,
    string,
    BigNumber
  ] & {
    accountsContract: string;
    seedSplitToLiquid: BigNumber;
    gasAmount: BigNumber;
    seedAsset: string;
    seedAmount: BigNumber;
  };
}

export interface ICharityApplicationsInterface extends utils.Interface {
  functions: {
    "confirmProposal(uint256)": FunctionFragment;
    "executeProposal(uint256)": FunctionFragment;
    "getProposalConfirmationCount(uint256)": FunctionFragment;
    "initializeApplications(address[],uint256,bool,uint256,address,uint256,uint256,address,uint256)": FunctionFragment;
    "proposeApplication((bool,uint256,string,uint256[],uint8,uint8,string,string,address[],uint256,uint256,address[],address[],(address,uint256),(address,uint256),(address,uint256),(address,uint256),uint256,((bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256))),uint32,address[],bool,(uint256,uint256,uint256),uint256),string)": FunctionFragment;
    "queryConfig()": FunctionFragment;
    "revokeProposalConfirmation(uint256)": FunctionFragment;
    "updateConfig(uint256,address,uint256,uint256,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "confirmProposal"
      | "executeProposal"
      | "getProposalConfirmationCount"
      | "initializeApplications"
      | "proposeApplication"
      | "queryConfig"
      | "revokeProposalConfirmation"
      | "updateConfig"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "confirmProposal",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "executeProposal",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getProposalConfirmationCount",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initializeApplications",
    values: [
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "proposeApplication",
    values: [
      AccountMessages.CreateEndowmentRequestStruct,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "queryConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeProposalConfirmation",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateConfig",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "confirmProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProposalConfirmationCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializeApplications",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposeApplication",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "queryConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeProposalConfirmation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateConfig",
    data: BytesLike
  ): Result;

  events: {
    "ApplicationConfirmationRevoked(uint256,address)": EventFragment;
    "ApplicationConfirmed(uint256,address)": EventFragment;
    "ApplicationExecuted(uint256)": EventFragment;
    "ApplicationProposed(uint256)": EventFragment;
    "GasSent(uint256,address,uint256)": EventFragment;
    "SeedAssetSent(uint256,address,uint256)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "ApplicationConfirmationRevoked"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApplicationConfirmed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApplicationExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApplicationProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GasSent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SeedAssetSent"): EventFragment;
}

export interface ApplicationConfirmationRevokedEventObject {
  proposalId: BigNumber;
  owner: string;
}
export type ApplicationConfirmationRevokedEvent = TypedEvent<
  [BigNumber, string],
  ApplicationConfirmationRevokedEventObject
>;

export type ApplicationConfirmationRevokedEventFilter =
  TypedEventFilter<ApplicationConfirmationRevokedEvent>;

export interface ApplicationConfirmedEventObject {
  proposalId: BigNumber;
  owner: string;
}
export type ApplicationConfirmedEvent = TypedEvent<
  [BigNumber, string],
  ApplicationConfirmedEventObject
>;

export type ApplicationConfirmedEventFilter =
  TypedEventFilter<ApplicationConfirmedEvent>;

export interface ApplicationExecutedEventObject {
  proposalId: BigNumber;
}
export type ApplicationExecutedEvent = TypedEvent<
  [BigNumber],
  ApplicationExecutedEventObject
>;

export type ApplicationExecutedEventFilter =
  TypedEventFilter<ApplicationExecutedEvent>;

export interface ApplicationProposedEventObject {
  proposalId: BigNumber;
}
export type ApplicationProposedEvent = TypedEvent<
  [BigNumber],
  ApplicationProposedEventObject
>;

export type ApplicationProposedEventFilter =
  TypedEventFilter<ApplicationProposedEvent>;

export interface GasSentEventObject {
  endowmentId: BigNumber;
  member: string;
  amount: BigNumber;
}
export type GasSentEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  GasSentEventObject
>;

export type GasSentEventFilter = TypedEventFilter<GasSentEvent>;

export interface SeedAssetSentEventObject {
  endowmentId: BigNumber;
  asset: string;
  amount: BigNumber;
}
export type SeedAssetSentEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  SeedAssetSentEventObject
>;

export type SeedAssetSentEventFilter = TypedEventFilter<SeedAssetSentEvent>;

export interface ICharityApplications extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICharityApplicationsInterface;

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
    confirmProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getProposalConfirmationCount(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initializeApplications(
      owners: PromiseOrValue<string>[],
      _approvalsRequired: PromiseOrValue<BigNumberish>,
      _requireExecution: PromiseOrValue<boolean>,
      _transactionExpiry: PromiseOrValue<BigNumberish>,
      _accountsContract: PromiseOrValue<string>,
      _gasAmount: PromiseOrValue<BigNumberish>,
      _seedSplitToLiquid: PromiseOrValue<BigNumberish>,
      _seedAsset: PromiseOrValue<string>,
      _seedAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    proposeApplication(
      application: AccountMessages.CreateEndowmentRequestStruct,
      meta: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    queryConfig(
      overrides?: CallOverrides
    ): Promise<[ApplicationsStorage.ConfigStructOutput]>;

    revokeProposalConfirmation(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateConfig(
      _transactionExpiry: PromiseOrValue<BigNumberish>,
      accountsContract: PromiseOrValue<string>,
      seedSplitToLiquid: PromiseOrValue<BigNumberish>,
      gasAmount: PromiseOrValue<BigNumberish>,
      seedAsset: PromiseOrValue<string>,
      seedAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  confirmProposal(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeProposal(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getProposalConfirmationCount(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initializeApplications(
    owners: PromiseOrValue<string>[],
    _approvalsRequired: PromiseOrValue<BigNumberish>,
    _requireExecution: PromiseOrValue<boolean>,
    _transactionExpiry: PromiseOrValue<BigNumberish>,
    _accountsContract: PromiseOrValue<string>,
    _gasAmount: PromiseOrValue<BigNumberish>,
    _seedSplitToLiquid: PromiseOrValue<BigNumberish>,
    _seedAsset: PromiseOrValue<string>,
    _seedAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  proposeApplication(
    application: AccountMessages.CreateEndowmentRequestStruct,
    meta: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  queryConfig(
    overrides?: CallOverrides
  ): Promise<ApplicationsStorage.ConfigStructOutput>;

  revokeProposalConfirmation(
    proposalId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateConfig(
    _transactionExpiry: PromiseOrValue<BigNumberish>,
    accountsContract: PromiseOrValue<string>,
    seedSplitToLiquid: PromiseOrValue<BigNumberish>,
    gasAmount: PromiseOrValue<BigNumberish>,
    seedAsset: PromiseOrValue<string>,
    seedAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    confirmProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    executeProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    getProposalConfirmationCount(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initializeApplications(
      owners: PromiseOrValue<string>[],
      _approvalsRequired: PromiseOrValue<BigNumberish>,
      _requireExecution: PromiseOrValue<boolean>,
      _transactionExpiry: PromiseOrValue<BigNumberish>,
      _accountsContract: PromiseOrValue<string>,
      _gasAmount: PromiseOrValue<BigNumberish>,
      _seedSplitToLiquid: PromiseOrValue<BigNumberish>,
      _seedAsset: PromiseOrValue<string>,
      _seedAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    proposeApplication(
      application: AccountMessages.CreateEndowmentRequestStruct,
      meta: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    queryConfig(
      overrides?: CallOverrides
    ): Promise<ApplicationsStorage.ConfigStructOutput>;

    revokeProposalConfirmation(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateConfig(
      _transactionExpiry: PromiseOrValue<BigNumberish>,
      accountsContract: PromiseOrValue<string>,
      seedSplitToLiquid: PromiseOrValue<BigNumberish>,
      gasAmount: PromiseOrValue<BigNumberish>,
      seedAsset: PromiseOrValue<string>,
      seedAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ApplicationConfirmationRevoked(uint256,address)"(
      proposalId?: null,
      owner?: null
    ): ApplicationConfirmationRevokedEventFilter;
    ApplicationConfirmationRevoked(
      proposalId?: null,
      owner?: null
    ): ApplicationConfirmationRevokedEventFilter;

    "ApplicationConfirmed(uint256,address)"(
      proposalId?: null,
      owner?: null
    ): ApplicationConfirmedEventFilter;
    ApplicationConfirmed(
      proposalId?: null,
      owner?: null
    ): ApplicationConfirmedEventFilter;

    "ApplicationExecuted(uint256)"(
      proposalId?: null
    ): ApplicationExecutedEventFilter;
    ApplicationExecuted(proposalId?: null): ApplicationExecutedEventFilter;

    "ApplicationProposed(uint256)"(
      proposalId?: null
    ): ApplicationProposedEventFilter;
    ApplicationProposed(proposalId?: null): ApplicationProposedEventFilter;

    "GasSent(uint256,address,uint256)"(
      endowmentId?: null,
      member?: null,
      amount?: null
    ): GasSentEventFilter;
    GasSent(
      endowmentId?: null,
      member?: null,
      amount?: null
    ): GasSentEventFilter;

    "SeedAssetSent(uint256,address,uint256)"(
      endowmentId?: null,
      asset?: null,
      amount?: null
    ): SeedAssetSentEventFilter;
    SeedAssetSent(
      endowmentId?: null,
      asset?: null,
      amount?: null
    ): SeedAssetSentEventFilter;
  };

  estimateGas: {
    confirmProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getProposalConfirmationCount(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initializeApplications(
      owners: PromiseOrValue<string>[],
      _approvalsRequired: PromiseOrValue<BigNumberish>,
      _requireExecution: PromiseOrValue<boolean>,
      _transactionExpiry: PromiseOrValue<BigNumberish>,
      _accountsContract: PromiseOrValue<string>,
      _gasAmount: PromiseOrValue<BigNumberish>,
      _seedSplitToLiquid: PromiseOrValue<BigNumberish>,
      _seedAsset: PromiseOrValue<string>,
      _seedAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    proposeApplication(
      application: AccountMessages.CreateEndowmentRequestStruct,
      meta: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    queryConfig(overrides?: CallOverrides): Promise<BigNumber>;

    revokeProposalConfirmation(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateConfig(
      _transactionExpiry: PromiseOrValue<BigNumberish>,
      accountsContract: PromiseOrValue<string>,
      seedSplitToLiquid: PromiseOrValue<BigNumberish>,
      gasAmount: PromiseOrValue<BigNumberish>,
      seedAsset: PromiseOrValue<string>,
      seedAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    confirmProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeProposal(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getProposalConfirmationCount(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initializeApplications(
      owners: PromiseOrValue<string>[],
      _approvalsRequired: PromiseOrValue<BigNumberish>,
      _requireExecution: PromiseOrValue<boolean>,
      _transactionExpiry: PromiseOrValue<BigNumberish>,
      _accountsContract: PromiseOrValue<string>,
      _gasAmount: PromiseOrValue<BigNumberish>,
      _seedSplitToLiquid: PromiseOrValue<BigNumberish>,
      _seedAsset: PromiseOrValue<string>,
      _seedAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    proposeApplication(
      application: AccountMessages.CreateEndowmentRequestStruct,
      meta: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    queryConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    revokeProposalConfirmation(
      proposalId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateConfig(
      _transactionExpiry: PromiseOrValue<BigNumberish>,
      accountsContract: PromiseOrValue<string>,
      seedSplitToLiquid: PromiseOrValue<BigNumberish>,
      gasAmount: PromiseOrValue<BigNumberish>,
      seedAsset: PromiseOrValue<string>,
      seedAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
