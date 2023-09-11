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
} from "../../../../common";

export declare namespace LibAccounts {
  export type BeneficiaryDataStruct = { endowId: BigNumberish; addr: string };

  export type BeneficiaryDataStructOutput = [number, string] & {
    endowId: number;
    addr: string;
  };

  export type BeneficiaryStruct = {
    data: LibAccounts.BeneficiaryDataStruct;
    enumData: BigNumberish;
  };

  export type BeneficiaryStructOutput = [
    LibAccounts.BeneficiaryDataStructOutput,
    number
  ] & { data: LibAccounts.BeneficiaryDataStructOutput; enumData: number };

  export type FeeSettingStruct = { payoutAddress: string; bps: BigNumberish };

  export type FeeSettingStructOutput = [string, BigNumber] & {
    payoutAddress: string;
    bps: BigNumber;
  };

  export type DelegateStruct = { addr: string; expires: BigNumberish };

  export type DelegateStructOutput = [string, BigNumber] & {
    addr: string;
    expires: BigNumber;
  };

  export type SettingsPermissionStruct = {
    locked: boolean;
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
    max: BigNumberish;
    min: BigNumberish;
    defaultSplit: BigNumberish;
  };

  export type SplitDetailsStructOutput = [BigNumber, BigNumber, BigNumber] & {
    max: BigNumber;
    min: BigNumber;
    defaultSplit: BigNumber;
  };
}

export declare namespace IVault {
  export type VaultActionDataStruct = {
    destinationChain: string;
    strategyId: BytesLike;
    selector: BytesLike;
    accountIds: BigNumberish[];
    token: string;
    lockAmt: BigNumberish;
    liqAmt: BigNumberish;
    status: BigNumberish;
  };

  export type VaultActionDataStructOutput = [
    string,
    string,
    string,
    number[],
    string,
    BigNumber,
    BigNumber,
    number
  ] & {
    destinationChain: string;
    strategyId: string;
    selector: string;
    accountIds: number[];
    token: string;
    lockAmt: BigNumber;
    liqAmt: BigNumber;
    status: number;
  };
}

export declare namespace AccountMessages {
  export type CreateEndowmentRequestStruct = {
    withdrawBeforeMaturity: boolean;
    maturityTime: BigNumberish;
    name: string;
    sdgs: BigNumberish[];
    tier: BigNumberish;
    endowType: BigNumberish;
    logo: string;
    image: string;
    members: string[];
    threshold: BigNumberish;
    duration: BigNumberish;
    allowlistedBeneficiaries: string[];
    allowlistedContributors: string[];
    maturityAllowlist: string[];
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStruct;
    withdrawFee: LibAccounts.FeeSettingStruct;
    depositFee: LibAccounts.FeeSettingStruct;
    balanceFee: LibAccounts.FeeSettingStruct;
    proposalLink: BigNumberish;
    settingsController: LibAccounts.SettingsControllerStruct;
    parent: BigNumberish;
    ignoreUserSplits: boolean;
    splitToLiquid: LibAccounts.SplitDetailsStruct;
    referralId: BigNumberish;
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
    string[],
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    BigNumber,
    LibAccounts.SettingsControllerStructOutput,
    number,
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
    maturityAllowlist: string[];
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStructOutput;
    withdrawFee: LibAccounts.FeeSettingStructOutput;
    depositFee: LibAccounts.FeeSettingStructOutput;
    balanceFee: LibAccounts.FeeSettingStructOutput;
    proposalLink: BigNumber;
    settingsController: LibAccounts.SettingsControllerStructOutput;
    parent: number;
    ignoreUserSplits: boolean;
    splitToLiquid: LibAccounts.SplitDetailsStructOutput;
    referralId: BigNumber;
  };
}

