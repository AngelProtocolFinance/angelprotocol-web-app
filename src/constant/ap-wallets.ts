import { IS_AST } from "./env";

const apesWallet = {
  evmDeposit: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
  evmWithdraw: "0x0189BeffF5B23E692Ea25C4820930c3c11e8D448",
  terra: "terra17wp2dr7zrsrrtlz9cn4sxtpsha37dwmwmsf60r",
  junoDeposit: "juno17wp2dr7zrsrrtlz9cn4sxtpsha37dwmwtxsp2l",
  junoWithdraw: "juno19ecww4v6sftj07d0vtjzjqtaertltek55ngmp7",
};

type Wallets = typeof apesWallet;

const normalWallets: Wallets = {
  evmDeposit: "0xCD0C4efdbe54CEEa702E58783Ab08EaD8E24Ad27",
  evmWithdraw: "0x45eDEFa3acFF432af0f1Fbd23b33Ae1DA411FAB9",
  terra: "terra17m2zs0va43n6jtg8ywursekjsh9xm8wmzs0aaj",
  junoDeposit: "juno17m2zs0va43n6jtg8ywursekjsh9xm8wmjxkxcw",
  junoWithdraw: "juno1s4v6h955f8gcvwm5xhlzjp2lvr7325gv66npac",
};

export const apWallets = IS_AST ? normalWallets : apesWallet;
