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
  PromiseOrValue,
} from "../../../../common";

export declare namespace AngelCoreStruct {
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
    settingsController: AngelCoreStruct.SettingsControllerStruct;
  };

  export type UpdateEndowmentControllerRequestStructOutput = [
    number,
    AngelCoreStruct.SettingsControllerStructOutput
  ] & {
    id: number;
    settingsController: AngelCoreStruct.SettingsControllerStructOutput;
  };

  export type UpdateEndowmentSettingsRequestStruct = {
    id: PromiseOrValue<BigNumberish>;
    donationMatchActive: PromiseOrValue<boolean>;
    maturityTime: PromiseOrValue<BigNumberish>;
    allowlistedBeneficiaries: PromiseOrValue<string>[];
    allowlistedContributors: PromiseOrValue<string>[];
    maturity_allowlist_add: PromiseOrValue<string>[];
    maturity_allowlist_remove: PromiseOrValue<string>[];
    splitToLiquid: AngelCoreStruct.SplitDetailsStruct;
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
    AngelCoreStruct.SplitDetailsStructOutput,
    boolean
  ] & {
    id: number;
    donationMatchActive: boolean;
    maturityTime: BigNumber;
    allowlistedBeneficiaries: string[];
    allowlistedContributors: string[];
    maturity_allowlist_add: string[];
    maturity_allowlist_remove: string[];
    splitToLiquid: AngelCoreStruct.SplitDetailsStructOutput;
    ignoreUserSplits: boolean;
  };

  export type UpdateFeeSettingRequestStruct = {
    id: PromiseOrValue<BigNumberish>;
    earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStruct;
    depositFee: AngelCoreStruct.FeeSettingStruct;
    withdrawFee: AngelCoreStruct.FeeSettingStruct;
    balanceFee: AngelCoreStruct.FeeSettingStruct;
  };

  export type UpdateFeeSettingRequestStructOutput = [
    number,
    AngelCoreStruct.FeeSettingStructOutput,
    AngelCoreStruct.FeeSettingStructOutput,
    AngelCoreStruct.FeeSettingStructOutput,
    AngelCoreStruct.FeeSettingStructOutput
  ] & {
    id: number;
    earlyLockedWithdrawFee: AngelCoreStruct.FeeSettingStructOutput;
    depositFee: AngelCoreStruct.FeeSettingStructOutput;
    withdrawFee: AngelCoreStruct.FeeSettingStructOutput;
    balanceFee: AngelCoreStruct.FeeSettingStructOutput;
  };
}

export interface IAccountsUpdateEndowmentSettingsControllerInterface
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

  events: {};
}

export interface IAccountsUpdateEndowmentSettingsController
  extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAccountsUpdateEndowmentSettingsControllerInterface;

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

  filters: {};

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