export interface AccountsCreateEndowmentInterface extends utils.Interface {
  functions: {
    "createEndowment((bool,uint256,string,uint256[],uint8,uint8,string,string,address[],uint256,uint256,address[],address[],address[],(address,uint256),(address,uint256),(address,uint256),(address,uint256),uint256,((bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256)),(bool,(address,uint256))),uint32,bool,(uint256,uint256,uint256),uint256))": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "createEndowment"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createEndowment",
    values: [AccountMessages.CreateEndowmentRequestStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "createEndowment",
    data: BytesLike
  ): Result;

  events: {
    "AllowanceSpent(uint256,address,address,uint256)": EventFragment;
    "AllowanceUpdated(uint256,address,address,uint256,uint256,uint256)": EventFragment;
    "ConfigUpdated()": EventFragment;
    "DafApprovedEndowmentsUpdated(uint32[],uint32[])": EventFragment;
    "DonationMatchCreated(uint256,address)": EventFragment;
    "EndowmentAllowlistUpdated(uint256,uint8,address[],address[])": EventFragment;
    "EndowmentClosed(uint256,((uint32,address),uint8),uint32[])": EventFragment;
    "EndowmentCreated(uint256,uint8)": EventFragment;
    "EndowmentDeposit(uint256,address,uint256,uint256)": EventFragment;
    "EndowmentInvested(uint256,bytes4,string,address,uint256,uint256)": EventFragment;
    "EndowmentRedeemed(uint256,bytes4,string,address,uint256,uint256)": EventFragment;
    "EndowmentSettingUpdated(uint256,string)": EventFragment;
    "EndowmentUpdated(uint256)": EventFragment;
    "EndowmentWithdraw(uint256,address,uint256,uint8,address,uint32)": EventFragment;
    "OwnerUpdated(address)": EventFragment;
    "RefundNeeded((string,bytes4,bytes4,uint32[],address,uint256,uint256,uint8))": EventFragment;
    "TokenSwapped(uint256,uint8,address,uint256,address,uint256)": EventFragment;
    "UnexpectedTokens((string,bytes4,bytes4,uint32[],address,uint256,uint256,uint8))": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AllowanceSpent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AllowanceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ConfigUpdated"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "DafApprovedEndowmentsUpdated"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DonationMatchCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentAllowlistUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentClosed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentDeposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentInvested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentRedeemed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentSettingUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EndowmentWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RefundNeeded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenSwapped"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UnexpectedTokens"): EventFragment;
}

export interface AllowanceSpentEventObject {
  endowId: BigNumber;
  spender: string;
  tokenAddress: string;
  amount: BigNumber;
}
export type AllowanceSpentEvent = TypedEvent<
  [BigNumber, string, string, BigNumber],
  AllowanceSpentEventObject
>;

export type AllowanceSpentEventFilter = TypedEventFilter<AllowanceSpentEvent>;

export interface AllowanceUpdatedEventObject {
  endowId: BigNumber;
  spender: string;
  tokenAddress: string;
  newBalance: BigNumber;
  added: BigNumber;
  deducted: BigNumber;
}
export type AllowanceUpdatedEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, BigNumber, BigNumber],
  AllowanceUpdatedEventObject
>;

export type AllowanceUpdatedEventFilter =
  TypedEventFilter<AllowanceUpdatedEvent>;

export interface ConfigUpdatedEventObject {}
export type ConfigUpdatedEvent = TypedEvent<[], ConfigUpdatedEventObject>;

export type ConfigUpdatedEventFilter = TypedEventFilter<ConfigUpdatedEvent>;

export interface DafApprovedEndowmentsUpdatedEventObject {
  add: number[];
  remove: number[];
}
export type DafApprovedEndowmentsUpdatedEvent = TypedEvent<
  [number[], number[]],
  DafApprovedEndowmentsUpdatedEventObject
>;

export type DafApprovedEndowmentsUpdatedEventFilter =
  TypedEventFilter<DafApprovedEndowmentsUpdatedEvent>;

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

export interface EndowmentAllowlistUpdatedEventObject {
  endowId: BigNumber;
  allowlistType: number;
  add: string[];
  remove: string[];
}
export type EndowmentAllowlistUpdatedEvent = TypedEvent<
  [BigNumber, number, string[], string[]],
  EndowmentAllowlistUpdatedEventObject
>;

export type EndowmentAllowlistUpdatedEventFilter =
  TypedEventFilter<EndowmentAllowlistUpdatedEvent>;

export interface EndowmentClosedEventObject {
  endowId: BigNumber;
  beneficiary: LibAccounts.BeneficiaryStructOutput;
  relinked: number[];
}
export type EndowmentClosedEvent = TypedEvent<
  [BigNumber, LibAccounts.BeneficiaryStructOutput, number[]],
  EndowmentClosedEventObject
>;

export type EndowmentClosedEventFilter = TypedEventFilter<EndowmentClosedEvent>;

export interface EndowmentCreatedEventObject {
  endowId: BigNumber;
  endowType: number;
}
export type EndowmentCreatedEvent = TypedEvent<
  [BigNumber, number],
  EndowmentCreatedEventObject
>;

export type EndowmentCreatedEventFilter =
  TypedEventFilter<EndowmentCreatedEvent>;

export interface EndowmentDepositEventObject {
  endowId: BigNumber;
  tokenAddress: string;
  amountLocked: BigNumber;
  amountLiquid: BigNumber;
}
export type EndowmentDepositEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber],
  EndowmentDepositEventObject
