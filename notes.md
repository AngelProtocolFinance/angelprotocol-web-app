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

9. Transaction UI update

- merge `<TransactionPrompt>` & `<Transactor>` and update forms with the new refactored Transactor.
  benefits:
  1.  forms with multi update flow doesn't need to call `showModal(TransactionPrompt)`
  2.  removed duplicated logic in `<TransactionPrompt>` and `<Transactor>` component
  3.  removed explicit generic type on inferred calls e.g
  ```ts
  //from
  showModal<TxProps<TransactorContentProps>>(Transactor, {
    Content,
    contentProps: TransactorContentProps,
  });
  //to just
  showModal(Transactor, { Content, props });
  //types is coherent underneath and would still err even without specifying the generics
  ```
-

9. registration bugs

1. wallet address is missing, even MetaData.TerraAddress is populated in registration from aws

```
  const charity = useGetter((state) => state.charity);
  const { submit, isSubmitting } = useSubmit();
  const { activate, isSubmitting: isActivateSubmitting } = useActivate();

  const state = getRegistrationState(charity);
```

```js
const initRegData = {
  /** 
  Email: string;
  EmailVerified?: boolean;
  Goals: string;
  FirstName: string;
  LastName: string;
  OtherRole?: string;
  OtherReferralMethod?: string;
  PhoneNumber: string;
  PK?: string;
  ReferralMethod: ReferralMethods;
  Role: ContactRoles;
  SK: "ContactPerson";
   * 
  */
  ContactPerson: {
    EmailVerified: true,
    Role: "ceo",
    PhoneNumber: "2131023",
    SK: "ContactPerson",
    ReferralMethod: "angel-alliance",
    FirstName: "test naem",
    PK: "6bd78454-8883-4aad-bd23-beccfe441177",
    LastName: "test last",
    Goals:
      '{"blocks":[{"key":"6sgpr","text":"asdfasdfasdf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    Email: "xejom27225@runqx.com",
  },
  Registration: {
    /** 
  AuditedFinancialReports?: FileObject[];
  AuditedFinancialReportsVerified?: boolean;
  CharityName: string;
  CharityName_ContactEmail?: string;
  FinancialStatements?: FileObject[];
  FinancialStatementsVerified?: boolean;
  ProofOfIdentity?: FileObject;
  ProofOfIdentityVerified?: boolean;
  ProofOfRegistration?: FileObject;
  ProofOfRegistrationVerified?: boolean;
  RegistrationDate: string;
  RegistrationStatus: RegistrationStatus;
  SK: "Registration";
  Tier?: EndowmentTierNum;
  UN_SDG: number; //0 iniitally
  Website?: string;
     * 
     * 
    */
    CharityName_ContactEmail: "TEST ORG_xejom27225@runqx.com",
    RegistrationDate: "2022-06-14T10:36:29.401Z",
    CharityName: "test org",
    UN_SDG: 0,
    SK: "Registration",
    RegistrationStatus: "Inactive",
    PK: "6bd78454-8883-4aad-bd23-beccfe441177",
  },
  Metadata: {
    /** 
     * 
  Banner?: FileObject;
  CharityLogo?: FileObject;
  CharityOverview?: string;
  EndowmentContract?: string;
  SK: "Metadata";
  TerraWallet?: string;
  KycDonorsOnly?: boolean;
    */
    PK: "6bd78454-8883-4aad-bd23-beccfe441177",
    SK: "Metadata",
  },
  authorization: "allow",
  user: "charity-owner",
  iat: 1655203016,
  exp: 1655210216,
};
```
