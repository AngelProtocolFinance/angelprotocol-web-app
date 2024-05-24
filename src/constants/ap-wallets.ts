import type { ChainID } from "types/chain";

const wallets = {
  evmDeposit: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
  evmWithdraw: "0x0189BeffF5B23E692Ea25C4820930c3c11e8D448",
  terra: "terra17wp2dr7zrsrrtlz9cn4sxtpsha37dwmwmsf60r",
  junoDeposit: "juno17wp2dr7zrsrrtlz9cn4sxtpsha37dwmwtxsp2l",
  junoWithdraw: "juno19ecww4v6sftj07d0vtjzjqtaertltek55ngmp7",
  btc: "bc1qezneaj4976ev4kkqws40dk2dxgxwcjynggd8fq",
  xrp: "rGr4rXmaznKwxw8ZcbgF12R4f3gJSWMcET",
  sol: "47gsJAHucVe7RzpGDKveG5ho6XzJLYocGYtqDkq4fsF1",
  doge: "TODO: get ap-wallet",
};

export const apWallets: { [K in ChainID]: string } = {
  "1": wallets.evmDeposit,
  "11155111": wallets.evmDeposit,
  "137": wallets.evmDeposit,
  "42161": wallets.evmDeposit,
  "421614": wallets.evmDeposit,
  "56": wallets.evmDeposit,
  "80002": wallets.evmDeposit,
  "97": wallets.evmDeposit,
  "btc-mainnet": wallets.btc,
  "btc-testnet": wallets.btc,
  "doge-mainnet": wallets.doge,
  "doge-testnet": wallets.doge,
  "juno-1": wallets.junoDeposit,
  "phoenix-1": wallets.terra,
  "pisco-1": wallets.terra,
  "sol-mainnet": wallets.sol,
  "sol-testnet": wallets.sol,
  "uni-6": wallets.junoDeposit,
  "xrp-mainnet": wallets.xrp,
  "xrp-testnet": wallets.xrp,
};
