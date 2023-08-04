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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export declare namespace AccountMessages {
  export type DepositRequestStruct = {
    id: PromiseOrValue<BigNumberish>;
    lockedPercentage: PromiseOrValue<BigNumberish>;
    liquidPercentage: PromiseOrValue<BigNumberish>;
    donationMatch: PromiseOrValue<string>;
  };

  export type DepositRequestStructOutput = [
    number,
    BigNumber,
    BigNumber,
    string
  ] & {
    id: number;
    lockedPercentage: BigNumber;
    liquidPercentage: BigNumber;
    donationMatch: string;
  };
}

export declare namespace IAccountsDepositWithdrawEndowments {
  export type TokenInfoStruct = {
    addr: PromiseOrValue<string>;
    amnt: PromiseOrValue<BigNumberish>;
  };

  export type TokenInfoStructOutput = [string, BigNumber] & {
    addr: string;
    amnt: BigNumber;
  };
}

export interface IAccountsDepositWithdrawEndowmentsInterface
  extends utils.Interface {
  functions: {
    "depositERC20((uint32,uint256,uint256,address),address,uint256)": FunctionFragment;
    "depositMatic((uint32,uint256,uint256,address))": FunctionFragment;
    "withdraw(uint32,uint8,address,uint32,(address,uint256)[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "depositERC20" | "depositMatic" | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "depositERC20",
    values: [
      AccountMessages.DepositRequestStruct,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "depositMatic",
    values: [AccountMessages.DepositRequestStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      IAccountsDepositWithdrawEndowments.TokenInfoStruct[]
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositMatic",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export interface IAccountsDepositWithdrawEndowments extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAccountsDepositWithdrawEndowmentsInterface;

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
    depositERC20(
      details: AccountMessages.DepositRequestStruct,
      tokenAddress: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositMatic(
      details: AccountMessages.DepositRequestStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      id: PromiseOrValue<BigNumberish>,
      acctType: PromiseOrValue<BigNumberish>,
      beneficiaryAddress: PromiseOrValue<string>,
      beneficiaryEndowId: PromiseOrValue<BigNumberish>,
      tokens: IAccountsDepositWithdrawEndowments.TokenInfoStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  depositERC20(
    details: AccountMessages.DepositRequestStruct,
    tokenAddress: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositMatic(
    details: AccountMessages.DepositRequestStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    id: PromiseOrValue<BigNumberish>,
    acctType: PromiseOrValue<BigNumberish>,
    beneficiaryAddress: PromiseOrValue<string>,
    beneficiaryEndowId: PromiseOrValue<BigNumberish>,
    tokens: IAccountsDepositWithdrawEndowments.TokenInfoStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    depositERC20(
      details: AccountMessages.DepositRequestStruct,
      tokenAddress: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositMatic(
      details: AccountMessages.DepositRequestStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      id: PromiseOrValue<BigNumberish>,
      acctType: PromiseOrValue<BigNumberish>,
      beneficiaryAddress: PromiseOrValue<string>,
      beneficiaryEndowId: PromiseOrValue<BigNumberish>,
      tokens: IAccountsDepositWithdrawEndowments.TokenInfoStruct[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    depositERC20(
      details: AccountMessages.DepositRequestStruct,
      tokenAddress: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositMatic(
      details: AccountMessages.DepositRequestStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      id: PromiseOrValue<BigNumberish>,
      acctType: PromiseOrValue<BigNumberish>,
      beneficiaryAddress: PromiseOrValue<string>,
      beneficiaryEndowId: PromiseOrValue<BigNumberish>,
      tokens: IAccountsDepositWithdrawEndowments.TokenInfoStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    depositERC20(
      details: AccountMessages.DepositRequestStruct,
      tokenAddress: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositMatic(
      details: AccountMessages.DepositRequestStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      id: PromiseOrValue<BigNumberish>,
      acctType: PromiseOrValue<BigNumberish>,
      beneficiaryAddress: PromiseOrValue<string>,
      beneficiaryEndowId: PromiseOrValue<BigNumberish>,
      tokens: IAccountsDepositWithdrawEndowments.TokenInfoStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
