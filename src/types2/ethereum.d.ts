import { ethers } from "ethers";

declare module "@types-ethereum" {
  //ethereum object definitions
  //from https://eips.ethereum.org/EIPS/eip-1193
  interface Web3Provider extends ethers.providers.Web3Provider {}
  enum EIP1193Events {
    accountsChanged = "accountsChanged",
  }
  enum EIP1193Methods {
    eth_requestAccounts = "eth_requestAccounts",
    //others
  }
  //event handler types
  type AccountChangeHandler = (accounts: string[]) => void;
}
