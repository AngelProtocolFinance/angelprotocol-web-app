declare module "@types-lists" {
  type Denoms =
    | "uluna"
    | "uaud"
    | "ucad"
    | "uchf"
    | "ucny"
    | "udkk"
    | "ueur"
    | "ugbp"
    | "uhkd"
    | "uidr"
    | "uinr"
    | "ujpy"
    | "ukrw"
    | "umnt"
    | "unok"
    | "uphp"
    | "usdr"
    | "usek"
    | "usgd"
    | "uthb"
    | "uusd"
    | "ether"
    | "bnb"
    | "wei"
    | "btc"
    | "sol"
    | "uatom"
    | "coin"
    | "uhalo";

  type Chains = "terra" | "ethereum";

  type ChainIDs =
    | "testnet" //gen_testnet | sol_test
    | "mainnet" //gen_mainnet
    | "bombay-12" //terra-testnet
    | "columbus-5" //terra-mainnet
    | "localterra" //terra-local
    | "4" // eth-rinkeby
    | "42" // eth-kovan
    | "3" // eth-ropsten
    | "1" //eth-main | btc-test
    | "56" //bnb-main
    | "97" //bnb-test
    | "devnet" //sol-devnet
    | "mainnet-beta" //sol-mainnet beta
    | "cosmoshub-3" //cosmos-mainnet
    | "cosmoshub-4" //cosmos-mainnet
    | "cosmoshub-testnet"; //cosmos-tesnet

  type TerraChainIDs = Extract<
    ChainIDs,
    "bombay-12" | "columbus-5" | "localterra"
  >;
}
