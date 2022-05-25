import { ethers } from "ethers";

//ethereum object definitions
//from https://eips.ethereum.org/EIPS/eip-1193
export interface Web3Provider extends ethers.providers.Web3Provider {}
export type EIP1193Events = "accountsChanged"; // | "otherEvents"
export type EIPMethods = "eth_requestAccounts";
//event handler export types
export type AccountChangeHandler = (accounts: string[]) => void;
