import { WalletState } from "contexts/WalletContext";
import { placeholderChain } from "contexts/WalletContext/constants";

export const PLACEHOLDER_WALLET: WalletState = {
  walletIcon: "",
  displayCoin: placeholderChain.native_currency,
  coins: placeholderChain.tokens,
  address: "juno1qsn67fzym4hak4aly07wvcjxyzcld0n4s726r2fs9km2tlahlc5qg2drvn",
  chain: placeholderChain,
  providerId: "keplr",
  supportedChains: [
    {
      chain_id: placeholderChain.chain_id,
      chain_name: placeholderChain.chain_name,
    },
  ],
  getBalance: (_: string) => 0,
};
