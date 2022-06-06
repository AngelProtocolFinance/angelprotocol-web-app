DONE:

1. update lcd urls, remove unused
2. reflect updated token shape in aws
3. removed CW20 balance fetching, since they depend on multicall, may not have terra v2.0 support?

- watch here : [multicall repo](https://github.com/scb-10x/multicall)

4. removed local_terra query skip
5. removed dynamic testnet response, instead prod is always equal to mainnet, and development is testnet
6. removed passing of `wallet.post` to thunks, use lower-level `WalletController` instead
7. token shape
8. add token type to token list,
9. update donater to use wallet balances, estimator to use metadata

```ts
type TokenBase = {
  symbol: string; //LUNA
  logo: string;
  decimals: number; //6
  chainId: string;
};

export type TerraNative = TokenBase & {
  type: "terra-native"; //uluna
  //additional info for adding chain in wallet
  chainName: string; //Terra testnet
  rpcUrl?: never;
  blockExplorerUrl?: never; //https://testnet.snowtrace.io
  tokens?: never;

  contractAddr?: never;
  nativeSymbol?: never;
};

export type ALT20 = TokenBase & {
  type: "cw20" | "erc20";

  chainName?: never; //Terra testnet
  rpcUrl?: never;
  blockExplorerUrl?: never; //https://testnet.snowtrace.io
  tokens?: never;

  //info if token is an ERC20 token
  contractAddr: string;
  nativeSymbol: string;
};

export type EVMNative = TokenBase & {
  type: "evm-native"; //avax

  //additional info for adding chain in wallet
  chainName: string; //Avalanche
  rpcUrl: string;
  blockExplorerUrl: string; //https://testnet.snowtrace.io
  tokens: {
    contractAddr: string;
    logo: string;
  }[];

  //info if token is an ERC20 token
  contractAddr?: never;
  nativeSymbol?: never;
};

export type Token = EVMNative | TerraNative | ALT20;
```

8. xdefi edge case

- xdefi state from terra wallet provider, when chainId is mismatched, additional check if its evm chainId is correct
- integrating xdefi using `@terra-money/wallet-provider` handles terra tx and balance seamlessly but lose functionality as evm wallet e.g (events)
- integrating xdefi as injected provider handles evm setup seamlessly but lose terra functionality (unclear window.xfi.terra)
