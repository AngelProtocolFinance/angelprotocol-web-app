import { useContext } from "react";
import { WalletContext } from "providers";

export default function useWalletContext() {
  return useContext(WalletContext);
}