>;

export type EndowmentDepositEventFilter =
  TypedEventFilter<EndowmentDepositEvent>;

export interface EndowmentInvestedEventObject {
  endowId: BigNumber;
  strategy: string;
  network: string;
  token: string;
  lockAmt: BigNumber;
  liquidAmt: BigNumber;
}
export type EndowmentInvestedEvent = TypedEvent<
  [BigNumber, string, string, string, BigNumber, BigNumber],
  EndowmentInvestedEventObject
>;

export type EndowmentInvestedEventFilter =
  TypedEventFilter<EndowmentInvestedEvent>;

export interface EndowmentRedeemedEventObject {
  endowId: BigNumber;
  strategy: string;
  network: string;
  token: string;
  lockAmt: BigNumber;
  liquidAmt: BigNumber;
}
export type EndowmentRedeemedEvent = TypedEvent<
  [BigNumber, string, string, string, BigNumber, BigNumber],
  EndowmentRedeemedEventObject
>;

export type EndowmentRedeemedEventFilter =
  TypedEventFilter<EndowmentRedeemedEvent>;

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

export interface EndowmentWithdrawEventObject {
  endowId: BigNumber;
  tokenAddress: string;
  amount: BigNumber;
  accountType: number;
  beneficiaryAddress: string;
  beneficiaryEndowId: number;
}
export type EndowmentWithdrawEvent = TypedEvent<
  [BigNumber, string, BigNumber, number, string, number],
  EndowmentWithdrawEventObject
>;

export type EndowmentWithdrawEventFilter =
  TypedEventFilter<EndowmentWithdrawEvent>;

export interface OwnerUpdatedEventObject {
  owner: string;
}
export type OwnerUpdatedEvent = TypedEvent<[string], OwnerUpdatedEventObject>;

export type OwnerUpdatedEventFilter = TypedEventFilter<OwnerUpdatedEvent>;

export interface RefundNeededEventObject {
  arg0: IVault.VaultActionDataStructOutput;
}
export type RefundNeededEvent = TypedEvent<
  [IVault.VaultActionDataStructOutput],
  RefundNeededEventObject
>;

export type RefundNeededEventFilter = TypedEventFilter<RefundNeededEvent>;

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

export interface UnexpectedTokensEventObject {
  arg0: IVault.VaultActionDataStructOutput;
}
export type UnexpectedTokensEvent = TypedEvent<
  [IVault.VaultActionDataStructOutput],
  UnexpectedTokensEventObject
>;

export type UnexpectedTokensEventFilter =
  TypedEventFilter<UnexpectedTokensEvent>;

