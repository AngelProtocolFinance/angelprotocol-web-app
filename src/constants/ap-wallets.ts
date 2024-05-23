import type { ChainID } from "types/chain";

const chainWallets = {
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

export const chainIdWallets: { [K in ChainID]: string } = {
  "1": chainWallets.evmDeposit,
  "11155111": chainWallets.evmDeposit,
  "137": chainWallets.evmDeposit,
  "42161": chainWallets.evmDeposit,
  "421614": chainWallets.evmDeposit,
  "56": chainWallets.evmDeposit,
  "80002": chainWallets.evmDeposit,
  "97": chainWallets.evmDeposit,
  "btc-mainnet": chainWallets.btc,
  "btc-testnet": chainWallets.btc,
  "doge-mainnet": chainWallets.doge,
  "doge-testnet": chainWallets.doge,
  "juno-1": chainWallets.junoDeposit,
  "phoenix-1": chainWallets.terra,
  "pisco-1": chainWallets.terra,
  "sol-mainnet": chainWallets.sol,
  "sol-testnet": chainWallets.sol,
  "uni-6": chainWallets.junoDeposit,
  "xrp-mainnet": chainWallets.xrp,
  "xrp-testnet": chainWallets.xrp,
} as const;
