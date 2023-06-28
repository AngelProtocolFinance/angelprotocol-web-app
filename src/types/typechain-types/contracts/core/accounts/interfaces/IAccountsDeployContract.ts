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

export declare namespace SubDaoLib {
  export type VeTypeDataStruct = {
    value: PromiseOrValue<BigNumberish>;
    scale: PromiseOrValue<BigNumberish>;
    slope: PromiseOrValue<BigNumberish>;
    power: PromiseOrValue<BigNumberish>;
  };

  export type VeTypeDataStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    value: BigNumber;
    scale: BigNumber;
    slope: BigNumber;
    power: BigNumber;
  };

  export type VeTypeStruct = {
    ve_type: PromiseOrValue<BigNumberish>;
    data: SubDaoLib.VeTypeDataStruct;
  };

  export type VeTypeStructOutput = [
    number,
    SubDaoLib.VeTypeDataStructOutput
  ] & { ve_type: number; data: SubDaoLib.VeTypeDataStructOutput };

  export type DaoTokenDataStruct = {
    existingData: PromiseOrValue<string>;
    newInitialSupply: PromiseOrValue<BigNumberish>;
    newName: PromiseOrValue<string>;
    newSymbol: PromiseOrValue<string>;
    veBondingType: SubDaoLib.VeTypeStruct;
    veBondingName: PromiseOrValue<string>;
    veBondingSymbol: PromiseOrValue<string>;
    veBondingDecimals: PromiseOrValue<BigNumberish>;
    veBondingReserveDenom: PromiseOrValue<string>;
    veBondingReserveDecimals: PromiseOrValue<BigNumberish>;
    veBondingPeriod: PromiseOrValue<BigNumberish>;
  };

  export type DaoTokenDataStructOutput = [
    string,
    BigNumber,
    string,
    string,
    SubDaoLib.VeTypeStructOutput,
    string,
    string,
    BigNumber,
    string,
    BigNumber,
    BigNumber
  ] & {
    existingData: string;
    newInitialSupply: BigNumber;
    newName: string;
    newSymbol: string;
    veBondingType: SubDaoLib.VeTypeStructOutput;
    veBondingName: string;
    veBondingSymbol: string;
    veBondingDecimals: BigNumber;
    veBondingReserveDenom: string;
    veBondingReserveDecimals: BigNumber;
    veBondingPeriod: BigNumber;
  };

  export type DaoTokenStruct = {
    token: PromiseOrValue<BigNumberish>;
    data: SubDaoLib.DaoTokenDataStruct;
  };

  export type DaoTokenStructOutput = [
    number,
    SubDaoLib.DaoTokenDataStructOutput
  ] & { token: number; data: SubDaoLib.DaoTokenDataStructOutput };
}

export declare namespace SubDaoMessage {
  export type InstantiateMsgStruct = {
    id: PromiseOrValue<BigNumberish>;
    owner: PromiseOrValue<string>;
    quorum: PromiseOrValue<BigNumberish>;
    threshold: PromiseOrValue<BigNumberish>;
    votingPeriod: PromiseOrValue<BigNumberish>;
    timelockPeriod: PromiseOrValue<BigNumberish>;
    expirationPeriod: PromiseOrValue<BigNumberish>;
    proposalDeposit: PromiseOrValue<BigNumberish>;
    snapshotPeriod: PromiseOrValue<BigNumberish>;
    token: SubDaoLib.DaoTokenStruct;
    endowType: PromiseOrValue<BigNumberish>;
    endowOwner: PromiseOrValue<string>;
    registrarContract: PromiseOrValue<string>;
  };

  export type InstantiateMsgStructOutput = [
    number,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    SubDaoLib.DaoTokenStructOutput,
    number,
    string,
    string
  ] & {
    id: number;
    owner: string;
    quorum: BigNumber;
    threshold: BigNumber;
    votingPeriod: BigNumber;
    timelockPeriod: BigNumber;
    expirationPeriod: BigNumber;
    proposalDeposit: BigNumber;
    snapshotPeriod: BigNumber;
    token: SubDaoLib.DaoTokenStructOutput;
    endowType: number;
    endowOwner: string;
    registrarContract: string;
  };
}

export interface IAccountsDeployContractInterface extends utils.Interface {
  functions: {
    "createDaoContract((uint32,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,(uint8,(address,uint256,string,string,(uint8,(uint128,uint256,uint128,uint128)),string,string,uint256,address,uint256,uint256)),uint8,address,address))": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "createDaoContract"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createDaoContract",
    values: [SubDaoMessage.InstantiateMsgStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "createDaoContract",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IAccountsDeployContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAccountsDeployContractInterface;

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
    createDaoContract(
      createdaomessage: SubDaoMessage.InstantiateMsgStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createDaoContract(
    createdaomessage: SubDaoMessage.InstantiateMsgStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createDaoContract(
      createdaomessage: SubDaoMessage.InstantiateMsgStruct,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    createDaoContract(
      createdaomessage: SubDaoMessage.InstantiateMsgStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createDaoContract(
      createdaomessage: SubDaoMessage.InstantiateMsgStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
