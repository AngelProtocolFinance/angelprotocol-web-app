import { WalletContext } from "providers";
import { useContext } from "react";

export default function useWalletContext() {
  return useContext(WalletContext);
}
