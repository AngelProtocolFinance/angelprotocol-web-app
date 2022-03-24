import { WalletContext } from "providers";
import { useContext } from "react";

export default function useWallet() {
  return useContext(WalletContext);
}
