export enum EIP1993Methods {
  "eth_blockNumber" = "eth_blockNumber",
  "eth_getBalance" = "eth_getBalance",
}

export interface RequestArguments {
  readonly method: EIP1993Methods;
  readonly params?: readonly unknown[] | object;
}
