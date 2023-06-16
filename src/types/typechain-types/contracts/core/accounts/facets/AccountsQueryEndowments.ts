/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
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

export declare namespace AngelCoreStruct {
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
    delegate: AngelCoreStruct.DelegateStruct;
  };

  export type SettingsPermissionStructOutput = [
    boolean,
    AngelCoreStruct.DelegateStructOutput
  ] & { locked: boolean; delegate: AngelCoreStruct.DelegateStructOutput };

  export type SettingsControllerStruct = {
    acceptedTokens: AngelCoreStruct.SettingsPermissionStruct;
    lockedInvestmentManagement: AngelCoreStruct.SettingsPermissionStruct;
    liquidInvestmentManagement: AngelCoreStruct.SettingsPermissionStruct;
    allowlistedBeneficiaries: AngelCoreStruct.SettingsPermissionStruct;
    allowlistedContributors: AngelCoreStruct.SettingsPermissionStruct;
    maturityAllowlist: AngelCoreStruct.SettingsPermissionStruct;
    maturityTime: AngelCoreStruct.SettingsPermissionStruct;
    earlyLockedWithdrawFee: AngelCoreStruct.SettingsPermissionStruct;
    withdrawFee: AngelCoreStruct.SettingsPermissionStruct;
    depositFee: AngelCoreStruct.SettingsPermissionStruct;
    balanceFee: AngelCoreStruct.SettingsPermissionStruct;
    name: AngelCoreStruct.SettingsPermissionStruct;
    image: AngelCoreStruct.SettingsPermissionStruct;
    logo: AngelCoreStruct.SettingsPermissionStruct;
    sdgs: AngelCoreStruct.SettingsPermissionStruct;
    splitToLiquid: AngelCoreStruct.SettingsPermissionStruct;
    ignoreUserSplits: AngelCoreStruct.SettingsPermissionStruct;
  };

  export type SettingsControllerStructOutput = [
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput,
    AngelCoreStruct.SettingsPermissionStructOutput
  ] & {
    acceptedTokens: AngelCoreStruct.SettingsPermissionStructOutput;
    lockedInvestmentManagement: AngelCoreStruct.SettingsPermissionStructOutput;
    liquidInvestmentManagement: AngelCoreStruct.SettingsPermissionStructOutput;
    allowlistedBeneficiaries: AngelCoreStruct.SettingsPermissionStructOutput;
    allowlistedContributors: AngelCoreStruct.SettingsPermissionStructOutput;
    maturityAllowlist: AngelCoreStruct.SettingsPermissionStructOutput;
    maturityTime: AngelCoreStruct.SettingsPermissionStructOutput;
    earlyLockedWithdrawFee: AngelCoreStruct.SettingsPermissionStructOutput;
    withdrawFee: AngelCoreStruct.SettingsPermissionStructOutput;
    depositFee: AngelCoreStruct.SettingsPermissionStructOutput;
    balanceFee: AngelCoreStruct.SettingsPermissionStructOutput;
    name: AngelCoreStruct.SettingsPermissionStructOutput;
    image: AngelCoreStruct.SettingsPermissionStructOutput;
    logo: AngelCoreStruct.SettingsPermissionStructOutput;
    sdgs: AngelCoreStruct.SettingsPermissionStructOutput;
    splitToLiquid: AngelCoreStruct.SettingsPermissionStructOutput;
    ignoreUserSplits: AngelCoreStruct.SettingsPermissionStructOutput;
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

  export type BeneficiaryDataStruct = {
    endowId: PromiseOrValue<BigNumberish>;
    fundId: PromiseOrValue<BigNumberish>;
    addr: PromiseOrValue<string>;
  };

  export type BeneficiaryDataStructOutput = [number, BigNumber, string] & {
    endowId: number;
    fundId: BigNumber;
    addr: string;
  };

  export type BeneficiaryStruct = {
    data: AngelCoreStruct.BeneficiaryDataStruct;
    enumData: PromiseOrValue<BigNumberish>;
  };

  export type BeneficiaryStructOutput = [
    AngelCoreStruct.BeneficiaryDataStructOutput,
    number
  ] & { data: AngelCoreStruct.BeneficiaryDataStructOutput; enumData: number };
}

