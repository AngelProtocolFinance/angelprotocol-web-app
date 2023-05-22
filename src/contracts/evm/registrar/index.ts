import { Interface } from "@ethersproject/abi";
import { Contract, ContractInterface } from "ethers";
import { Registrar as TRegistrar } from "types/typechain-types/contracts/core/registrar/registrar.sol/Registrar";
import { contracts } from "constants/contracts";
import config from "./abi/config.json";
import txs from "./abi/txs.json";

export const Registrar = new Contract(contracts["registrar"], [
  ...config,
  ...txs,
]) as TRegistrar;

export const iregistrar: ContractInterface = Registrar.interface;

export const registrar = new Interface([...config, ...txs]);