export interface AccountsCreateEndowment extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AccountsCreateEndowmentInterface;

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
    createEndowment(
      details: AccountMessages.CreateEndowmentRequestStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  createEndowment(
    details: AccountMessages.CreateEndowmentRequestStruct,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    createEndowment(
      details: AccountMessages.CreateEndowmentRequestStruct,
      overrides?: CallOverrides
    ): Promise<number>;
  };

  filters: {
    "AllowanceSpent(uint256,address,address,uint256)"(
      endowId?: null,
      spender?: null,
      tokenAddress?: null,
      amount?: null
    ): AllowanceSpentEventFilter;
    AllowanceSpent(
      endowId?: null,
      spender?: null,
      tokenAddress?: null,
      amount?: null
    ): AllowanceSpentEventFilter;

    "AllowanceUpdated(uint256,address,address,uint256,uint256,uint256)"(
      endowId?: null,
      spender?: null,
      tokenAddress?: null,
      newBalance?: null,
      added?: null,
      deducted?: null
    ): AllowanceUpdatedEventFilter;
    AllowanceUpdated(
      endowId?: null,
      spender?: null,
      tokenAddress?: null,
      newBalance?: null,
      added?: null,
      deducted?: null
    ): AllowanceUpdatedEventFilter;

    "ConfigUpdated()"(): ConfigUpdatedEventFilter;
    ConfigUpdated(): ConfigUpdatedEventFilter;

    "DafApprovedEndowmentsUpdated(uint32[],uint32[])"(
      add?: null,
      remove?: null
    ): DafApprovedEndowmentsUpdatedEventFilter;
    DafApprovedEndowmentsUpdated(
      add?: null,
      remove?: null
    ): DafApprovedEndowmentsUpdatedEventFilter;

    "DonationMatchCreated(uint256,address)"(
      endowId?: null,
      donationMatchContract?: null
    ): DonationMatchCreatedEventFilter;
    DonationMatchCreated(
      endowId?: null,
      donationMatchContract?: null
    ): DonationMatchCreatedEventFilter;

    "EndowmentAllowlistUpdated(uint256,uint8,address[],address[])"(
      endowId?: null,
      allowlistType?: null,
      add?: null,
      remove?: null
    ): EndowmentAllowlistUpdatedEventFilter;
    EndowmentAllowlistUpdated(
      endowId?: null,
      allowlistType?: null,
      add?: null,
      remove?: null
    ): EndowmentAllowlistUpdatedEventFilter;

    "EndowmentClosed(uint256,((uint32,address),uint8),uint32[])"(
      endowId?: null,
      beneficiary?: null,
      relinked?: null
    ): EndowmentClosedEventFilter;
    EndowmentClosed(
      endowId?: null,
      beneficiary?: null,
      relinked?: null
    ): EndowmentClosedEventFilter;

    "EndowmentCreated(uint256,uint8)"(
      endowId?: null,
      endowType?: null
    ): EndowmentCreatedEventFilter;
    EndowmentCreated(
      endowId?: null,
      endowType?: null
    ): EndowmentCreatedEventFilter;

    "EndowmentDeposit(uint256,address,uint256,uint256)"(
      endowId?: null,
      tokenAddress?: null,
      amountLocked?: null,
      amountLiquid?: null
    ): EndowmentDepositEventFilter;
    EndowmentDeposit(
      endowId?: null,
      tokenAddress?: null,
      amountLocked?: null,
      amountLiquid?: null
    ): EndowmentDepositEventFilter;

    "EndowmentInvested(uint256,bytes4,string,address,uint256,uint256)"(
      endowId?: null,
      strategy?: null,
      network?: null,
      token?: null,
      lockAmt?: null,
      liquidAmt?: null
    ): EndowmentInvestedEventFilter;
    EndowmentInvested(
      endowId?: null,
      strategy?: null,
      network?: null,
      token?: null,
      lockAmt?: null,
      liquidAmt?: null
    ): EndowmentInvestedEventFilter;

    "EndowmentRedeemed(uint256,bytes4,string,address,uint256,uint256)"(
      endowId?: null,
      strategy?: null,
      network?: null,
      token?: null,
      lockAmt?: null,
      liquidAmt?: null
    ): EndowmentRedeemedEventFilter;
    EndowmentRedeemed(
      endowId?: null,
      strategy?: null,
      network?: null,
      token?: null,
      lockAmt?: null,
      liquidAmt?: null
    ): EndowmentRedeemedEventFilter;

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

    "EndowmentWithdraw(uint256,address,uint256,uint8,address,uint32)"(
      endowId?: null,
      tokenAddress?: null,
      amount?: null,
      accountType?: null,
      beneficiaryAddress?: null,
      beneficiaryEndowId?: null
    ): EndowmentWithdrawEventFilter;
    EndowmentWithdraw(
      endowId?: null,
      tokenAddress?: null,
      amount?: null,
      accountType?: null,
      beneficiaryAddress?: null,
      beneficiaryEndowId?: null
    ): EndowmentWithdrawEventFilter;

    "OwnerUpdated(address)"(owner?: null): OwnerUpdatedEventFilter;
    OwnerUpdated(owner?: null): OwnerUpdatedEventFilter;

    "RefundNeeded((string,bytes4,bytes4,uint32[],address,uint256,uint256,uint8))"(
      arg0?: null
    ): RefundNeededEventFilter;
    RefundNeeded(arg0?: null): RefundNeededEventFilter;

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

    "UnexpectedTokens((string,bytes4,bytes4,uint32[],address,uint256,uint256,uint8))"(
      arg0?: null
    ): UnexpectedTokensEventFilter;
    UnexpectedTokens(arg0?: null): UnexpectedTokensEventFilter;
  };

  estimateGas: {
    createEndowment(
      details: AccountMessages.CreateEndowmentRequestStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createEndowment(
      details: AccountMessages.CreateEndowmentRequestStruct,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
