import { ADDRESS_ZERO as TADDR_0 } from "types/contracts/evm";

export const EIP1193Events = {
  accountsChanged: "accountsChanged",
  chainChanged: "chainChanged",
};

export const EIPMethods = {
  eth_requestAccounts: "eth_requestAccounts", //EIP-1102
  wallet_addEthereumChain: "wallet_addEthereumChain", //EIP-3085
  wallet_switchEthereumChain: "wallet_switchEthereumChain", //EIP-3326
  eth_chainId: "eth_chainId", //EIP-695

  /** EIP-1474 */
  eth_getBalance: "eth_getBalance",
  eth_estimateGas: "eth_estimateGas",
  eth_sendTransaction: "eth_sendTransaction",
  eth_getTransactionCount: "eth_getTransactionCount",
  eth_gasPrice: "eth_gasPrice",
  eth_call: "eth_call",
  //others
};

export const ADDRESS_ZERO =
  "0x0000000000000000000000000000000000000000" as TADDR_0;
