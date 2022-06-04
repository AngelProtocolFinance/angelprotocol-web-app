DONE:

1. update lcd urls, remove unused
2. replaced tokenList with hardCoded tokenList
3. removed CW20 balance fetching, since they depend on multicall, may not have terra v2.0 support?

- watch here : [multicall repo](https://github.com/scb-10x/multicall)

4. removed local_terra query skip
5. removed dynamic testnet response, instead prod is always equal to mainnet, and development is testnet
6. removed passing of `wallet.post` to thunks, use lower-level `WalletController` instead
7. token shape

```ts
type TerraNative = {
  min_denom: "uluna"; //uluna
  symbol: string; //LUNA
  logo: string;
  decimals: number; //6
  chainId: string; // "pisco-1" | "phoenix-1"

  //additional info for adding chain in wallet
  chainName: string; //Terra testnet
  rpcUrl?: never;
  blockExplorerUrl?: never; //https://testnet.snowtrace.io
  tokens?: never;

  contractAddr?: never;
  nativeSymbol?: never;
};

type CW20 = {
  min_denom: "cw20";
  symbol: string; //HALO
  logo: string;
  decimals: number; //6
  chainId: string; // "pisco-1" | "phoenix-1"
  chainName: string; //Terra testnet

  //additional info for adding chain in wallet
  chainName: string; //Terra testnet
  rpcUrl?: never;
  blockExplorerUrl?: never; //https://testnet.snowtrace.io
  tokens?: never;

  //info if token is an ERC20 token
  contractAddr: string;
  nativeSymbol: string;
};

type EVMNative = {
  min_denom: string; //avax
  symbol: string; //AVAX
  logo: string;
  decimals: number; //18
  chainId: string; // "1"-mainnet "97"-binance-test "43017"-avax

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

type ERC20 = {
  min_denom: "erc20"; //avax
  symbol: string; //AVAX
  logo: string;
  decimals: number; //18
  chainId: string; // "1"-mainnet "97"-binance-test "43017"-avax

  //additional info for adding chain in wallet
  chainName: string; //Avalanche
  rpcUrl: string;
  blockExplorerUrl: string; //https://testnet.snowtrace.io
  tokens: {
    contractAddr: string;
    logo: string;
  }[];

  //info if token is an ERC20 token
  contractAddr: string;
  nativeSymbol: string;
};

type Token = EVMToken | ERC20 | TerraNative | CW20;
```

8. xdefi edge case

- xdefi state from terra wallet provider, when chainId is mismatched, additional check if its evm chainId is correct
