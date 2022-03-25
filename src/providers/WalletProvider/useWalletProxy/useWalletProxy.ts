import { useState } from "react";
import { DEFAULT_WALLET, WalletProxy } from "./types";

export default function useWalletProxy(): WalletProxy {
  const [isLoading, setLoading] = useState(true);

  return DEFAULT_WALLET;
}
