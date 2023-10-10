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
  eth_getTransactionReceipt: "eth_getTransactionReceipt",

  //others
};

export const EMPTY_DATA = "0x";