export declare namespace AccountMessages {
  export type ConfigResponseStruct = {
    owner: PromiseOrValue<string>;
    version: PromiseOrValue<string>;
    registrarContract: PromiseOrValue<string>;
    nextAccountId: PromiseOrValue<BigNumberish>;
    maxGeneralCategoryId: PromiseOrValue<BigNumberish>;
    subDao: PromiseOrValue<string>;
    gateway: PromiseOrValue<string>;
    gasReceiver: PromiseOrValue<string>;
    earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStruct;
  };

  export type ConfigResponseStructOutput = [
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    AngelCoreStruct.FeeSettingStructOutput
  ] & {
    owner: string;
    version: string;
    registrarContract: string;
    nextAccountId: BigNumber;
    maxGeneralCategoryId: BigNumber;
    subDao: string;
    gateway: string;
    gasReceiver: string;
    earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStructOutput;
  };

  export type StateResponseStruct = {
    closingEndowment: PromiseOrValue<boolean>;
    closingBeneficiary: AngelCoreStruct.BeneficiaryStruct;
  };

  export type StateResponseStructOutput = [
    boolean,
    AngelCoreStruct.BeneficiaryStructOutput
  ] & {
    closingEndowment: boolean;
    closingBeneficiary: AngelCoreStruct.BeneficiaryStructOutput;
  };
}

export declare namespace LocalRegistrarLib {
  export type RebalanceParamsStruct = {
    rebalanceLiquidProfits: PromiseOrValue<boolean>;
    lockedRebalanceToLiquid: PromiseOrValue<BigNumberish>;
    interestDistribution: PromiseOrValue<BigNumberish>;
    lockedPrincipleToLiquid: PromiseOrValue<boolean>;
    principleDistribution: PromiseOrValue<BigNumberish>;
    basis: PromiseOrValue<BigNumberish>;
  };

  export type RebalanceParamsStructOutput = [
    boolean,
    number,
    number,
    boolean,
    number,
    number
  ] & {
    rebalanceLiquidProfits: boolean;
    lockedRebalanceToLiquid: number;
    interestDistribution: number;
    lockedPrincipleToLiquid: boolean;
    principleDistribution: number;
    basis: number;
  };
}

export declare namespace AccountStorage {
  export type EndowmentStruct = {
    owner: PromiseOrValue<string>;
    name: PromiseOrValue<string>;
    sdgs: PromiseOrValue<BigNumberish>[];
    tier: PromiseOrValue<BigNumberish>;
    endowType: PromiseOrValue<BigNumberish>;
    logo: PromiseOrValue<string>;
    image: PromiseOrValue<string>;
    maturityTime: PromiseOrValue<BigNumberish>;
    rebalance: LocalRegistrarLib.RebalanceParamsStruct;
    kycDonorsOnly: PromiseOrValue<boolean>;
    pendingRedemptions: PromiseOrValue<BigNumberish>;
    proposalLink: PromiseOrValue<BigNumberish>;
    multisig: PromiseOrValue<string>;
    dao: PromiseOrValue<string>;
    daoToken: PromiseOrValue<string>;
    donationMatchActive: PromiseOrValue<boolean>;
    donationMatchContract: PromiseOrValue<string>;
    allowlistedBeneficiaries: PromiseOrValue<string>[];
    allowlistedContributors: PromiseOrValue<string>[];
    maturityAllowlist: PromiseOrValue<string>[];
    earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStruct;
    withdrawFee: AngelCoreStruct.FeeSettingStruct;
    depositFee: AngelCoreStruct.FeeSettingStruct;
    balanceFee: AngelCoreStruct.FeeSettingStruct;
    settingsController: AngelCoreStruct.SettingsControllerStruct;
    parent: PromiseOrValue<BigNumberish>;
    ignoreUserSplits: PromiseOrValue<boolean>;
    splitToLiquid: AngelCoreStruct.SplitDetailsStruct;
    referralId: PromiseOrValue<BigNumberish>;
  };

