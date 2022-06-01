DONE:

1. update lcd urls, remove unused
2. replaced tokenList with hardCoded tokenList
3. removed CW20 balance fetching, since they depend on multicall, may not have terra v2.0 support?

- watch here : [multicall repo](https://github.com/scb-10x/multicall)

4. removed local_terra query skip
5. removed dynamic testnet response, instead prod is always equal to mainnet, and development is testnet
6. removed passing of `wallet.post` to thunks, use lower-level `WalletController` instead
