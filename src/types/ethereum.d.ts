declare module "@types-ethereum" {
  import { ethers } from "ethers";
  //ethereum object definitions
  //from https://eips.ethereum.org/EIPS/eip-1193
  interface Web3Provider extends ethers.providers.Web3Provider {}
  type EIP1193Events = "accountsChanged"; // | "otherEvents"
  type EIP1193Methods = "eth_requestAccounts";
  //event handler types
  type AccountChangeHandler = (accounts: string[]) => void;
}