  export type EndowmentStructOutput = [
    string,
    string,
    BigNumber[],
    number,
    number,
    string,
    string,
    BigNumber,
    LocalRegistrarLib.RebalanceParamsStructOutput,
    boolean,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    boolean,
    string,
    string[],
    string[],
    string[],
    AngelCoreStruct.FeeSettingStructOutput,
    AngelCoreStruct.FeeSettingStructOutput,
    AngelCoreStruct.FeeSettingStructOutput,
    AngelCoreStruct.FeeSettingStructOutput,
    AngelCoreStruct.SettingsControllerStructOutput,
    number,
    boolean,
    AngelCoreStruct.SplitDetailsStructOutput,
    BigNumber
  ] & {
    owner: string;
    name: string;
    sdgs: BigNumber[];
    tier: number;
    endowType: number;
    logo: string;
    image: string;
    maturityTime: BigNumber;
    rebalance: LocalRegistrarLib.RebalanceParamsStructOutput;
    kycDonorsOnly: boolean;
    pendingRedemptions: BigNumber;
    proposalLink: BigNumber;
    multisig: string;
    dao: string;
    daoToken: string;
    donationMatchActive: boolean;
    donationMatchContract: string;
    allowlistedBeneficiaries: string[];
    allowlistedContributors: string[];
    maturityAllowlist: string[];
    earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStructOutput;
    withdrawFee: AngelCoreStruct.FeeSettingStructOutput;
    depositFee: AngelCoreStruct.FeeSettingStructOutput;
    balanceFee: AngelCoreStruct.FeeSettingStructOutput;
    settingsController: AngelCoreStruct.SettingsControllerStructOutput;
    parent: number;
    ignoreUserSplits: boolean;
    splitToLiquid: AngelCoreStruct.SplitDetailsStructOutput;
    referralId: BigNumber;
  };
}

export interface AccountsQueryEndowmentsInterface extends utils.Interface {
  functions: {
    "queryConfig()": FunctionFragment;
    "queryEndowmentDetails(uint32)": FunctionFragment;
    "queryState(uint32)": FunctionFragment;
    "queryTokenAmount(uint32,uint8,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "queryConfig"
      | "queryEndowmentDetails"
      | "queryState"
      | "queryTokenAmount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "queryConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "queryEndowmentDetails",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "queryState",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "queryTokenAmount",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "queryConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "queryEndowmentDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "queryState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "queryTokenAmount",
    data: BytesLike
  ): Result;

  events: {};
}

export interface AccountsQueryEndowments extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AccountsQueryEndowmentsInterface;

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
    queryConfig(
      overrides?: CallOverrides
    ): Promise<
      [AccountMessages.ConfigResponseStructOutput] & {
        config: AccountMessages.ConfigResponseStructOutput;
      }
    >;

    queryEndowmentDetails(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [AccountStorage.EndowmentStructOutput] & {
        endowment: AccountStorage.EndowmentStructOutput;
      }
    >;

    queryState(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [AccountMessages.StateResponseStructOutput] & {
        stateResponse: AccountMessages.StateResponseStructOutput;
      }
    >;

    queryTokenAmount(
      id: PromiseOrValue<BigNumberish>,
      accountType: PromiseOrValue<BigNumberish>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { tokenAmount: BigNumber }>;
  };

  queryConfig(
    overrides?: CallOverrides
  ): Promise<AccountMessages.ConfigResponseStructOutput>;

  queryEndowmentDetails(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<AccountStorage.EndowmentStructOutput>;

  queryState(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<AccountMessages.StateResponseStructOutput>;

  queryTokenAmount(
    id: PromiseOrValue<BigNumberish>,
    accountType: PromiseOrValue<BigNumberish>,
    tokenAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    queryConfig(
      overrides?: CallOverrides
    ): Promise<AccountMessages.ConfigResponseStructOutput>;

    queryEndowmentDetails(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<AccountStorage.EndowmentStructOutput>;

    queryState(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<AccountMessages.StateResponseStructOutput>;

    queryTokenAmount(
      id: PromiseOrValue<BigNumberish>,
      accountType: PromiseOrValue<BigNumberish>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    queryConfig(overrides?: CallOverrides): Promise<BigNumber>;

    queryEndowmentDetails(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    queryState(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    queryTokenAmount(
      id: PromiseOrValue<BigNumberish>,
      accountType: PromiseOrValue<BigNumberish>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    queryConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryEndowmentDetails(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryState(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queryTokenAmount(
      id: PromiseOrValue<BigNumberish>,
      accountType: PromiseOrValue<BigNumberish>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
