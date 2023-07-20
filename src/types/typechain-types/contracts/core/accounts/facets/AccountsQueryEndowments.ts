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
    data: LibAccounts.BeneficiaryDataStruct;
    enumData: PromiseOrValue<BigNumberish>;
  };

  export type BeneficiaryStructOutput = [
    LibAccounts.BeneficiaryDataStructOutput,
    number
  ] & { data: LibAccounts.BeneficiaryDataStructOutput; enumData: number };
}

export declare namespace AccountMessages {
  export type ConfigResponseStruct = {
    owner: PromiseOrValue<string>;
    version: PromiseOrValue<string>;
    networkName: PromiseOrValue<string>;
    registrarContract: PromiseOrValue<string>;
    nextAccountId: PromiseOrValue<BigNumberish>;
    maxGeneralCategoryId: PromiseOrValue<BigNumberish>;
    subDao: PromiseOrValue<string>;
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStruct;
  };

  export type ConfigResponseStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    string,
    LibAccounts.FeeSettingStructOutput
  ] & {
    owner: string;
    version: string;
    networkName: string;
    registrarContract: string;
    nextAccountId: BigNumber;
    maxGeneralCategoryId: BigNumber;
    subDao: string;
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStructOutput;
  };

  export type StateResponseStruct = {
    closingEndowment: PromiseOrValue<boolean>;
    closingBeneficiary: LibAccounts.BeneficiaryStruct;
  };

  export type StateResponseStructOutput = [
    boolean,
    LibAccounts.BeneficiaryStructOutput
  ] & {
    closingEndowment: boolean;
    closingBeneficiary: LibAccounts.BeneficiaryStructOutput;
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
    proposalLink: PromiseOrValue<BigNumberish>;
    multisig: PromiseOrValue<string>;
    dao: PromiseOrValue<string>;
    daoToken: PromiseOrValue<string>;
    donationMatchActive: PromiseOrValue<boolean>;
    donationMatchContract: PromiseOrValue<string>;
    allowlistedBeneficiaries: PromiseOrValue<string>[];
    allowlistedContributors: PromiseOrValue<string>[];
    maturityAllowlist: PromiseOrValue<string>[];
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStruct;
    withdrawFee: LibAccounts.FeeSettingStruct;
    depositFee: LibAccounts.FeeSettingStruct;
    balanceFee: LibAccounts.FeeSettingStruct;
    settingsController: LibAccounts.SettingsControllerStruct;
    parent: PromiseOrValue<BigNumberish>;
    ignoreUserSplits: PromiseOrValue<boolean>;
    splitToLiquid: LibAccounts.SplitDetailsStruct;
    referralId: PromiseOrValue<BigNumberish>;
    gasFwd: PromiseOrValue<string>;
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
    BigNumber,
    string,
    string,
    string,
    boolean,
    string,
    string[],
    string[],
    string[],
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.FeeSettingStructOutput,
    LibAccounts.SettingsControllerStructOutput,
    number,
    boolean,
    LibAccounts.SplitDetailsStructOutput,
    BigNumber,
    string
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
    proposalLink: BigNumber;
    multisig: string;
    dao: string;
    daoToken: string;
    donationMatchActive: boolean;
    donationMatchContract: string;
    allowlistedBeneficiaries: string[];
    allowlistedContributors: string[];
    maturityAllowlist: string[];
    earlyLockedWithdrawFee: LibAccounts.FeeSettingStructOutput;
    withdrawFee: LibAccounts.FeeSettingStructOutput;
    depositFee: LibAccounts.FeeSettingStructOutput;
    balanceFee: LibAccounts.FeeSettingStructOutput;
    settingsController: LibAccounts.SettingsControllerStructOutput;
    parent: number;
    ignoreUserSplits: boolean;
    splitToLiquid: LibAccounts.SplitDetailsStructOutput;
    referralId: BigNumber;
    gasFwd: string;
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
