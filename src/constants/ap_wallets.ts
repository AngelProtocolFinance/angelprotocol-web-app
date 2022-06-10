import { denoms } from "./currency";

type Wallets = Partial<{
  [index in denoms]: string;
}>;

export const ap_wallets: Wallets = {
  [denoms.ether]: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
  [denoms.uluna]: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
};
