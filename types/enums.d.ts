declare module "@types-enums" {
  enum chainIDs {
    //for multi-chain wallets, generalize as either mainnet or testnet only
    gen_testnet = "testnet",
    gen_mainnet = "mainnet",
    testnet = "bombay-12",
    mainnet = "columbus-5",
    localterra = "localterra",
    eth_rinkeby = "4",
    eth_kovan = "42",
    eth_ropsten = "3",
    eth_main = "1",
    bnb_main = "56",
    bnb_test = "97",
    btc_test = "1",
    sol_dev = "devnet",
    sol_main = "mainnet-beta",
    sol_test = "testnet",
    cosmos_3 = "cosmoshub-3",
    cosmos_4 = "cosmoshub-4",
    cosmos_test = "cosmoshub-testnet",
  }

  enum chains {
    terra = "terra",
    ethereum = "ethereum",
  }

  export enum denoms {
    uluna = "uluna",
    uaud = "uaud",
    ucad = "ucad",
    uchf = "uchf",
    ucny = "ucny",
    udkk = "udkk",
    ueur = "ueur",
    ugbp = "ugbp",
    uhkd = "uhkd",
    uidr = "uidr",
    uinr = "uinr",
    ujpy = "ujpy",
    ukrw = "ukrw",
    umnt = "umnt",
    unok = "unok",
    uphp = "uphp",
    usdr = "usdr",
    usek = "usek",
    usgd = "usgd",
    uthb = "uthb",
    uusd = "uusd",
    ether = "ether",
    bnb = "bnb",
    wei = "wei",
    btc = "btc",
    sol = "sol",
    uatom = "uatom",
    coin = "coin",
    uhalo = "uhalo",
  }

  export enum sc {
    index_fund = "index_fund",
    registrar = "registrar",
    anchor_vault1 = "anchor_vault1",
    anchor_vault2 = "anchor_vault2", //mainnet doesn't have anchor vault2
    apCW4 = "apCW4",
    apCW3 = "apCW3",
    halo_token = "halo_token",
    halo_gov = "halo_gov",
    airdrop = "airdrop",
    loop_factory = "loop_factory",
    loop_router = "loop_router",
    loop_haloust_pair = "loop_haloust_pair",
    loop_haloust_lp = "loop_haloust_lp",
    multicall = "multicall",
  }

  export enum UserTypes {
    CHARITY_OWNER = "charity-owner",
    WEB_APP = "angelprotocol-web-app",
  }
}
